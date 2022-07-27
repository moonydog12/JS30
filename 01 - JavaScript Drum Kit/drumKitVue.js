const drumKitApp = Vue.createApp({
  data() {
    return {
      keys: [
        {
          keyCode: 65,
          keyName: 'A',
          soundName: 'clap',
          audio: new Audio('sounds/clap.wav'),
          isPlaying: false,
        },
        {
          keyCode: 83,
          keyName: 'S',
          soundName: 'hihat',
          audio: new Audio('sounds/hihat.wav'),
          isPlaying: false,
        },
        {
          keyCode: 68,
          keyName: 'D',
          soundName: 'kick',
          audio: new Audio('sounds/kick.wav'),
          isPlaying: false,
        },
        {
          keyCode: 70,
          keyName: 'F',
          soundName: 'openhat',
          audio: new Audio('sounds/openhat.wav'),
          isPlaying: false,
        },
        {
          keyCode: 71,
          keyName: 'G',
          soundName: 'boom',
          audio: new Audio('sounds/boom.wav'),
          isPlaying: false,
        },
        {
          keyCode: 72,
          keyName: 'H',
          soundName: 'ride',
          audio: new Audio('sounds/ride.wav'),
          isPlaying: false,
        },
        {
          keyCode: 74,
          keyName: 'J',
          soundName: 'snare',
          audio: new Audio('sounds/snare.wav'),
          isPlaying: false,
        },
        {
          keyCode: 75,
          keyName: 'K',
          soundName: 'tom',
          audio: new Audio('sounds/tom.wav'),
          isPlaying: false,
        },
        {
          keyCode: 76,
          keyName: 'L',
          soundName: 'tink',
          audio: new Audio('sounds/tink.wav'),
          isPlaying: false,
        },
      ],
    };
  },
  methods: {
    removeTransition: function (e, key) {
      if (e.propertyName !== 'transform') return;
      key.isPlaying = false;
    },

    playSound: function (e) {
      const key = this.keys.find((key) => key.keyCode === e.keyCode);
      if (!key) return;
      key.audio.currentTime = 0;
      key.isPlaying = true;
      key.audio.play();
    },
  },

  mounted: function () {
    window.addEventListener('keydown', this.playSound);
  },
});

drumKitApp.mount('#drumKitApp');
