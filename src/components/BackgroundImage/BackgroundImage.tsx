import React from 'react';
import CSS from './BackgroundImage.module.css';

export const BackgroundImage = () => {
  const imagePath = '/images/turtle_background.png';

  return (
    <div className={CSS["background-image"]}
      style={{
        mask:`url(${imagePath}) repeat center / 120px`,
        WebkitMask:`url(${imagePath}) repeat center / 120px`
      }}>
    </div>
  );
};