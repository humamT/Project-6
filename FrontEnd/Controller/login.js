import {
    login, logout
} from "../Model/user.js"
/*
const form = document.getElementById("login-form")
form.addEventListener("submit", async function (event) {
    event.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value


    let result = await login(email, password)
    if (result == true) {
        window.location.href = "index.html"
    }
    else {
        alert("email or passowrd invalid")
    }
})
*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let result = await login(email, password);
        if (result === true) {
            localStorage.setItem("isLoggedIn", "true"); // Store login state
            window.location.href = "index.html";
        } else {
            alert("Email or password invalid");
        }
    });
});


/* already in index.js
document.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("loginId");
    const logoutLink = document.getElementById("logoutId");

    // Check login status by checking if token is present in localStorage
    const isLoggedIn = !!localStorage.getItem("token");

    // Toggle visibility of login/logout links based on login status
    if (isLoggedIn) {
        loginLink.classList.add("hidden");   // Hide login link
        logoutLink.classList.remove("hidden"); // Show logout link
    } else {
        loginLink.classList.remove("hidden");   // Show login link
        logoutLink.classList.add("hidden");   // Hide logout link
    }

    // Logout functionality
    logoutLink.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        localStorage.removeItem("token"); // Remove the token from localStorage
        window.location.href = "index.html"; // Redirect to home or login page after logout
    });
});
*/