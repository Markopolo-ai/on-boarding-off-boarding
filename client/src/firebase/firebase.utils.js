import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDEER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

// CREATE AND GET ADMIN INFO
export const createUserProfileDocument = async (userAuth) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`manager/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email,photoURL } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                createdAt,
            });
        } catch (error) {
            console.log('error creating user ', error.message);
        }
    }

    return userRef;
}

// ADD NEW MEMBER TO THE DATABASE WHEN APPLICATION LOADS
export const addMemberToTeam = async (data, adminId,memberId) => {
    return await firestore.collection('members').doc(`${adminId}`).collection('member').doc(`${memberId}`).set({
        name:data.login,
        image: data.avatar_url
    },{
        merge:true
    });
}

// GET MEMBBERS OF THE ORGANIZATION FROM THE DATABASE
export const getAllMembersFromDatabase = async (adminId) => {
    return await firestore.collection('members').doc(`${adminId}`).collection('member');
}

// REMOVE MEMBER FROM DATABASE AFTER REMOVING FROM ORGANIZATION
export const removeMemberFromTeam = async (adminId,memberId) => {
    return await firestore.collection('members').doc(`${adminId}`).collection('member').doc(`${memberId}`).delete();
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;