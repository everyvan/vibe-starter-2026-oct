import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Share2 } from 'lucide-react';
import { NYTMasthead } from './NYTMasthead';

interface StickyHeaderProps {
  onNavigate: (screen: string) => void;
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  currentScreenTitle?: string;
  isArticleScreen?: boolean;
  onShare?: () => void;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
}

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  onNavigate,
  onOpenSearch,
  onOpenSubscribe,
  onOpenSaved,
  savedCount,
  currentScreenTitle,
  isArticleScreen,
  onShare,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show after scrolling past masthead (~180px)
      setIsVisible(scrollY > 180);

      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadingProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs transition-transform duration-200">
      {/* Top thin reading progress bar */}
      <div className="w-full h-[2px] bg-gray-100">
        <div
          className="h-full bg-black transition-all duration-100"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
        
        {/* Left: Section or Back to Top */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('frontpage')}
            className="text-xs font-sans font-bold uppercase tracking-wider text-gray-700 hover:text-black flex items-center gap-1.5"
          >
            <span>{currentScreenTitle || 'Front Page'}</span>
          </button>

          <button
            onClick={onOpenSearch}
            className="p-1 text-gray-500 hover:text-black"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Mini NYT Masthead */}
        <div className="flex items-center">
          <NYTMasthead size="small" onClick={() => onNavigate('frontpage')} />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 text-xs font-sans">
          {isArticleScreen ? (
            <>
              {onToggleBookmark && (
                <button
                  onClick={onToggleBookmark}
                  className={`p-1.5 rounded transition-colors ${
                    isBookmarked ? 'text-black bg-gray-100' : 'text-gray-500 hover:text-black'
                  }`}
                  title="Save article"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-black' : ''}`} />
                </button>
              )}
              {onShare && (
                <button
                  onClick={onShare}
                  className="p-1.5 text-gray-500 hover:text-black rounded"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={onOpenSaved}
              className="flex items-center gap-1 text-gray-600 hover:text-black p-1.5 rounded"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="bg-black text-white text-[10px] font-bold px-1.5 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={onOpenSubscribe}
            className="bg-[#567b95] hover:bg-[#326891] text-white text-[10px] sm:text-[11px] tracking-wider font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded uppercase transition-colors"
          >
            Subscribe
          </button>
        </div>

      </div>
    </div>
  );
};
