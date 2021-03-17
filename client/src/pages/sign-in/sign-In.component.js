import React from 'react';
import CustomButton from '../../components/custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.styles.scss';

export default function SignInPage() {
  return (
    <div className='sign-in'>
      <h1 className = 'title'>Sign In</h1>
      <CustomButton isGoogleSignIn
              onClick={() => {
                  signInWithGoogle()
              }}
          >
        Sign in with Google
        </CustomButton>
    </div>
  )
}
