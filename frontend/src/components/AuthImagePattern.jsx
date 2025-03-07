import React from 'react';

/**
 * AuthImagePattern is a functional component that displays a grid of animated squares
 * along with a title and subtitle. It is designed to be used in authentication-related layouts.
 */
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="flex items-center justify-center bg-base-200 p-6 sm:p-8">
      {/* Container for the grid and text content */}
      <div className="max-w-sm text-center">
        {/* Smaller grid with reduced spacing */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i} // Unique key for each square
              className={`aspect-square w-12 sm:w-14 rounded-xl bg-primary/10 ${
                i % 2 === 0 ? 'animate-pulse' : ''
              }`}
            />
          ))}
        </div>
        {/* Title and subtitle passed as props */}
        <h2 className="text-xl sm:text-2xl font-bold mb-3">{title}</h2>
        <p className="text-sm sm:text-base text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
