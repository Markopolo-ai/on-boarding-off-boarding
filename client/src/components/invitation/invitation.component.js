import React, { useContext, useState } from 'react';
import { APIContext } from '../../context/apiContext';
import CustomButton from '../custom-button/custom-button.component';

import './invitation.styles.scss';

export default function InvitationComponent() {
  const { sendInvitation, } = useContext(APIContext);
  let editMail;
  const [mail,setMail] = useState('');
  const handleInvitation = event => {
    event.preventDefault();
    setMail('');
  }
  const handlechange = event => {
    editMail = event.target.value;
    setMail(editMail);
  }
  return (
    <form onSubmit={(event)=>{handleInvitation(event)}}>
      <div className="group">
        <input className='form-input'
          name='email'
          type='email'
          label='email'
          value={mail}
          onChange = {(event)=>{handlechange(event)}}
          required />
          <label className={` form-input-label`}>
            TYPE MAIL FOR INVITATION
          </label>
      </div>
      <CustomButton type="submit" onClick={() => { sendInvitation(mail)}}>INVITATION</CustomButton>
    </form>
  );
}
