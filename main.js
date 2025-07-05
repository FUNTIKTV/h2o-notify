let currentAmount = parseInt(localStorage.getItem("currentAmount")) || 0;
let goal = parseInt(localStorage.getItem("goal")) || 3000;

const percentageText = document.getElementById("percentage");
const amountText = document.getElementById("amountText");
const wavePath = document.getElementById("wave");
const goalInput = document.getElementById("goal");

goalInput.value = goal;

function updateUI() {
  const percent = Math.min((currentAmount / goal) * 100, 100);
  percentageText.textContent = `${Math.round(percent)}%`;
  amountText.textContent = `${currentAmount} мл із ${goal} мл`;

  const waveHeight = 200 - (percent * 2); // 200 — SVG height
  const waveCurve = 20;

  // Проста хвиля
  wavePath.setAttribute(
    "d",
    `M0,${waveHeight} Q50,${waveHeight - waveCurve} 100,${waveHeight} T200,${waveHeight} V200 H0 Z`
  );

  // Зберігаємо стан
  localStorage.setItem("currentAmount", currentAmount);
  localStorage.setItem("goal", goal);
}

function addWater(amount) {
  currentAmount += amount;
  updateUI();
}

function saveGoal() {
  const newGoal = parseInt(goalInput.value);
  if (!isNaN(newGoal) && newGoal > 0) {
    goal = newGoal;
    if (currentAmount > goal) currentAmount = goal;
    updateUI();
  }
}

function resetWater() {
  if (confirm("Скинути прогрес води?")) {
    currentAmount = 0;
    updateUI();
  }
}

updateUI();
