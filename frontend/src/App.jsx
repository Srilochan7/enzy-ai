import React, { useState } from 'react';
import './App.css';
import './index.css';

import TrendingStyles from './components/pages/trendingStyle.jsx';
import Hero from './components/pages/hero.jsx';
import Footer from './components/pages/Footer.jsx';
import Chat from './components/pages/ChatPage.jsx'

function App() {
  const [color, setColor] = useState('black'); // Initial color is black

  return (
    <>
      <div className='min-h-screen bg-pink-50 px-6 py-8'>
        <div className='max-w-7xl mx-auto'>
          <Hero/>
          <TrendingStyles/>
          <Chat/>
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default App;
