function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  document.getElementById("btn-light").setAttribute("aria-pressed", t === "light" ? "true" : "false");
  document.getElementById("btn-dark").setAttribute("aria-pressed", t === "dark" ? "true" : "false");
  try { localStorage.setItem("theme", t); } catch(e) {}
}

document.getElementById("btn-light").addEventListener("click", function() { setTheme("light"); });
document.getElementById("btn-dark").addEventListener("click", function() { setTheme("dark"); });

(function() {
  var saved = null;
  try { saved = localStorage.getItem("theme"); } catch(e) {}
  if (saved) { setTheme(saved); }
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) { setTheme("dark"); }
  else { setTheme("light"); }
})();
