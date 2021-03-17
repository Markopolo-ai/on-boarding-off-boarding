import React, {useContext} from 'react';
import { UserContext } from '../../context/userContext';
import { auth } from '../../firebase/firebase.utils';
import CustomButton from '../custom-button/custom-button.component';

import './user.styles.scss';

export default function UserComponent() {
    const {user} = useContext(UserContext);
    const { photoURL, displayName, email } = user;
  return (
      <div>
          <div className= 'wrapper'>
              <div className='container'>
                  <div
                    className='image'
                      style={{
                          background:
                              `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`
                      }}
                  ></div>
                  <div className='info'>
                      <h2 className='name'>{displayName}</h2>
                      <h3 className='mail'>{email}</h3>
                  </div>
              </div>
              <CustomButton 
                onClick={() => { auth.signOut(); }}
                >SIGN OUT
                </CustomButton>
          </div>
      </div>
  );
}
