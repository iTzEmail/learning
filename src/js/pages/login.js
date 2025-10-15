import { auth } from "../main/firebase.js";
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

        } catch (error) {
            alert(error.message);
        }
    });
}