
let currentAmount = parseInt(localStorage.getItem("currentAmount")) || 0;
let goal = parseInt(localStorage.getItem("goal")) || 3000;
let lastResetDate = localStorage.getItem("lastResetDate");

const percentageText = document.getElementById("percentage");
const amountText = document.getElementById("amountText");
const wavePath = document.getElementById("wave");
const goalInput = document.getElementById("goal");

goalInput.value = goal;

function updateUI() {
  const percent = Math.min((currentAmount / goal) * 100, 100);
  percentageText.textContent = `${Math.round(percent)}%`;
  amountText.textContent = `${currentAmount} мл із ${goal} мл`;

  const waveHeight = 200 - (percent * 2);
  const waveCurve = 12;
  wavePath.setAttribute(
    "d",
    `M0,${waveHeight} Q50,${waveHeight - waveCurve} 100,${waveHeight} T200,${waveHeight} V200 H0 Z`
  );

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
    localStorage.setItem("lastResetDate", getTodayDate());
  }
}

function createBubble() {
  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const size = Math.random() * 8 + 4;
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";
  bubble.style.left = Math.random() * 100 + "%";
  bubble.style.animationDuration = (Math.random() * 2 + 3) + "s";

  document.getElementById("bubbles").appendChild(bubble);
  setTimeout(() => bubble.remove(), 5000);
}

// Повертає дату в форматі YYYY-MM-DD
function getTodayDate() {
  const now = new Date();
  return now.toISOString().split("T")[0];
}

// Автоматичне скидання води о 3:00
function checkAutoReset() {
  const now = new Date();
  const hours = now.getHours();

  const today = getTodayDate();

  if (hours >= 3 && lastResetDate !== today) {
    currentAmount = 0;
    localStorage.setItem("lastResetDate", today);
    updateUI();
  }
}

// Telegram WebApp підтримка (опціонально, якщо є WebApp init data)
if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
  Telegram.WebApp.expand();
}

setInterval(createBubble, 600);
checkAutoReset();
updateUI();
