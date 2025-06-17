import React from 'react'
import Navbar from '../micros/Navbar'

function Hero() {
  return (
    <div>
      <Navbar/>
    <div className="relative bg-gradient-to-br from-orange-100 via-pink-50 to-orange-200 overflow-hidden min-h-screen rounded-3xl">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Fashion images with floating animations */}
        <img 
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=300&fit=crop&crop=faces" 
          alt="Fashion model"
          className="absolute top-12 left-8 w-24 h-32 lg:w-32 lg:h-40 object-cover rounded-lg opacity-40 shadow-lg animate-bounce"
          style={{
            animation: 'float1 6s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        
        {/* <img 
          src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=280&fit=crop&crop=faces" 
          alt="Elegant dress"
          className="absolute top-24 right-12 lg:right-20 w-20 h-28 lg:w-28 lg:h-36 object-cover rounded-lg opacity-50 shadow-lg"
          style={{
            animation: 'float2 8s ease-in-out infinite',
            animationDelay: '1s'
          }}
        /> */}
        
        <img 
          src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=150&h=200&fit=crop&crop=faces" 
          alt="Handbag"
          className="absolute bottom-20 left-16 lg:left-24 w-18 h-24 lg:w-24 lg:h-30 object-cover rounded-lg opacity-45 shadow-lg"
          style={{
            animation: 'float3 7s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
        
        <img 
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=220&h=250&fit=crop&crop=faces" 
          alt="Fashion accessories"
          className="absolute top-36 lg:top-32 right-28 lg:right-36 w-24 h-28 lg:w-32 lg:h-36 object-cover rounded-lg opacity-55 shadow-lg"
          style={{
            animation: 'float4 9s ease-in-out infinite',
            animationDelay: '0.5s'
          }}
        />
        
        {/* Additional floating images for more visual appeal */}
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=180&h=240&fit=crop&crop=faces" 
          alt="Fashion shoes"
          className="absolute bottom-32 right-8 lg:right-16 w-16 h-20 lg:w-20 lg:h-26 object-cover rounded-lg opacity-35 shadow-lg"
          style={{
            animation: 'float5 5s ease-in-out infinite',
            animationDelay: '3s'
          }}
        />
        
        <img 
          src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=160&h=200&fit=crop&crop=faces" 
          alt="Fashion jewelry"
          className="absolute top-8 right-1/4 w-14 h-18 lg:w-18 lg:h-24 object-cover rounded-lg opacity-40 shadow-lg"
          style={{
            animation: 'float6 10s ease-in-out infinite',
            animationDelay: '1.5s'
          }}
        />
        
        <img 
          src="https://images.unsplash.com/photo-1551803091-e20673f15770?w=140&h=180&fit=crop&crop=faces" 
          alt="Sunglasses"
          className="absolute bottom-8 left-1/3 w-12 h-16 lg:w-16 lg:h-20 object-cover rounded-lg opacity-30 shadow-lg"
          style={{
            animation: 'float7 6.5s ease-in-out infinite',
            animationDelay: '4s'
          }}
        />
        
        {/* Animated circular gradient overlays */}
        <div 
          className="absolute bottom-20 right-16 lg:right-24 w-32 lg:w-40 h-32 lg:h-40 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full opacity-20 blur-xl"
          style={{
            animation: 'pulse 4s ease-in-out infinite',
            animationDelay: '0s'
          }}
        ></div>
        <div 
          className="absolute top-40 left-24 lg:left-40 w-20 lg:w-28 h-20 lg:h-28 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full opacity-15 blur-lg"
          style={{
            animation: 'pulse 6s ease-in-out infinite',
            animationDelay: '2s'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-24 lg:w-32 h-24 lg:h-32 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-10 blur-2xl"
          style={{
            animation: 'pulse 8s ease-in-out infinite',
            animationDelay: '4s'
          }}
        ></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main Heading with subtle animation */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8 leading-tight"
              style={{
                animation: 'slideInUp 1s ease-out'
              }}
            >
              Discover Your Perfect Style with AI
            </h1>
            
            {/* Subtitle with delayed animation */}
            <p 
              className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto"
              style={{
                animation: 'slideInUp 1s ease-out 0.3s both'
              }}
            >
              Chat with your personal shopping assistant and upgrade your wardrobe with AI-powered recommendations
            </p>
            
            {/* Buttons Container with delayed animation */}
            <div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              style={{
                animation: 'slideInUp 1s ease-out 0.6s both'
              }}
            >
              {/* Regular Get Started Button */}
              <button className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                My Wardrobe
              </button>
              
              {/* Special AI Button with Shine Effect */}
              <div className="relative">
                {/* Main Button */}
                <button className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-110 shadow-2xl border-2 border-white/30 overflow-hidden group">
                  <span className="relative z-10 flex items-center gap-2">
                    🤖 enzy it
                  </span>
                  
                  {/* Shine Sweep Effect */}
                  <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full rotate-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(1.5deg); }
        }
        
        @keyframes float4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(-2deg); }
        }
        
        @keyframes float5 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(1deg); }
        }
        
        @keyframes float6 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-22px) rotate(-1.5deg); }
        }
        
        @keyframes float7 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(2.5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
    </div>
  )
}

export default Hero