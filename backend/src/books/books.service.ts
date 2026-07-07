import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(input: CreateBookInput) {
    return this.prisma.book.create({ data: input });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} book`;
  }

  update(id: string, updateBookInput: UpdateBookInput) {
    return `This action updates a #${id} book`;
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.book.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
