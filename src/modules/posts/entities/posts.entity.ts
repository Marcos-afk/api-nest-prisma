import { Posts } from '@prisma/client';

export class PostEntity implements Posts {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}
