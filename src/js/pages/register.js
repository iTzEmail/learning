import { toast } from "../components/main.js"

import { REGISTER } from "../config.js";
const checks = REGISTER.required


// Required input
document.querySelectorAll("#register input").forEach(input => {
    const errorSpan = input.closest(".form-field").querySelector(".error-message");
    if (!errorSpan) {
        return;
    }

    input.addEventListener("input", () => {
        if (!input.value.trim()) {
            errorSpan.textContent = "This field is required";

        } else {
            errorSpan.textContent = "";
        }
    });
});


// Password checklist
const passwordInput = document.getElementById("password");
if (passwordInput) {
    const checklist = document.querySelector(".password-checklist");
    for (const [key, value] of Object.entries(checks)) {
        const li = document.createElement("li");
        li.dataset.check = key;
        li.textContent = value.text;
        checklist.appendChild(li);
    }
    passwordInput.closest(".form-field").appendChild(checklist);

    passwordInput.addEventListener("input", () => {
        for (const [key, { regex }] of Object.entries(checks)) {
            const item = checklist.querySelector(`[data-check="${key}"]`);
            item.style.color = regex.test(passwordInput.value) ? "green" : "red";
        }
    });
}

const confirmInput = document.getElementById("confirmPassword");
if (confirmInput) {
    confirmInput.addEventListener("input", () => {
        const errorSpan = confirmInput.closest(".form-field").querySelector(".error-message");
        if (confirmInput.value && confirmInput.value !== passwordInput.value) {
            errorSpan.textContent = "Passwords do not match";

        } else {
            errorSpan.textContent = "";
        }
    });
}



// Register
import { auth, db } from "../main/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";

const register = document.getElementById("register");
if (register) {
    register.addEventListener("submit", async (e) => {
        e.preventDefault();

        document.body.classList.add("loading");

        try {
            const firstName = e.target.firstName.value.trim();
            const lastName = e.target.lastName.value.trim();
            const email = e.target.email.value.trim();
            const password = e.target.password.value;
            const confirm = e.target.confirmPassword.value;

            // Check reCAPTCHA
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse.length > 0) {
                toast({
                    message: "Please complete the reCAPTCHA",
                    type: "warning"
                })
                return;
                
            } else if (!Object.values(checks).every(({ regex }) => regex.test(password))) {
                const messages = Object.values(checks).map(c => c.text);
                toast({
                    message: "Password does not meet the required criteria",
                    type: "warning"
                })
                return;

            } else if (password !== confirm) {
                toast({
                    message: "Passwords do not match",
                    type: "warning"
                })
                return;
            }

            // Create the account
            const credential = await createUserWithEmailAndPassword(auth, email, password);
            const user = credential.user;

            // Send email
            await sendEmailVerification(user);
            await signOut(auth);
            
            alert("Verification email sent! Please check your inbox.");

            const colRef = collection(db, 'users');
            await addDoc(colRef, {
                firstName: firstName,
                lastName: lastName,
                email: email,
                createdAt: serverTimestamp()
            });

            window.location.replace("/check-email");

        } catch (error) {
            const code = error.code || error.message;
            const cleanedCode = code.includes("(") ? code.match(/\((.*)\)/)[1] : code;
            toast({
                message: REGISTER.errors[cleanedCode] || "An unknown error occurred",
                type: "error"
            });

            throw new Error(code)

        } finally {
            document.body.classList.remove("loading");
        }
    });
}



// Toggle password
document.querySelectorAll(".toggle-password").forEach(icon => {
    icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        if (input.type === "password") {
            input.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {
            input.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    })
});