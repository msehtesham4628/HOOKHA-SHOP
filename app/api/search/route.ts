import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')

    if (!q || q.length < 2) {
      return NextResponse.json({
        success: true,
        data: {
          products: [],
          brands: [],
          categories: [],
        },
      })
    }

    const [products, brands, categories] = await Promise.all([
      prisma.product.findMany({
        where: {
          AND: [
            { status: 'ACTIVE' },
            {
              OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
                { tags: { hasSome: [q] } },
              ],
            },
          ],
        },
        take: 5,
        include: {
          brand: true,
          images: { where: { isPrimary: true }, take: 1 },
        },
      }),
      prisma.brand.findMany({
        where: {
          name: { contains: q, mode: 'insensitive' },
        },
        take: 5,
      }),
      prisma.category.findMany({
        where: {
          name: { contains: q, mode: 'insensitive' },
        },
        take: 5,
      }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        products,
        brands,
        categories,
      },
    })
  } catch (error) {
    console.error('Error searching:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search' },
      { status: 500 }
    )
  }
}
