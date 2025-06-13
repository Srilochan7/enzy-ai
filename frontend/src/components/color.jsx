import React from 'react';
import MyButton from './button.jsx';

function BgColor({ color, setColor }) {
  const colors = ['red', 'orange', 'yellow', 'pink', 'blue', 'green', 'purple'];

  return (
    <>
      <div
        style={{
          backgroundColor: color,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            paddingTop: '20px',
          }}
        >
          {colors.map((clr) => (
            <MyButton key={clr} clr={clr} setColor={setColor} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BgColor;
