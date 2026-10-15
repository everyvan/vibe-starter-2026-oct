import React from 'react';
import { ArrowLeft, BookOpen, Calendar, Newspaper, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../data/newsData';

interface TodaysPaperViewProps {
  onBack: () => void;
  onOpenArticle: (id: string) => void;
}

export const TodaysPaperView: React.FC<TodaysPaperViewProps> = ({ onBack, onOpenArticle }) => {
  const frontPageStories = [
    ARTICLES['trump-press-secretary'],
    ARTICLES['women-leaving-trump'],
    ARTICLES['kimberly-guilfoyle'],
    ARTICLES['private-senators-dinner'],
    ARTICLES['special-counsel-appeals'],
  ];

  const opinionStories = [
    ARTICLES['david-brooks-opinion'],
    ARTICLES['maureen-dowd-opinion'],
    ARTICLES['paul-krugman-opinion'],
  ];

  const featureStories = [
    ARTICLES['brain-scans-study'],
    ARTICLES['best-nyc-restaurant'],
    ARTICLES['retirement-planning'],
  ];

  return (
    <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top back button */}
      <div className="border-b border-[#e2e2e2] pb-3 mb-6 font-sans text-xs text-gray-600 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 hover:text-black font-medium transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Front Page</span>
          <span className="text-gray-300">/</span>
          <span className="font-semibold text-gray-950 uppercase tracking-wider">Today's Paper</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-gray-500 font-sans">
          <Calendar className="w-3.5 h-3.5" />
          <span>Wednesday, October 15, 2025 · Vol. CLXXIV, No. 60,342</span>
        </div>
      </div>

      <header className="text-center pb-6 border-b-2 border-black mb-8">
        <span className="text-xs font-sans font-bold uppercase tracking-widest text-gray-500">The Print Edition</span>
        <h1 className="font-masthead text-4xl sm:text-5xl md:text-6xl text-black mt-1">Today’s Paper</h1>
        <p className="font-nyt-serif text-sm text-gray-600 mt-2 max-w-xl mx-auto">
          The complete edition of The New York Times as organized for print publication on Wednesday, October 15, 2025.
        </p>
      </header>

      {/* Section 1: The Front Page (Page A1) */}
      <section className="mb-12">
        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-6">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5" />
            <h2 className="font-nyt-serif font-bold text-2xl text-black">Section A: The Front Page (Page A1)</h2>
          </div>
          <span className="text-xs font-sans font-semibold text-gray-500 uppercase">National Edition</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {frontPageStories.map((story, idx) => (
            <article
              key={story.id}
              onClick={() => onOpenArticle(story.id)}
              className="border-b md:border-b-0 pb-4 md:pb-0 space-y-2 cursor-pointer group"
            >
              <div className="text-[10px] font-sans font-bold text-gray-400 uppercase tracking-wider">
                {idx === 0 ? 'Lead Story · Page A1' : `Page A${idx + 2}`}
              </div>
              <h3 className="font-nyt-serif font-bold text-lg leading-snug group-hover:underline text-gray-950">
                {story.title}
              </h3>
              <p className="font-nyt-serif text-xs text-gray-600 leading-relaxed line-clamp-3">
                {story.summary}
              </p>
              <div className="text-[11px] font-sans text-gray-500 pt-1 flex items-center justify-between">
                <span>{story.byline}</span>
                <span>{story.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 2: Opinion & Editorial */}
      <section className="mb-12 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            <h2 className="font-nyt-serif font-bold text-2xl text-black">Opinion & Columnists</h2>
          </div>
          <span className="text-xs font-sans font-semibold text-gray-500 uppercase">Editorial Pages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opinionStories.map((story) => (
            <article
              key={story.id}
              onClick={() => onOpenArticle(story.id)}
              className="space-y-2 cursor-pointer group"
            >
              <span className="text-xs font-sans font-bold text-gray-900 block group-hover:underline">
                {story.byline}
              </span>
              <h3 className="font-nyt-serif font-bold text-base leading-snug group-hover:underline text-gray-950">
                {story.title}
              </h3>
              <p className="font-nyt-serif text-xs text-gray-600 line-clamp-3">
                {story.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Section 3: Business, Culture & Science */}
      <section className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-6">
          <h2 className="font-nyt-serif font-bold text-2xl text-black">Business Day, Dining & Science</h2>
          <span className="text-xs font-sans font-semibold text-gray-500 uppercase">Features & Reviews</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureStories.map((story) => (
            <article
              key={story.id}
              onClick={() => onOpenArticle(story.id)}
              className="space-y-2 cursor-pointer group"
            >
              <div className="text-[10px] font-sans font-bold text-[#567b95] uppercase tracking-wider">
                {story.section}
              </div>
              <h3 className="font-nyt-serif font-bold text-base leading-snug group-hover:underline text-gray-950">
                {story.title}
              </h3>
              <p className="font-nyt-serif text-xs text-gray-600 line-clamp-3">
                {story.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};
