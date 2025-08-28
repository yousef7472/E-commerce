//        sign up form
let regForm = document.getElementById("reg");
let allInputs = document.querySelectorAll("#reg input");
let userName = document.querySelector("#name");
let userEmail = document.querySelector("#email");
let userPass = document.querySelector("#password");
let confirmPass = document.querySelector("#confirmPass");
let successMessage = document.getElementById("successMessage");
let regBtn = document.querySelector("#regBtn");

let errorEmail = document.querySelector(".errorEmail");
let errorUser = document.querySelector(".errorUser");
let errorPass = document.querySelector(".errorPass");
let errorConfirm = document.querySelector(".errorConfirm");
let allErrors = document.querySelectorAll(".error");
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.querySelector(".container");

//           Sign in Form
let signIn_form = document.querySelector("#signin_form");

//           panels
signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
// Validation patterns
const patterns = {
  username: /^[a-zA-Z][a-zA-Z0-9_]{5,20}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Error messages (for sign up form)
const errorMessages = {
  username:
    "Username must start with a letter, be 5-20 characters long, and contain only letters and numbers.",
  email: "Please enter a valid email address.",
  password:
    "Password must be at least 8 characters long and contain both uppercase and lowercase letters.",
  confirmPassword: "Passwords do not match.",
  required: "This field is required.",
};

// Track if form has been submitted
let formSubmitted = false;

// Show error message
function showError(errorElement, message) {
  errorElement.textContent = message;
  errorElement.classList.add("show");
}

// Clear error message
function clearError(errorElement) {
  errorElement.textContent = "";
  errorElement.classList.remove("show");
}

// Validate a specific field
function validateField(input, pattern, errorElement, errorMsg) {
  const value = input.value.trim();

  // Clear previous styling
  input.classList.remove("input-error", "input-success");

  // Only validate if form has been submitted or field has been touched
  if (!formSubmitted && value === "") {
    clearError(errorElement);
    return false;
  }

  // Check if empty
  if (value === "") {
    showError(errorElement, errorMessages.required);
    input.classList.add("input-error");
    return false;
  }

  // Check pattern
  if (!pattern.test(value)) {
    showError(errorElement, errorMsg);
    input.classList.add("input-error");
    return false;
  }

  // If valid
  clearError(errorElement);
  input.classList.add("input-success");
  return true;
}

// Validate password confirmation
function validatePasswordConfirmation() {
  const passwordValue = userPass.value.trim();
  const confirmValue = confirmPass.value.trim();

  // Clear previous styling
  confirmPass.classList.remove("input-error", "input-success");

  // Only validate if form has been submitted or field has been touched
  if (!formSubmitted && confirmValue === "") {
    clearError(errorConfirm);
    return false;
  }

  // Check if empty
  if (confirmValue === "") {
    showError(errorConfirm, errorMessages.required);
    confirmPass.classList.add("input-error");
    return false;
  }

  // Check if passwords match
  if (passwordValue !== confirmValue) {
    showError(errorConfirm, errorMessages.confirmPassword);
    confirmPass.classList.add("input-error");
    return false;
  }

  // If valid
  clearError(errorConfirm);
  confirmPass.classList.add("input-success");
  return true;
}

// Validate all fields
function validateAll() {
  const isUsernameValid = validateField(
    userName,
    patterns.username,
    errorUser,
    errorMessages.username
  );
  const isEmailValid = validateField(
    userEmail,
    patterns.email,
    errorEmail,
    errorMessages.email
  );
  const isPasswordValid = validateField(
    userPass,
    patterns.password,
    errorPass,
    errorMessages.password
  );
  const isConfirmValid = validatePasswordConfirmation();
  const inputValues = {
    userName: userName.value,
    userEmail: userEmail.value,
    password: userPass.value,
  };
  const entries = Object.entries(inputValues);
  console.log("🚀 ~ validateAll ~ entries:", entries);

  for (const [key, value] of entries) {
    document.cookie = `${key}=${value};`;
  }
  var cookies = document.cookie.split(";").map((cookie) => cookie.split("="));
  console.log(cookies);

  return isUsernameValid && isEmailValid && isPasswordValid && isConfirmValid;
}

// Handle form submission
function handleSubmit(e) {
  e.preventDefault();
  formSubmitted = true;

  if (validateAll()) {
    successMessage.style.display = "block";
    regForm.reset();
    Swal.fire({
      title: "Good job!",
      text: "Registration completed successfully!",
      icon: "success",
    });
    // Reset styles after success
    setTimeout(() => {
      allInputs.forEach((input) => {
        input.classList.remove("input-success");
      });
      successMessage.style.display = "none";
      formSubmitted = false;
    }, 1000);
  } else {
    // Shake form to indicate error
    document.querySelector(".container").classList.add("shake");
    setTimeout(() => {
      document.querySelector(".container").classList.remove("shake");
    }, 300);

    // Scroll to the first error
    const firstError = document.querySelector(".input-error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

// Add event listeners for real-time validation after first submission
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (formSubmitted) {
      validateAll();
    }
  });
});
function setupPasswordToggle() {
  const passwordToggles = document.querySelectorAll(".password-toggle");

  passwordToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const input = this.parentElement.querySelector("input");

      if (input.type === "password") {
        input.type = "text";
        console.log(this.firstChild);

        this.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        this.classList.remove("fa-eye-slash");
      }
    });
  });
}

regForm.addEventListener("submit", handleSubmit);

//               sign in function

function getCookie(name) {
  const cookies = document.cookie.split(";").map((c) => c.trim().split("="));
  for (const [key, value] of cookies) {
    if (key === name) return decodeURIComponent(value);
  }
  return null;
}

signIn_form.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.querySelector("#user_Email").value.trim();
  let password = document.querySelector("#user_Password").value.trim();

  let savedEmail = getCookie("userEmail");
  let savedPass = getCookie("password");

  if (email === savedEmail && password === savedPass) {
    window.location.replace("pages/home/home.html");
  } else {
    alert("Invalid email or password!");
  }
});
