import React from 'react';

function Directions() {
  return (
    <div className="mt-4 mx-auto p-4 text-text bg-orange rounded max-w-2xl">
      <h2 className="text-4xl font-bold mb-4 text-center">4CASTR Directions</h2>
      <div className="text-2xl">
        <p>1. Type in your city in the search bar.</p>
        <p>2. Click on your city from the dropdown suggestions.</p>
        <p>3. Then, you'll be directed to the weather and forecast for your selected city.</p>
      </div>
    </div>
  );
}

export default Directions;
