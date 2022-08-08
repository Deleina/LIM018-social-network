import {
    getFirestore,
    doc,
    addDoc,
    collection,
    setDoc,
    getDocs,
    onSnapshot,
    deleteDoc,
    getDoc,
    updateDoc,
    app,
} from './firebaseConfig.js';

// Initialize firestore
const db = getFirestore(app);


// Base de datos de registro de usuarios
export const createUserRegisterDB = (uid, name, email, password) => {
    setDoc(doc(db, 'users', uid), {
        name,
        email,
        password,
    });
};

export const savePost = async (nameUser, fecha, newpost, uid, like, image) => {
    try {
        if (image) {
            const cratePost = await addDoc(collection(db, 'posts'), {
                nameUser,
                fecha,
                newpost,
                uid,
                like,
                image
            });
        } else {
            const cratePost = await addDoc(collection(db, 'posts'), {
                nameUser,
                fecha,
                newpost,
                uid,
                like,
            });
        }

        console.log("post publicado");
    }
    catch (e) {
        console.error("Error adding posts: ", e);
    }
};

export const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    return querySnapshot;
};

export const getUser = async () => {
    const userInfoPost = await getDocs(collection(db, "users"));
    return userInfoPost;
};

export const getUserById = (userId, colection) => {
    const docRef = doc(db, colection, userId);
    const docSnap = getDoc(docRef).then((userDoc) => userDoc.data());
    return docSnap;
};


export const onGetPost = async (callback) => {
    const currentPost = await onSnapshot(collection(db, "posts"),
        (callback))
};

export const deletePost = id => deleteDoc(doc(db, 'posts', id));

export const gettingPost = id => getDoc(doc(db, 'posts', id));

export const gettingPostLike = id => getDoc(doc(db, 'posts', id));

export const editPost = (id, changePost) => updateDoc(doc(db, 'posts', id), { "newpost": changePost });

export const addLike = (id, changePost) => updateDoc(doc(db, 'posts', id), { "like": changePost });
