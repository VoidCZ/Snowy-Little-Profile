// Persist the selected color theme across all pages.
const themeSelect = document.getElementById("themeSelect");
const allowedThemes = ["default", "violet", "forest", "ember", "light"];

function applyTheme(theme) {
  const safeTheme = allowedThemes.includes(theme) ? theme : "default";
  if (safeTheme === "default") {
    document.body.removeAttribute("data-theme");
  } else {
    document.body.dataset.theme = safeTheme;
  }
  if (themeSelect) themeSelect.value = safeTheme;
}

const savedTheme = localStorage.getItem("profile-site-theme") || "default";
applyTheme(savedTheme);

if (themeSelect) {
  themeSelect.addEventListener("change", () => {
    applyTheme(themeSelect.value);
    localStorage.setItem("profile-site-theme", themeSelect.value);
  });
}

// Highlight the sidebar link for the section currently in view.
const sidebarLinks = [...document.querySelectorAll(".sidebar a[href^='#']")];
const sections = sidebarLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      sidebarLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
  sections.forEach(section => observer.observe(section));
}
