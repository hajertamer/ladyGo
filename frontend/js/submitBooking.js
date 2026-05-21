import { showError } from "./helpers.js";

const bookingForm = document.getElementById("bookingForm");
const btn = document.querySelector(".book-btn");
const sound = document.getElementById("notifSound");



if (bookingForm) {

    const driver = document.getElementById("driver");
    const phone = document.getElementById("phone");
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    const notes = document.getElementById("notes");


  bookingForm.addEventListener("submit", async (e) => {
    console.log("SUBMIT WORKED");
    e.preventDefault();


    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      return;
    }

    const body = {
      driver: driver.value,
      phone: phone.value,
      pickupDate: date.value,
      pickupTime: time.value,
      from: from.value,
      to: to.value,
      ticketType: document.querySelector(".ticket.active")?.dataset.value,
      paymentMethod: document.querySelector('input[name="payment"]:checked')?.value,
      notes: notes.value
    };

    let isValid = true;

    // validation
    if (!body.driver) {
      showError("driver", "Please select driver");
      isValid = false;
    } else showError("driver", "");

    if (!body.phone) {
      showError("phone", "Phone required");
      isValid = false;
    } else showError("phone", "");

    if (!body.pickupDate) {
      showError("date", "Date required");
      isValid = false;
    } else showError("date", "");

    if (!body.pickupTime) {
      showError("time", "Time required");
      isValid = false;
    } else showError("time", "");

    if (!body.from) {
      showError("from", "Pickup required");
      isValid = false;
    } else showError("from", "");

    if (!body.to) {
      showError("to", "Destination required");
      isValid = false;
    } else showError("to", "");

    if (!body.ticketType) {
      showError("ticket", "Select ticket type");
      isValid = false;
    } else showError("ticket", "");

    if (!body.paymentMethod) {
      showError("payment", "Select payment method");
      isValid = false;
    } else showError("payment", "");

    if (!isValid) {return;}

    // loading state
    btn.classList.add("loading");
    btn.innerText = "Booking... ⏳";

    try {
      const res = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (res.ok) {
        bookingForm.innerHTML = `
          <div style="text-align:center; padding:30px">
            <h3>✅ Booking Confirmed</h3>
            <p>Your ride has been booked successfully 🚗</p>
          </div>
        `;
        sound.play()
      } else {
        alert(data.message);
      }

    } catch (err) {
      alert("Server error ❌");
    }


    btn.classList.remove("loading");
    btn.innerText = "Book Now 🚗";
  });
}