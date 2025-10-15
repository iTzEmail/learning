import { auth, db } from "../main/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

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

            const colRef = collection(db, 'users');
            await addDoc(colRef, {
                firstName: firstName,
                lastName: lastName,
                dob: dob,
                email: email,
                createdAt: serverTimestamp()
            });

            window.location.href = "check-email";

        } catch (error) {
            alert(error.message);
        }
    });
}