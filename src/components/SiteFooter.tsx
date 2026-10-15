import React from 'react';

interface SiteFooterProps {
  onNavigate: (screen: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onNavigate }) => {
  return (
    <footer className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10 pt-4 border-t-2 border-black">
      <div className="flex flex-col md:flex-row items-center justify-between text-[11px] font-sans text-gray-500 space-y-3 md:space-y-0">
        <button
          onClick={() => onNavigate('frontpage')}
          className="font-masthead text-2xl text-black hover:opacity-80 transition-opacity"
        >
          The New York Times
        </button>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-600">
          <span className="text-gray-500">© 2025 The New York Times Company</span>
          <button onClick={() => onNavigate('frontpage')} className="hover:underline">NYTCo</button>
          <button onClick={() => alert('The New York Times Newsroom: news-tips@nytimes.com | Customer Care: 1-800-NYTIMES')} className="hover:underline">Contact Us</button>
          <button onClick={() => alert('The Times is committed to full accessibility across our digital web experiences.')} className="hover:underline">Accessibility</button>
          <button onClick={() => alert('Explore journalistic and engineering careers at The New York Times Company.')} className="hover:underline">Work with us</button>
          <button onClick={() => alert('Your privacy choices: The New York Times adheres to strict reader confidentiality.')} className="hover:underline">Privacy Policy</button>
          <button onClick={() => alert('Standard Digital Subscription Terms and Acceptable Use Policy.')} className="hover:underline">Terms of Service</button>
          <button onClick={() => onNavigate('todays-paper')} className="hover:underline">Site Map</button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap justify-between items-center text-[10px] text-gray-400 font-sans">
        <div>
          Published with historic fidelity to the broadsheet print and digital newsroom tradition.
        </div>
        <div className="flex gap-4">
          <span>Edition: North America & Global</span>
          <span>Help Center</span>
          <span>Feedback</span>
        </div>
      </div>
    </footer>
  );
};
