document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("game-container");
  const playButton = document.getElementById("play-button");
  const levelSelect = document.getElementById("level-select");

  const colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "cyan",
    "magenta",
    "lime",
    "teal",
    "indigo",
    "violet",
    "gold",
    "silver",
    "maroon",
    "navy",
    "olive",
    "coral",
  ];
  const tubes = [];
  let selectedTube = null;
  let levelCount = 1;

  function chooseLevel(level) {
    levelCount = level;
    document.getElementById("level-count").textContent = levelCount;
  }

  levelSelect.addEventListener("change", (event) => {
    const selectedLevel = parseInt(event.target.value, 10);
    chooseLevel(selectedLevel);
  });

  function checkGameState() {
    const allSameColor = (tube) => {
      const waters = Array.from(tube.children);
      return (
        waters.length === 4 &&
        waters.every(
          (water) =>
            water.style.backgroundColor === waters[0].style.backgroundColor
        )
      );
    };

    let completedTubes = 0;
    tubes.forEach((tube) => {
      if (allSameColor(tube)) {
        completedTubes++;
      }
    });
    document.getElementById("completed-tubes-count").textContent =
      completedTubes;

    //檢查是否所有的試管都完成或者是空試管
    if (
      tubes.every((tube) => tube.childElementCount === 0 || allSameColor(tube))
    ) {
      if (levelCount === 10) {
        alert("恭喜!你已經完成所有挑戰!ヾ(≧▽≦*)o");
      } else {
        alert("你已經完成本關卡!( •̀ ω •́ )✧");
        levelCount++;
        document.getElementById("level-count").textContent = levelCount;
        document.getElementById("completed-tubes-count").textContent = 0;
        chooseLevel(levelCount);
        createTubes();
        fillTubes();
      }
    }
  }

  function pourWater(fromTube, toTube) {
    let fromWater = fromTube.querySelector(".water:last-child");
    let toWater = toTube.querySelector(".water:last-child");

    if (!toWater) {
      const color = fromWater ? fromWater.style.backgroundColor : null;
      while (
        fromWater &&
        fromWater.style.backgroundColor === color &&
        toTube.childElementCount < 4
      ) {
        toTube.appendChild(fromWater);
        fromWater = fromTube.querySelector(".water:last-child");
      }
    } else {
      while (
        fromWater &&
        fromWater.style.backgroundColor === toWater.style.backgroundColor &&
        toTube.childElementCount < 4
      ) {
        toTube.appendChild(fromWater);
        fromWater = fromTube.querySelector(".water:last-child");
        toWater = toTube.querySelector(".water:last-child");
      }
    }
    checkGameState();
  }

  function selectTube(tube) {
    if (selectedTube) {
      if (selectedTube !== tube) {
        pourWater(selectedTube, tube);
      }
      selectedTube.classList.remove("selected");
      selectedTube = null;
    } else {
      selectedTube = tube;
      tube.classList.add("selected");
    }
  }

  function createTubes() {
    gameContainer.innerHTML = "";
    tubes.length = 0;

    for (let i = 0; i < levelCount + 1; i++) {
      const tube = document.createElement("div");
      tube.classList.add("tube");
      tube.addEventListener("click", () => selectTube(tube));
      gameContainer.appendChild(tube);
      tubes.push(tube);
    }

    //新增兩管空的試管來當作緩衝使用
    for (let i = 0; i < 2; i++) {
      const emptyTube = document.createElement("div");
      emptyTube.classList.add("tube");
      emptyTube.addEventListener("click", () => selectTube(emptyTube));
      gameContainer.appendChild(emptyTube);
      tubes.push(emptyTube);
    }
  }

  function fillTubes() {
    // 填滿試管顏色
    const gameColors = colors.slice(0, Math.min(levelCount + 1, colors.length));
    const waterBlocks = [];

    // 對於每一種顏色，產生4個block
    gameColors.forEach((color) => {
      for (let i = 0; i < 4; i++) {
        waterBlocks.push(color);
      }
    });

    //將顏色打亂
    waterBlocks.sort(() => 0.5 - Math.random());

    //將waterBlock分散在不同的試管內
    let blockIndex = 0;
    tubes.slice(0, levelCount + 1).forEach((tube) => {
      for (let i = 0; i < 4; i++) {
        if (blockIndex < waterBlocks.length) {
          const water = document.createElement("div");
          water.classList.add("water");
          water.style.backgroundColor = waterBlocks[blockIndex];
          water.style.height = "20%";
          tube.appendChild(water);
          blockIndex++;
        }
      }
    });
  }

  playButton.addEventListener("click", () => {
    tubes.length = 0;
    createTubes();
    fillTubes();
  });
});