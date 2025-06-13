import React from 'react';

function Button({ clr = 'red', setColor }) {
  const colorClasses = {
    red: 'after:bg-red-500',
    orange: 'after:bg-orange-500',
    yellow: 'after:bg-yellow-500',
    pink: 'after:bg-pink-500',
    blue: 'after:bg-blue-500',
    green: 'after:bg-green-500',
    purple: 'after:bg-purple-500',
  };

  return (
    <button
      onClick={() => setColor(clr)} // Update background color on click
      className={`
        relative 
        z-0 
        rounded 
        bg-black
        px-10 
        py-3 
        text-white
        transition-[all_0.3s_ease] 
        after:absolute 
        after:left-0 
        after:top-0 
        after:-z-10 
        after:h-full 
        after:w-0 
        after:rounded 
        after:transition-[all_0.3s_ease] 
        hover:after:w-full
        ${colorClasses[clr]}
      `}
    >
      {clr.charAt(0).toUpperCase() + clr.slice(1)} {/* Capitalize first letter */}
    </button>
  );
}

export default Button;
