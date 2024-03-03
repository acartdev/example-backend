import { Role } from '../entities/userType';

export class CreateUserDto {
  u_id: number;
  name: string;
  email: string;
  role: Role;
  create_at: Date;
  isActive: boolean;
  password: string;
}
