import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  findAll() {
    return this.postsRepository.findAll();
  }

  findById(id: number) {
    return this.postsRepository.findById(id);
  }

  create(createPostDto: CreatePostDto) {
    return this.postsRepository.create(createPostDto);
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postsRepository.update(id, updatePostDto);
  }

  delete(id: number) {
    return this.postsRepository.delete(id);
  }
}
