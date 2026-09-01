import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: {
        brand: true,
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        reviews: {
          where: { status: 'APPROVED' },
          take: 10,
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      )
    }

    // Get related products
    const related = await prisma.product.findMany({
      where: {
        AND: [
          { id: { not: product.id } },
          {
            OR: [
              { brandId: product.brandId },
              { categoryId: product.categoryId },
            ],
          },
        ],
      },
      take: 8,
      include: {
        brand: true,
        category: true,
        images: {
          where: { isPrimary: true },
          take: 1,
        },
      },
    })

    return NextResponse.json({
      success: true,
      data: product,
      related,
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
