import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => ID)
  id!: number;

  @Field()
  title!: string;

  @Field()
  author!: string;
}
