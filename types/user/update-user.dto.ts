import { TNewUserDTO } from './new-user.dto';

type TUpdateUserDTO = Partial<Omit<TNewUserDTO, 'authUid' | 'email'>> & {
  email: string;
};

export { TUpdateUserDTO };
