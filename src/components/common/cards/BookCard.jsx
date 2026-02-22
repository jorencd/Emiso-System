import React from 'react';

function BookCard({ title, pdfUrl }) {
  const handleClick = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    }
  };

  return (
    <div 
      className='flex items-center justify-center p-4 transition-shadow duration-300 bg-white border border-green-600 rounded-lg shadow-md cursor-pointer hover:shadow-xl hover:bg-green-300'
      onClick={handleClick}
    >
      <p className='w-full text-center'>{title}</p>
    </div>
  );
}

export default BookCard;