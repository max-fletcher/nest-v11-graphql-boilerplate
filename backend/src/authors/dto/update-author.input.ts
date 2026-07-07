import { CreateAuthorInput } from './create-author.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @Field(() => ID)
  id!: string;

  // because of partial type used above, we automatically get the line below from ./create-author.input without copying them
  // @Field({ description: 'Author name' })
  // name!: string;
}
