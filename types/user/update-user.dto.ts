import { TNewUserDTO } from './new-user.dto';

// type TUpdateUserDTO = Partial<TNewUserDTO> & {
//   docUid: string; // ID Firestore du document utilisateur (uid2)
// };
type TUpdateUserDTO = Partial<TNewUserDTO> & {};
// type TUpdateUserDTO = Partial<Omit<TNewUserDTO, 'authUid' | 'email'>> & {};

export { TUpdateUserDTO };
