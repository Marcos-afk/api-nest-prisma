import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  public async findAll() {
    return await this.repository.findAll();
  }

  public async findById(id: number) {
    return await this.repository.findById(id);
  }

  public async create(createUserDto: CreateUserDto) {
    return await this.repository.create(createUserDto);
  }

  public async update(id: number, updateUserDto: CreateUserDto) {
    return await this.repository.update(id, updateUserDto);
  }

  public async delete(id: number) {
    return await this.repository.remove(id);
  }
}
