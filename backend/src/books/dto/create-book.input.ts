import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookInput {
  @Field({ description: 'Book title' })
  title!: string;

  @Field({ description: 'Foreign key to book author' })
  author!: string;
}
