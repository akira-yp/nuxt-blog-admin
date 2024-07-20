import { initializeApp } from 'firebase/app';
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";

import { defineNuxtPlugin } from '#app';

import { useRuntimeConfig } from '#imports'

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    const firebaseConfig = {
      apiKey: config.public.apiKey,
      authDomain: config.public.authDomain,
      projectId: config.public.projectId,
      storageBucket: config.public.storageBucket,
      messagingSenderId: config.public.messagingSenderId,
      appId: config.appId
    };
    initializeApp(firebaseConfig);

    const isEmulating = window.location.hostname === "localhost";
    if (isEmulating) {
        const auth = getAuth();
        connectAuthEmulator(auth, "http://localhost:5006");

        const storage = getStorage();
        connectStorageEmulator(storage, "localhost", 5005);

        const db = getFirestore();
        connectFirestoreEmulator(db, 'localhost', 5002);

        const functions = getFunctions();
        connectFunctionsEmulator(functions, "localhost", 5001);
    }
});
