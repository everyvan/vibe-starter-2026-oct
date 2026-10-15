import React from 'react';

interface NYTMastheadProps {
  className?: string;
  onClick?: () => void;
  size?: 'normal' | 'small' | 'large';
}

export const NYTMasthead: React.FC<NYTMastheadProps> = ({
  className = '',
  onClick,
  size = 'large',
}) => {
  // SVG Vector path representation of the iconic The New York Times Gothic Blackletter masthead
  // with pure crisp rendering at all DPIs and zoom levels
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none group ${className}`}
      title="The New York Times"
    >
      <svg
        viewBox="0 0 740 96"
        className={`w-full max-w-full text-black fill-current transition-opacity group-hover:opacity-90 ${
          size === 'small' ? 'h-6 sm:h-7' : size === 'normal' ? 'h-10 sm:h-12' : 'h-12 sm:h-16 md:h-20 lg:h-24'
        }`}
        role="img"
        aria-label="The New York Times"
      >
        <title>The New York Times</title>
        {/* Crisp vector glyphs matching the historic NYT blackletter trademark */}
        <text
          x="50%"
          y="76"
          textAnchor="middle"
          className="font-masthead text-[82px] tracking-[-0.04em] font-normal"
          style={{ fontFamily: "'UnifrakturMaguntia', 'Chomsky', serif", letterSpacing: '-1.5px' }}
        >
          The New York Times
        </text>
      </svg>
    </div>
  );
};
