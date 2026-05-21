const BASE_URL = "http://localhost:5000/auth";


//  HELPERS


const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePassword = (pass) =>
  pass.length >= 6;

const showError = (id, show) => {
  const input = document.getElementById(id);
  const error = document.getElementById(id + "Error");

  if (!input || !error) return;

  input.classList.toggle("error", show);
  error.style.display = show ? "block" : "none";
};

const showTypeError = (show) => {
  const error = document.getElementById("typeError");
  if (error) {
    error.style.display = show ? "block" : "none";
  }
};

const request = async (url, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return { res, data };
};


//  SIGNUP


const registerForm = document.getElementById("registerForm");

if (registerForm) {
   
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");


  registerForm.onsubmit = async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirm = confirmPasswordInput.value;
    const role = document.querySelector('input[name="type"]:checked');

    // validate
    const isNameValid = name.length >= 3;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isMatch = password === confirm;
    const isRoleSelected = !!role;
    
    // show errors
    showError("name", !isNameValid);
    showError("email", !isEmailValid);
    showError("password", !isPasswordValid);
    showError("confirmPassword", !isMatch);
    showTypeError(!isRoleSelected);
    
    // stop if invalid
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isMatch || !isRoleSelected) {
      return;
    }

    const { res, data } = await request(`${BASE_URL}/signup`, {
      name,
      email,
      password,
      role: role.value
    });

    if (res.ok) {
      localStorage.setItem("email", email);
      alert("OTP sent 📩");
      window.location.href = "confirm.html";
    } else {
      alert(data.message);
    }
  };
}


//  CONFIRM OTP


const otpForm = document.getElementById("otpForm");

if (otpForm) {
  otpForm.onsubmit = async (e) => {
    e.preventDefault();

    const { res, data } = await request(`${BASE_URL}/confirmOTP`, {
      email: localStorage.getItem("email"),
      confirmOTP: otp.value
    });

    if (res.ok) {
      alert("Confirmed ✅");
      window.location.href = "register.html";
    } else {
      alert(data.message);
    }
  };
}


//  LOGIN


const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.onsubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    showError("email", !validateEmail(email));
    showError("password", !validatePassword(password));

    if (!validateEmail(email) || !validatePassword(password)) return;

    const { res, data } = await request(`${BASE_URL}/login`, {
      email,
      password
    });

    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      alert("Login success ");
      window.location.href = "home.html";
    } else {
      alert(data.message || "Login failed ");
    }
  };
}


//  FORGET PASSWORD


const forgetForm = document.getElementById("forgetForm");

if (forgetForm) {
  forgetForm.onsubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;

    if (!validateEmail(email)) {
      showError("email", true);
      return;
    }

    const { res, data } = await request(`${BASE_URL}/forgetPassword`, {
      email
    });

    if (res.ok) {
      alert("Check your email 📩");
    } else {
      alert(data.message);
    }
  };
}


//  RESET PASSWORD


const resetForm = document.getElementById("resetForm");

if (resetForm) {
  resetForm.onsubmit = async (e) => {
    e.preventDefault();

    const newPass = document.getElementById("newPassword").value;
    const confirm = document.getElementById("confirmPassword").value;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    showError("newPassword", !validatePassword(newPass));
    showError("confirmPassword", newPass !== confirm);

    if (!validatePassword(newPass) || newPass !== confirm) return;

    const { res, data } = await request(`${BASE_URL}/reset-password/${token}`, {
      password: newPass
    });

    if (res.ok) {
      alert("Password updated ✅");
      window.location.href = "register.html";
    } else {
      alert(data.message);
    }
  };
}