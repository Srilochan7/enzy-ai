import React from 'react'

function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-orange-100 via-pink-50 to-orange-200 overflow-hidden min-h-screen">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Fashion images */}
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=300&fit=crop&crop=faces" 
          alt="Fashion model"
          className="absolute top-8 left-8 w-24 h-32 lg:w-32 lg:h-40 object-cover rounded-lg opacity-30 shadow-lg"
        />
        
        <img 
          src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=280&fit=crop&crop=faces" 
          alt="Elegant dress"
          className="absolute top-16 right-8 lg:right-16 w-20 h-28 lg:w-28 lg:h-36 object-cover rounded-lg opacity-40 shadow-lg"
        />
        
        <img 
          src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150&h=200&fit=crop&crop=faces" 
          alt="Handbag"
          className="absolute bottom-12 left-12 lg:left-20 w-18 h-24 lg:w-24 lg:h-30 object-cover rounded-lg opacity-35 shadow-lg"
        />
        
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=220&h=250&fit=crop&crop=faces" 
          alt="Fashion accessories"
          className="absolute top-32 lg:top-24 right-32 lg:right-40 w-24 h-28 lg:w-32 lg:h-36 object-cover rounded-lg opacity-50 shadow-lg"
        />
        
        {/* Circular gradient overlays */}
        <div className="absolute bottom-20 right-16 lg:right-24 w-32 lg:w-40 h-32 lg:h-40 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 left-24 lg:left-40 w-20 lg:w-28 h-20 lg:h-28 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-15 blur-lg"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight">
              Discover Your Perfect Style with AI
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto">
              Chat with your personal shopping assistant and upgrade your wardrobe with AI-powered recommendations
            </p>
            
            {/* Buttons Container */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Regular Get Started Button */}
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              
              {/* Special AI Button with Enhanced Effects */}
              <div className="relative">
                {/* Floating Sparkles */}
                
                
                {/* Rotating Glow Ring */}
                <div className="absolute inset-0 rounded-full">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 to-blue-400 opacity-60 blur-md animate-spin" style={{animationDuration: '3s'}}></div>
                </div>
                
                {/* Pulsing Outer Glow */}
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400 opacity-40 blur-lg animate-pulse"></div>
                
                {/* Main Button */}
                <button className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-110 shadow-2xl border-2 border-white/30 overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    🤖 Ask AI
                  </span>
                  
                  {/* Moving Shine Effect */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div> */}
                  
                  {/* Inner Glow */}
                  {/* <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-pulse"></div> */}
                </button>
                
                {/* Text Label */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Keyframes */}
      
    </div>
  )
}

export default Hero