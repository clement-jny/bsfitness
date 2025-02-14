import { TNewUserDTO } from './new-user.dto';

type TUpdateUserDTO = Partial<Omit<TNewUserDTO, 'authUid'>> & {};

export { TUpdateUserDTO };
