const root = document.documentElement;
const yearNode = document.getElementById("year");
const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".site-nav");
const themeToggle = document.getElementById("themeToggle");
const themeToggleValue = document.getElementById("themeToggleValue");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  if (themeToggleValue) {
    themeToggleValue.textContent = theme === "light" ? "Light" : "Dark";
  }
  if (themeToggle) {
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark mode" : "Switch to light mode"
    );
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

function toggleTheme() {
  const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  setTheme(nextTheme);
  try {
    localStorage.setItem("theme", nextTheme);
  } catch (error) {
    // Ignore storage failures and keep the in-memory theme.
  }
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

setTheme(root.getAttribute("data-theme") || "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealNodes = document.querySelectorAll(".reveal");
if (revealNodes.length && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("in-view"));
}
