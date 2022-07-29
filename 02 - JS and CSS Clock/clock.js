/*
1. When the Vue instance is mounted, the setDate method is called at intervals of 1 second (1000ms).
2. Inside the setDate function, the calculations for each hand is computed and set in the appropriate data field.
3. Changes to the secondsDegrees, minsDegrees, and hourDegrees data fields activate Vue’s reactivity system to trigger calling the transformHandStyle method which sets the clock hand style.
4. The transformHandStyle method returns the css transform that rotates the clock hand.
*/
const app = Vue.createApp({
  data() {
    return { secondsDegrees: 0, minsDegrees: 0, hourDegrees: 0 };
  },
  methods: {
    setDate() {
      const now = new Date();
      const seconds = now.getSeconds();
      this.secondsDegrees = (seconds / 60) * 360 + 90;

      const mins = now.getMinutes();
      this.minsDegrees = (mins / 60) * 360 + (seconds / 60) * 6 + 90;

      const hour = now.getHours();
      this.hourDegrees = (hour / 12) * 360 + (mins / 60) * 30 + 90;
    },

    transformHandStyle(degrees) {
      // return { transform: 'rotate(' + degrees + 'deg)' };
      return { transform: `rotate(${degrees}deg)` };
    },
  },
  mounted() {
    setInterval(this.setDate, 1000);
  },
});

app.mount('#app');
