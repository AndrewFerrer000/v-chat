import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAbYi4XsOgzDG7oYnOS6rd8ZJPnrlBiBWc",
    authDomain: "v-chat-fde83.firebaseapp.com",
    projectId: "v-chat-fde83",
    storageBucket: "v-chat-fde83.appspot.com",
    messagingSenderId: "560188652920",
    appId: "1:560188652920:web:8ea6c234fdaae333f1dc8d",
    measurementId: "G-YHTW8NX50K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
export { db, auth };
const analytics = getAnalytics(app);

const initializeVueapp = onAuthStateChanged(auth, (user) => {
    createApp(App).use(router).use(store).mount("#app");
});

initializeVueapp();
