import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { errorAlert, successAlert } from '../functions/alert.functions';
import { addMemberToTeam, getAllMembersFromDatabase, removeMemberFromTeam } from '../firebase/firebase.utils';
import { UserContext } from './userContext';
export const APIContext = createContext();

const APIProvider = props => {
    const [membersName, setMembersName] = useState([]);
    const {user} = useContext(UserContext);
    let getUser;
    
    // HEADER CONTAILS GITHUB AUTHORIZATION TOKEN
    const config = {
        headers: { 
            Authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_TOKEN}` 
        }
    };
    
    // GET MEMBER FROM DATABASE TO REACT STATE
    const member = async () => {
        let arr = [];
        const userRef = await (getAllMembersFromDatabase(user.uid))
        getUser = userRef.get().then(() => {
            userRef.onSnapshot((data) => {
                console.log('data = ', data);
                data.forEach((snap) => {
                    arr.push({
                        id: snap.id,
                        name: snap.data().name,
                        image: snap.data().image
                    });
                    // console.log('snap = ',snap.data())
                })
                setMembersName([...arr]);
            })
        });
    }
    
    // GET ALL MEMBERS OF THE ORGANIZATION
    function getAllMembers(){
        const allMembers = process.env.REACT_APP_GITHUB_ORG_MEMBERS;
        // console.log(allMembers)
        axios.get(allMembers, config)
            .then(response => {
                // console.log(response.data);
                console.log('user',user.uid);
                response.data.map((data) => {
                    addMemberToTeam(data,user.uid,data.id);
    
                });
                member()
                // console.log('arr: ', arr);
                // console.log('membersName ', membersName);
            }).catch(error => {
                console.log(error);
            })
        
    }
    
    // SEND INVITATION FOR JOINING THE ORGANIZATION
    function sendInvitation(email){
        const inviteMemberAPI = process.env.REACT_APP_GITHUB_ORG_MEMBERS_INVITE;
        const data = {
            "email": email
        }
        axios.post(inviteMemberAPI,data,config)
            .then(response =>{
                successAlert('Invitation mail sent')
            })
            .catch(error => {
                errorAlert('Error Sending Invitation')
            })
    }
    
    // REMOVE MEMBER FROM THE ORGANIZATION
    function removeMemberFromOrganization(name,id){
        const removeMemberAPI = process.env.REACT_APP_GITHUB_ORG_MEMBERS_REMOVE.replace('<USERNAME>',name);
        axios.delete(removeMemberAPI, config)
            .then(response=>{
                successAlert('Remove from ORGANIZATION');
                removeMemberFromTeam(user.uid,id);
                member();
            }).catch(error=>{
                errorAlert('Error removing')
            })
    }
    
    return (
        <APIContext.Provider value={{membersName,getAllMembers,sendInvitation,removeMemberFromOrganization}}>
            {props.children}
        </APIContext.Provider>
    )
}



export default APIProvider;

