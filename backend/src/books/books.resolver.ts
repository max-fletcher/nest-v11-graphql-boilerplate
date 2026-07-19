import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Author } from 'src/authors/entities/author.entity';
import { AuthorsService } from 'src/authors/authors.service';
import DataLoader from 'dataloader';

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

  @Query(() => Book, { name: 'book', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.booksService.update(updateBookInput.id, updateBookInput);
  }

  // @Mutation(() => Book) // #NOTE: Do this later maybe
  @Mutation(() => Boolean)
  removeBook(@Args('id', { type: () => ID }) id: string) {
    return this.booksService.remove(id);
  }

  // @ResolveField(() => Author)
  // author(@Parent() book: Book) {
  //   return this.authorsService.findOne(book.authorId);
  // }

  // Using DataLoader instead of the manual query above
  @ResolveField(() => Author)
  author(
    @Parent() book: Book,
    @Context('authorLoader') authorLoader: DataLoader<string, Author | null>, // the string is the id type, and the Author | null is the return type
  ) {
    return authorLoader.load(book.authorId);
  }
}
