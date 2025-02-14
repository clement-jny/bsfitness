import { firebaseConfig } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { user } from '../db';
import { type TNewUserDTO } from '@/types';

// TODO: common return type for auth.login/register/logout?
type TRegisterReturn = {
  success: boolean;
  user?: object;
  errorCode?: string;
};

const register = async (
  email: string,
  password: string,
  newUserData: Pick<TNewUserDTO, 'lastname' | 'firstname'>
): Promise<TRegisterReturn> => {
  try {
    // INFO: trigger AuthContext and save userUid
    // TODO: don't want to trigger the context now
    const userCredential = await createUserWithEmailAndPassword(
      firebaseConfig.auth,
      email,
      password
    );

    console.log('Register :: userCredential', userCredential);
    console.log('Register :: userCredential.user', userCredential.user);

    // TODO: save uid into AuthContext
    console.log('Register :: newUserData', newUserData);
    console.log('Register :: userCredential.user.uid', userCredential.user.uid);

    const newUser: TNewUserDTO = {
      authUid: userCredential.user.uid,
      ...newUserData,
      email,
    };

    const docUid = await user.create(newUser);

    return {
      success: true,
      user: userCredential.user,
      errorCode: docUid ?? '',
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
