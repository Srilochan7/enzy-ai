import React from 'react'

function TrendingStyles() {
  const styles = [
    {
      id: 1,
      title: "Chic Summer Looks",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=600&fit=crop&crop=faces",
      bgColor: "bg-gradient-to-br from-teal-100 to-teal-200"
    },
    {
      id: 2,
      title: "Casual Streetwear",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=600&fit=crop&crop=faces",
      bgColor: "bg-gradient-to-br from-gray-100 to-gray-200"
    },
    {
      id: 3,
      title: "Accessorize Your Style",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=600&fit=crop&crop=faces",
      bgColor: "bg-gradient-to-br from-orange-100 to-orange-200"
    },
    {
      id: 4,
      title: "Elegant Evening Wear",
      image: "https://images.unsplash.com/photo-1469334031219-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600&q=80",
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100"
    }
  ];

  return (
    <div className="px-6 lg:px-12 xl:px-20 py-16">
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12">Trending Styles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {styles.map((style) => (
          <div key={style.id} className="group cursor-pointer">
            <div className={`${style.bgColor} rounded-2xl aspect-[3/4] mb-6 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl relative`}>
              <img 
                src={style.image} 
                alt={style.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
            </div>
            <h3 className="text-lg lg:text-xl font-semibold text-gray-800 group-hover:text-pink-500 transition-colors duration-300">
              {style.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingStyles