import React from 'react';
import { Search, Bookmark, Check } from 'lucide-react';

interface SiteHeaderProps {
  currentScreen: string;
  onNavigate: (screen: string, articleId?: string) => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenLogin: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  currentEdition: string;
  onSelectEdition: (edition: string) => void;
  isLoggedIn: boolean;
  userEmail?: string;
  useHotlinkImage: boolean;
  onToggleImageMode: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenSearch,
  onOpenSubscribe,
  onOpenLogin,
  onOpenSaved,
  savedCount,
  currentEdition,
  onSelectEdition,
  isLoggedIn,
  userEmail,
  useHotlinkImage,
  onToggleImageMode,
}) => {
  const editions = ['U.S.', 'International', 'Canada', 'Español', '中文'];
  const navSections = [
    { label: 'U.S.', id: 'section-us' },
    { label: 'World', id: 'section-world' },
    { label: 'Business', id: 'section-business' },
    { label: 'Arts', id: 'section-arts' },
    { label: 'Lifestyle', id: 'section-lifestyle' },
    { label: 'Opinion', id: 'section-opinion' },
    { label: 'Audio', id: 'section-audio' },
    { label: 'Games', id: 'section-games' },
    { label: 'Cooking', id: 'section-cooking' },
    { label: 'Wirecutter', id: 'section-wirecutter' },
    { label: 'The Athletic', id: 'section-athletic' },
  ];

  return (
    <header className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Utility Bar: Search, Edition Switcher, Buttons */}
      <div className="flex items-center justify-between py-2 text-[11px] font-sans border-b border-transparent" data-purpose="utility-bar">
        {/* Left side: Search & Editions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenSearch}
            aria-label="Search articles"
            className="p-1 hover:opacity-70 text-black flex items-center gap-1 cursor-pointer"
            title="Search the Times"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-gray-700">Search</span>
          </button>

          <div className="hidden md:flex items-center space-x-2 text-[#727272] uppercase text-[10px] tracking-wider font-semibold">
            {editions.map((edition, idx) => (
              <React.Fragment key={edition}>
                <button
                  onClick={() => onSelectEdition(edition)}
                  className={`hover:text-black transition-colors ${
                    currentEdition === edition ? 'text-black font-bold underline underline-offset-2' : ''
                  }`}
                >
                  {edition}
                </button>
                {idx < editions.length - 1 && <span className="text-gray-400">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right side: Account & Subscription Actions */}
        <div className="flex items-center space-x-3 font-medium">
          {/* Quick toggle between HTML placeholder image & Generated Editorial Photo */}
          <button
            onClick={onToggleImageMode}
            className="hidden sm:flex items-center gap-1.5 text-[10px] text-gray-500 hover:text-black uppercase tracking-wider px-2 py-1 border border-dashed border-gray-300 rounded"
            title="Switch between HTML placeholder graphic and real editorial photograph"
          >
            <span>Photo:</span>
            <span className="font-semibold text-gray-800">{useHotlinkImage ? 'SVG Placeholder' : 'Editorial Photo'}</span>
          </button>

          {/* Saved Articles button */}
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1 text-[11px] text-gray-700 hover:text-black px-2 py-1.5 rounded hover:bg-gray-100 transition-colors"
            title="View saved articles"
          >
            <Bookmark className="w-3.5 h-3.5 text-gray-600" />
            <span className="hidden sm:inline font-semibold">Saved</span>
            {savedCount > 0 && (
              <span className="bg-black text-white text-[10px] font-bold px-1.5 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {/* Subscribe Button */}
          <button
            onClick={onOpenSubscribe}
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[11px] tracking-wider font-semibold px-3 py-1.5 rounded uppercase transition-colors shadow-xs"
          >
            Subscribe for $1/week
          </button>

          {/* Log In Button */}
          <button
            onClick={onOpenLogin}
            className="border border-gray-300 text-gray-800 hover:border-gray-400 text-[11px] font-semibold px-3 py-1.5 rounded uppercase transition-colors"
          >
            {isLoggedIn ? (
              <span className="flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="truncate max-w-[80px]">{userEmail?.split('@')[0] || 'Subscriber'}</span>
              </span>
            ) : (
              'Log In'
            )}
          </button>
        </div>
      </div>

      {/* Date, Today's Paper & Stock Indices */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[12px] font-sans text-gray-600 pt-1 pb-2 border-b border-[#e2e2e2]" data-purpose="masthead-meta">
        <div className="flex items-center space-x-3 font-medium text-gray-800 text-[12px]">
          <time className="font-bold" dateTime="2025-10-15">Wednesday, October 15, 2025</time>
          <span className="text-gray-400">|</span>
          <button
            onClick={() => onNavigate('todays-paper')}
            className={`hover:underline text-gray-600 font-normal ${
              currentScreen === 'todays-paper' ? 'underline font-semibold text-black' : ''
            }`}
          >
            Today’s Paper
          </button>
        </div>

        <div className="hidden lg:flex items-center space-x-4 text-[11px] text-gray-600">
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-gray-800">S&P 500</span>
            <span className="text-emerald-700 font-medium">+0.42% ▲</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-bold text-gray-800">Nasdaq</span>
            <span className="text-emerald-700 font-medium">+0.68% ▲</span>
          </div>
          <div className="flex items-center space-x-1.5 text-gray-500">
            <span className="font-medium text-gray-700">Dow</span>
            <span className="text-emerald-700 font-medium">+0.25% ▲</span>
          </div>
        </div>
      </div>

      {/* Main Blackletter Masthead Title */}
      <div className="text-center py-2 sm:py-3 border-b-4 border-double border-black" data-purpose="masthead-brand">
        <h1
          onClick={() => onNavigate('frontpage')}
          className="font-masthead text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none text-black cursor-pointer select-none hover:opacity-90 transition-opacity"
          title="The New York Times - Return to Front Page"
        >
          The New York Times
        </h1>
      </div>

      {/* Primary Horizontal Navigation */}
      <nav className="border-b border-[#e2e2e2] py-1.5 overflow-x-auto scrollbar-none" data-purpose="main-navigation">
        <ul className="flex items-center justify-center space-x-3 sm:space-x-5 text-[11px] md:text-[12px] font-sans font-medium text-gray-800 tracking-tight whitespace-nowrap min-w-max px-2">
          {navSections.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={`hover:underline hover:text-black py-0.5 transition-colors ${
                  currentScreen === item.id ? 'font-bold text-black underline underline-offset-4' : ''
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sub-header Alert / Special Contextual Banner */}
      <div className="flex items-center justify-center space-x-2 py-1.5 border-b border-[#e2e2e2] text-xs text-gray-600 bg-gray-50/70" data-purpose="trending-banner">
        <span className="font-nyt-serif italic text-gray-500">These top stories are</span>
        <button
          onClick={() => onNavigate('frontpage')}
          className="underline font-sans font-medium text-gray-800 hover:text-black"
        >
          free to read.
        </button>
        <span className="text-gray-400 text-[10px] hidden sm:inline">· Independent journalism funded by subscribers</span>
      </div>
    </header>
  );
};
