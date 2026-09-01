'use client'

import { useEffect, useState } from 'react'

export default function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem('age-verified')
    if (!verified) {
      setIsOpen(true)
    }
  }, [])

  const handleEnter = () => {
    localStorage.setItem('age-verified', 'true')
    setIsOpen(false)
  }

  const handleExit = () => {
    window.location.href = 'https://www.google.com'
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-charcoal border border-gold/30 rounded-lg p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 gradient-text">
          AGE VERIFICATION
        </h1>

        <p className="text-lg mb-8 text-gray-300">
          YOU MUST BE AT LEAST 21 YEARS OF AGE TO PURCHASE ON THIS WEBSITE.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          This site contains age-restricted products and services.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleEnter}
            className="flex-1 btn btn-primary"
          >
            ENTER
          </button>
          <button
            onClick={handleExit}
            className="flex-1 btn btn-secondary"
          >
            EXIT
          </button>
        </div>
      </div>
    </div>
  )
}
