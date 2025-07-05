let current = 0;
let goal = 3000;

function updateUI() {
  const percent = Math.min((current / goal) * 100, 100);
  document.getElementById('percent').textContent = `${Math.floor(percent)}%`;
  document.getElementById('litres').textContent = `${current} мл із ${goal} мл`;
  updateWave(percent);
}

function addWater(amount) {
  current += amount;
  updateUI();
}

function setGoal() {
  const value = parseInt(document.getElementById('goal').value);
  if (!isNaN(value) && value > 0) {
    goal = value;
    current = 0;
    updateUI();
  }
}

function confirmReset() {
  if (confirm("Точно скинути воду?")) {
    current = 0;
    updateUI();
  }
}

// Створення хвилі
function updateWave(percent) {
  const height = 200 - (percent / 100) * 200;
  const waveHeight = 10;
  const path = `
    M 0 ${height}
    C 50 ${height - waveHeight}, 150 ${height + waveHeight}, 200 ${height}
    L 200 200
    L 0 200
    Z
  `;
  document.getElementById('wave').setAttribute('d', path);
}

updateUI();
