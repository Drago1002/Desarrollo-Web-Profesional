document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "Fran10" && password === "abc123") {
        window.location.href = "index.html";  
    } else if (username === "Admin" && password === "admin123") {
        window.location.href = "admin.html"; 
    } else {
        alert("Datos incorrectos. Intenta nuevamente.");
    }
});
