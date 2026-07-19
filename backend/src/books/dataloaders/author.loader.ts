// books/dataloaders/author.loader.ts
import DataLoader from 'dataloader';
import { PrismaService } from '../../prisma/prisma.service';
import { Author } from 'src/authors/entities/author.entity';

export function createAuthorLoader(prisma: PrismaService) {
  return new DataLoader<string, Author | null>(async (authorIds) => {
    const authors = await prisma.author.findMany({
      where: { id: { in: authorIds as string[] } },
    });
    const authorMap = new Map(authors.map((a) => [a.id, a]));
    return authorIds.map((id) => authorMap.get(id) ?? null);
  });
}
