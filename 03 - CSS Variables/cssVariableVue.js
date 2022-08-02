const app = Vue.createApp({
  data() {
    return {
      spacing: 0,
      blur: 0,
      base: '#17c964',
    };
  },

  methods: {},

  computed: {
    spanStyle() {
      return { color: this.base };
    },

    imgStyle() {
      return {
        padding: `${this.spacing}px`,
        background: this.base,
        filter: `blur(${this.blur}px)`,
      };
    },
  },
});
app.mount('#vueApp');
