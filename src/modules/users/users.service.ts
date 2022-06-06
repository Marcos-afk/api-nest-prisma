import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  findById(id: number) {
    return this.repository.findById(id);
  }

  create(createUserDto: CreateUserDto) {
    return this.repository.create(createUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  delete(id: number) {
    return this.repository.remove(id);
  }
}
