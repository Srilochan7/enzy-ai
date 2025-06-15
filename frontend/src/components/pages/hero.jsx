import React from 'react'

function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-orange-100 via-pink-50 to-orange-200 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Fashion images instead of shapes */}
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=400&fit=crop&crop=faces" 
          alt="Fashion model"
          className="absolute top-8 left-8 w-32 h-40 object-cover rounded-lg opacity-40 shadow-lg"
        />
        
        <img 
          src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=250&h=350&fit=crop&crop=faces" 
          alt="Elegant dress"
          className="absolute top-16 right-16 w-28 h-36 object-cover rounded-lg opacity-50 shadow-lg"
        />
        
        <img 
          src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=200&h=250&fit=crop&crop=faces" 
          alt="Handbag"
          className="absolute bottom-12 left-20 w-24 h-30 object-cover rounded-lg opacity-45 shadow-lg"
        />
        
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=280&h=320&fit=crop&crop=faces" 
          alt="Fashion accessories"
          className="absolute top-24 right-40 w-32 h-36 object-cover rounded-lg opacity-60 shadow-lg"
        />
        
        {/* Circular gradient overlays */}
        <div className="absolute bottom-20 right-24 w-40 h-40 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full opacity-30 blur-xl"></div>
        <div className="absolute top-40 left-40 w-28 h-28 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-25 blur-lg"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 px-6 lg:px-12 xl:px-20 py-24 lg:py-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Your Perfect Style with AI
          </h1>
          <p className="text-xl lg:text-2xl text-gray-700 mb-10 max-w-2xl leading-relaxed">
            Chat with your personal shopping assistant and upgrade your wardrobe with AI-powered recommendations
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started
            </button>
            <button className="bg-white/80 hover:bg-white backdrop-blur-sm text-gray-800 px-10 py-4 rounded-full font-semibold text-lg border border-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Try the AI
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero