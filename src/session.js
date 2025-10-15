import { auth } from "./firebase.js";
import { signOut } from "firebase/auth";
import { SESSION_CONFIG } from "./config.js";


/// Idle
let idleTimer;
export function startIdleTimer() {
    const idleDuration = SESSION_CONFIG.idleDuration;
    const maxSessionDuration = SESSION_CONFIG.maxSessionDuration;

    function logout() {
        signOut(auth).then(() => {
            localStorage.removeItem("loginTime");
            
            window.location.href = "login.html";
        });
    }

    function reset() {
        clearTimeout(idleTimer);

        // Check max session expiration
        const loginTime = localStorage.getItem("loginTime");
        if (!loginTime || Date.now() - loginTime > maxSessionDuration) {
            logout();
            return;
        };

        // Start AFK timer
        idleTimer = setTimeout(() => {
            logout();
            alert("You have been logged out due to inactivity.");
        }, idleDuration);
    }

    // Listen to user activity
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    window.addEventListener("click", reset);
    window.addEventListener("scroll", reset);
    window.addEventListener("touchstart", reset);

    // Start the timer initially
    reset();
}