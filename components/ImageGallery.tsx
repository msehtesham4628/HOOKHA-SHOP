'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageGalleryProps {
  images: Array<{
    imageUrl: string
    altText?: string
  }>
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div
        className="relative bg-charcoal rounded-lg overflow-hidden aspect-square"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <Image
          src={images[selectedImage]?.imageUrl || '/placeholder.jpg'}
          alt={images[selectedImage]?.altText || 'Product image'}
          fill
          className={`object-cover transition-transform duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          }`}
        />

        {/* Zoom Indicator */}
        {isZoomed && (
          <div className="absolute bottom-4 right-4 bg-black/50 px-3 py-1 rounded text-xs text-white">
            🔍 Zoom
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index
                  ? 'border-gold'
                  : 'border-slate/20 hover:border-slate/40'
              }`}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || `Product image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
