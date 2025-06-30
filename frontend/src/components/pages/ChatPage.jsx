import React, { useState, useRef, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'StyleAI',
      text: "Hi! What are you looking for? 👗",
      isBot: true,
      products: []
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const API_BASE = 'http://localhost:8000';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'You',
      text: inputText,
      isBot: false,
      products: []
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    const currentInput = inputText;
    setInputText('');

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        sender: 'StyleAI',
        text: data.response,
        isBot: true,
        products: data.products || []
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        sender: 'StyleAI',
        text: "Something went wrong! Try again 😅",
        isBot: true,
        products: []
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  const ProductCard = ({ product }) => (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-transparent hover:-translate-y-1"
      onClick={() => window.open(product.product_url, '_blank')}
    >
      {/* Product Image */}
      {product.image_url && (
        <div className="relative overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      <div className="p-3 sm:p-4 md:p-5">
        {/* Platform Badge & Rating */}
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <span className={`inline-flex items-center px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${
            product.platform === 'Amazon' 
              ? 'bg-orange-100 text-orange-800' 
              : 'bg-blue-100 text-blue-800'
          }`}>
            {product.platform === 'Amazon' ? '🛒' : '🛍️'} 
            <span className="hidden sm:inline ml-1">{product.platform}</span>
          </span>
          
          {product.rating && (
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
              <span className="text-yellow-500 text-xs sm:text-sm">⭐</span>
              <span className="text-xs sm:text-sm font-medium text-yellow-700 ml-1">{product.rating}</span>
            </div>
          )}
        </div>

        {/* Product Name */}
        <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm leading-relaxed line-clamp-2 group-hover:text-pink-600 transition-colors">
          {product.name}
        </h4>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-pink-600">{product.price}</p>
          <div className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
            Best Price
          </div>
        </div>

        {/* View Button */}
        <button 
          className="w-full py-2 sm:py-3 px-3 sm:px-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl"
          onClick={(e) => {
            e.stopPropagation();
            window.open(product.product_url, '_blank');
          }}
        >
          View Product →
        </button>
      </div>
    </div>
  );

  const QuickSuggestions = () => {
    const suggestions = [
      { text: "👕 T-Shirts", emoji: "👕" },
      { text: "👖 Jeans", emoji: "👖" },
      { text: "👗 Dresses", emoji: "👗" },
      { text: "👟 Sneakers", emoji: "👟" },
      { text: "👜 Bags", emoji: "👜" },
      { text: "⌚ Watches", emoji: "⌚" }
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setInputText(suggestion.text.split(' ')[1])}
            className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 bg-white border border-gray-200 rounded-full text-xs sm:text-sm text-gray-600 hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600 transition-all duration-200"
          >
            <span className="mr-1">{suggestion.emoji}</span>
            <span className="hidden sm:inline">{suggestion.text.split(' ')[1]}</span>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 backdrop-blur-lg bg-white/80 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-6">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              StyleAI Assistant
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
              Discover amazing fashion deals from top brands ✨
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-8 py-3 sm:py-4 lg:py-8 min-h-0">
        <div className="flex-1 flex flex-col bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl border border-white/20 overflow-hidden min-h-0">
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`flex items-start space-x-2 sm:space-x-3 max-w-full sm:max-w-4xl ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600' 
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  }`}>
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {message.isBot ? '🤖' : '👤'}
                    </span>
                  </div>
                  
                  {/* Message Content */}
                  <div className={`flex flex-col min-w-0 flex-1 ${message.isBot ? 'items-start' : 'items-end'}`}>
                    
                    {/* Sender Name */}
                    <div className="text-xs text-gray-500 mb-1 px-2 font-medium">
                      {message.sender}
                    </div>
                    
                    {/* Message Bubble */}
                    <div className={`px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-sm max-w-xs sm:max-w-md ${
                      message.isBot 
                        ? 'bg-white border border-gray-100 text-gray-800' 
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    }`}>
                      <p className="text-xs sm:text-sm font-medium break-words">{message.text}</p>
                    </div>

                    {/* Products Grid */}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-4 sm:mt-6 w-full max-w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                          {message.products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex-shrink-0 flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs sm:text-sm font-bold">🤖</span>
                  </div>
                  <div className="bg-white px-3 sm:px-4 lg:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="flex-shrink-0 border-t border-gray-100 bg-white/80 backdrop-blur-sm p-3 sm:p-4 lg:p-6">
            
            {/* Quick Suggestions */}
            {messages.length <= 1 && <QuickSuggestions />}
            
            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for shoes, clothes, accessories..."
                  disabled={isLoading}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-100 focus:border-pink-400 disabled:opacity-50 bg-white/80 backdrop-blur-sm placeholder-gray-400 transition-all duration-200"
                />
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                  <span className="text-gray-400">🔍</span>
                </div>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Searching...</span>
                  </>
                ) : (
                  <>
                    <span>Find</span>
                    <span>✨</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;