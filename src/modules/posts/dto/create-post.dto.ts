import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'O tipo do campo titulo deve ser uma string' })
  @IsNotEmpty({ message: 'Campo titulo é requerido' })
  @MinLength(5, { message: 'Campo titulo abaixo do mínimo de caracteres permitido(5)' })
  @MaxLength(200, { message: 'Campo titulo acima do máximo de caracteres permitido(200)' })
  title: string;

  @IsString({ message: 'O tipo do campo conteúdo deve ser uma string' })
  @IsOptional()
  @MinLength(5, { message: 'Campo conteúdo abaixo do mínimo de caracteres permitido(5)' })
  @MaxLength(200, { message: 'Campo conteúdo acima do máximo de caracteres permitido(200)' })
  content: string;

  @IsBoolean({ message: 'O tipo do campo publicado deve ser um boleano' })
  @IsOptional()
  published: boolean;

  @IsNumber({}, { message: 'O tipo do campo autorId deve ser um número' })
  @IsNotEmpty({ message: 'Campo autorId é requerido' })
  authorId: number;
}
