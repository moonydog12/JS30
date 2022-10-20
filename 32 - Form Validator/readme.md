# Form Validator

![image](../assets/image/form.jpg)

## Abstract

Use JavaScript to validate form elements and input fields at front-end.

## Steps

1. Select the related elements
2. Build supporting functions
   - Show warning message while fields aren't verified / Add CSS effects while they are verified
   - Verify email is valid or not
   - Verify required fields are filled
   - Verify input lengths
   - Verify two password are matched
3. Hook functions to event listeners

## Content

### Supporting functions

**Show warning message while fields aren't verified / Add CSS effects while they are verified :**

```js
const showError = (input, message) => {
  // ...
};

const showSuccess = (input) => {
  // ...
};
```

The function naming explained itself, and the codes aren't complicated. The function took input element as parameter and add CSS effects to it.

**Verify email :**

```js
const checkEmail = (input) => {
  // regular expression to validate email
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // according to the outcome, add styles to input element
  if (regex.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};
```

## Summary
