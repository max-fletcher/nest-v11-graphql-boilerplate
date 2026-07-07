import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';

@ObjectType()
export class Book {
  @Field(() => ID)
  id!: string;

  @Field({ description: 'Book title' })
  title!: string;

  @Field({ description: 'Foreign key to book author' })
  authorId!: string;

  @Field(() => Author)
  author?: Author;
}
