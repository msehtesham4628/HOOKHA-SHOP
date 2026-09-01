'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/lib/store/cart'
import { useWishlist } from '@/lib/store/wishlist'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product & {
    images: Array<{ imageUrl: string; altText?: string }>
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const addItem = useCart((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const primaryImage = product.images[0]?.imageUrl || '/placeholder.jpg'
  const discount = product.salePrice
    ? calculateDiscount(product.price, product.salePrice)
    : 0

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity: 1,
      price: product.salePrice || product.price,
      name: product.name,
      image: primaryImage,
    })
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  return (
    <Link href={`/product/${product.slug}`}>
      <div
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-charcoal">
          <Image
            src={primaryImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-smooth"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            {product.isBestseller && (
              <span className="inline-block bg-gold text-midnight px-3 py-1 rounded text-xs font-bold">
                BESTSELLER
              </span>
            )}
            {product.isNew && (
              <span className="inline-block bg-rose text-white px-3 py-1 rounded text-xs font-bold">
                NEW
              </span>
            )}
            {discount > 0 && (
              <span className="inline-block bg-rose text-white px-3 py-1 rounded text-xs font-bold">
                -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              handleWishlist()
            }}
            className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur rounded-full hover:bg-white/20 transition-colors"
          >
            <span className={inWishlist ? '❤️' : '🤍'}>
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-gold mb-2 uppercase tracking-wide">
            {product.brand?.name || 'Unknown Brand'}
          </p>

          <h3 className="text-sm font-semibold mb-2 line-clamp-2 group-hover:text-gold transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs">⭐</span>
              <span className="text-xs text-gray-400">
                {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg font-bold text-gold">
              {formatPrice(product.salePrice || product.price)}
            </span>
            {product.salePrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <p className="text-xs mb-4">
            <span className={product.stock > 0 ? 'text-success' : 'text-error'}>
              {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
            </span>
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              handleAddToCart()
            }}
            disabled={product.stock === 0}
            className="w-full btn btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </Link>
  )
}
