import { firebaseConfig } from '@/utils';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '@/services';
import { type TUser } from '@/types';

const { user } = db;

const register = async (
  email: string,
  password: string,
  newUserData: TUser
) => {
  // const userCredential = await createUserWithEmailAndPassword(
  //   firebaseConfig.auth,
  //   email,
  //   password
  // );

  // const uid = userCredential.user.uid;
  // user.create({ uid, ...newUserData });

  return true;
};

export { register };
