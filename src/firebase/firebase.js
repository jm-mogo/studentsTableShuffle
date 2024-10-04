// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";
// import data from "../data.json";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env
        .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
    databaseURL: "https://schoolcafetiamanager-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

export default auth;

const db = getDatabase();
const dbRef = ref(getDatabase());
// const dataString = JSON.stringify(data);

export const updataStudentsListData = (user, newStudentList, newTables) => {
    set(ref(db, `Users/${user.uid}`), {
        name: user.displayName,
        studentsList: JSON.stringify(newStudentList),
        studentsTable: JSON.stringify(newTables),
    });
};

export const getStutudentsListData = async (user) => {
    const studentListRef = ref(db, `Users/${user.uid}`);
    let data;
    const snapshot = await get(studentListRef, `Users/${user.uid}`);
    data = snapshot.val();
    return data;
};
