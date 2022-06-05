import { Injectable } from '@nestjs/common';
import { DataBaseError } from 'src/common/errors/types/DataBaseError';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    const users = await this.prisma.users.findMany();

    if (users.length === 0) {
      throw new NotFoundError('Não há usuários cadastrados.');
    }

    return users;
  }

  public async findById(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('Código de identificação de usuário inválido.');
    }

    return user;
  }

  public async create(createUserDto: CreateUserDto) {
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

  public async update(id: number, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundError('Código de identificação de usuário inválido.');
    }

    const isExistEmail = await this.prisma.users.findUnique({ where: { email } });
    if (isExistEmail && isExistEmail.id !== id) {
      throw new DataBaseError('Usuário com esse email já foi cadastrado.');
    }

    return this.prisma.users.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  public async remove(id: number) {
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
