import { FieldValue } from 'firebase/firestore';
import { TUser } from './user';

type TNewUserDTO = Omit<TUser, 'id' | 'createdAt'> & {
  createdAt: FieldValue;
};

export { TNewUserDTO };
