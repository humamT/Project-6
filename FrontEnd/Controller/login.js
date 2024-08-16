import {
    login,logout
} from "../Model/user.js"

const form = document.getElementById("login-form")
form.addEventListener("submit", async function(event){
    event.preventDefault()
    const email = document.getElementById("email").value 
    const password = document.getElementById("password").value


    let result = await login(email, password)
    if(result == true) {
        window.location.href = "index.html"
    }
    else{
        alert("email or passowrd invalid")
    }
})