import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field({ description: 'Author name' })
  name!: string;
}
