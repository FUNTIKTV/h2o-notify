let water = 0;
let target = localStorage.getItem("target") || 3000;

function updateUI() {
  let start = parseInt(document.getElementById("progress").textContent) || 0;
  const end = Math.round((water / target) * 100);
  const step = end > start ? 1 : -1;

  let current = start;
  const interval = setInterval(() => {
    current += step;
    document.getElementById("progress").textContent = `${current}%`;
    if (current === end) clearInterval(interval);
  }, 10); // швидкість анімації

  document.getElementById("volume").textContent = `${water} мл із ${target} мл`;
  document.getElementById("target").value = target;
}


function addWater(amount) {
  water += amount;
  if (water > target) water = target;
  localStorage.setItem("water", water);
  updateUI();
}

function updateTarget() {
  target = document.getElementById("target").value;
  localStorage.setItem("target", target);
  updateUI();
}

function autoResetIfNewDay() {
  const lastDate = localStorage.getItem("lastDate");
  const today = new Date().toDateString();
  if (lastDate !== today) {
    water = 0;
    localStorage.setItem("water", 0);
    localStorage.setItem("lastDate", today);
  } else {
    water = parseInt(localStorage.getItem("water") || "0");
  }
}

window.onload = () => {
  autoResetIfNewDay();
  updateUI();
};
