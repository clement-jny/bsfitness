import { firebaseConfig } from '@/utils';
import { FirebaseError } from 'firebase/app';
import { signOut } from 'firebase/auth';

// TODO: common return type for auth.login/register/logout?
type TLogoutReturn = {
  success: boolean;
  user?: object;
  errorCode?: string;
};

const logout = async (): Promise<TLogoutReturn> => {
  try {
    await signOut(firebaseConfig.auth);

    console.log('Logout :: User signed out');

    return {
      success: true,
    };
  } catch (error: unknown) {
    const err = error as FirebaseError;

    console.error('Logout :: code:', err.code);

    return {
      success: false,
      errorCode: err.code,
    };
  }
};

export { logout };
