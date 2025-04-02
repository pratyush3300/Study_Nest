document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector(".sign-up form");
    const loginForm = document.querySelector(".sign-in form");

    // Signup Event Listener
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const name = signupForm.name.value;
        const email = signupForm.email.value;
        const password = signupForm.password.value;

        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        alert(data.message || "Signup successful!");
    });

    // Login Event Listener
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const email = loginForm.email.value;
        const password = loginForm.password.value;

        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "chat-assistant.html"; // Redirect after login
        } else {
            alert(data.message || "Login failed!");
        }
    });
});
