# Custom HTML video player 🎞

## Abstract

學習HTML video API，並做出一個客製化的影片撥放器。

功能包含

- 播放/暫停
- 快進/快退
- 音量控制
- 速率控制

## 筆記

### Steps

1. 選取元素

2. 實作function

   - 點擊螢幕或按鈕，出現暫停/播放效果

   - 快進功能

   - 音量控制、速率控制

   - 進度bar拉放效果

3. 元素新增 event listener 連結 function

### HTML

```html
<video class="player__video viewer" src="652333414.mp4"></video>
<!-- attributes
- autoplay: 載入自動播放
- controls: 出現瀏覽器預設的播放器
- loop: 是否重複播放
- muted: 播放時預設靜音
- src: 影片連結
- height: 設定高度（不能設定百分比）
- width: 設定寬度（不能設定百分比）
- 等等...
-->
```

> [MDN - HTML & video](https://developer.mozilla.org/zh-TW/docs/Learn/HTML/Multimedia_and_embedding/Video_and_audio_content)

### JavaScript

#### HTML video element

video element 提供一些屬性，可以使用JS操作。

```javascript
const video = document.querySelector('video');

// 屬性（property）
video.paused; // 影片是否為暫停狀態，ReadOnly
video.muted;
video.volume; // from 0 to 1
video.playbackRate; // 播放速度，預設是 1.0
video.currentTime; // 可以取得和設定影片播放到的時間
video.duration; // 取得影片的時間

// 方法（method）
video.play();
video.pause();

// 事件（event），其他事件可直接用 console.dir(video) 查看
play;
pause;
timeupdate; // 當 video.currentTime 改變時會觸發
```

> [MDN - HTML Media Element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement)

#### 播放/暫停

點擊 video 視窗時可以播放或停止。使用 `video.play()` 和 `video.pause()` 來控制：

```javascript
// 播放或暫停影片
function togglePlay() {
  let playOrPause = video.paused ? 'play' : 'pause';
  video[playOrPause](); // video.play() || video.pause()
}

// 切換播放按鈕 icon
function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}
```

#### 快轉/倒退

使用 `video.currentTime` 來取得並設定當前影片播放到的時間點。

```javascript
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach((button) => button.addEventListener('click', skip));
```

#### 調整音量/速度

 `video.volume` 和 `video.playbackRate` 來控制播放的音量（0~1）和播放速度（預設是 1.0）：

```javascript
function handleRangeUpdate() {
  video[this.name] = this.value;
}

ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate));
```

#### 進度條

`video.duration` 取得影片的時間長度，然後用 `(video.currentTime/video.duration)` 計算目前影片播放了多少百分比，

再利用`progressBar.style.flexBasis`改變進度條長度。

```javascript
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// 當 video.currentTime 改變時會觸發 timeupdate
video.addEventListener('timeupdate', handleProgress);
```

當我們要透過點擊進度條來改變播放時間時，要計算使用者點擊進度條位置的長度（`e.offsetX`）和總長度（`progress.offsetWidth`）的百分比，得到百分比後，再給回 `video.currentTime`：

```javascript
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => (mouseDown = true));
progress.addEventListener('mouseup', () => (mouseDown = false));
```







 
