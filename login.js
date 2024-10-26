//funiones del login
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "fco" && password === "abc123") {
        window.location.href = "index.html";
    } else {
        alert("Datos incorrectos. Intenta nuevamente.");
    }
});