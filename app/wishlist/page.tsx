'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useWishlist } from '@/lib/store/wishlist'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/types'

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { items } = useWishlist()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || items.length === 0) return

    const fetchProducts = async () => {
      setLoading(true)
      try {
        const productIds = items.map((item) => item.productId)
        const res = await fetch(
          `/api/products?ids=${productIds.join(',')}`
        )
        const data = await res.json()
        if (data.success) {
          setProducts(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [items, mounted])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-midnight to-charcoal">
          <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-bold mb-4">Wishlist</h1>
            <p className="text-gray-400 mb-8">Your wishlist is empty</p>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-midnight to-charcoal">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-12">My Wishlist</h1>

          {loading ? (
            <p className="text-gray-400 text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
