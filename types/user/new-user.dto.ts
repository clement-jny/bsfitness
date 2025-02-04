import { TUser } from './user';

type TNewUserDTO = Omit<TUser, 'docUid' | 'createdAt' | 'updatedAt'> & {};

export { TNewUserDTO };
