'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { SORT_OPTIONS } from '@/lib/constants'
import type { Product } from '@/types'

export default function ShopPage() {
  const [products, setProducts] = useState<(Product & { images: Array<{ imageUrl: string }> })[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('newest')
  const [category, setCategory] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [pages, setPages] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('page', page.toString())
        params.set('sort', sort)
        params.set('limit', '12')
        if (category) params.set('category', category)

        const res = await fetch(`/api/products?${params}`)
        const data = await res.json()

        if (data.success) {
          setProducts(data.data)
          setTotal(data.pagination.total)
          setPages(data.pagination.pages)
        }
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [page, sort, category])

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-midnight to-charcoal">
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold gradient-text mb-4">SHOP</h1>
            <p className="text-gray-400">Discover our premium collection of hookahs, tobacco, and accessories</p>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setCategory(null)
                  setPage(1)
                }}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  category === null
                    ? 'bg-gold text-midnight font-semibold'
                    : 'bg-charcoal border border-slate/20 hover:border-gold text-gray-300'
                }`}
              >
                ALL
              </button>
              {['tobacco', 'hookahs', 'accessories', 'coal'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setCategory(cat)
                    setPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                    category === cat
                      ? 'bg-gold text-midnight font-semibold'
                      : 'bg-charcoal border border-slate/20 hover:border-gold text-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value)
                setPage(1)
              }}
              className="input bg-charcoal border border-slate/20 text-white"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No products found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg border border-slate/20 disabled:opacity-50 disabled:cursor-not-allowed hover:border-gold transition-colors"
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: Math.min(5, pages) }, (_, i) => {
                    const pageNum = page <= 3 ? i + 1 : page + i - 2
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          pageNum === page
                            ? 'bg-gold text-midnight font-semibold'
                            : 'border border-slate/20 hover:border-gold'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}

                  <button
                    onClick={() => setPage(Math.min(pages, page + 1))}
                    disabled={page === pages}
                    className="px-4 py-2 rounded-lg border border-slate/20 disabled:opacity-50 disabled:cursor-not-allowed hover:border-gold transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
