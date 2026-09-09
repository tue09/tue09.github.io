/* =========================================================================
   Le Dinh Tri Tue — homepage behaviour
   Theme · navigation · scroll reveal · publication filters · inline editing
   ========================================================================= */

(() => {
  "use strict";

  const root = document.documentElement;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme ---------- */

  const themeToggle = document.getElementById("themeToggle");

  function applyTheme(next) {
    const theme = next === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", theme);

    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }

    try {
      localStorage.setItem("site-theme", theme);
    } catch (error) {
      /* static hosting without storage access */
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- Header state ---------- */

  const header = document.getElementById("siteHeader");

  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile navigation ---------- */

  const navToggle = document.getElementById("navToggle");
  const siteNav = document.getElementById("siteNav");

  if (navToggle && siteNav) {
    const closeNav = () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open menu");
    };

    navToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    siteNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  /* ---------- Scroll reveal ---------- */

  const revealables = Array.from(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealables.forEach((node) => node.classList.add("is-in"));
  } else {
    const groups = new Map();

    revealables.forEach((node) => {
      const container = node.closest(".section-main, .hero-grid, .hero, .shell") || document.body;
      const list = groups.get(container) || [];
      list.push(node);
      groups.set(container, list);
    });

    groups.forEach((list) => {
      list.forEach((node, index) => node.style.setProperty("--d", `${Math.min(index, 6) * 85}ms`));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
    );

    revealables.forEach((node) => observer.observe(node));

    // Safety net: anything already inside the first screen is revealed on load,
    // so a missed observer callback can never leave content permanently invisible.
    const revealAboveFold = () => {
      revealables.forEach((node) => {
        if (node.classList.contains("is-in")) return;
        const box = node.getBoundingClientRect();
        if (box.top < window.innerHeight && box.bottom > 0) {
          node.classList.add("is-in");
          observer.unobserve(node);
        }
      });
    };

    revealAboveFold();
    window.addEventListener("load", revealAboveFold);
  }

  /* ---------- Active section in nav ---------- */

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if (navLinks.length && sections.length && "IntersectionObserver" in window) {
    const linkFor = new Map();
    navLinks.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("#")) linkFor.set(href.slice(1), link);
    });

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkFor.get(entry.target.id);
          if (!link || !entry.isIntersecting) return;
          navLinks.forEach((node) => node.classList.remove("is-active"));
          link.classList.add("is-active");
        });
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- Publication filters ---------- */

  const chips = Array.from(document.querySelectorAll(".chip[data-filter]"));
  const pubs = Array.from(document.querySelectorAll(".pub[data-topic]"));
  const pubEmpty = document.getElementById("pubEmpty");

  if (chips.length && pubs.length) {
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const filter = chip.dataset.filter;

        chips.forEach((node) => node.classList.toggle("is-active", node === chip));

        let shown = 0;
        pubs.forEach((pub) => {
          const match = filter === "all" || pub.dataset.topic === filter;
          pub.classList.toggle("is-hidden", !match);
          if (match) shown += 1;
        });

        if (pubEmpty) pubEmpty.hidden = shown > 0;
      });
    });
  }

  /* ---------- Inline authoring (hidden top-left affordance) ---------- */

  const hotzone = document.getElementById("editHotzone");
  const editToggle = document.getElementById("editToggle");
  const editExport = document.getElementById("editExport");
  const editStatus = document.getElementById("editStatus");

  const EDITABLE = "[data-edit-id]";
  const version = root.getAttribute("data-edit-version") || "v1";
  const baseKey = `homepage-edits:${location.pathname}`;
  const key = `${baseKey}::${version}`;

  const nodes = () => Array.from(document.querySelectorAll(EDITABLE));

  function readStore() {
    try {
      const scoped = localStorage.getItem(key);
      const legacy = localStorage.getItem(baseKey);
      const raw = scoped || legacy;
      const parsed = raw ? JSON.parse(raw) : null;
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function loadEdits() {
    const store = readStore();
    nodes().forEach((node) => {
      const id = node.dataset.editId;
      if (id && Object.prototype.hasOwnProperty.call(store, id)) node.innerHTML = store[id];
    });
  }

  function saveEdits() {
    const store = {};
    nodes().forEach((node) => {
      const id = node.dataset.editId;
      if (id) store[id] = node.innerHTML;
    });

    try {
      localStorage.setItem(key, JSON.stringify(store));
      flash("saved");
    } catch (error) {
      flash("save failed");
    }
  }

  let flashTimer = null;
  function flash(message) {
    if (!editStatus) return;
    editStatus.textContent = message;
    window.clearTimeout(flashTimer);
    flashTimer = window.setTimeout(() => {
      editStatus.textContent = editing ? "editing" : "";
    }, 1800);
  }

  let editing = false;

  function setEditing(next) {
    editing = Boolean(next);
    nodes().forEach((node) => node.setAttribute("contenteditable", editing ? "true" : "false"));

    if (editToggle) {
      editToggle.setAttribute("aria-pressed", String(editing));
      editToggle.textContent = editing ? "Done" : "Edit";
    }

    if (hotzone) hotzone.classList.toggle("is-open", editing);
    if (editStatus) editStatus.textContent = editing ? "editing" : "";

    if (!editing) saveEdits();
  }

  if (editToggle) {
    loadEdits();
    nodes().forEach((node) => node.setAttribute("contenteditable", "false"));

    editToggle.addEventListener("click", () => setEditing(!editing));

    document.addEventListener("keydown", (event) => {
      const target = event.target;
      const inEditable = target instanceof Element && target.closest('[contenteditable="true"], input, textarea');

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s" && editing) {
        event.preventDefault();
        saveEdits();
        return;
      }

      if (inEditable || event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key.toLowerCase() === "e") {
        event.preventDefault();
        setEditing(!editing);
      }
    });
  }

  if (editExport) {
    editExport.addEventListener("click", () => {
      if (editing) saveEdits();

      const clone = document.documentElement.cloneNode(true);

      clone.setAttribute("data-edit-version", `${version}-export-${Date.now().toString(36)}`);
      clone.querySelectorAll('[contenteditable]').forEach((node) => node.setAttribute("contenteditable", "false"));
      clone.querySelectorAll(".reveal").forEach((node) => node.classList.add("is-in"));
      clone.querySelectorAll(".pub.is-hidden").forEach((node) => node.classList.remove("is-hidden"));
      clone.querySelectorAll(".chip[data-filter]").forEach((node) => {
        node.classList.toggle("is-active", node.dataset.filter === "all");
      });

      const openNav = clone.querySelector(".site-nav.is-open");
      if (openNav) openNav.classList.remove("is-open");

      const status = clone.querySelector("#editStatus");
      if (status) status.textContent = "";

      const emptyNote = clone.querySelector("#pubEmpty");
      if (emptyNote) emptyNote.setAttribute("hidden", "");

      const html = `<!doctype html>\n${clone.outerHTML}`;
      const blob = new Blob([html], { type: "text/html;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = (location.pathname.split("/").pop() || "index.html").replace(/\.html?$/i, "") + "-edited.html";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);

      flash("exported");
    });
  }
})();
