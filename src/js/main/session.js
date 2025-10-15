import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged  } from "firebase/auth";
import { SESSION_CONFIG } from "../config.js";



/// Cookies
import { setPersistence, browserLocalPersistence } from "firebase/auth";
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Error setting auth persistence:", error)
    })



/// Idle
let idleTimer;

function logout() {
    signOut(auth).then(() => {
        clearTimeout(idleTimer);
        localStorage.removeItem("loginTime");
        
        window.location.href = "login";
    });
}

function startIdleTimer() {
    function reset() {
        clearTimeout(idleTimer);

        const loginTime = localStorage.getItem("loginTime")
        if (loginTime && (Date.now() - loginTime) > SESSION_CONFIG.maxSessionDuration) {
            logout();
            return;
        }

        idleTimer = setTimeout(() => {
            logout();

            alert('You have been logged out due to inactivity.');
        }, SESSION_CONFIG.idleDuration);
    }

    // Listen to user activity
    ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach(evt => {
        window.addEventListener(evt, reset);
    });

    // Start timer on page load
    reset();
}

export function startSession({ requireAuth = false } = {}) {
    onAuthStateChanged(auth, (user) => {
        console.log(user);

        if (user) {
            if (!localStorage.getItem("loginTime")) {
                localStorage.setItem("loginTime", Date.now());
            }
            startIdleTimer();
            
        } else if (requireAuth) {
            window.location.href = "login";
        }
    });
}