import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  public async findAll() {
    return this.postsRepository.findAll();
  }

  public async findById(id: number) {
    return this.postsRepository.findById(id);
  }

  public async create(createPostDto: CreatePostDto) {
    return this.postsRepository.create(createPostDto);
  }

  public async update(id: number, updatePostDto: UpdatePostDto) {
    return this.postsRepository.update(id, updatePostDto);
  }

  public async delete(id: number) {
    return this.postsRepository.delete(id);
  }
}
