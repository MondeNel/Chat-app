import React from 'react'

// AuthImagePattern is a functional component that displays a grid of animated squares
// along with a title and subtitle. It is designed to be used in authentication-related layouts.
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className='hidden lg:flex items-center justify-center bg-base-200 p-12'>
        {/* Container for the grid and text content */}
        <div className='max-w-md text-center'>
            {/* Grid of 9 squares with a gap of 3 units */}
            <div className='grid grid-cols-3 gap-3 mb-8'>
                {[...Array(9)].map((_, i) => (
                    <div 
                        key={i} // Unique key for each square
                        className={`aspect-square rounded-2xl bg-primary/10 ${
                            i % 2 === 0 ? 'animate-pulse' : '' // Apply animation to even-indexed squares
                        }`}
                    />
                ))}
            </div>
            {/* Title and subtitle passed as props */}
            <h2 className='text-2xl font-bold mb-4'>{title}</h2>
            <p className='text-base-content/60'>{subtitle}</p>
        </div>
    </div>
  )
}

export default AuthImagePattern