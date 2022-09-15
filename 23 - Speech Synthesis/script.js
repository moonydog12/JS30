'use strict';
const msg = new SpeechSynthesisUtterance();
const synth = window.speechSynthesis;
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

synth.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach((option) => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
// stopButton.addEventListener('click', toggle.bind(null, false));
stopButton.addEventListener('click', () => toggle(false));

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    // 使用filter篩選出包含zh及en的語系
    .filter((voice) => voice.lang.includes('zh') || voice.lang.includes('en'))
    // 篩選後的array透過map把資料組成html
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    // 用join來合併且消除原本陣列的逗點
    .join('');
}

// 設定選擇的發音語系
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

// 播放切換
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) speechSynthesis.speak(msg);
}

// 設定速率跟音準
function setOption() {
  console.log(this.name);
  console.log(this.value);
  msg[this.name] = this.value;
  toggle();
}
