import { firebaseConfig } from '@/utils';
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = (email: string, password: string) => {
  // signInWithEmailAndPassword(firebaseConfig.auth, email, password);

  return true;
};

export { login };
