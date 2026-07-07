import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  create(input: CreateAuthorInput) {
    return this.prisma.author.create({ data: input });
  }

  findAll() {
    return this.prisma.author.findMany();
  }

  findOne(id: string) {
    return this.prisma.author.findUnique({ where: { id } });
  }

  update(id: string, data: Omit<UpdateAuthorInput, 'id'>) {
    return this.prisma.author.update({ where: { id }, data });
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prisma.author.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
