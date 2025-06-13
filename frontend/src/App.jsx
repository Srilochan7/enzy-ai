import React, { useState } from 'react';
import './App.css';
import './index.css';
import BgColor from './components/color.jsx';

function App() {
  const [color, setColor] = useState('black'); // Initial color is black

  return (
    <>
      <BgColor color={color} setColor={setColor} />
    </>
  );
}

export default App;
