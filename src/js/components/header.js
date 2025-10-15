import { auth } from "../main/firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";

(() => {
    function loadHeader() {
        fetch("components/header.html")
            .then(res => res.text())
            .then(html => {
                // Insert header into <header> or body
                const container = document.querySelector("header") || document.body;
                container.insertAdjacentHTML("afterbegin", html);

                // Logout
                const logout = document.getElementById("logout");
                if (logout) {
                    logout.addEventListener("click", async (e) => {
                        e.preventDefault();
                        await signOut(auth);
                        window.location.href = "login";
                    });
                }

                // Update links based on auth state
                onAuthStateChanged(auth, (user) => {
                    document.querySelectorAll(".auth-link").forEach(link => {
                        const type = link.dataset.auth;
                        if (type === "guest") link.style.display = user ? "none" : "inline-block";
                        if (type === "user") link.style.display = user ? "inline-block" : "none";
                    });
                });
            })
            .catch(err => console.error("Error loading header:", err));
    }

    loadHeader();
})();