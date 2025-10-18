import { auth } from "../main/firebase.js";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const login = document.getElementById("login");
if (login) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            window.location.replace("/dashboard");
        }
    });

    login.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (!user.emailVerified) {
                await signOut(auth);
                
                alert("Please verify your email before logging in.");
                return;
            };
            
            window.location.replace("/dashboard");

        } catch (error) {
            alert(error.message);
        }
    });
}