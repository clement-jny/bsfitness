import { firebaseConfig } from '@/utils';
import { signOut } from 'firebase/auth';

const logout = () => {
  // signOut(firebaseConfig.auth);

  return true;
};

export { logout };
