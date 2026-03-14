const root = document.documentElement;
const themeButton = document.getElementById("themeToggle");
const themeValue = document.getElementById("themeToggleValue");
const yearNode = document.getElementById("year");

function applyTheme(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  const isDark = nextTheme === "dark";

  root.setAttribute("data-theme", nextTheme);

  if (themeValue) {
    themeValue.textContent = isDark ? "Dark" : "Light";
  }

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  try {
    localStorage.setItem("site-theme", nextTheme);
  } catch (error) {
    // Ignore storage errors on static hosting.
  }
}

applyTheme(root.getAttribute("data-theme") || "dark");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
