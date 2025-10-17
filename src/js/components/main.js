import { auth } from "../main/firebase.js";
import { signOut } from "firebase/auth";

export function init() {
    // Header
    fetch("components/header.html")
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML("afterbegin", html);

            // Active navigation state management
            const navLinks = document.querySelectorAll('.nav-links a');

            // Mobile menu toggle functionality
            const menuToggle = document.getElementById('menuToggle');
            const navLinksContainer = document.getElementById('navLinks');

            menuToggle.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
            });

            // Close mobile menu when clicking on a link
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navLinksContainer.classList.remove('active');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!menuToggle.contains(e.target) && !navLinksContainer.contains(e.target)) {
                    navLinksContainer.classList.remove('active');
                }
            });

            // Logout
            const logoutBtns = document.querySelectorAll(".logout-btn");
            logoutBtns.forEach(btn => {
                btn.addEventListener("click", async (e) => {
                    e.preventDefault();
                    localStorage.removeItem("loginTime");
                    await signOut(auth);
                    window.location.replace("/login");
                });
            });
        })
        .catch(err => console.error("Error loading header:", err));

    // Footer
    fetch("components/footer.html")
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML("beforeend", html);
        })
        .catch(err => console.error("Error loading footer:", err));
}

export function updateHeaderAuth(user) {
    const login = document.querySelectorAll(".login-btn");
    const signup = document.querySelectorAll(".signup-btn");
    const logout = document.querySelectorAll(".logout-btn");
    const logo = document.querySelector(".logo");

    if (!login || !signup || !logout || !logo) {
        // Try again
        setTimeout(() => updateHeaderAuth(user), 50);
        return;
    }

    if (user) {
        logout.forEach(btn => btn.style.display = "inline-flex");

    } else {
        login.forEach(btn => btn.style.display = "inline-flex");
        signup.forEach(btn => btn.style.display = "inline-flex");
    }

    logo.href = !!user ? "/dashboard" : "/home"
}