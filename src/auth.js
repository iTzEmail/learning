import { auth, db } from "./firebase.js";
import { ref, set } from "firebase/database";


/// Register
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const register = document.getElementById("register");
if (register) {
    register.addEventListener("submit", async (e) => {
        e.preventDefault();

        const firstName = e.target.firstName.value.trim();
        const lastName = e.target.lastName.value.trim();
        const dob = e.target.dob.value;
        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        // Check reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse.length > 0) {
            alert("Please complete the reCAPTCHA");
            return;
        }

        try {
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            const user = credential.user;

            await sendEmailVerification(user);
            alert("Verification email sent! Please check your inbox.");

            await set(ref(db, `users/${user.uid}`), {
                firstName,
                lastName,
                dob,
                email
            });

            window.location.href = "check-email.html";

        } catch (error) {
            alert(error.message);
        }
    });
}


// Resend verification
import { onAuthStateChanged } from "firebase/auth";

const resend = document.getElementById("resend-email");
const resend_message = document.getElementById("resend-message");
if (resend && resend_message) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            resend.addEventListener("click", async () => {
                try {
                    await sendEmailVerification(user);

                    resend_message.textContent = "Verification email resent! Check your inbox.";

                } catch (error) {
                    resend_message.textContent = error.message;
                };
            });

        } else {
            // No user logged in, redirect to register
            window.location.href = "register.html";
        }
    });
}


/// Login
import { signInWithEmailAndPassword } from "firebase/auth";

const login = document.getElementById("login");
if (login) {
    login.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredential.user.emailVerified) {
                alert("Please verify your email before logging in.");
                return;
            };

            localStorage.setItem("loginTime", Date.now());

            window.location.href = "dashboard.html";

        } catch (error) {
            alert(error.message);
        }
    });
}



/// Reset password
import { sendPasswordResetEmail } from "firebase/auth";

const reset = document.getElementById("reset");
if (reset) {
    reset.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        try {
            await sendPasswordResetEmail(auth, email);

            alert("Password reset email sent. Check your inbox.");

            window.location.href = "login.html";

        } catch (error) {
            alert(error.message);
        }
    });
}



/// Cookies
import { setPersistence, browserLocalPersistence } from "firebase/auth";

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Auth persistence set to local")
    })
    .catch((error) => {
        console.error("Error setting auth persistence:", error)
    })