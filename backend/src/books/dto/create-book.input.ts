import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field({ description: 'Book title' })
  title!: string;

  @Field(() => ID, { description: 'Foreign key to book author' })
  authorId!: string;
}
