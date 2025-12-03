import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field({ description: 'Product name' })
  name!: string;

  @Field({ nullable: true, description: 'Product description' })
  description?: string;

  @Field(() => Float, { description: 'Product price' })
  price!: number;

  @Field({ nullable: true, description: 'Product image URL' })
  image?: string;

  @Field({ nullable: true, description: 'Stripe price ID' })
  stripePriceId?: string;

  @Field(() => Boolean, { 
    nullable: true, 
    defaultValue: false,
    description: 'Is product featured?' 
  })
  isFeatured?: boolean;
}