export default function Page() {
  return (
    <main className="min-h-screen bg-midnight">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold gradient-text mb-4">
          HOOKHA SHOP
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Premium Hookah, Tobacco & Accessories
        </p>
        <div className="flex gap-4 justify-center">
          <button className="btn btn-primary">
            SHOP HOOKAHS
          </button>
          <button className="btn btn-secondary">
            SHOP TOBACCO
          </button>
        </div>
      </div>
    </main>
  )
}
