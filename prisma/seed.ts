import { PrismaClient } from '@prisma/client';
import { productsList } from './productsLists';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Check existing products
  const existingProducts = await prisma.product.findMany({
    select: { stripePriceId: true },
  });
  const existingPriceIds = new Set(
    existingProducts.map((p: { stripePriceId: string }) => p.stripePriceId)
  );

  console.log({ existingProducts });
  console.log({ productsList });

  // Create only products that don't exist
  for (const product of productsList) {
    if (!existingPriceIds.has(product.stripePriceId)) {
      await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          stripePriceId: product.stripePriceId,
          isFeatured: product.isFeatured,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
      });
      console.log(`Created product: ${product.name}`);
    } else {
      console.log(`Skipping existing product: ${product.name}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });