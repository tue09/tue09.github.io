const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
const yearNode = document.getElementById("year");
const backToTopButton = document.getElementById("backToTop");

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

const postSearch = document.getElementById("postSearch");
const postGrid = document.getElementById("postGrid");
const filterButtons = document.querySelectorAll(".chip");
const noPostResults = document.getElementById("noPostResults");

if (postGrid && filterButtons.length > 0) {
  const cards = Array.from(postGrid.querySelectorAll(".post-card"));
  let activeFilter = "all";

  function filterPosts() {
    const query = ((postSearch && postSearch.value) || "").trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const tags = (card.dataset.tags || "").toLowerCase();
      const text = card.textContent.toLowerCase();
      const matchesTag = activeFilter === "all" || tags.includes(activeFilter);
      const matchesText = query.length === 0 || text.includes(query);
      const shouldShow = matchesTag && matchesText;

      card.hidden = !shouldShow;
      if (shouldShow) {
        visibleCount += 1;
      }
    });

    if (noPostResults) {
      noPostResults.hidden = visibleCount > 0;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((node) => node.classList.remove("is-active"));
      button.classList.add("is-active");
      activeFilter = button.dataset.filter || "all";
      filterPosts();
    });
  });

  if (postSearch) {
    postSearch.addEventListener("input", filterPosts);
  }

  filterPosts();
}

const copyEmailButton = document.getElementById("copyEmailBtn");
const copyStatus = document.getElementById("copyStatus");

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email || "";
    if (!email) {
      return;
    }

    try {
      await navigator.clipboard.writeText(email);
      if (copyStatus) {
        copyStatus.textContent = "Email copied to clipboard.";
      }
    } catch (error) {
      if (copyStatus) {
        copyStatus.textContent = `Copy failed. Please copy manually: ${email}`;
      }
    }
  });
}

if (backToTopButton) {
  function refreshBackToTop() {
    const shouldShow = window.scrollY > 360;
    backToTopButton.classList.toggle("is-visible", shouldShow);
  }

  window.addEventListener("scroll", refreshBackToTop, { passive: true });
  refreshBackToTop();

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
