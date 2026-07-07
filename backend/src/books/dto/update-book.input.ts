import { CreateBookInput } from './create-book.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @Field(() => ID)
  id!: string;

  // because of partial type used above, we automatically get the line below from ./create-book.input without copying them
  // @Field({ description: 'Book title' })
  // title!: string;

  // @Field(() => ID, { description: 'Foreign key to book author' })
  // authorId!: string;
}
