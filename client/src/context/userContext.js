import React, { createContext, useState, useEffect } from 'react';
import { auth, createUserProfileDocument } from '../firebase/firebase.utils';

export const UserContext = createContext();

const UserProvider = (props) => {
    const [user, setUser] = useState(null);
    let getUser;
    useEffect( ()=>{
        try {
            auth.onAuthStateChanged(userAuth=>{
                if(userAuth){
                    const details = async()=>{
                        getUser = await (await (await createUserProfileDocument(userAuth)).get()).data();
                    }
                    details();
                    setUser(userAuth);
                } else {
                    setUser(null);
                }
            })
        } catch (error) {
            console.error(error)
        }
    },[user])
    
    return (
        <UserContext.Provider value={{user}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider