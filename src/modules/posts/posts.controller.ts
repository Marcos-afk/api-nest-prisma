import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Patch, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('posts')
@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({ status: 404, description: 'Posts not found' })
  @Get()
  async findAll(@Res() res: Response) {
    const posts = await this.postsService.findAll();
    return res.status(HttpStatus.OK).json(posts);
  }

  @ApiResponse({ status: 404, description: 'Posts not found' })
  @Get(':id')
  async findById(@Param('id') id: number, @Res() res: Response) {
    const post = await this.postsService.findById(id);
    return res.status(HttpStatus.OK).json(post);
  }

  @ApiResponse({ status: 404, description: 'Author not found' })
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    const post = await this.postsService.create(createPostDto);
    return res.status(HttpStatus.CREATED).json({ message: 'Post criado com sucesso!', post });
  }

  @ApiResponse({ status: 404, description: 'Posts not found/Author not found' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto, @Res() res: Response) {
    const post = await this.postsService.update(id, updatePostDto);
    return res.status(HttpStatus.OK).json({ message: 'Post atualizado com sucesso!', post });
  }

  @ApiResponse({ status: 404, description: 'Posts not found' })
  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    await this.postsService.delete(id);
    return res.status(HttpStatus.OK).json({ message: 'Post removido com sucesso!' });
  }
}
