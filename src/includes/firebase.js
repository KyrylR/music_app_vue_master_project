// Import the functions you need from the SDKs you need

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyDyEfBK-IEPtza0q6AWtV6HgQhTO6rLjsM',
  authDomain: 'music-84c87.firebaseapp.com',
  projectId: 'music-84c87',
  storageBucket: 'music-84c87.appspot.com',
  messagingSenderId: '797008862043',
  appId: '1:797008862043:web:725ae5d57a122062cc987e',

};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence()
  .catch((error) => {
    console.log(`Firebase persistence error ${error.code}`);
  });

const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');
const commentsCollection = db.collection('comments');

export
{
  auth, db, usersCollection, storage, songsCollection, commentsCollection,
};
