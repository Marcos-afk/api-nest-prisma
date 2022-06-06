import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User name', example: 'John Doe' })
  @IsString({ message: 'O tipo do campo nome deve ser uma string' })
  @IsNotEmpty({ message: 'Campo nome é requerido' })
  @MinLength(3, { message: 'Campo nome abaixo do mínimo de caracteres permitido(3)' })
  @MaxLength(50, { message: 'Campo nome acima do máximo de caracteres permitido(50)' })
  name: string;

  @ApiProperty({ description: 'User email', example: 'someone@example.com' })
  @IsEmail({}, { message: 'Formato de email inválido' })
  @IsNotEmpty({ message: 'Campo email é requerido' })
  @MinLength(5, { message: 'Campo email abaixo do mínimo de caracteres permitido(5)' })
  @MaxLength(100, { message: 'Campo email acima do máximo de caracteres permitido(100)' })
  email: string;

  @ApiProperty({ description: 'User admin', example: true })
  @IsBoolean({ message: 'O tipo do campo isAdmin deve ser um boleano' })
  @IsOptional()
  isAdmin: boolean;
}
