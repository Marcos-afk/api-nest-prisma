import { Injectable } from '@nestjs/common';
import { DataBaseError } from 'src/common/errors/types/DataBaseError';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.users.findMany({
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });

    if (users.length === 0) {
      throw new NotFoundError('Não há usuários cadastrados.');
    }

    return users;
  }

  async findById(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
      include: {
        posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('Código de identificação de usuário inválido.');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const isExistEmail = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (isExistEmail) {
      throw new DataBaseError('Usuário com esse email já foi cadastrado.');
    }

    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('Código de identificação de usuário inválido.');
    }

    if (email) {
      const isExistEmail = await this.prisma.users.findUnique({ where: { email } });
      if (isExistEmail && isExistEmail.id !== id) {
        throw new DataBaseError('Usuário com esse email já foi cadastrado.');
      }
    }

    return this.prisma.users.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('Código de identificação de usuário inválido.');
    }

    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
