let current = 0;
let goal = 3000;

function updateUI() {
  const percent = Math.min(100, Math.round((current / goal) * 100));
  document.getElementById("percentage").innerText = `${percent}%`;
  document.getElementById("volume-text").innerText = `${current} мл із ${goal} мл`;

  const wave = document.querySelector(".wave");
  wave.style.height = `${percent}%`;
}

function addWater(amount) {
  current += amount;
  if (current > goal) current = goal;
  updateUI();
}

function setGoal() {
  const newGoal = parseInt(document.getElementById("goalInput").value);
  if (!isNaN(newGoal) && newGoal > 0) {
    goal = newGoal;
    if (current > goal) current = goal;
    updateUI();
  }
}

function confirmReset() {
  const sure = confirm("Ти точно хочеш скинути воду?");
  if (sure) {
    current = 0;
    updateUI();
  }
}

updateUI();
