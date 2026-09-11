/* =========================================================================
   Tue Le homepage behaviour
   Theme · hash-routed tabs · abstract toggles · inline editing
   ========================================================================= */

(() => {
  "use strict";

  const root = document.documentElement;

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
    applyTheme(root.getAttribute("data-theme"));
    themeToggle.addEventListener("click", () => {
      applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

  /* ---------- Tabs (hash-routed, so old #publications links still land) ---------- */

  const panels = Array.from(document.querySelectorAll("[data-tab]"));
  const tabLinks = Array.from(document.querySelectorAll("[data-tab-link]"));

  // Anchors that used to point at sections of the old single-page layout.
  const ALIASES = {
    "": "home",
    top: "home",
    about: "home",
    contact: "home",
    news: "home",
    background: "experience",
    education: "experience"
  };

  const names = panels.map((panel) => panel.dataset.tab);

  let current = "home";

  // Anything unrecognised (e.g. the #main skip link) leaves the current tab alone.
  function tabFromHash() {
    const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    if (names.includes(raw)) return raw;
    if (Object.prototype.hasOwnProperty.call(ALIASES, raw)) return ALIASES[raw];
    return current;
  }

  function showTab(name) {
    current = name;

    panels.forEach((panel) => {
      const active = panel.dataset.tab === name;
      panel.hidden = !active;
    });

    tabLinks.forEach((link) => {
      const active = link.dataset.tabLink === name;
      link.classList.toggle("is-active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    document.title = name === "home" ? "Tue Le" : `Tue Le · ${name}`;
  }

  const toTop = () => window.scrollTo({ top: 0, behavior: "auto" });

  if (panels.length) {
    showTab(tabFromHash());

    // A panel id doubles as its anchor, so the browser would otherwise scroll the
    // header out of view when the page opens on (or navigates to) a deep link.
    // Browsers re-apply the fragment scroll after load, so undo it again then —
    // unless the reader has already started scrolling for themselves.
    toTop();

    let userScrolled = false;
    const markScrolled = () => (userScrolled = true);
    window.addEventListener("wheel", markScrolled, { passive: true, once: true });
    window.addEventListener("touchmove", markScrolled, { passive: true, once: true });
    window.addEventListener("keydown", markScrolled, { once: true });
    window.addEventListener("load", () => !userScrolled && toTop(), { once: true });

    tabLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
        event.preventDefault();

        const name = link.dataset.tabLink;
        const target = `#${name}`;

        if (location.hash !== target && window.history && window.history.pushState) {
          window.history.pushState(null, "", target);
        } else if (location.hash !== target) {
          location.hash = target;
        }

        if (name !== current) showTab(name);
        toTop();
      });
    });

    const sync = () => {
      const next = tabFromHash();
      if (next === current) return;
      showTab(next);
      toTop();
    };

    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
  }

  /* ---------- Mirror the publication list onto the home tab ---------- */

  // The list lives once in the markup (inside the publications tab) so there is
  // only one copy to edit; home gets a clone with re-prefixed ids.
  document.querySelectorAll("[data-clone-of]").forEach((slot) => {
    const source = document.getElementById(slot.dataset.cloneOf);
    if (!source) return;

    const copy = source.cloneNode(true);
    const prefix = `${slot.id || "copy"}-`;

    copy.removeAttribute("id");
    copy.querySelectorAll("[id]").forEach((node) => {
      node.id = prefix + node.id;
    });
    copy.querySelectorAll("[aria-controls]").forEach((node) => {
      node.setAttribute("aria-controls", prefix + node.getAttribute("aria-controls"));
    });

    slot.appendChild(copy);
  });

  /* ---------- Publication abstracts ---------- */

  document.querySelectorAll(".pub-toggle").forEach((button) => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    if (!panel) return;

    button.addEventListener("click", () => {
      const open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!open));
      panel.hidden = open;
    });
  });

  /* ---------- Inline authoring (hidden bottom-left affordance) ---------- */

  const hotzone = document.getElementById("editHotzone");
  const editToggle = document.getElementById("editToggle");
  const editExport = document.getElementById("editExport");
  const editStatus = document.getElementById("editStatus");

  const EDITABLE = "[data-edit-id]";
  const version = root.getAttribute("data-edit-version") || "v1";
  const key = `homepage-edits:${location.pathname}::${version}`;

  const nodes = () => Array.from(document.querySelectorAll(EDITABLE));

  function readStore() {
    try {
      const raw = localStorage.getItem(key);
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
      clone.querySelectorAll("[contenteditable]").forEach((node) => node.setAttribute("contenteditable", "false"));
      clone.querySelectorAll("[data-tab]").forEach((node) => node.removeAttribute("hidden"));

      const status = clone.querySelector("#editStatus");
      if (status) status.textContent = "";

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
