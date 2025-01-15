const themeToggle = document.getElementById("theme-toggle");
const htmlElement = document.documentElement;
const logo = document.getElementById("logo");
// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  htmlElement.classList.add("dark");
  themeToggle.checked = true;
}

// Toggle dark mode on checkbox change
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    htmlElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    logo.src = "/image/logo-dark.png";
  } else {
    htmlElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    logo.src = "/image/logo-light.png";
  }
});

// Set alert visible only in 2 secconds
const alert = document.getElementById("alert-1");
setTimeout(() => {
  alert.classList.add("flex");
  alert.classList.add("hidden");
}, 3000);

//handle checkbox
const checkbox = document.getElementById("checkbox");
const modal = document.getElementById("confirmModal");
const closeModal = document.getElementById("closeModal");
const markAsDoneButton = document.getElementById("markAsDoneButton");

if (checkbox.checked) {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

// When the close button (X) is clicked, close the modal
closeModal.addEventListener("click", function () {
  modal.classList.add("hidden"); // Hide modal
});

markAsDoneButton.addEventListener("click", function () {
  // Close modal after marking as done
  modal.classList.add("hidden");
});

// Click outside the modal to close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.classList.add("hidden");
  }
};
