import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AgeVerificationModal from '@/components/AgeVerificationModal'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <AgeVerificationModal />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen bg-gradient-to-b from-charcoal to-midnight flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse" />
            <div className="absolute top-40 right-10 w-72 h-72 bg-rose rounded-full mix-blend-multiply filter blur-3xl animate-glow-pulse" />
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6 animate-fade-in-up">
              HOOKHA SHOP
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Experience the finest selection of premium hookahs, authentic shisha tobacco, and exclusive accessories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Link href="/shop?category=hookahs" className="btn btn-primary text-lg">
                SHOP HOOKAHS
              </Link>
              <Link href="/shop?category=tobacco" className="btn btn-secondary text-lg">
                SHOP TOBACCO
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-charcoal/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🚚',
                  title: 'Fast Shipping',
                  description: 'Worldwide delivery with tracking',
                },
                {
                  icon: '💎',
                  title: 'Premium Quality',
                  description: 'Authentic products from top brands',
                },
                {
                  icon: '🔒',
                  title: 'Secure Checkout',
                  description: 'Safe payment processing guaranteed',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass p-8 rounded-lg text-center hover:border-gold transition-colors"
                >
                  <p className="text-5xl mb-4">{feature.icon}</p>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Tobacco', slug: 'tobacco', emoji: '🍃' },
                { name: 'Hookahs', slug: 'hookahs', emoji: '🪶' },
                { name: 'Bowls', slug: 'bowls', emoji: '🍯' },
                { name: 'Accessories', slug: 'accessories', emoji: '✨' },
              ].map((category) => (
                <Link
                  key={category.slug}
                  href={`/shop?category=${category.slug}`}
                  className="group"
                >
                  <div className="product-card aspect-square flex items-center justify-center text-center">
                    <div>
                      <p className="text-6xl mb-4">{category.emoji}</p>
                      <h3 className="text-2xl font-bold group-hover:text-gold transition-colors">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-gold/20 to-rose/20 border-y border-gold/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Exclusive Offers Await</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive deals, new product launches, and special promotions
            </p>
            <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input flex-1"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
