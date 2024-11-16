// Configuración inicial: Si no hay usuarios en localStorage, los crea.
if (!localStorage.getItem("users")) {
    const initialUsers = {
        Fran10: "abc123",
        Admin: "admin123"
    };
    localStorage.setItem("users", JSON.stringify(initialUsers));
}

// Evento para cambiar contraseña
document.getElementById("change-password-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username-change").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Recuperar usuarios desde localStorage
    const users = JSON.parse(localStorage.getItem("users"));

    if (newPassword === confirmPassword) {
        if (users[username]) {
            users[username] = newPassword; // Actualizar la contraseña
            localStorage.setItem("users", JSON.stringify(users)); // Guardar los cambios en localStorage
            alert("Contraseña cambiada exitosamente.");
            window.location.href = "login.html"; // Redirección al login
        } else {
            alert("Usuario no encontrado.");
        }
    } else {
        alert("Las contraseñas no coinciden. Intenta nuevamente.");
    }
});

