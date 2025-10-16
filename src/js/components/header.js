import { auth } from "../main/firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";


export function initHeader() {
    fetch("components/header.html")
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML("afterbegin", html);

            const logout = document.getElementById("logout");
            logout.addEventListener("click", async (e) => {
                e.preventDefault();

                localStorage.removeItem("loginTime");

                await signOut(auth);

                window.location.replace("/login");
            });
        })
        .catch(err => console.error("Error loading header:", err));
}

export function updateHeaderAuth(user) {
    const guestLinks = document.querySelector(".guest-links");
    const userInfo = document.querySelector(".user-info");
    const userName = document.querySelector(".user-name");
    const userAvatar = document.querySelector(".user-avatar");
    const logo = document.querySelector(".logo");

    if (!guestLinks || !userInfo || !userName || !userAvatar || !logo) {
        // Try again
        setTimeout(() => updateHeaderAuth(user), 50);
        return;
    }

    if (user) {
        guestLinks.style.display = "none";
        userInfo.style.display = "flex";
        userName.textContent = user.displayName || "User";
        userAvatar.src = user.photoURL || "/assets/default-avatar.png";

    } else {
        guestLinks.style.display = "flex";
        userInfo.style.display = "none";
    }

    logo.href = !!user ? "/dashboard" : "/index"
}