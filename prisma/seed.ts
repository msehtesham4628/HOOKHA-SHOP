import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create categories
  const tobaccoCategory = await prisma.category.create({
    data: {
      name: 'Tobacco',
      slug: 'tobacco',
      description: 'Premium shisha tobacco varieties',
      order: 1,
    },
  })

  const hookahsCategory = await prisma.category.create({
    data: {
      name: 'Hookahs',
      slug: 'hookahs',
      description: 'Premium hookah pipes and equipment',
      order: 2,
    },
  })

  const accessoriesCategory = await prisma.category.create({
    data: {
      name: 'Accessories',
      slug: 'accessories',
      description: 'Hookah accessories and supplies',
      order: 3,
    },
  })

  // Create brands
  const mustHaveBrand = await prisma.brand.create({
    data: {
      name: 'MustHave',
      slug: 'musthave',
      description: 'Premium Russian tobacco brand',
    },
  })

  const alphaBrand = await prisma.brand.create({
    data: {
      name: 'Alpha Hookah',
      slug: 'alpha-hookah',
      description: 'High-quality hookah manufacturer',
    },
  })

  // Create sample products
  const product1 = await prisma.product.create({
    data: {
      name: 'MustHave - Dark Mix',
      slug: 'musthave-dark-mix',
      sku: 'MH-DM-001',
      description: 'Premium dark mix shisha tobacco with rich flavor profile',
      shortDescription: 'Dark Mix Premium Tobacco 25g',
      price: 8.99,
      salePrice: 6.99,
      brandId: mustHaveBrand.id,
      categoryId: tobaccoCategory.id,
      stock: 50,
      rating: 4.8,
      reviewCount: 24,
      tags: ['premium', 'dark', 'russian'],
      status: 'ACTIVE',
      isFeatured: true,
      isNew: true,
      isBestseller: true,
    },
  })

  const product2 = await prisma.product.create({
    data: {
      name: 'Alpha Hookah - Premium Glass',
      slug: 'alpha-hookah-premium-glass',
      sku: 'AH-PG-001',
      description: 'Beautiful hand-blown glass hookah with premium build quality',
      shortDescription: 'Premium Glass Hookah',
      price: 149.99,
      brandId: alphaBrand.id,
      categoryId: hookahsCategory.id,
      stock: 15,
      rating: 4.9,
      reviewCount: 42,
      tags: ['premium', 'glass', 'handmade'],
      status: 'ACTIVE',
      isFeatured: true,
      isNew: false,
      isBestseller: true,
      material: 'Glass',
      weight: 800,
    },
  })

  // Create site settings
  await prisma.siteSettings.create({
    data: {
      siteName: 'HOOKHA SHOP',
      siteUrl: 'https://hookha-shop.com',
      minAge: 21,
      email: 'support@hookha-shop.com',
      phone: '+1-800-HOOKAH-1',
      currency: 'USD',
      freeShippingThreshold: 100,
      enableWholesale: true,
      enableReviews: true,
      enableWishlist: true,
    },
  })

  console.log('✅ Database seeding completed!')
  console.log(`\n📊 Created:`)
  console.log(`  - 3 Categories`)
  console.log(`  - 2 Brands`)
  console.log(`  - 2 Products`)
  console.log(`  - 1 Site Settings`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
