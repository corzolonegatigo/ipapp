import { initializeApp } from "firebase/app";
import { getDoc, 
    getFirestore, 
    collection, 
    doc, 
    setDoc  } from "firebase/firestore";


// firebase setup + function export
const firebaseConfig = {
    apiKey: "AIzaSyCN3Z-SsOdmoFOLZP6NKiW9wDjMmA1M2bI",
    authDomain: "ipapps1.firebaseapp.com",
    projectId: "ipapps1",
    storageBucket: "ipapps1.firebasestorage.app",
    messagingSenderId: "386365310550",
    appId: "1:386365310550:web:959c17361a7daee6705df7"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const USER_DB = collection(db, 'users');

// might be a better implemetation
export async function checkUserAvail(username) {
    if (username) { 
        const userdoc = doc(USER_DB, username)
        console.log(userdoc)
        const user = await getDoc(userdoc);
        if (user.exists()) {
            return user 
        }
    }
    return false
}

export async function addUser(username, password, email, card, img) {
    console.log(img)
    const userNew = doc(USER_DB, username);
    const userdata = {
        'username': username,
        'password': password,
        'email': email,
        'card': JSON.stringify(card),
        'profilepic': img,
        'currentitem': '',
        'itemprogress': 0,
    };

    try {
        await setDoc(userNew, userdata);
        window.localStorage.setItem("Userdata", JSON.stringify(userdata));
        window.location.href = './main.html';
    } catch (err) {
        console.error("Error adding user:", err);
    }
    

    
}

export async function getUser(username, password) {

    try {
        const user = await checkUserAvail(username);
        if (user !== false) { 
            const userdata = user.data()
            const usrpw = userdata.password;
            if (password === usrpw) {
                window.localStorage.setItem("Userdata", JSON.stringify(userdata));
                window.location.href = './main.html';
                return true
            }
        }

    } catch (err) {
        console.error("Error adding user:", err);
    }

    // easiser to change the error msg here than to do it in login.js
    document.querySelector('.error').classList.remove('hidden');
    return false
}