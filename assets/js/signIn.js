// --- sign-in DOM Elements ---

const emailError = document.getElementById("email_error");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordError = document.getElementById("password_error");
const signIn_btn = document.getElementById("signIn_btn");

// validate email address
function emailInputValidation(emailInput, emailError) {
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
function passwordInputValidation(passwordInput, passwordError) {
  let isValid = true;
  let regexTask = /^.{6,}$/;
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

// addEventListener to signIn dom Element
emailInput?.addEventListener("input", function () {
  emailInputValidation(emailInput, emailError);
});
passwordInput?.addEventListener("input", function () {
  passwordInputValidation(passwordInput, passwordError);
});

signIn_btn?.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    !emailInputValidation(emailInput, emailError) ||
    !passwordInputValidation(passwordInput, passwordError)
  )
    return;

  const userData = localStorage.getItem("user_" + emailInput.value);

  if (!userData) {
    alert("the username does not exist.");
    return;
  }

  const user = JSON.parse(userData);
  if (password && user.password !== passwordInput.value) {
    alert("password is incorrect.");
    return;
  }
  console.log("log in");
});

export { emailInputValidation, passwordInputValidation };
