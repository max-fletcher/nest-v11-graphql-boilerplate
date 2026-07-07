import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';

@Resolver(() => Book)
export class BooksResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
  ) {}

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.booksService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  // #pending
  @Query(() => Book, { name: 'book', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.booksService.findOne(id);
  }

  // #pending
  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => ID }) id: string) {
    return this.booksService.remove(id);
  }

  @ResolveField(() => Author)
  author(@Parent() book: Book) {
    return this.authorsService.findOne(book.authorId);
  }
}
