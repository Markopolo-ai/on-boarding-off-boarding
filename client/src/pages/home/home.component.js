import React, {Fragment, useContext,useEffect} from 'react';
import CardComponent from '../../components/card/card.component';
import InvitationComponent from '../../components/invitation/invitation.component';
import UserComponent from '../../components/user/user.component';
import { APIContext } from '../../context/apiContext';

import './home.styles.scss';

export default function HomePage() {
  const {membersName,getAllMembers} = useContext(APIContext);
  
  useEffect(()=>{
    getAllMembers();
  },[])
  
  return (
    <Fragment>
        <UserComponent/>
        <div>
          <InvitationComponent/>
         {membersName !== undefined ? 
            <div>{
                membersName.map((response) => {
                    return <CardComponent key={response.id} id = {response.id} name={response.name} image = {response.image} />
                })}
                </div> 
                : 
                null}</div>
    </Fragment>
  );
}
