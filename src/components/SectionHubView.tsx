import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface SectionHubViewProps {
  sectionName: string;
  onBack: () => void;
  onOpenArticle: (id: string) => void;
}

export const SectionHubView: React.FC<SectionHubViewProps> = ({
  sectionName,
  onBack,
  onOpenArticle,
}) => {
  // Filter or curate articles relevant to the section
  const allArticles = Object.values(ARTICLES);
  const matchingArticles = allArticles.filter(
    (a) => a.section.toLowerCase().includes(sectionName.toLowerCase()) || sectionName.toLowerCase() === 'u.s.'
  );

  const displayList = matchingArticles.length > 0 ? matchingArticles : allArticles.slice(0, 5);

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
          <span className="font-semibold text-gray-950 uppercase tracking-wider">{sectionName}</span>
        </button>

        <span className="text-xs text-gray-500 font-sans">Section Index</span>
      </div>

      <header className="pb-4 border-b-2 border-black mb-8">
        <h1 className="font-nyt-serif text-4xl sm:text-5xl font-bold text-black capitalize">
          {sectionName}
        </h1>
        <p className="font-nyt-serif text-base text-gray-600 mt-2">
          Comprehensive reporting, breaking dispatches, and thoughtful analysis from The New York Times.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main lead story in section */}
        <div className="md:col-span-8 space-y-6">
          {displayList.slice(0, 1).map((lead) => (
            <article
              key={lead.id}
              onClick={() => onOpenArticle(lead.id)}
              className="space-y-3 cursor-pointer group border-b border-gray-200 pb-6"
            >
              {lead.imageUrl && (
                <div className="overflow-hidden bg-gray-100 max-h-[360px] border border-gray-200">
                  <img
                    src={lead.imageUrl}
                    alt={lead.title}
                    className="w-full h-full object-cover group-hover:opacity-95 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <h2 className="font-nyt-serif text-2xl sm:text-3xl font-bold text-gray-950 group-hover:underline">
                {lead.title}
              </h2>
              <p className="font-nyt-serif text-base text-gray-700 leading-relaxed">
                {lead.summary}
              </p>
              <div className="text-xs font-sans text-gray-500 flex items-center gap-2">
                <span className="font-bold text-black">{lead.byline}</span>
                <span>·</span>
                <span>{lead.readTime}</span>
              </div>
            </article>
          ))}

          {/* Sub stories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {displayList.slice(1, 5).map((story) => (
              <article
                key={story.id}
                onClick={() => onOpenArticle(story.id)}
                className="space-y-2 cursor-pointer group border-b sm:border-b-0 pb-4 sm:pb-0"
              >
                <h3 className="font-nyt-serif font-bold text-lg leading-snug group-hover:underline text-gray-950">
                  {story.title}
                </h3>
                <p className="font-nyt-serif text-xs text-gray-600 line-clamp-3">
                  {story.summary}
                </p>
                <div className="text-[11px] font-sans text-gray-500">
                  {story.readTime}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4 border-l border-gray-200 pl-0 md:pl-6 space-y-6">
          <div className="border-t-2 border-black pt-2">
            <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-black mb-3">
              Section Columnists
            </h3>
            <div className="space-y-4">
              {allArticles.filter((a) => a.section === 'Opinion').map((op) => (
                <div
                  key={op.id}
                  onClick={() => onOpenArticle(op.id)}
                  className="space-y-1 cursor-pointer group"
                >
                  <span className="text-xs font-sans font-bold text-gray-900 block group-hover:underline">
                    {op.byline}
                  </span>
                  <h4 className="font-nyt-serif font-bold text-sm text-gray-950 leading-snug group-hover:underline">
                    {op.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
