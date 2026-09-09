const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = Array.from(document.querySelectorAll("main section[id]"));

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

if (sections.length > 0 && navLinks.length > 0 && "IntersectionObserver" in window) {
  const linkMap = {};

  navLinks.forEach((link) => {
    const target = link.getAttribute("href");
    if (target && target.charAt(0) === "#") {
      linkMap[target.slice(1)] = link;
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = id ? linkMap[id] : null;

        if (!link) {
          return;
        }

        if (entry.isIntersecting) {
          navLinks.forEach((node) => node.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0.01,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
