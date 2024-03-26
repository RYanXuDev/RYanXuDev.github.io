const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const sidebarToggle = body.querySelector(".toggle");
const searchBox = body.querySelector(".search-box");
const displayModeToggle = body.querySelector(".display-mode-toggle");

sidebarToggle.addEventListener("click", () =>
{
    sidebar.classList.toggle("closed");
});

searchBox.addEventListener("click", () =>
{
    sidebar.classList.remove("closed");
});

displayModeToggle.addEventListener("click", () =>
{
    body.classList.toggle("dark-mode");
})