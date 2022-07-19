// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js';
import { getFirestore, doc, addDoc, collection, setDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA33HPkczj5Pn1HEaxSuuEkz5LWHDMUTa4',
  authDomain: 'purr-love.firebaseapp.com',
  projectId: 'purr-love',
  storageBucket: 'purr-love.appspot.com',
  messagingSenderId: '578237034767',
  appId: '1:578237034767:web:e380c2da3118685a558e7a',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth
const auth = getAuth(app);
// Initialize firestore
const db = getFirestore(app);
// Google Provider
const provider = new GoogleAuthProvider();
const user = auth.currentUser;


// FUNCIÓN REGISTER
export const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)

// Base de datos de registro de usuarios
export const createUserRegisterDB = (uid, name, email, password) => {
  setDoc(doc(db, 'users', uid), {
    name,
    email,
    password,
  });
};



/* //devuelve un array de ids
export const getName = async() => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  let array = [];
  querySnapshot.forEach((doc) => {
    array.push(doc.id);
    //console.log(`${doc.id} => ${doc.data()}`);
  });
  console.log(array);
  //console.log(array[0].name);
} */


/* export const getName = async(uid) => {
const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);
//console.log(docSnap.data().name);
  return docSnap.data().name;
}; */


// FUNCIÓN LOGIN
export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

// FUNCIÓN LOGIN WITH GOOGLE

export const loginGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log('registrado con google');
      window.location.href = '#/home';
    })

    .catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
    });
}

// FUNCIÓN LOGOUT
export const signOutUser = () => signOut(auth)


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log(getPost(uid));
    console.log('Hay un usuario');
    console.log(uid);
//getName(uid);
   } else {
    // User is signed out
    // ...
    console.log('No hay un usuario');
  }
});


export const savePost = async(nameUser, fecha, newpost, uid) => {
  try {
    const cratePost = await addDoc(collection(db, 'posts'), {
    nameUser,
    fecha,
    newpost,
    uid,
  });
  console.log("post publicado");
}
  catch (e) {
  console.error("Error adding posts: ", e);
}
};


/* export const getPost = async(uid) => {
  const querySnapshot = await getDocs(collection(db, "posts", uid, "newPost"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
} */

export const getPost = async() =>{ 
const querySnapshot = await getDocs(collection(db, "posts"));
return querySnapshot;
};

export const getUser = async() =>{ 
  const userInfoPost = await getDocs(collection(db, "users"));
  return userInfoPost;
  };

  // getPost()
// .then((dataPost) => {
// dataPost.forEach((doc) => {
//   console.log(doc.data());
//   const dataNewPost = doc.data();
//   divContainer.innerHTML += ´<div>${dataNewPost.newPost}</div>
//   <div>${dataNewPost.fecha}</div>´
// });
// });

/* export const getPost = async() => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());

    const getP = doc.data();
  });
} */

/* export const getFecha = async() => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    doc.data().fecha;
  });
}

export const getNewPost = async() => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    doc.data().newpost;
  });
} */

//export const getPost = () => getDocs(collection(db, "posts"))

