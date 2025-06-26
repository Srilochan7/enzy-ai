import React, { useState, useRef, useEffect } from 'react';

const Chat = () => {
  // State management for chat messages, input, loading, and products
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'StyleAI',
      text: "Hi there! I'm your personal style assistant. I can search across Amazon, Flipkart, and Myntra to find the perfect outfit for you. What are you looking for today?",
      isBot: true,
      products: []
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentProducts, setCurrentProducts] = useState([]);
  const messagesEndRef = useRef(null);

  // Backend API endpoint
  const API_BASE = 'http://localhost:8000';

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending user message and getting AI response
  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
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
      // Send message to backend API
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
      
      // Add AI response with products to chat
      const botMessage = {
        id: messages.length + 2,
        sender: 'StyleAI',
        text: data.response,
        isBot: true,
        products: data.products || []
      };

      setMessages(prev => [...prev, botMessage]);
      setCurrentProducts(data.products || []);
      
    } catch (error) {
      console.error('Error:', error);
      // Show error message if API call fails
      const errorMessage = {
        id: messages.length + 2,
        sender: 'StyleAI',
        text: "Sorry, I'm having trouble connecting to my servers right now. Please make sure the backend is running and try again!",
        isBot: true,
        products: []
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col">
      {/* Header Section */}
      <div className="text-center py-4 md:py-6 lg:py-8 border-b border-gray-100 flex-shrink-0">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Your Style Assistant</h1>
        <p className="text-sm text-gray-600 mt-2">Powered by AI • Search across Amazon, Flipkart & Myntra</p>
      </div>

      {/* Main Content Area - Chat + Sidebar */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Chat Section */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Chat Messages Container */}
          <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 space-y-4 md:space-y-6">
            <div className="max-w-4xl mx-auto w-full">
              {/* Render each message */}
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`flex items-start space-x-2 md:space-x-3 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl ${message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'}`}>
                    {/* User/Bot Avatar */}
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs md:text-sm font-medium text-gray-600">
                        {message.isBot ? '🤖' : message.sender.charAt(0)}
                      </span>
                    </div>
                    
                    {/* Message Content */}
                    <div className={`flex flex-col ${message.isBot ? 'items-start' : 'items-end'}`}>
                      <div className="text-xs text-gray-500 mb-1 px-1">
                        {message.sender}
                      </div>
                      {/* Message Bubble */}
                      <div className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl ${
                        message.isBot 
                          ? 'bg-gray-100 text-gray-800' 
                          : 'bg-pink-500 text-white'
                      }`}>
                        <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
                      </div>

                      {/* Product Grid within Chat Message */}
                      {message.products && message.products.length > 0 && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
                          {message.products.slice(0, 4).map((product) => (
                            <div key={product.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                              {/* Product Image with fallback */}
                              <img 
                                src={product.image_url} 
                                alt={product.name}
                                className="w-full h-32 object-cover rounded-md mb-2"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/200x200/f0f0f0/666666?text=No+Image';
                                }}
                              />
                              {/* Product Details */}
                              <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{product.name}</h4>
                              <p className="text-sm font-bold text-pink-600 mb-1">{product.price}</p>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-500">{product.platform}</span>
                                {product.rating && (
                                  <div className="flex items-center">
                                    <span className="text-xs text-yellow-500">★</span>
                                    <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                                  </div>
                                )}
                              </div>
                              {/* View Product Button */}
                              <button 
                                onClick={() => window.open(product.product_url, '_blank')}
                                className="w-full px-3 py-1 bg-pink-500 text-white text-xs rounded-md hover:bg-pink-600 transition-colors"
                              >
                                View on {product.platform}
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading Animation */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center">
                      <span className="text-xs md:text-sm font-medium text-gray-600">🤖</span>
                    </div>
                    <div className="bg-gray-100 px-3 md:px-4 py-2 md:py-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input Section */}
          <div className="flex-shrink-0 px-4 md:px-6 lg:px-8 py-3 md:py-4 border-t border-gray-100 bg-gray-50">
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex space-x-2 md:space-x-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Try: 'I need a black tuxedo for wedding' or 'Show me casual dresses'"
                  disabled={isLoading}
                  className="flex-1 px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                  className="px-4 md:px-6 py-2 md:py-3 text-sm md:text-base bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Recommendation Sidebar */}
        <div className="lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-gray-100 bg-gray-50 flex-shrink-0">
          <div className="p-4 md:p-6 h-full overflow-y-auto">
            {currentProducts.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Finds</h3>
                <div className="space-y-4">
                  {/* Display top 3 products in sidebar */}
                  {currentProducts.slice(0, 3).map((product) => (
                    <div key={product.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <img 
                        src={product.image_url} 
                        alt={product.name}
                        className="w-full h-40 object-cover rounded-md mb-3"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200/f0f0f0/666666?text=No+Image';
                        }}
                      />
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h4>
                      <p className="text-lg font-bold text-pink-600 mb-2">{product.price}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-500">{product.platform}</span>
                        {product.rating && (
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => window.open(product.product_url, '_blank')}
                        className="w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                      >
                        View on {product.platform}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Empty state when no products are available
              <div className="text-center text-gray-500 mt-8">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto flex items-center justify-center mb-4">
                    <span className="text-2xl">🛍️</span>
                  </div>
                  <p className="text-lg font-medium mb-2">Ready to Shop?</p>
                  <p className="text-sm">Ask me about clothes and I'll show you the best options!</p>
                </div>
                
                {/* Example queries */}
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Try asking:</p>
                  <div className="bg-white p-3 rounded-lg text-left shadow-sm">
                    "I need a black tuxedo for a wedding"
                  </div>
                  <div className="bg-white p-3 rounded-lg text-left shadow-sm">
                    "Show me casual summer dresses"
                  </div>
                  <div className="bg-white p-3 rounded-lg text-left shadow-sm">
                    "Looking for formal shirts under ₹2000"
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;