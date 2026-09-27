const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const loginForm = document.getElementById("loginForm");
const erroremail = document.getElementById("erroremail");
const errorpassword = document.getElementById("errorpassword");

let userList = [];
document.querySelectorAll("input").forEach(function(input){
    input.setAttribute("autocomplete", "off")
}
)
function getAllPreviousUser() {
    try {
        userList = JSON.parse(localStorage.getItem("UserList")) || [];
    } catch (error) {
        userList = [];
    }
}

function setError(element, message) {
    element.textContent = message;
}

function isValidEmail(emailValue) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue.trim());
}

function validateLoginForm() {
    let isValid = true;

    if (!isValidEmail(email.value)) {
        setError(erroremail, "Please enter a valid email address.");
        isValid = false;
    } else {
        setError(erroremail, "");
    }

    if (!password.value) {
        setError(errorpassword, "Please enter your password.");
        isValid = false;
    } else {
        setError(errorpassword, "");
    }

    return isValid;
}

function LoginInFunc(event) {
    event.preventDefault();
    getAllPreviousUser();

    if (!validateLoginForm()) {
        return;
    }

    const normalizedEmail = email.value.trim().toLowerCase();
    const matchUser = userList.find((user) => user.email.toLowerCase() === normalizedEmail);

    if (!matchUser) {
        setError(erroremail, "User not found.");
        return;
    }

    if (matchUser.password !== password.value) {
        setError(errorpassword, "Incorrect password.");
        return;
    }

    localStorage.setItem("currentuser", JSON.stringify([matchUser]));
    window.location.replace("dashboard.html");
}

loginForm.addEventListener("submit", LoginInFunc);

email.addEventListener("input", function () {
    if (isValidEmail(email.value)) {
        setError(erroremail, "");
    }
});

password.addEventListener("input", function () {
    if (password.value) {
        setError(errorpassword, "");
    }
});

getAllPreviousUser();
email.focus();
