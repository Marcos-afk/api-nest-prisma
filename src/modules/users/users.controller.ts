import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':id')
  public async findBydId(@Param('id') id: number, @Res() res: Response) {
    const user = await this.usersService.findById(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  public async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ message: 'Usuário cadastrado com sucesso!', user });
  }

  @Patch(':id')
  public async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const user = await this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).json({ message: 'Usuário atualizado com sucesso!', user });
  }

  @Delete(':id')
  public async delete(@Param('id') id: number, @Res() res: Response) {
    await this.usersService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Usuário removido com sucesso!' });
  }
}
