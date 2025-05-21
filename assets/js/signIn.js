const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("email_error");
const passwordError = document.getElementById("password_error");

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

emailInput.addEventListener("input", emailInputValidation);
passwordInput.addEventListener("input", passwordInputValidation);
