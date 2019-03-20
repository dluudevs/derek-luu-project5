import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCimljQiAY55z-0gNisQwPkH5cLgGmbwhM",
    authDomain: "shouldigetit-3aad7.firebaseapp.com",
    databaseURL: "https://shouldigetit-3aad7.firebaseio.com",
    projectId: "shouldigetit-3aad7",
    storageBucket: "shouldigetit-3aad7.appspot.com",
    messagingSenderId: "991600496256"

};
firebase.initializeApp(config);

export default firebase;