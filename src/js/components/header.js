import { auth } from "../main/firebase.js";
import { signOut, onAuthStateChanged } from "firebase/auth";


let guestLinks, userInfo, userName, userAvatar, logoutBtn;
export function initHeader() {
    fetch("components/header.html")
        .then(res => res.text())
        .then(html => {
            document.body.insertAdjacentHTML("afterbegin", html);

            guestLinks = document.querySelector(".guest-links");
            userInfo = document.querySelector(".user-info");
            userAvatar = document.querySelector(".user-avatar");
            userName = document.querySelector(".user-name");

            logout = document.getElementById("logout-btn");
            if (logout) {
                logout.addEventListener("click", async (e) => {
                    e.preventDefault();
                    await signOut(auth);
                    window.location.href = "/login";
                });
            }
        })
        .catch(err => console.error("Error loading header:", err));
}

export function updateHeaderAuth(user) {
    if (!guestLinks || !userInfo) return;

    console.log('header', auth);

    if (user) {
        guestLinks.style.display = "none";
        userInfo.style.display = "flex";
        userName.textContent = user.displayName || "User";
        userAvatar.src = user.photoURL || "/assets/default-avatar.png";

    } else {
        guestLinks.style.display = "flex";
        userInfo.style.display = "none";
    }
}