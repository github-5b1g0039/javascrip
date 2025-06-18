const quotes = [
    "成功是努力的累積，不是偶然的運氣。",
    "失敗乃成功之母，別害怕跌倒。",
    "持續學習，是通往專業的唯一途徑。",
    "每一次挑戰，都是成長的機會。",
    "你的努力，終將被時間證明。"
  ];
  
  function showRandomQuote() {
    const quoteBox = document.getElementById("quoteBox");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteBox.textContent = quotes[randomIndex];
  }
  
  // 顯示首頁內容（名言 + 按鈕，移除iframe）
  function showHome() {
    const mainFrame = document.getElementById("mainFrame");
    mainFrame.innerHTML = `
      <div id="quoteBox" class="quote-box"></div>
      <button id="quoteBtn" class="quote-btn">換一句鼓勵話</button>
    `;
    document.getElementById("quoteBtn").addEventListener("click", showRandomQuote);
    showRandomQuote();
  }
  
  // 動態載入 iframe，並清除首頁內容
  function loadPage(url) {
    const mainFrame = document.getElementById("mainFrame");
    mainFrame.innerHTML = `<iframe src="${url}" style="width:100%;height:500px;border:none;"></iframe>`;
  }
  
  function toggleNightMode() {
    document.body.classList.toggle("night-mode");
    updateModeIcon();
  }
  
  function updateModeIcon() {
    const icon = document.getElementById("modeIcon");
    if (document.body.classList.contains("night-mode")) {
      icon.src = "img/sun.png";
      icon.alt = "日間模式";
    } else {
      icon.src = "img/moon.png";
      icon.alt = "夜晚模式";
    }
  }
  
  // 預設載入首頁內容
  window.onload = function () {
    updateModeIcon();
    showHome();
  };
  