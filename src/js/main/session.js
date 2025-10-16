import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged  } from "firebase/auth";
import { SESSION_CONFIG } from "../config.js";


/// Cookies
import { setPersistence, browserLocalPersistence } from "firebase/auth";
setPersistence(auth, browserLocalPersistence)
    .catch((error) => {
        console.error("Error setting  auth persistence:", error)
    })



/// Idle
let idleTimer;

function logout() {
    signOut(auth).then(() => {
        clearTimeout(idleTimer);

        localStorage.removeItem("loginTime");
        
        window.location.replace("/login");
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


// Header & Auth
import { initHeader, updateHeaderAuth } from "../components/header.js"

const publicPages = ['', 'index', 'login', 'register', 'check-email', 'reset'];
onAuthStateChanged(auth, (user) => {
    const loginTime = localStorage.getItem("loginTime")

    const path = window.location.pathname.replace(/^\//, '');
    const isPublic = publicPages.includes(path);
    const is404 = document.querySelector('meta[name="page-type"][content="404"]') !== null;
    if (user && isPublic) {
        // Is on a public page while logged in
        window.location.replace("/dashboard");
        return;

    } else if (!user && !isPublic && !is404) {
        window.location.replace('/login');
        return;
    }

    initHeader();
    updateHeaderAuth(user);

    if (user) {
        // Logged in
        if (!loginTime) localStorage.setItem("loginTime", Date.now());
        startIdleTimer();
        
    } else {
        // No user logged in
        if (loginTime) localStorage.removeItem('loginTime');
    }
})