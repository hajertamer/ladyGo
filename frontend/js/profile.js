
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "register.html";
  }

  async function getUserData() {
    try {
      const res = await fetch("http://localhost:5000/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      const user = data.data;

    document.getElementById("userName").innerText = user.name;
    document.getElementById("userEmail").innerText = user.email;
    document.getElementById("userRole").innerText = user.role === "driver" ? "Driver 🚗" : "Passenger 👤";

    } catch (err) {
      console.log(err);
      alert("Error loading user data");
    }
  }

  getUserData();
