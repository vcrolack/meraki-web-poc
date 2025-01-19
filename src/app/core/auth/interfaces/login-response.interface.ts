import { Role } from '../../../features/users/interfaces/role.interface';

export interface LoginResponse {
  id: string;
  name: string;
  lastName: string;
  nickname: string;
  pfpUrl: string;
  role: Role;
  token: string;
}
