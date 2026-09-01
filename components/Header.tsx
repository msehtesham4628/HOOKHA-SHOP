'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/store/cart'
import { useWishlist } from '@/lib/store/wishlist'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartItems = useCart((state) => state.getItemCount())
  const wishlistItems = useWishlist((state) => state.items.length)

  return (
    <header className="sticky top-0 z-50 bg-charcoal/95 backdrop-blur-md border-b border-slate/20">
      <nav className="container mx-auto px-4 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold gradient-text">
            HOOKHA SHOP
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/shop?category=tobacco" className="text-sm hover:text-gold transition-colors">
              TOBACCO
            </Link>
            <Link href="/shop?category=hookahs" className="text-sm hover:text-gold transition-colors">
              HOOKAHS
            </Link>
            <Link href="/shop?category=accessories" className="text-sm hover:text-gold transition-colors">
              ACCESSORIES
            </Link>
            <Link href="/shop?sale=true" className="text-sm hover:text-gold transition-colors text-rose">
              SALE
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/search" className="hover:text-gold transition-colors">
              🔍
            </Link>
            <Link href="/account" className="hover:text-gold transition-colors">
              👤
            </Link>
            <Link href="/wishlist" className="hover:text-gold transition-colors relative">
              ❤️
              {wishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>
            <Link href="/cart" className="hover:text-gold transition-colors relative">
              🛒
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          <Link href="/" className="text-xl font-bold gradient-text">
            HOOKHA
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="relative">
              ❤️
              {wishlistItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative">
              🛒
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xl"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link href="/shop?category=tobacco" className="block hover:text-gold">
              TOBACCO
            </Link>
            <Link href="/shop?category=hookahs" className="block hover:text-gold">
              HOOKAHS
            </Link>
            <Link href="/shop?category=accessories" className="block hover:text-gold">
              ACCESSORIES
            </Link>
            <Link href="/shop?sale=true" className="block hover:text-gold text-rose">
              SALE
            </Link>
            <Link href="/account" className="block hover:text-gold">
              ACCOUNT
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
