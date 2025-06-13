import React from 'react'

function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-orange-100 via-pink-50 to-orange-200 rounded-2xl overflow-hidden mb-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Palm leaves and shapes */}
        <div className="absolute top-6 left-8 w-24 h-32 opacity-30">
          <svg viewBox="0 0 100 120" className="w-full h-full fill-orange-300">
            <path d="M50 10 L30 30 Q20 50 30 70 Q40 80 50 90 Q60 80 70 70 Q80 50 70 30 Z"/>
          </svg>
        </div>
        
        <div className="absolute top-12 right-12 w-20 h-28 opacity-40">
          <svg viewBox="0 0 80 100" className="w-full h-full fill-green-700">
            <path d="M40 5 L15 25 Q5 45 15 65 Q25 75 40 85 Q55 75 65 65 Q75 45 65 25 Z"/>
          </svg>
        </div>
        
        <div className="absolute bottom-8 left-16 w-16 h-20 opacity-35">
          <svg viewBox="0 0 60 80" className="w-full h-full fill-green-600">
            <path d="M30 5 L10 20 Q2 35 10 50 Q20 60 30 70 Q40 60 50 50 Q58 35 50 20 Z"/>
          </svg>
        </div>
        
        {/* Monstera leaf */}
        <div className="absolute top-20 right-32 w-28 h-32 opacity-50">
          <svg viewBox="0 0 120 120" className="w-full h-full fill-green-800">
            <path d="M60 10 Q30 20 20 50 Q25 80 60 90 Q95 80 100 50 Q90 20 60 10 Z"/>
            <path d="M40 30 L80 30 M35 45 L85 45 M40 60 L80 60" stroke="white" strokeWidth="2" fill="none"/>
          </svg>
        </div>
        
        {/* Circular shapes */}
        <div className="absolute bottom-16 right-20 w-32 h-32 bg-orange-300 rounded-full opacity-60"></div>
        <div className="absolute top-32 left-32 w-20 h-20 bg-orange-400 rounded-full opacity-40"></div>
        
        {/* Handbag */}
        <div className="absolute bottom-12 right-8 w-16 h-12 opacity-70">
          <svg viewBox="0 0 60 45" className="w-full h-full fill-orange-800">
            <rect x="10" y="15" width="40" height="25" rx="3"/>
            <path d="M20 15 Q20 8 30 8 Q40 8 40 15" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center py-20 px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Discover Your Perfect Style with AI
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Chat with your personal shopping assistant and upgrade your wardrobe
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold text-lg transition-colors duration-300">
            Get Started
          </button>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold text-lg border border-white/30 transition-all duration-300">
            Try the AI
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
