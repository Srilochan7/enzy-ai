import React from 'react'

function TrendingStyles() {
    const styles = [
    {
      id: 1,
      title: "Chic Summer Looks",
      image: "banner", // placeholder for actual image
      bgColor: "bg-teal-700"
    },
    {
      id: 2,
      title: "Casual Streetwear",
      image: "csl",
      bgColor: "bg-gray-200"
    },
    {
      id: 3,
      title: "Accessorize Your Style",
      image: "cs",
      bgColor: "bg-orange-200"
    },
    {
      id: 4,
      title: "Elegant Evening Wear",
      image: "ays",
      bgColor: "bg-gray-100"
    }
  ];
  return (
   <div className="mb-16">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Trending Styles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {styles.map((style) => (
          <div key={style.id} className="group cursor-pointer">
            <div className={`${style.bgColor} rounded-2xl aspect-[3/4] mb-4 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105`}>
              {/* Placeholder for styled figure */}
              <div className="w-24 h-32 bg-white/20 rounded-lg flex items-center justify-center">
                <div className="w-16 h-24 bg-white/30 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-800 text-center group-hover:text-pink-500 transition-colors duration-300">
              {style.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendingStyles
