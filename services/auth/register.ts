import { firebaseConfig } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { user } from '../db';
import { type TAuthReturn, type TNewUserDTO } from '@/types';
import { error } from '@/managers';

const register = async (
  email: string,
  password: string,
  newUserData: Pick<TNewUserDTO, 'lastname' | 'firstname'>
): Promise<TAuthReturn> => {
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
      message: 'Register successful',
      data: {
        user: userCredential.user,
        docUid,
      },
    };
  } catch (e: unknown) {
    const err = e as FirebaseError;

    console.log('Register :: code:', err.code);
    console.log('[error registering] ==>', err);

    return {
      success: false,
      message: error.getFirebaseErrorMessage(err.code),
    };
  }
};

export { register };
