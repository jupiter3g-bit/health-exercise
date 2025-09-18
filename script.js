const images = [
  "img/img1.jpg","img/img2.jpg","img/img3.jpg","img/img4.jpg",
  "img/img5.jpg","img/img6.jpg","img/img7.jpg","img/img8.jpg"
];

const mainImage = document.getElementById("mainImage");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const endBtn = document.getElementById("endBtn");
const slider = document.getElementById("intervalSlider");
const intervalValue = document.getElementById("intervalValue");

let timer = null;
let interval = parseInt(slider.value) * 1000; // 初期値1秒

// スライダーの値を反映
slider.addEventListener("input", () => {
  interval = parseInt(slider.value) * 1000;
  intervalValue.textContent = slider.value + "秒";
  if (timer) {
    clearInterval(timer);
    timer = setInterval(showRandom, interval);
  }
});

// ランダム表示
function showRandom() {
  let i = Math.floor(Math.random() * images.length);
  mainImage.src = images[i];

  let audio = document.getElementById("se" + i);
  if (audio) {
    audio.currentTime = 0; // 頭から再生
    audio.play().catch(err => console.log("再生エラー:", err));
  }
}

// スタート
function startShow() {
  if (timer) return;
  showRandom(); // 最初の1回
  timer = setInterval(showRandom, interval);
}

// ストップ
function stopShow() {
  clearInterval(timer);
  timer = null;
}

// 終了
function endShow() {
  stopShow();
  mainImage.src = "img/standby.png";
  alert("お疲れさまでした (_´Д｀)ﾉ~~ｵﾂｶﾚｰ");
}

// ボタンイベント
startBtn.addEventListener("click", startShow);
stopBtn.addEventListener("click", stopShow);
endBtn.addEventListener("click", endShow);
