const r = () => {
  const n = document.querySelectorAll(".admin-planning-day label");
  if (n.length === 0)
    return;
  const e = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  Array.from(n).filter((t) => t.textContent === "Jour").forEach((t, o) => {
    t.textContent = e[o];
  });
};
r();
const l = () => {
  const n = document.querySelectorAll(".admin-planning-color .acf-button-group label");
  n.length !== 0 && n.forEach((e) => {
    e.style.backgroundColor = e.textContent, e.style.color = e.textContent, e.style.border = "none";
  });
};
l();
