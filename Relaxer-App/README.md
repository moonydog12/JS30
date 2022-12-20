# Relaxer App

![Relax cat](../assets/image/relax-cat.webp)

A relaxing breathing app with a visual director to tell you when to breathe in, hold and breathe out

## Project Specifications

- Create circle and gradient circle with CSS
- Create and animate pointer (Small circle)
- Create grow and shrink animations
- Add JavaScript to create the breath animation effect

## Note

**gradient circle**

The `conci-gradient` function creates an image consisting of a gradient with color transitions rotated around a center point.

```css
.gradient-circle {
  background: conic-gradient(#55b7a5 0%, #4ca493, #fff 40%, #fff 60%, #336d62 60%, #2a5b52 100%);

  /* Other properties which made it a circle */
}
```

**Animated pointer**

```css
.pointer-container {
  animation: rotate 7.5s linear forwards infinite;
  transform-origin: bottom center;
  /* Other properties */
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
```

**Grow/Shrink**

Using JavaScript to add/remove the `grow` or `shrink` class dynamically, the corresponding `keyframes` animation effect will be triggered

```css
.container.grow {
  animation: grow 3s linear forwards;
}

@keyframes grow {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}

.container.shrink {
  animation: shrink 3s linear forwards;
}

@keyframes shrink {
  from {
    transform: scale(1.2);
  }
  to {
    transform: scale(1);
  }
}
```

**Use JS to create the animation**

```js
/**
 * The initial timer must matched the animation timer defined in CSS animation, otherwise the animation will be inconsistent
 */
const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const breathAnimation = () => {
  // Also could be written using className property:
  // container.className = 'container grow';
  container.classList.remove('shrink');
  container.classList.add('grow');
  text.innerText = 'Breath In! 🫁';

  // Set timer respectively
  setTimeout(() => {
    text.innerText = 'Hold 🤛🏼';
    setTimeout(() => {
      text.innerText = 'Breath out! 🫁';
      container.classList.remove('grow');
      container.classList.add('shrink');
    }, holdTime);
  }, breatheTime);
};

breathAnimation();

setInterval(breathAnimation, totalTime);
```

## Summary

**🗝️Key points**

- setTimeout()、setInterval() methods
- CSS keyframe animation

**💡Reference :**

> [MDN - conic-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient)
>
> [MDN - setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout)
>
> [MDN - setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval)
