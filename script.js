const root = document.documentElement;
const yearNode = document.getElementById("year");
const themeButton = document.getElementById("themeToggle");
const themeValue = document.getElementById("themeToggleValue");
const menuButton = document.getElementById("menuToggle");
const nav = document.querySelector(".site-nav");

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.setAttribute("data-theme", isDark ? "dark" : "light");

  if (themeValue) {
    themeValue.textContent = isDark ? "Dark" : "Light";
  }

  if (themeButton) {
    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  try {
    localStorage.setItem("site-theme", isDark ? "dark" : "light");
  } catch (error) {
    // Storage is optional for this site.
  }
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

applyTheme(root.getAttribute("data-theme") || "dark");

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });
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

if ("IntersectionObserver" in window && revealNodes.length > 0) {
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
      threshold: 0.14,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("in-view"));
}
