export const SITE_NAME = 'HOOKHA SHOP'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
export const MIN_AGE = parseInt(process.env.NEXT_PUBLIC_MIN_AGE || '21')

export const PRODUCT_CATEGORIES = [
  { name: 'Tobacco', slug: 'tobacco' },
  { name: 'Hookahs', slug: 'hookahs' },
  { name: 'Bowls', slug: 'bowls' },
  { name: 'Bases', slug: 'bases' },
  { name: 'Coal', slug: 'coal' },
  { name: 'Accessories', slug: 'accessories' },
  { name: 'E-Hookah', slug: 'e-hookah' },
  { name: 'Vapes', slug: 'vapes' },
]

export const TOBACCO_BRANDS = [
  'MustHave',
  'BlackBurn',
  'Bonche',
  'Deus',
  'Severnyi',
  'Satyr',
  'Kraken',
  'Sebero',
  'Banger',
  'Sarma',
  'Al Fakher',
  'Adalya',
  'Element',
  'Starline',
  'DarkSide',
  'Sapphire Crown',
  'Trofimoff\'s',
  'Chabacco',
  'Afzal',
  'Eternal Smoke',
  'Fumari',
  'Serbetli',
  'Social Smoke',
  'Starbuzz',
  'Tangiers',
  'Trifecta',
]

export const HOOKAH_BRANDS = [
  'Alpha Hookah',
  'Matt Pear',
  'El Bomber',
  'Geometry',
  'Union',
  'Hoob',
  'Maklaud',
  'Hooligan',
  'Japona',
  'WOOKAH',
  'Misha',
  'Amotion',
  'Conceptic',
  'Don',
  'E-Hookah',
  'Honey Sigh',
  'HookahTree',
  'Moze',
  'RF Hookah',
  'Shi Carver',
  'Steamulation',
  'Tortuga',
  'VZ',
]

export const SORT_OPTIONS = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'bestseller', label: 'Best Sellers' },
  { value: 'discount', label: 'Discount' },
]

export const PAYMENT_METHODS = [
  { value: 'stripe', label: 'Credit/Debit Card (Stripe)' },
  { value: 'paypal', label: 'PayPal' },
]

export const PRODUCT_STATUS = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DISCONTINUED: 'Discontinued',
}

export const ORDER_STATUS = {
  PENDING: 'Pending',
  PAYMENT_PROCESSING: 'Payment Processing',
  PAID: 'Paid',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded',
}
