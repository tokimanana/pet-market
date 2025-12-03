import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class Product {
  @Field(() => String)
  id!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })  // ← Ajouté
  description?: string;

  @Field(() => Float)
  price!: number;

  @Field({ nullable: true })  // ← Ajouté
  image?: string;

  @Field({ nullable: true })  // ← Ajouté
  stripePriceId?: string;

  @Field(() => Boolean, { nullable: true })  // ← Ajouté nullable
  isFeatured?: boolean;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}