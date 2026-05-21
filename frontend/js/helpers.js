export const showError = (id, message) => {
  const input = document.getElementById(id);
  const error = document.getElementById(id + "Error");

  if (!input || !error) return;

  if (message) {
    input.classList.add("error");
    error.style.display = "block";
    error.innerText = message;
  } else {
    input.classList.remove("error");
    error.style.display = "none";
    error.innerText = "";
  }
};