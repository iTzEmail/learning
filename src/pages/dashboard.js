import { auth, db } from "../firebase.js";
import { onValue, ref } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";


/// Session
import { startIdleTimer } from "../session.js";
startIdleTimer()


/// Logout
const logout = document.getElementById("logout");
logout.addEventListener("click", async () => {
    await signOut(auth);

    window.location.href = "login.html";
})



/// Elements
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userDob = document.getElementById("user-dob");
onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                userName.textContent = `${data.firstName} ${data.lastName}`;
                userEmail.textContent = data.email;
                userDob.textContent = data.dob;
            }
        });

    } else {
        window.location.href = "login.html";
    }
})