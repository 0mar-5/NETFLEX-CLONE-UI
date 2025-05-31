import { emailInputValidation, passwordInputValidation } from "./signIn.js";

// --- sign-in DOM Elements ---
const userNameInput = document.getElementById("user_Name");
const userNameError = document.getElementById("userName_error");

const signUpEmailInput = document.getElementById("signUp-email");
const signUpEmailError = document.getElementById("signUpEmail_error");

const signUpPasswordInput = document.getElementById("signUpPassword");
const signUpPasswordError = document.getElementById("signUpPassword_error");

const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordError = document.getElementById("confirmPassword_error");

const signUpBtn = document.getElementById("signUp");

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

// validate confirm password
function confirmPasswordInputValidation() {
  let isValid = true;

  confirmPasswordError.classList.remove("show");

  if (signUpPasswordInput.value !== confirmPassword.value) {
    confirmPassword.classList.add("input-error");
    confirmPasswordError.classList.add("show");

    isValid = false;
  } else {
    confirmPassword.classList.remove("input-error");
    confirmPasswordError.classList.remove("show");
  }

  return isValid;
}

// addEventListener to signUp dom Element
userNameInput.addEventListener("input", userNameInputValidation);

signUpEmailInput.addEventListener("input", function () {
  emailInputValidation(signUpEmailInput, signUpEmailError);
});

signUpPasswordInput.addEventListener("input", function () {
  passwordInputValidation(signUpPasswordInput, signUpPasswordError);
});

confirmPassword.addEventListener("input", confirmPasswordInputValidation);

let users = {};
signUpBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    !userNameInputValidation() ||
    !emailInputValidation(signUpEmailInput, signUpEmailError) ||
    !passwordInputValidation(signUpPasswordInput, signUpPasswordError) ||
    !confirmPasswordInputValidation()
  )
    return;

  let usersInfo = {
    id: `id_${Date.now()}`,
    name: userNameInput.value,
    email: signUpEmailInput.value,
    password: signUpPasswordInput.value,
    isLoggedIn: false,
    userComments: {},
  };
  console.log("work", usersInfo);
  // users[`user_${usersInfo.email}`] = usersInfo;
  users = usersInfo;
  setToLocalStorage(`user_${usersInfo.email}`, users);
  console.log(users);

  // clear input values
  userNameInput.value = "";
  signUpEmailInput.value = "";
  signUpPasswordInput.value = "";
  confirmPassword.value = "";

  // redirect to sign in page
  window.location.href = "signIn.html";
});

// add usersInfo to local storge
function setToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
