import { firebaseConfig } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { user } from '../db';
import { type TUser } from '@/types';

type TRegisterReturn = {
  success: boolean;
  user?: object;
  errorCode?: string;
};

const register = async (
  email: string,
  password: string,
  newUserData: TUser
): Promise<TRegisterReturn> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      firebaseConfig.auth,
      email,
      password
    );

    console.log('Register :: userCredential', userCredential);
    console.log('Register :: userCredential.user', userCredential.user);

    // const uid = userCredential.user.uid;
    // TODO: save uid into AuthContext
    console.log('Register :: newUserData', newUserData);
    console.log('Register :: userCredential.user.uid', userCredential.user.uid);

    // TODO: pass the uid to the user.create method
    await user.create(newUserData);

    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error: unknown) {
    const err = error as FirebaseError;

    console.error('Register :: code:', err.code);

    return {
      success: false,
      errorCode: err.code,
    };
  }
};

export { register };
