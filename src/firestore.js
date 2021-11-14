import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyAcm2ynwXLMyUKNiIEgSbENkc2CRYVB5J4",
    authDomain: "dms-schedule.firebaseapp.com",
    projectId: "dms-schedule",
    storageBucket: "dms-schedule.appspot.com",
    messagingSenderId: "1017596119372",
    appId: "1:1017596119372:web:964b9a28a1964ce0ce67e9",
    measurementId: "G-CMHNGM00KC"
});

firebase.analytics();
let db = firebase.firestore();


export default {
    firebase, db
}