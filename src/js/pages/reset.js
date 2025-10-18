import { auth } from "../main/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";

const reset = document.getElementById("reset");
if (reset) {
    reset.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        try {
            await sendPasswordResetEmail(auth, email);

            alert("Password reset email sent. Check your inbox.");

            window.location.replace("/login");

        } catch (error) {
            alert(error.message);
        }
    });
}