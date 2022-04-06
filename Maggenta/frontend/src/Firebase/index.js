import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD-Cv1K4vR7g8BRdM1g1tCDS3iio-NP-vg",
    authDomain: "maggenta.firebaseapp.com",
    projectId: "maggenta",
    storageBucket: "maggenta.appspot.com",
    messagingSenderId: "878806586898",
    appId: "1:878806586898:web:f0196734874bb25a862acb",
    measurementId: "G-GQWVYW75K0"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export {storage, firebase as default};