const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearNode = document.getElementById("year");

function applyTheme(theme) {
  const next = theme === "dark" ? "dark" : "light";
  const isDark = next === "dark";

  root.setAttribute("data-theme", next);

  if (themeLabel) {
    themeLabel.textContent = isDark ? "Dark" : "Light";
  }

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  try {
    localStorage.setItem("site-theme", next);
  } catch (error) {
    // Ignore storage failures on static hosting.
  }
}

applyTheme(root.getAttribute("data-theme") || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
