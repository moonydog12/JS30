const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Functions
// Show error message while field doesn't pass the validation
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList.add('error');
  const span = formControl.querySelector('span');
  span.textContent = message;
};

// Show success outline while field pass the validation
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.classList.remove('error');
  formControl.classList.add('success');
};

// Check email is valid or not
const checkEmail = (input) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
};

// Check required fields
const getFieldName = (input) => input.id.charAt(0).toUpperCase() + input.id.slice(1);

const checkRequired = (inputs) => {
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
};

// Check two password fields are matched
const checkPasswordMath = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Password do not match');
  }
};

// Event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkPasswordMath(password, password2);
  checkEmail(email);
});
