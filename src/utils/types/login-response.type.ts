import { User } from 'src/modules/users/entities/user.entity';

export type LoginResponseType = Readonly<{
  accessToken: string;
  refreshToken: string;
  user: User;
}>;
