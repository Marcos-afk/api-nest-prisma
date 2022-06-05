import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Patch, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public async findAll(@Res() res: Response) {
    const posts = await this.postsService.findAll();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Get(':id')
  public async findById(@Param('id') id: number, @Res() res: Response) {
    const post = await this.postsService.findById(id);
    return res.status(HttpStatus.OK).json(post);
  }

  @Post()
  public async create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    const post = await this.postsService.create(createPostDto);
    return res.status(HttpStatus.CREATED).json({ message: 'Post criado com sucesso!', post });
  }

  @Patch(':id')
  public async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Res() res: Response) {
    const post = await this.postsService.update(id, updatePostDto);
    return res.status(HttpStatus.OK).json({ message: 'Post atualizado com sucesso!', post });
  }

  @Delete(':id')
  public async delete(@Param('id') id: number, @Res() res: Response) {
    await this.postsService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Post removido com sucesso!' });
  }
}
