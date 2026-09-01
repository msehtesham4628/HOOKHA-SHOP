'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal border-t border-slate/20 mt-20">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">HOOKHA SHOP</h3>
            <p className="text-sm text-gray-400 mb-4">
              Premium hookahs, tobacco, and accessories for the discerning enthusiast.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">f</a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">𝕏</a>
              <a href="#" className="text-gray-400 hover:text-gold transition-colors">📷</a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop?category=tobacco" className="text-gray-400 hover:text-gold transition-colors">Tobacco</Link></li>
              <li><Link href="/shop?category=hookahs" className="text-gray-400 hover:text-gold transition-colors">Hookahs</Link></li>
              <li><Link href="/shop?category=accessories" className="text-gray-400 hover:text-gold transition-colors">Accessories</Link></li>
              <li><Link href="/shop?sale=true" className="text-gray-400 hover:text-gold transition-colors">Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="text-gray-400 hover:text-gold transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-gold transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-gray-400 hover:text-gold transition-colors">Shipping</Link></li>
              <li><Link href="/returns" className="text-gray-400 hover:text-gold transition-colors">Returns</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-gray-400 hover:text-gold transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-gold transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookies" className="text-gray-400 hover:text-gold transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 uppercase text-sm">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe for exclusive offers.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email"
                className="input flex-1 rounded-r-none"
              />
              <button
                type="submit"
                className="btn btn-primary rounded-l-none"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} HOOKHA SHOP. All rights reserved.</p>
          <p>Age Restricted - Must be 21+ to purchase.</p>
        </div>
      </div>
    </footer>
  )
}
