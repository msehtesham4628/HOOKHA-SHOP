'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/store/cart'

export default function CartDrawer() {
  const { items, updateQuantity, removeItem, getTotal } = useCart()
  const total = getTotal()

  return (
    <aside className={items.length ? 'drawer open' : 'drawer'}>
      <div className="p-6">
        <button className="close" onClick={() => { /* toggle handled via store or parent */ }}>×</button>
        <span className="eyebrow">Your selection</span>
        <h2>Shopping bag</h2>

        {!items.length ? (
          <p className="empty">Your bag is waiting for something exceptional.</p>
        ) : (
          <>
            <div className="lines">
              {items.map((it) => (
                <div className="line" key={it.productId}>
                  <Image src={it.image} alt="" width={64} height={64} />
                  <div>
                    <b>{it.name}</b>
                    <span>${(it.price).toFixed(2)}</span>
                  </div>

                  <div className="quantity">
                    <button onClick={() => updateQuantity(it.productId, it.quantity - 1)}>−</button>
                    {it.quantity}
                    <button onClick={() => updateQuantity(it.productId, it.quantity + 1)}>+</button>
                  </div>

                  <button onClick={() => removeItem(it.productId)} className="text-sm text-rose">Remove</button>
                </div>
              ))}
            </div>

            <div className="total">
              <span>Subtotal</span>
              <b>${total.toFixed(2)}</b>
            </div>

            <Link onClick={() => {}} className="button" href="/checkout">Secure checkout</Link>
          </>
        )}
      </div>
    </aside>
  )
}
