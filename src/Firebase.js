import firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC6c942p11oIh0gJIQhOdr4jpQRw4JPS7M",
    authDomain: "social-media-app-d0882.firebaseapp.com",
    projectId: "social-media-app-d0882",
    storageBucket: "social-media-app-d0882.appspot.com",
    messagingSenderId: "633114517744",
    appId: "1:633114517744:web:0310ad190dcbbf5267a235",
    measurementId: "G-NEJ84NEMH8"
  };

const firebaseApp= firebase.initializeApp(firebaseConfig);


const storage= firebase.storage();

export {storage}

