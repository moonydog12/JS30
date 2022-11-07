# Menu Slider & Modal

## Abstract

Landing page with sliding menu and modal

## Project Specifications

- Create and style landing page
- Style side nav and modal
- Add functionality to make menu open/close on button click
- Add functionality to make modal open/close on button click

## Note

### CSS

Since this project is more CSS-heavy than JavaScript, the key learning points of it also focuses on CSS syntax.

**fixed position:**

Positioned relative to the viewport, it stays in the same place even if the page is scrolled.

The `top`, `right`, `bottom`, and `left` properties are used to position the element.

```css
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 15vw;
  height: 100vh;
  z-index: 2;
}
```

**Center element with absolute position & transform**

```css
.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  /* pull back the item with the half of its width and height. */
  transform: translate(-50%, -50%);
}
```

**CSS animation**

`@keyframes` controls the intermediate steps in a CSS animation sequence by defining styles for keyframes along the animation sequence.

```css
.modal {
  animation-name: modalOpen;
  /* define the duration of the animation */
  animation-duration: 1s;
}

@keyframes modalOpen {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
```

### JavaScript

**Hide modal on outside click :**
Use event delegate to listen the click event, when user click outside of the modal, trigger the listener and remove the `show-modal` class.

```js
window.addEventListener('click', (e) => {
  // if the event target is the modal container(outside modal)
  if (e.target === modal) {
    modal.classList.remove('show-modal');
  }
});
```

## Recap

- Use `fixed` property to build sticky-like navbar
- `@keyframes` gives more control over the intermediate steps of the animation sequence than transitions.

**References:**

> [MDN - keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)
>
> [MDN - position](https://developer.mozilla.org/en-US/docs/Web/CSS/position)
