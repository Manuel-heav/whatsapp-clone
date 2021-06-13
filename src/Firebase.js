import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyDoh4rmy06hW4HT0WOS2pJysNxhipi5B7Y",
  authDomain: "whatsapp-clone-3279c.firebaseapp.com",
  projectId: "whatsapp-clone-3279c",
  storageBucket: "whatsapp-clone-3279c.appspot.com",
  messagingSenderId: "290791967723",
  appId: "1:290791967723:web:bda01bf13ceb712b04a7ae",
  measurementId: "G-QMMYRMS4F5"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();

  const auth = firebase.auth();
  const provider = new firebase.auth.
  GoogleAuthProvider();

  export { auth, provider }
  export default db;