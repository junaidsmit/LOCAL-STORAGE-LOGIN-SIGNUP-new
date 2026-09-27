const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const ageElement = document.getElementById("age");
const countryElement = document.getElementById("country");
const dobElement = document.getElementById("dob");

function getdata() {
    try {
        const userObj = JSON.parse(localStorage.getItem("currentuser")) || [];

        if (!userObj.length) {
            window.location.href = "login.html";
            return;
        }

        const currentUser = userObj[0];
        let formattedDob = "-";

        if (currentUser.dob) {
            const [year, month, day] = currentUser.dob.split("-");
            formattedDob = `${day}-${month}-${year}`;
        }

        nameElement.textContent = currentUser.userName || "User";
        emailElement.textContent = currentUser.email || "-";
        ageElement.textContent = currentUser.age || "-";
        countryElement.textContent = currentUser.country || "-";
        dobElement.textContent = formattedDob;
    } catch (error) {
        window.location.href = "login.html";
    }
}

getdata();