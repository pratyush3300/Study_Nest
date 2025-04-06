document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector(".sign-up form");
    const loginForm = document.querySelector(".sign-in form");

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = signupForm.email.value;
        const password = signupForm.password.value;

        const response = await fetch("http://localhost:3000/api/signup", { 
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ email, password }), 
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.token); 
            alert("Signup successful!");
            window.location.href = "chat-assistant.html"; // Redirect karega
        } else {
            alert(data.error || "Signup failed!"); 
        }
    });

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        const response = await fetch("http://localhost:3000/api/login", { // Corrected endpoint
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok && data.token) {
            localStorage.setItem("token", data.token);
            alert("Login successful!");
            window.location.href = "chat-assistant.html"; // Redirect karega
        } else {
            alert(data.error || "Login failed!");
        }
    });
});