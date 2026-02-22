import React from 'react';

function JournalCard({ title }) {
  return (
    <div className='bg-white rounded-lg shadow-md p-4 flex justify-center items-center border border-green-600 hover:shadow-xl hover:bg-green-300 cursor-pointer transition-shadow duration-300'>
      <p className='w-full text-center'>{title}</p>
    </div>
  );
}

export default JournalCard;
