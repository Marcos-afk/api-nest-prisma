import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const posts = await this.prisma.posts.findMany({
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (posts.length === 0) {
      throw new NotFoundError('Não há posts cadastrados.');
    }

    return posts;
  }

  async findById(id: number) {
    const post = await this.prisma.posts.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundError('Código de identificação de post inválido.');
    }

    return post;
  }

  async create(createPostDto: CreatePostDto) {
    const { authorId } = createPostDto;
    const author = await this.prisma.users.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!author) {
      throw new NotFoundError('Autor não encontrado.');
    }

    return this.prisma.posts.create({
      data: createPostDto,
    });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { authorId } = updatePostDto;

    if (authorId) {
      const author = await this.prisma.users.findUnique({
        where: {
          id: authorId,
        },
      });

      if (!author) {
        throw new NotFoundError('Autor não encontrado.');
      }
    }

    const post = await this.prisma.posts.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundError('Código de identificação de post inválido.');
    }

    return this.prisma.posts.update({
      where: {
        id,
      },
      data: updatePostDto,
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async delete(id: number) {
    const post = await this.prisma.posts.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundError('Código de identificação de post inválido.');
    }

    return this.prisma.posts.delete({
      where: {
        id,
      },
    });
  }
}
