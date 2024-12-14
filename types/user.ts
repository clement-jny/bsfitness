import { FieldValue } from 'firebase/firestore';

type TUser = {
  email: string;
  password: string;

  lastname: string;
  firstname: string;

  createdAt: FieldValue;
  updatedAt: FieldValue;
};

export { TUser };
