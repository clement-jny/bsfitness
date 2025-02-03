import { FieldValue } from 'firebase/firestore';
import { TNewUserDTO } from './new-user.dto';

type TUpdateUserDTO = Partial<TNewUserDTO> & {
  id: string; // ID Firestore du document utilisateur (uid2)
  updatedAt: FieldValue;
};

export { TUpdateUserDTO };
