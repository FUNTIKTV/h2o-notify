let current = 0;
let goal = 3000;

function updateUI() {
  const percent = Math.min((current / goal) * 100, 100);
  document.getElementById("percent").textContent = `${Math.floor(percent)}%`;
  document.getElementById("litres").textContent = `${current} мл із ${goal} мл`;
  updateWave(percent);
}

function addWater(amount) {
  current += amount;
  if (current > goal) current = goal;
  updateUI();
}

function setGoal() {
  const value = parseInt(document.getElementById("goal").value);
  if (!isNaN(value) && value > 0) {
    goal = value;
    if (current > goal) current = goal;
    updateUI();
  }
}

function confirmReset() {
  if (confirm("Точно скинути воду?")) {
    current = 0;
    updateUI();
  }
}

// Оновлення хвилі
function updateWave(percent) {
  const waveHeight = 10;
  const waveCount = 2;
  const width = 400;
  const height = 200;
  const waterLevel = height - (percent / 100) * height;

  let path = `M 0 ${waterLevel}`;
  for (let x = 0; x <= width; x++) {
    const y = waveHeight * Math.sin((x / width) * waveCount * 2 * Math.PI);
    path += ` L ${x} ${waterLevel + y}`;
  }
  path += ` L ${width} ${height} L 0 ${height} Z`;

  document.getElementById("wave").setAttribute("d", path);
}

// Бульбашки
function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.left = Math.random() * 180 + 10 + "px";
  bubble.style.width = bubble.style.height = Math.random() * 8 + 4 + "px";
  bubble.style.animationDuration = 2 + Math.random() * 3 + "s";

  document.getElementById("bubbles-container").appendChild(bubble);

  setTimeout(() => {
    bubble.remove();
  }, 4000);
}

setInterval(createBubble, 1000);

updateUI();
