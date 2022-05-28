import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository],
})
export class UsersModule {}
