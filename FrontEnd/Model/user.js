export async function login(email, password) {
    const response = await fetch("http://localhost:5678/user/login", {
        method:"post",
        body:JSON.stringify({email, password})
    })
    if (!response.ok) {
        return false;
    }
    const data = await response.json();
    localStorage.setItem("token", data.token)
}

export function logout() { 
    localStorage.removeItem("token")
}