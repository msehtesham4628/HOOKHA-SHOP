export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price)
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function truncate(text: string, length: number): string {
  return text.length > length ? text.substring(0, length) + '...' : text
}

export function generateOrderNumber(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000)
  return `ORD-${timestamp}-${random}`
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function getImageUrl(
  path: string,
  size?: 'thumb' | 'medium' | 'large'
): string {
  if (!path) return ''

  // If already a full URL, return as is
  if (path.startsWith('http')) {
    return path
  }

  // Construct CDN URL with Cloudinary
  const baseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL || ''
  const sizeString = size ? `c_fill,w_${getSizePixels(size)},h_${getSizePixels(size)},q_auto:good/` : 'q_auto:good/'

  return `${baseUrl}${sizeString}${path}`
}

function getSizePixels(size: 'thumb' | 'medium' | 'large'): number {
  const sizes = {
    thumb: 200,
    medium: 500,
    large: 1000,
  }
  return sizes[size] || 500
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDatetime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

export function calculateShippingCost(
  weight: number,
  distance: 'local' | 'national' | 'international'
): number {
  const baseCosts = {
    local: 5,
    national: 10,
    international: 25,
  }

  const weightCost = weight * 0.5

  return baseCosts[distance] + weightCost
}

export function validatePassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letters')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letters')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain numbers')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
