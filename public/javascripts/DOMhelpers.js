
let navButton = document.getElementById("sideNavButton")
navButton.addEventListener("click", showNav)

function showNav() {
    let nav = document.querySelector("nav");
    nav.classList.toggle("show");
}