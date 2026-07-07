import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => ID)
  id!: string;

  @Field({ description: 'Author name' })
  name!: string;
}
