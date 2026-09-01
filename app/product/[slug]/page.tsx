'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ImageGallery from '@/components/ImageGallery'
import ProductCard from '@/components/ProductCard'
import { useCart } from '@/lib/store/cart'
import { useWishlist } from '@/lib/store/wishlist'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import type { Product } from '@/types'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCart((state) => state.addItem)
  const { addItem: addToWishlist, isInWishlist } = useWishlist()
  const inWishlist = isInWishlist(params.slug)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.slug}`)
        const data = await res.json()
        if (data.success) {
          setProduct(data.data)
          setRelated(data.related)
        }
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [params.slug])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-midnight to-charcoal">
          <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-midnight to-charcoal">
          <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-gray-400">Product not found</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const discount = product.salePrice
    ? calculateDiscount(product.price, product.salePrice)
    : 0

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      quantity,
      price: product.salePrice || product.price,
      name: product.name,
      image: product.images[0]?.imageUrl || '/placeholder.jpg',
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-midnight to-charcoal">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-400">
            <span className="hover:text-gold cursor-pointer">Home</span>
            <span className="mx-2">/</span>
            <span className="hover:text-gold cursor-pointer">Shop</span>
            <span className="mx-2">/</span>
            <span className="text-gold">{product.name}</span>
          </div>

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Image Gallery */}
            <div>
              <ImageGallery images={product.images} />
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <p className="text-gold text-sm font-bold uppercase mb-2">
                  {product.brand.name}
                </p>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                {product.rating > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">⭐</span>
                    <span>{product.rating.toFixed(1)}</span>
                    <span className="text-gray-400">({product.reviewCount} reviews)</span>
                  </div>
                )}
              </div>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-bold text-gold">
                    {formatPrice(product.salePrice || product.price)}
                  </span>
                  {product.salePrice && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-lg font-bold text-rose">Save {discount}%</span>
                    </>
                  )}
                </div>
                <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-success' : 'text-error'}`}>
                  {product.stock > 0 ? '✓ In Stock' : '✗ Out of Stock'}
                </p>
              </div>

              {/* Description */}
              {product.shortDescription && (
                <div className="mb-8">
                  <p className="text-gray-300">{product.shortDescription}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-slate/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-white/10"
                  >
                    −
                  </button>
                  <span className="px-4 py-3 min-w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 hover:bg-white/10"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ADD TO CART
                </button>

                <button
                  onClick={() => addToWishlist(product.id)}
                  className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                    inWishlist
                      ? 'border-rose bg-rose/10 text-rose'
                      : 'border-gold text-gold hover:bg-gold/10'
                  }`}
                >
                  ♥
                </button>
              </div>

              {/* Additional Info */}
              {product.specifications && (
                <div className="glass p-6 rounded-lg">
                  <h3 className="font-bold mb-4">Specifications</h3>
                  <div className="space-y-2 text-sm">
                    {product.material && <p><span className="text-gold">Material:</span> {product.material}</p>}
                    {product.weight && <p><span className="text-gold">Weight:</span> {product.weight}g</p>}
                    {product.color && <p><span className="text-gold">Color:</span> {product.color}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
