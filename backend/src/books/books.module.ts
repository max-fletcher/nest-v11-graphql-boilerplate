import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { AuthorsModule } from 'src/authors/authors.module';

@Module({
  imports: [AuthorsModule],
  providers: [BooksResolver, BooksService],
})
export class BooksModule {}
