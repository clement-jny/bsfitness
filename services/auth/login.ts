import { firebaseConfig } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, type User } from 'firebase/auth';
import { type TAuthReturn } from '@/types';
import { error } from '@/managers';

const login = async (email: string, password: string): Promise<TAuthReturn> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseConfig.auth,
      email,
      password
    );

    console.log('Login :: userCredential', userCredential);
    console.log('Login :: userCredential.user', userCredential.user);

    return {
      success: true,
      message: 'Login successful',
      data: { user: userCredential.user },
    };
  } catch (e: unknown) {
    const err = e as FirebaseError;

    console.log('Login :: code:', err.code);
    console.log('[error logging in] ==>', err);

    return {
      success: false,
      message: error.getFirebaseErrorMessage(err.code),
    };
  }
};

export { login };
