const emailInput = document.getElementById("email");
const emailError = document.getElementById("email_error");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password_error");

const userNameInput = document.getElementById("userName");
const userNameError = document.getElementById("userName_error");

const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.getElementById("confirmPassword_error");

// validate user name
function userNameInputValidation() {
  let isValid = true;
  let regexTask = /^.{4,}$/;
  userNameError.classList.remove("show");

  if (!regexTask.test(userNameInput.value)) {
    userNameInput.classList.add("input-error");
    userNameError.classList.add("show");

    isValid = false;
  } else {
    userNameInput.classList.remove("input-error");
    userNameError.classList.remove("show");
  }

  return isValid;
}

// validate email address
function emailInputValidation() {
  let isValid = true;
  let regexTask = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;

  emailError.classList.remove("show");

  if (!regexTask.test(emailInput.value)) {
    emailInput.classList.add("input-error");
    emailError.classList.add("show");

    isValid = false;
  } else {
    emailInput.classList.remove("input-error");
    emailError.classList.remove("show");
  }

  return isValid;
}
// validate password
function passwordInputValidation() {
  let isValid = true;
  let regexTask = /^.{8,}$/;
  passwordError.classList.remove("show");

  if (!regexTask.test(passwordInput.value)) {
    passwordInput.classList.add("input-error");
    passwordError.classList.add("show");

    isValid = false;
  } else {
    passwordInput.classList.remove("input-error");
    passwordError.classList.remove("show");
  }

  return isValid;
}

// validate confirm password
function confirmPasswordInputValidation() {
  let isValid = true;

  confirmPasswordError.classList.remove("show");

  if (passwordInput.value !== confirmPassword.value) {
    confirmPassword.classList.add("input-error");
    confirmPasswordError.classList.add("show");

    isValid = false;
  } else {
    confirmPassword.classList.remove("input-error");
    confirmPasswordError.classList.remove("show");
  }

  return isValid;
}

userNameInput.addEventListener("input", userNameInputValidation);
emailInput.addEventListener("input", emailInputValidation);
passwordInput.addEventListener("input", passwordInputValidation);
confirmPassword.addEventListener("input", confirmPasswordInputValidation);
