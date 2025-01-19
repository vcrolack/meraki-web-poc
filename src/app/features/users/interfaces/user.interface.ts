import { Role } from './role.interface';

export interface User {
  id: string;
  name: string;
  lastName: string;
  phone: string;
  birthDate: string;
  email: string;
  password: string;
  nickname: string;
  pfpUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  role: Role;
}
