import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    const users = await this.prisma.users.findMany();

    if (users.length === 0) {
      throw new HttpException('Não há usuários cadastrados.', HttpStatus.NOT_FOUND);
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
      throw new HttpException('Código de identificação de usuário inválido.', HttpStatus.NOT_FOUND);
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
      throw new HttpException('Usuário com esse email já foi cadastrado.', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Código de identificação de usuário inválido.', HttpStatus.NOT_FOUND);
    }

    const isExistEmail = await this.prisma.users.findUnique({ where: { email } });
    if (isExistEmail && isExistEmail.id !== id) {
      throw new HttpException('Usuário com esse email já foi cadastrado.', HttpStatus.BAD_REQUEST);
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
      throw new HttpException('Código de identificação de usuário inválido.', HttpStatus.NOT_FOUND);
    }

    return this.prisma.users.delete({
      where: {
        id,
      },
    });
  }
}
