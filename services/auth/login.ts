import { firebaseConfig } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';

type TLoginReturn = {
  success: boolean;
  user?: object;
  errorCode?: string;
};

const login = async (
  email: string,
  password: string
): Promise<TLoginReturn> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseConfig.auth,
      email,
      password
    );

    // TODO: remove these console.log and remove the returned user. User will be add in the AuthContext
    // console.log('Login :: userCredential', userCredential);
    // console.log('Login :: userCredential.user', userCredential.user);

    return {
      success: true,
      user: userCredential.user,
    };
  } catch (error: unknown) {
    const err = error as FirebaseError;

    console.error('Login :: code:', err.code);

    return {
      success: false,
      errorCode: err.code,
    };
  }
};

export { login };
