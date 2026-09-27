const userName = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const age = document.getElementById("age");
const dob = document.getElementById("dob");
const country = document.getElementById("country");
const signBtn = document.getElementById("signBtn");
const signupForm = document.getElementById("signupForm");

const errorname = document.getElementById("errorname");
const erroremail = document.getElementById("erroremail");
const errorpassword = document.getElementById("errorpassword");
const errorage = document.getElementById("errorage");
const errordob = document.getElementById("errordob");
const errorcountry = document.getElementById("errorcountry");

let userList = [];
document.querySelectorAll("input").forEach(function(input) {
    input.setAttribute("autocomplete", "off");
});
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

function validateForm() {
    let isValid = true;

    if (!userName.value.trim()) {
        setError(errorname, "Please enter your full name.");
        isValid = false;
    } else {
        setError(errorname, "");
    }

    if (!isValidEmail(email.value)) {
        setError(erroremail, "Please enter a valid email address.");
        isValid = false;
    } else {
        setError(erroremail, "");
    }

    if (password.value.length < 8) {
        setError(errorpassword, "Password must be at least 8 characters long.");
        isValid = false;
    } else {
        setError(errorpassword, "");
    }

    if (!age.value || Number(age.value) <= 0) {
        setError(errorage, "Please enter a valid age.");
        isValid = false;
    } else {
        setError(errorage, "");
    }

    if (!dob.value) {
        setError(errordob, "Please select your date of birth.");
        isValid = false;
    } else {
        setError(errordob, "");
    }

    if (!country.value) {
        setError(errorcountry, "Please select your country.");
        isValid = false;
    } else {
        setError(errorcountry, "");
    }

    return isValid;
}

function SignUpFunc(event) {
    event.preventDefault();
    getAllPreviousUser();

    if (!validateForm()) {
        return;
    }

    const normalizedEmail = email.value.trim().toLowerCase();
    const emailExists = userList.some((user) => user.email.toLowerCase() === normalizedEmail);

    if (emailExists) {
        setError(erroremail, "This email is already registered.");
        return;
    }

    const userObj = {
        userName: userName.value.trim(),
        email: normalizedEmail,
        password: password.value,
        age: age.value,
        dob: dob.value,
        country: country.value,
    };

    userList.push(userObj);
    localStorage.setItem("UserList", JSON.stringify(userList));
    window.location.href = "login.html";
}

signupForm.addEventListener("submit", SignUpFunc);

userName.addEventListener("input", function () {
    if (userName.value.trim()) {
        setError(errorname, "");
    }
});

email.addEventListener("input", function () {
    if (isValidEmail(email.value)) {
        setError(erroremail, "");
    }
});

password.addEventListener("input", function () {
    if (password.value.length >= 8) {
        setError(errorpassword, "");
    }
});

age.addEventListener("input", function () {
    if (age.value && Number(age.value) > 0) {
        setError(errorage, "");
    }
});

dob.addEventListener("change", function () {
    if (dob.value) {
        setError(errordob, "");
    }
});

country.addEventListener("change", function () {
    if (country.value) {
        setError(errorcountry, "");
    }
});

getAllPreviousUser();
userName.focus();
