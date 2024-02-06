// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getFirestore,
	collection,
	doc,
	setDoc,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc,
	getDocs,
	where,
	query,
	orderBy,
} from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

//++ la configuración de Firebase de tu aplicación web
const firebaseConfig = {
	apiKey: 'AIzaSyCvzb8LelJG9S4w_VQdN5Ez7LihIVyGXhI',
	authDomain: 'fireblogsvue-48354.firebaseapp.com',
	projectId: 'fireblogsvue-48354',
	storageBucket: 'fireblogsvue-48354.appspot.com',
	messagingSenderId: '399518893153',
	appId: '1:399518893153:web:2589cf4f19233b33c29620',
};

//++ inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);

//++ inicializar Firestore
const dbFireStore = getFirestore(firebaseApp);

const firebaseStorage = getStorage(firebaseApp);

//++ obtener marca de tiempo del servidor
const timestamp = serverTimestamp();

//++ inicializa la autenticación
const firebaseAuth = getAuth(firebaseApp);


export {
	dbFireStore,
	timestamp,
	firebaseAuth,
	firebaseStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	sendPasswordResetEmail,
	collection,
	doc,
	setDoc,
	getDoc,
	addDoc,
	getDocs,
	query,
	where,
	orderBy,
	updateDoc,
	deleteDoc,
	signOut,
};
