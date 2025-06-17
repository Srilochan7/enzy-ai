import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 lg:px-12 xl:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-3 text-pink-400">enzy AI</h3>
            <p className="text-gray-300 mb-5 max-w-md leading-relaxed">
              Your AI-powered fashion assistant. Discover and style confidently.
            </p>
            {/* <a href="#" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Get Started
            </a> */}
          </div>

          {/* Quick Links */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          {/* <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">Terms</a></li>
            </ul>
          </div> */}
        </div> 

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">© 2025 enzy AI. All rights reserved.</p>
          <div className="flex gap-5">
            {/* Social Icons */}
            {[...Array(4)].map((_, i) => (
              <a key={i} href="#" className="text-gray-400 hover:text-pink-400 transition transform hover:scale-110">
                {/* Replace this with actual social SVG icons like in your original */}
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
