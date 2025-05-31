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

// sign in logic
signIn_btn?.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    !emailInputValidation(emailInput, emailError) ||
    !passwordInputValidation(passwordInput, passwordError)
  )
    return;

  const savedUsers = localStorage.getItem("user_" + emailInput.value);
  const user = savedUsers ? JSON.parse(savedUsers) : {};

  console.log(savedUsers);

  // Find the user by email
  // let user = users["user_" + emailInput.value];
  console.log(user);

  if (!user) {
    alert("the Email does not exist.");
    return;
  }

  if (user.password !== passwordInput.value) {
    alert("password is incorrect.");
    return;
  } else {
    user.isLoggedIn = true;
    console.log(user);
  }

  localStorage.setItem("user_" + emailInput.value, JSON.stringify(user));

  const url = `home.html?userName=${encodeURIComponent(
    user.name
  )}&email=${encodeURIComponent(user.email)}&isLoggedIn=${user.isLoggedIn}`;
  window.location.href = url;
  console.log("log in");
});

export { emailInputValidation, passwordInputValidation };
