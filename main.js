let water = 0;
let target = localStorage.getItem("target") || 3000;

function updateUI() {
  const percent = Math.min(Math.round((water / target) * 100), 100);
  document.getElementById("progress").textContent = `${percent}%`;
  document.getElementById("volume").textContent = `${water} мл із ${target} мл`;
  document.getElementById("target").value = target;

  const wave = document.getElementById("wave");
  const height = 100 - percent;
  wave.style.transform = `translateY(${height}%)`;
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

function resetWater() {
  const confirmReset = confirm("Ти точно хочеш скинути воду?");
  if (confirmReset) {
    water = 0;
    localStorage.setItem("water", 0);
    updateUI();
  }
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
