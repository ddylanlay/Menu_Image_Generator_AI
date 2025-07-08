// Firebase setup for dish image and menu storage
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function storeMenuItems(menuArray) {
  const menuCollection = collection(db, "menus");
  const results = [];

  for (const item of menuArray) {
    const docRef = await addDoc(menuCollection, item);
    results.push({ id: docRef.id, ...item });
  }

  return results;
}
