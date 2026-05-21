const box = document.getElementById("notificationBox");
const icon = document.getElementById("notifIcon");
const badge = document.getElementById("notifCount");
const list = document.getElementById("notificationList");
const sound = document.getElementById("notifSound");

function toggleNotifications() {
  box.style.display = box.style.display === "block" ? "none" : "block";
  loadNotifications();
}

async function loadNotifications() {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/user/notifications", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();
    console.log(data);

    const notifications = data.notifications || data.data || [];

    
    list.innerHTML = "";

    
    notifications.forEach(n => {
      list.innerHTML += `
      <div class="notif-item ${!n.isRead ? "unread" : ""}">
          ${n.message}
        </div>
      `;
    });

    // unread count
    const unread = notifications.filter(n => !n.isRead);

    if (unread.length > 0) {
      badge.style.display = "block";
      badge.innerText = unread.length;
      icon.classList.add("active");
    } else {
      badge.style.display = "none";
      icon.classList.remove("active");
    }

  } catch (err) {
    console.error("Error loading notifications:", err);
  }
}


if (icon) {
  icon.onclick = async () => {
    icon.classList.remove("active");

    
    toggleNotifications();

  };
}


loadNotifications();

