import React from 'react';
import Button from '../utils/Button';

const ButtonList = () => {
  const buttonNames = [
    "All", "Gaming", "Song", "Live", "Cricket", "News", "Cooking", "Valentine"
  ];

  return (
    <div className='flex'>
      {/* Map through the button names array */}
      {buttonNames.map((name, index) => (
        <Button key={index} name={name} />
      ))}
    </div>
  );
};

export default ButtonList;
