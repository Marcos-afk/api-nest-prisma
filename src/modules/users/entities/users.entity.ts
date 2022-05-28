import { Users } from '@prisma/client';

export class UserEntity implements Users {
  id: number;
  email: string;
  name: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
