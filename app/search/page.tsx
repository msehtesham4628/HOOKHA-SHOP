'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (data.success) {
        setResults(data.data)
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-midnight to-charcoal">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Search</h1>

          <form onSubmit={handleSearch} className="mb-12 max-w-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="input flex-1"
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>

          {loading ? (
            <p className="text-gray-400">Searching...</p>
          ) : results ? (
            <div className="space-y-12">
              {/* Products */}
              {results.products.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Products</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {results.products.map((product: any) => (
                      <a
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="group"
                      >
                        <div className="bg-charcoal rounded-lg p-4 hover:border-gold border border-slate/20 transition-colors">
                          <h3 className="font-semibold group-hover:text-gold">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-400 mt-2">
                            {product.brand?.name}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands */}
              {results.brands.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Brands</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {results.brands.map((brand: any) => (
                      <a
                        key={brand.id}
                        href={`/shop?brand=${brand.slug}`}
                        className="glass p-4 rounded-lg hover:border-gold transition-colors"
                      >
                        <p className="font-semibold">{brand.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {results.categories.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Categories</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {results.categories.map((category: any) => (
                      <a
                        key={category.id}
                        href={`/shop?category=${category.slug}`}
                        className="glass p-4 rounded-lg hover:border-gold transition-colors"
                      >
                        <p className="font-semibold">{category.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {!results.products.length &&
                !results.brands.length &&
                !results.categories.length && (
                  <p className="text-gray-400 text-center">No results found</p>
                )}
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}
