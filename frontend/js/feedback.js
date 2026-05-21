const form = document.getElementById("feedbackForm");
const container = document.getElementById("feedbackContainer");
const stars = document.querySelectorAll("#stars span");
const ratingInput = document.getElementById("rating");

let feedbacks = [];
let currentIndex = 0;

// ===== STARS =====
stars.forEach(star => {
  star.addEventListener("click", () => {
    const value = star.getAttribute("data-value");
    ratingInput.value = value;
    updateStars(value);
  });
});

function updateStars(value) {
  stars.forEach(star => {
    star.classList.toggle(
      "active",
      star.getAttribute("data-value") <= value
    );
  });
}

// ===== SUBMIT =====
form.onsubmit = async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  const rating = ratingInput.value;

  if (!rating || rating == 0) {
    alert("Please select rating ⭐");
    return;
  }

  const res = await fetch("http://localhost:5000/feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, message, rating })
  });

  const data = await res.json();

  if (res.ok) {
    form.reset();
    ratingInput.value = 0;
    updateStars(0);

    loadFeedbacks();
  } else {
    alert(data.message);
  }
};

// ===== LOAD =====
async function loadFeedbacks() {
  try {
    const res = await fetch("http://localhost:5000/feedback");
    const data = await res.json();

    feedbacks = data.feedbacks || [];
    currentIndex = 0;

    renderFeedbacks();
  } catch (err) {
    console.error("Error loading feedbacks:", err);
  }
}

// ===== RENDER =====
function renderFeedbacks() {
  container.innerHTML = "";

  const visible = feedbacks.slice(currentIndex, currentIndex + 2);

  visible.forEach(f => {
    let starsHTML = "";
    const rating = parseInt(f.rating) || 0;

  for (let i = 0; i < rating; i++) {
    starsHTML += "☆";
  }

    container.innerHTML += `
      <div class="feedback-card">
        <div class="user-feedback">
          <i class="fa-regular fa-user"></i>
        </div>
        <h4>${f.name}</h4>
        <div class="stars-f">${starsHTML}</div>
        <p>${f.message}</p>
      </div>
    `;
  });
}

// ===== NEXT =====
function nextFeedback() {
  if (currentIndex + 2 < feedbacks.length) {
    currentIndex += 2;
    renderFeedbacks();
  }
}

// ===== PREV =====
function prevFeedback() {
  if (currentIndex - 2 >= 0) {
    currentIndex -= 2;
    renderFeedbacks();
  }
}

// =====  INIT =====
loadFeedbacks();