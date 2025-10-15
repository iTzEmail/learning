import { sendEmailVerification } from "firebase/auth";

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
            window.location.href = "register";
        }
    });
}