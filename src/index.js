import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDYCId6a0xOqbDi13rko_bSvIRv0KNmcNI",
  authDomain: "fir-9-26d77.firebaseapp.com",
  projectId: "fir-9-26d77",
  storageBucket: "fir-9-26d77.firebasestorage.app",
  messagingSenderId: "995514548945",
  appId: "1:995514548945:web:a43c7592b043b164f17bf0",
  measurementId: "G-BPNQ5G1XH0"
};


// Init Firebase app
initializeApp(firebaseConfig);



// Authentication
import { getAuth } from 'firebase/auth';

const auth = getAuth();


// Auth changes
import { onAuthStateChanged } from 'firebase/auth';

const ubsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user);
});


// Sign up
import { createUserWithEmailAndPassword } from 'firebase/auth';

const signUp = document.querySelector('.signup');
signUp.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signUp.email.value;
    const password = signUp.password.value;
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            alert('User successfully created!');

            signUp.reset();
        })
        .catch(err => {
            alert(err.message);
        });
});


// Login
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = document.querySelector('.login');
login.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = login.email.value;
    const password = login.password.value;
    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            alert('Successfully logged in!');

            login.reset();
        })
        .catch(err => {
            alert(err.message);
        });
});


// Sign out
import { signOut } from 'firebase/auth';

const logout = document.querySelector('.logout');
logout.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            alert('Successfully logged out!');
        })
        .catch(err => {
            console.log(err.message);
        });
});



// Real time collection data
import { getFirestore, collection, onSnapshot, doc, query, where, orderBy } from 'firebase/firestore';

const db = getFirestore();
const colRef = collection(db, 'books');

// Queries
// const q = query(colRef, where("author", "==", "patrick rothfuss"), orderBy('createdAt', 'desc'));
const q = query(colRef, orderBy('createdAt', 'desc'));
const unsubCol = onSnapshot(q, (snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
    });

    console.log(books);
});


// Adding documents
import { addDoc, serverTimestamp } from 'firebase/firestore';

const addBook = document.querySelector('.add');
addBook.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(colRef, {
        title: addBook.title.value,
        author: addBook.author.value,
        createdAt: serverTimestamp()
    })
    .then(() => {
        alert('Book successfully added!');

        addBook.reset();
    })
    .catch(err => { 
        console.log(err.message);
    });
});


// Deleting documents
import { deleteDoc } from 'firebase/firestore';

const deleteBook = document.querySelector('.delete');
deleteBook.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', deleteBook.id.value);
    deleteDoc(docRef)
        .then(() => {
            alert('Book successfully deleted!'); 

            deleteBook.reset();
        })
        .catch(err => {
            console.log(err.message);
        });
});


// Get a single document
import { getDoc } from 'firebase/firestore';

const docRef = doc(db, 'books', 'iKQDpDRXxlLbZJF15Vu8');
// getDoc(docRef)
//     .then((doc) => {
//         console.log(doc.data(), doc.id);
//     });

const unsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id);
});


// Update document
import { updateDoc } from 'firebase/firestore';

const updateBook = document.querySelector('.update');
updateBook.addEventListener('submit', (e) => {
    e.preventDefault();

    const docRef = doc(db, 'books', updateBook.id.value);
    updateDoc(docRef, {
        title: 'updated title',
        author: 'updated author'
    })
    .then(() => {
        alert('Book successfully updated!');
        
        updateBook.reset();
    })
    .catch(err => {
        console.log(err.message);
    });
});


// Unsubscribe from changes (for testing purposes)
const unsub = document.querySelector('.unsub-col');
unsub.addEventListener('click', () => {
    console.log('Unsubscribing from collection changes');

    ubsubAuth();
    unsubCol();
    unsubDoc();
});