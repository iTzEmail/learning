import { auth } from "../main/firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const login = document.getElementById("login");
if (login) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.href = "dashboard";
        }
    });

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
            
            window.location.href = "dashboard";

        } catch (error) {
            alert(error.message);
        }
    });
}