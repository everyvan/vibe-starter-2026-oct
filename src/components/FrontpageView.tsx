import React from 'react';
import { Bookmark, Clock, Flame, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../data/newsData';

interface FrontpageViewProps {
  onOpenArticle: (articleId: string) => void;
  onOpenLiveAnalysis: () => void;
  onToggleBookmark: (articleId: string, e: React.MouseEvent) => void;
  savedArticleIds: string[];
  useHotlinkImage: boolean;
}

export const FrontpageView: React.FC<FrontpageViewProps> = ({
  onOpenArticle,
  onOpenLiveAnalysis,
  onToggleBookmark,
  savedArticleIds,
  useHotlinkImage,
}) => {
  const leadArticle = ARTICLES['trump-press-secretary'];
  const story1 = ARTICLES['women-leaving-trump'];
  const story2 = ARTICLES['kimberly-guilfoyle'];
  const story3 = ARTICLES['private-senators-dinner'];
  const subStory1 = ARTICLES['special-counsel-appeals'];
  const subStory2 = ARTICLES['justice-department-reshuffle'];
  const opinion1 = ARTICLES['david-brooks-opinion'];
  const opinion2 = ARTICLES['maureen-dowd-opinion'];
  const opinion3 = ARTICLES['paul-krugman-opinion'];
  const popular1 = ARTICLES['brain-scans-study'];
  const popular2 = ARTICLES['best-nyc-restaurant'];
  const popular3 = ARTICLES['retirement-planning'];

  return (
    <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Three Column Layout matching classic NYT Homepage Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* LEFT COLUMN: Major Headlines & Developing Stories (Col span 3) */}
        <section className="lg:col-span-3 flex flex-col space-y-6 lg:border-r lg:border-[#e2e2e2] lg:pr-6" data-purpose="secondary-leads">
          
          {/* Story 1 */}
          <article className="space-y-2 border-b border-[#e2e2e2] pb-5 lg:border-b-0 lg:pb-0 group">
            <div className="flex items-start justify-between gap-2">
              <h2
                onClick={() => onOpenArticle(story1.id)}
                className="font-nyt-serif text-xl sm:text-2xl font-bold leading-snug tracking-tight headline-hover cursor-pointer text-gray-950"
              >
                {story1.title}
              </h2>
              <button
                onClick={(e) => onToggleBookmark(story1.id, e)}
                title={savedArticleIds.includes(story1.id) ? 'Remove bookmark' : 'Save article'}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-black shrink-0"
                aria-label="Bookmark article"
              >
                <Bookmark className={`w-4 h-4 ${savedArticleIds.includes(story1.id) ? 'fill-black text-black' : ''}`} />
              </button>
            </div>
            <p
              onClick={() => onOpenArticle(story1.id)}
              className="font-nyt-serif text-sm text-gray-700 leading-relaxed cursor-pointer"
            >
              {story1.summary}
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-sans text-gray-500 pt-1">
              <time dateTime="PT4M">{story1.readTime}</time>
            </div>
          </article>

          <hr className="border-t border-[#e2e2e2] hidden lg:block" />

          {/* Story 2 */}
          <article className="space-y-2 border-b border-[#e2e2e2] pb-5 lg:border-b-0 lg:pb-0 group">
            <div className="flex items-start justify-between gap-2">
              <h3
                onClick={() => onOpenArticle(story2.id)}
                className="font-nyt-serif text-lg font-bold leading-snug tracking-tight headline-hover cursor-pointer text-gray-950"
              >
                {story2.title}
              </h3>
              <button
                onClick={(e) => onToggleBookmark(story2.id, e)}
                title={savedArticleIds.includes(story2.id) ? 'Remove bookmark' : 'Save article'}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-black shrink-0"
                aria-label="Bookmark article"
              >
                <Bookmark className={`w-4 h-4 ${savedArticleIds.includes(story2.id) ? 'fill-black text-black' : ''}`} />
              </button>
            </div>
            <p
              onClick={() => onOpenArticle(story2.id)}
              className="font-nyt-serif text-[13px] text-gray-600 leading-relaxed cursor-pointer"
            >
              {story2.summary}
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-sans text-gray-500 pt-1">
              <time dateTime="PT6M">{story2.readTime}</time>
            </div>
          </article>

          <hr className="border-t border-[#e2e2e2] hidden lg:block" />

          {/* Story 3 */}
          <article className="space-y-2 group">
            <div className="flex items-start justify-between gap-2">
              <h3
                onClick={() => onOpenArticle(story3.id)}
                className="font-nyt-serif text-base font-bold leading-tight headline-hover cursor-pointer text-gray-950"
              >
                {story3.title}
              </h3>
              <button
                onClick={(e) => onToggleBookmark(story3.id, e)}
                title={savedArticleIds.includes(story3.id) ? 'Remove bookmark' : 'Save article'}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-black shrink-0"
                aria-label="Bookmark article"
              >
                <Bookmark className={`w-4 h-4 ${savedArticleIds.includes(story3.id) ? 'fill-black text-black' : ''}`} />
              </button>
            </div>
            <p
              onClick={() => onOpenArticle(story3.id)}
              className="font-nyt-serif text-xs text-gray-600 leading-relaxed cursor-pointer"
            >
              {story3.summary}
            </p>
            <div className="flex items-center space-x-2 text-[11px] font-sans text-gray-500 pt-1">
              <time dateTime="PT3M">{story3.readTime}</time>
            </div>
          </article>

          {/* Quick Audio Section Highlight */}
          <div className="hidden lg:block pt-4 border-t border-[#e2e2e2]">
            <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-gray-400 mb-2">
              The Daily Podcast
            </div>
            <h4
              onClick={() => onOpenArticle(leadArticle.id)}
              className="font-nyt-serif text-sm font-semibold hover:underline cursor-pointer leading-snug"
            >
              How the Battle for the West Wing Communications Room Began
            </h4>
            <div className="text-[11px] text-gray-500 flex items-center gap-1.5 mt-1 font-sans">
              <span className="w-2 h-2 rounded-full bg-black inline-block"></span>
              <span>24 mins</span>
              <span>·</span>
              <span className="text-gray-400">Hosted by Michael Barbaro</span>
            </div>
          </div>
        </section>

        {/* CENTER COLUMN: Primary Lead Visual Story (Col span 6) */}
        <section className="lg:col-span-6 flex flex-col space-y-4 lg:border-r lg:border-[#e2e2e2] lg:pr-6" data-purpose="primary-hero">
          
          {/* Hero Visual Media & Caption */}
          <div className="space-y-2 group cursor-pointer" onClick={() => onOpenArticle(leadArticle.id)}>
            <figure className="relative w-full overflow-hidden bg-gray-100 border border-gray-200">
              <img
                alt="Lead story investigative figure portrait"
                className="w-full h-auto object-cover max-h-[480px] shadow-sm hover:opacity-95 transition-opacity"
                src={useHotlinkImage ? leadArticle.hotlinkPlaceholder : (leadArticle.imageUrl || leadArticle.hotlinkPlaceholder)}
                referrerPolicy="no-referrer"
              />
            </figure>
            <figcaption className="text-[11px] font-sans text-gray-500 flex justify-between items-center pt-1">
              <span>{leadArticle.imageCaption}</span>
              <span className="text-gray-400">{leadArticle.imageCredit}</span>
            </figcaption>
          </div>

          {/* Hero Headline & Content */}
          <article className="space-y-3 pt-2">
            <div className="flex items-start justify-between gap-3">
              <h2
                onClick={() => onOpenArticle(leadArticle.id)}
                className="font-nyt-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-gray-950 headline-hover cursor-pointer"
              >
                {leadArticle.title}
              </h2>
              <button
                onClick={(e) => onToggleBookmark(leadArticle.id, e)}
                title={savedArticleIds.includes(leadArticle.id) ? 'Remove bookmark' : 'Save article'}
                className="p-1 text-gray-400 hover:text-black shrink-0 mt-1"
                aria-label="Bookmark lead article"
              >
                <Bookmark className={`w-5 h-5 ${savedArticleIds.includes(leadArticle.id) ? 'fill-black text-black' : ''}`} />
              </button>
            </div>
            
            <p
              onClick={() => onOpenArticle(leadArticle.id)}
              className="font-nyt-serif text-base text-gray-800 leading-relaxed cursor-pointer"
            >
              {leadArticle.summary}
            </p>

            <div className="flex items-center space-x-3 text-[12px] font-sans text-gray-500 font-medium">
              <span className="text-black font-semibold">{leadArticle.byline}</span>
              <span>·</span>
              <time dateTime="PT8M">{leadArticle.readTime}</time>
            </div>
          </article>

          {/* Secondary Sub-story embedded under Hero */}
          <div className="mt-4 pt-4 border-t border-[#e2e2e2] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <article className="space-y-1.5 group cursor-pointer" onClick={() => onOpenArticle(subStory1.id)}>
              <h4 className="font-nyt-serif font-bold text-sm leading-snug headline-hover cursor-pointer text-gray-950">
                {subStory1.title}
              </h4>
              <p className="font-nyt-serif text-xs text-gray-600 leading-relaxed">
                {subStory1.summary}
              </p>
            </article>

            <article className="space-y-1.5 group cursor-pointer" onClick={() => onOpenArticle(subStory2.id)}>
              <h4 className="font-nyt-serif font-bold text-sm leading-snug headline-hover cursor-pointer text-gray-950">
                {subStory2.title}
              </h4>
              <p className="font-nyt-serif text-xs text-gray-600 leading-relaxed">
                {subStory2.summary}
              </p>
            </article>
          </div>
        </section>

        {/* RIGHT COLUMN: Opinion, Briefs, & Trending (Col span 3) */}
        <section className="lg:col-span-3 flex flex-col space-y-6" data-purpose="opinion-and-briefs">
          
          {/* Live Updates / Breaking Badge */}
          <div
            onClick={onOpenLiveAnalysis}
            className="border border-[#e2e2e2] p-3 rounded-sm bg-gray-50/70 hover:bg-gray-100/80 transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2 text-[11px] font-bold text-red-700 tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span>Live Analysis</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-red-700 group-hover:translate-x-0.5 transition-all" />
            </div>
            
            <h4 className="font-nyt-serif font-bold text-sm leading-snug text-gray-900 headline-hover cursor-pointer">
              Federal Reserve signals cautious optimism on interest rate stabilization.
            </h4>
            
            <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2 font-sans">
              <span>Updated 12m ago</span>
              <span className="text-red-700 font-semibold text-[10px] uppercase">Read Live Feed →</span>
            </div>
          </div>

          {/* Opinion Section Header */}
          <div className="border-t-2 border-black pt-2">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-nyt-serif font-bold text-sm uppercase tracking-wider text-black">
                Opinion
              </h3>
              <span className="text-[11px] font-sans text-gray-500">Columnists & Essays</span>
            </div>

            <div className="space-y-4">
              {/* Opinion Columnist 1 */}
              <article className="border-b border-[#e2e2e2] pb-3 group cursor-pointer" onClick={() => onOpenArticle(opinion1.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <span className="text-xs font-sans font-bold text-gray-900 block group-hover:underline">
                      {opinion1.byline}
                    </span>
                    <h4 className="font-nyt-serif text-sm font-bold leading-snug headline-hover cursor-pointer text-gray-950">
                      {opinion1.title}
                    </h4>
                    <p className="font-nyt-serif text-xs text-gray-600 leading-relaxed">
                      {opinion1.summary}
                    </p>
                  </div>
                  {opinion1.imageUrl && (
                    <img
                      src={opinion1.imageUrl}
                      alt={opinion1.byline}
                      className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200 shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </article>

              {/* Opinion Columnist 2 */}
              <article className="border-b border-[#e2e2e2] pb-3 group cursor-pointer" onClick={() => onOpenArticle(opinion2.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <span className="text-xs font-sans font-bold text-gray-900 block group-hover:underline">
                      {opinion2.byline}
                    </span>
                    <h4 className="font-nyt-serif text-sm font-bold leading-snug headline-hover cursor-pointer text-gray-950">
                      {opinion2.title}
                    </h4>
                    <p className="font-nyt-serif text-xs text-gray-600 leading-relaxed">
                      {opinion2.summary}
                    </p>
                  </div>
                  {opinion2.imageUrl && (
                    <img
                      src={opinion2.imageUrl}
                      alt={opinion2.byline}
                      className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200 shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </article>

              {/* Opinion Columnist 3 */}
              <article className="group cursor-pointer" onClick={() => onOpenArticle(opinion3.id)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <span className="text-xs font-sans font-bold text-gray-900 block group-hover:underline">
                      {opinion3.byline}
                    </span>
                    <h4 className="font-nyt-serif text-sm font-bold leading-snug headline-hover cursor-pointer text-gray-950">
                      {opinion3.title}
                    </h4>
                    <p className="font-nyt-serif text-xs text-gray-600 leading-relaxed">
                      {opinion3.summary}
                    </p>
                  </div>
                  {opinion3.imageUrl && (
                    <img
                      src={opinion3.imageUrl}
                      alt={opinion3.byline}
                      className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200 shadow-2xs"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              </article>
            </div>
          </div>

          {/* Trending / Most Read Widget */}
          <div className="border-t border-[#e2e2e2] pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-gray-500">
                Most Popular
              </h4>
              <Flame className="w-3.5 h-3.5 text-orange-600" />
            </div>

            <ol className="space-y-2.5 text-xs font-nyt-serif text-gray-900 list-decimal list-inside font-medium">
              <li
                onClick={() => onOpenArticle(popular1.id)}
                className="cursor-pointer headline-hover leading-snug py-0.5"
              >
                <span className="hover:underline">{popular1.title}</span>
              </li>
              <li
                onClick={() => onOpenArticle(popular2.id)}
                className="cursor-pointer headline-hover leading-snug py-0.5"
              >
                <span className="hover:underline">{popular2.title}</span>
              </li>
              <li
                onClick={() => onOpenArticle(popular3.id)}
                className="cursor-pointer headline-hover leading-snug py-0.5"
              >
                <span className="hover:underline">{popular3.title}</span>
              </li>
            </ol>
          </div>

          {/* NYT Games Promo Card */}
          <div className="bg-[#f7f7f7] p-3 border border-gray-200 text-center space-y-1.5 rounded-xs">
            <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#727272]">NYT Games</span>
            <div className="font-nyt-serif font-bold text-sm text-black">Play Today's Mini Crossword</div>
            <p className="text-[11px] text-gray-600">Solve in 2 minutes or less without an account.</p>
            <button
              onClick={() => onOpenArticle('mini-crossword')}
              className="mt-1 w-full bg-black text-white hover:bg-gray-800 text-xs font-semibold py-1.5 rounded uppercase tracking-wider transition-colors"
            >
              Play The Mini
            </button>
          </div>
        </section>

      </div>
    </main>
  );
};
