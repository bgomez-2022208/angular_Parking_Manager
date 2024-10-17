import { Profile } from './profile.model';

export interface User {
  userId: number;
  name: string;
  surname: string;
  age: number;
  dpi: string;
  email: string;
  password: string;
  status: boolean;
  idProfile: Profile;
}
