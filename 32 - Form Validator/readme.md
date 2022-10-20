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

## Note

### JavaScrip

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

The formula of email validation could be found [here][email] .

**Verify required fields :**

```js
// Get input's id name and manipulate it(string)
const getFieldName = (input) => input.id.charAt(0).toUpperCase() + input.id.slice(1);

const checkRequired = (inputs) => {
  // iterate through inputs array
  inputs.forEach((input) => {
    // if input value were empty, show warning
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      // else show success
      showSuccess(input);
    }
  });
};
```

**Verify input length :**

```js
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
};
```

The function took three parameters, `min` and `max` defined the minimum and maximum length of the `input` parameter.

**Verify two password fields are matched**

```js
const checkPasswordMath = (input1, input2) => {
  if (input1.value !== input2.value) {
    // ...
  }
};
```

**Hook the events :**

```js
form.addEventListener('submit', (e) => {
  // stop form element default behavior
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, max, min);
  checkLength(password, max, min);
  checkPasswordMath(password, password2);
  checkEmail(email);
});
```

### CSS

**:root**

```css
:root {
  --success: #2ecc71;
  --error: #e74c3c;
}

.form-control.success input {
  border-color: var(--success);
}

.form-control.error input {
  border-color: var(--error);
}
```

The `:root` CSS pseudo-class matches the root element of a tree representing the document. And we could store variables in it.

**display & visibility**

```css
.form-control span {
  color: var(--error);
  position: absolute;
  bottom: 0;
  left: 0;
  /* make elements invisible */
  visibility: hidden;
  /* display: none; */
}
```

`display: none` remove the element from the document flow. and it will collapse other elements around it. If you just want element to disappear rather than remove it , use `visibility`.

## Summary

- Use regular expression to verify string.
- Manipulate string use `charAt()` & `slice()` method.
- Some useful CSS tips (variables and display)

Reference :

> [MDN - :root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root)
>
> [MDN - String.prototype.slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)

[email]: (https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript)
