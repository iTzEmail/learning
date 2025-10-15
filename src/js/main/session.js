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


// Browser change
import { initHeader, updateHeaderAuth } from "../components/header.js"
initHeader();

onAuthStateChanged(auth, (user) => {
    updateHeaderAuth(user);

    const path = window.location.pathname;
    const requiresAuth = !(path === '/'  || path === 'index' || path === 'login' || path === 'register' || path === 'check-email' || path === 'reset');
    console.log('auth', user, path, requiresAuth);

    if (user) {
        if (requiresAuth) {
            if (!localStorage.getItem("loginTime")) {
                localStorage.setItem("loginTime", Date.now());
            }
            startIdleTimer();

        } else {
            // User is on a public page
            window.location.href = "dashboard";
        }

    } else if (requiresAuth) {
        window.location.href = "login";
    }
})