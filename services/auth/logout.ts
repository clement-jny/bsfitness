import { firebaseConfig } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { signOut } from 'firebase/auth';
import { type TAuthReturn } from '@/types';
import { error } from '@/managers';

const logout = async (): Promise<TAuthReturn> => {
  try {
    await signOut(firebaseConfig.auth);

    console.log('Logout :: User signed out');

    return {
      success: true,
      message: 'Logout successful!',
    };
  } catch (e: unknown) {
    const err = e as FirebaseError;

    console.log('Logout :: code:', err.code);
    console.log('[error logging out] ==>', err);

    return {
      success: false,
      message: error.getFirebaseErrorMessage(err.code),
    };
  }
};

export { logout };
