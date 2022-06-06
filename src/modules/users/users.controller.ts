import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Patch, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 404, description: 'Users not found' })
  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findAll();
    return res.status(HttpStatus.OK).json(users);
  }

  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  async findBydId(@Param('id') id: number, @Res() res: Response) {
    const user = await this.usersService.findById(id);
    return res.status(HttpStatus.OK).json(user);
  }

  @ApiResponse({ status: 400, description: 'Email already in use' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const user = await this.usersService.create(createUserDto);
    return res.status(HttpStatus.CREATED).json({ message: 'Usuário cadastrado com sucesso!', user });
  }

  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Email already in use' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const user = await this.usersService.update(id, updateUserDto);
    return res.status(HttpStatus.OK).json({ message: 'Usuário atualizado com sucesso!', user });
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.usersService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Usuário removido com sucesso!' });
  }
}
