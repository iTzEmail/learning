import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged  } from "firebase/auth";
import { SESSION_CONFIG } from "../config.js";



/// Cookies
import { setPersistence, browserLocalPersistence } from "firebase/auth";

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Auth persistence set to local")
    })
    .catch((error) => {
        console.error("Error setting auth persistence:", error)
    })



/// Idle
let idleTimer;

function logout() {
    signOut(auth).then(() => {
        localStorage.removeItem("loginTime");

        window.location.href = "login";
    });
}

function startIdleTimer() {
    const idleDuration = SESSION_CONFIG.idleTimeout
    const maxSessionDuration = SESSION_CONFIG.maxSessionDuration;

    function reset() {
        clearTimeout(idleTimer);

        const loginTime = ocalStorage.getItem("loginTime")
        if (loginTime && (Date.now() - loginTime) > maxSessionDuration) {
            logout();
            return;
        }

        idleTimer = setTimeout(() => {
            logout();

            alert('You have been logged out due to inactivity.');
        }, idleDuration);
    }

    // Listen to user activity
    ["mousemove", "keydown", "click", "scroll", "touchstart"].forEach(evt => {
        window.addEventListener(evt, reset);
    });

    // Start timer on page load
    reset();
}

export function startSession() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (!localStorage.getItem("loginTime")) {
                localStorage.setItem("loginTime", Date.now());
            }
            startIdleTimer();
        }
    });
}