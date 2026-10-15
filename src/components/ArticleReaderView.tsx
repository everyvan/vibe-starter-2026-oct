import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  MessageSquare,
  Type,
  Gift,
  Check,
  ChevronRight,
  Sun,
  Moon,
  BookOpen
} from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

interface ArticleReaderViewProps {
  article: Article;
  onBack: () => void;
  onNavigateArticle: (id: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenGiftModal?: () => void;
  useHotlinkImage: boolean;
}

export const ArticleReaderView: React.FC<ArticleReaderViewProps> = ({
  article,
  onBack,
  onNavigateArticle,
  isBookmarked,
  onToggleBookmark,
  onOpenGiftModal,
  useHotlinkImage,
}) => {
  // Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  
  // Text size state: 'sm' | 'base' | 'lg'
  const [textSize, setTextSize] = useState<'sm' | 'base' | 'lg'>('base');
  
  // Theme state: 'paper' | 'sepia' | 'night'
  const [readingTheme, setReadingTheme] = useState<'paper' | 'sepia' | 'night'>('paper');

  // Share toast state
  const [copiedShare, setCopiedShare] = useState(false);
  
  // Comments state
  const [commentsList, setCommentsList] = useState(article.comments || []);
  const [newCommentText, setNewCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  // Audio simulation timer
  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 1 * audioSpeed;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio, audioSpeed]);

  const handleCopyShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      id: `c-user-${Date.now()}`,
      author: 'You (Verified Subscriber)',
      location: 'New York, NY',
      timeAgo: 'Just now',
      text: newCommentText.trim(),
      recommendations: 1,
      verifiedSubscriber: true,
    };

    setCommentsList([newComment, ...commentsList]);
    setNewCommentText('');
  };

  const handleUpvoteComment = (id: string) => {
    setCommentsList(
      commentsList.map((c) =>
        c.id === id ? { ...c, recommendations: c.recommendations + 1 } : c
      )
    );
  };

  // Other stories for recommendations
  const otherStories = Object.values(ARTICLES).filter((a) => a.id !== article.id).slice(0, 3);

  const textSizeClass =
    textSize === 'sm'
      ? 'text-base leading-relaxed'
      : textSize === 'lg'
      ? 'text-xl sm:text-2xl leading-loose'
      : 'text-lg sm:text-[19px] leading-relaxed';

  // Theme container classes
  const themeClasses =
    readingTheme === 'sepia'
      ? 'bg-[#fbf7ee] text-[#2c2621]'
      : readingTheme === 'night'
      ? 'bg-[#18181b] text-[#f4f4f5]'
      : 'bg-white text-gray-900';

  const themeBorder =
    readingTheme === 'night' ? 'border-[#27272a]' : 'border-[#e2e2e2]';

  return (
    <div className={`transition-colors duration-200 min-h-screen py-6 ${themeClasses}`}>
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb & Quick Controls */}
        <div className={`flex flex-wrap items-center justify-between border-b pb-3 mb-6 font-sans text-xs gap-3 ${themeBorder} ${readingTheme === 'night' ? 'text-gray-400' : 'text-gray-600'}`}>
          <button
            onClick={onBack}
            className={`flex items-center gap-1.5 font-medium transition-colors cursor-pointer group ${readingTheme === 'night' ? 'hover:text-white' : 'hover:text-black'}`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span>Front Page</span>
            {article.section && (
              <>
                <span className="text-gray-400">/</span>
                <span className={`uppercase tracking-wider font-semibold ${readingTheme === 'night' ? 'text-gray-200' : 'text-gray-800'}`}>
                  {article.section}
                </span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* Reading Theme Toggle */}
            <div className={`flex items-center border rounded px-1 py-0.5 text-[11px] gap-1 ${readingTheme === 'night' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
              <button
                onClick={() => setReadingTheme('paper')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${readingTheme === 'paper' ? 'bg-gray-200 text-black font-bold' : 'text-gray-500'}`}
                title="Paper White Mode"
              >
                Paper
              </button>
              <button
                onClick={() => setReadingTheme('sepia')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${readingTheme === 'sepia' ? 'bg-[#e7dec8] text-[#2c2621] font-bold' : 'text-gray-500'}`}
                title="Warm Sepia Newsprint"
              >
                Sepia
              </button>
              <button
                onClick={() => setReadingTheme('night')}
                className={`px-1.5 py-0.5 rounded text-[10px] font-medium transition-colors ${readingTheme === 'night' ? 'bg-gray-700 text-white font-bold' : 'text-gray-500'}`}
                title="Night Reading Mode"
              >
                Night
              </button>
            </div>

            {/* Text Size Adjuster */}
            <div className={`flex items-center gap-1 border rounded px-1.5 py-0.5 text-[11px] ${readingTheme === 'night' ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
              <Type className="w-3.5 h-3.5 text-gray-400" />
              <button
                onClick={() => setTextSize('sm')}
                className={`px-1 rounded ${textSize === 'sm' ? 'font-bold bg-gray-300 text-black' : 'hover:opacity-70'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setTextSize('base')}
                className={`px-1 rounded ${textSize === 'base' ? 'font-bold bg-gray-300 text-black' : 'hover:opacity-70'}`}
                title="Medium text"
              >
                A
              </button>
              <button
                onClick={() => setTextSize('lg')}
                className={`px-1 rounded ${textSize === 'lg' ? 'font-bold bg-gray-300 text-black' : 'hover:opacity-70'}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Gift Article Button */}
            {onOpenGiftModal && (
              <button
                onClick={onOpenGiftModal}
                className="hidden sm:flex items-center gap-1 text-[11px] font-medium border border-gray-300 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                title="Gift this article"
              >
                <Gift className="w-3.5 h-3.5 text-[#567b95]" />
                <span>Gift</span>
              </button>
            )}

            {/* Bookmark Button */}
            <button
              onClick={onToggleBookmark}
              className={`flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                isBookmarked
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleCopyShare}
              className="flex items-center gap-1 text-[11px] font-medium hover:bg-gray-100 border border-gray-300 px-2 py-1 rounded transition-colors relative"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>
        </div>

      {/* Main Article Header */}
      <header className="max-w-[760px] mx-auto space-y-3 mb-6">
        {article.kicker && (
          <div className="text-xs font-sans font-bold tracking-widest text-[#567b95] uppercase">
            {article.kicker}
          </div>
        )}

        <h1 className="font-nyt-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950 leading-[1.15]">
          {article.title}
        </h1>

        {article.deck && (
          <p className="font-nyt-serif text-lg sm:text-xl text-gray-600 leading-relaxed pt-1">
            {article.deck}
          </p>
        )}

        {/* Byline and Dateline */}
        <div className="pt-3 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-sans text-gray-600 gap-2">
          <div>
            <span className="font-bold text-gray-900">{article.byline}</span>
            {article.authorTitle && (
              <span className="text-gray-500">, {article.authorTitle}</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <time>{article.date}</time>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </header>

        {/* Audio Player Bar (Listen to Article) */}
        <div className={`max-w-[760px] mx-auto border rounded-sm p-3 mb-8 transition-colors ${
          readingTheme === 'night' ? 'bg-[#202023] border-[#2e2e32]' : readingTheme === 'sepia' ? 'bg-[#f4eedf] border-[#dfd6c0]' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors shadow-xs"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-sans font-bold block leading-tight ${readingTheme === 'night' ? 'text-gray-100' : 'text-gray-900'}`}>
                    Listen to this article
                  </span>
                  {isPlayingAudio && (
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-[#567b95] h-full animate-pulse" />
                      <span className="w-0.5 bg-[#567b95] h-2/3 animate-pulse" />
                      <span className="w-0.5 bg-[#567b95] h-4/5 animate-pulse" />
                      <span className="w-0.5 bg-[#567b95] h-1/2 animate-pulse" />
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-gray-500 font-sans">Narrated by The New York Times Audio</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setAudioSpeed(audioSpeed === 1 ? 1.25 : audioSpeed === 1.25 ? 1.5 : 1)}
                className={`text-[11px] font-mono font-bold border rounded px-2 py-0.5 transition-colors ${
                  readingTheme === 'night' ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
                title="Playback speed"
              >
                {audioSpeed}x
              </button>
            </div>
          </div>

          {/* Audio Scrubber */}
          <div
            className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setAudioProgress(Math.min(100, Math.max(0, (clickX / rect.width) * 100)));
            }}
          >
            <div
              className="bg-[#567b95] h-full transition-all duration-300"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        </div>

        {/* Lead Visual Imagery */}
        {article.imageUrl && (
          <figure className="max-w-[880px] mx-auto mb-8 space-y-2">
            <div className="border border-gray-200 overflow-hidden bg-gray-100 shadow-xs">
              <img
                src={useHotlinkImage && article.hotlinkPlaceholder ? article.hotlinkPlaceholder : article.imageUrl}
                alt={article.title}
                className="w-full h-auto object-cover max-h-[540px]"
                referrerPolicy="no-referrer"
              />
            </div>
            <figcaption className="text-xs font-sans text-gray-500 flex flex-col sm:flex-row justify-between sm:items-center pt-1 gap-1">
              <span>{article.imageCaption || article.title}</span>
              <span className="text-gray-400 font-medium">{article.imageCredit || 'The New York Times'}</span>
            </figcaption>
          </figure>
        )}

        {/* Article Body Content */}
        <div className={`max-w-[700px] mx-auto font-nyt-serif space-y-5 ${
          readingTheme === 'night' ? 'text-gray-200' : readingTheme === 'sepia' ? 'text-[#2c2621]' : 'text-gray-900'
        }`}>
        {article.paragraphs.map((paragraph, index) => {
          if (index === 0) {
            return (
              <p
                key={index}
                className={`${textSizeClass} first-letter-dropcap text-gray-900 leading-relaxed`}
              >
                {paragraph}
              </p>
            );
          }

          return (
            <React.Fragment key={index}>
              <p className={textSizeClass}>
                {paragraph}
              </p>

              {/* Insert Pullquote after paragraph 2 if present */}
              {index === 2 && article.pullQuote && (
                <blockquote className="my-8 py-3 px-6 border-l-2 border-black italic text-xl sm:text-2xl font-serif text-gray-950 bg-gray-50/50">
                  <p className="leading-snug">“{article.pullQuote.quote}”</p>
                  <footer className="text-xs font-sans not-italic font-bold text-gray-600 mt-2 uppercase tracking-wider">
                    — {article.pullQuote.attribution}
                  </footer>
                </blockquote>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Article Footer & Action Row */}
      <div className="max-w-[700px] mx-auto mt-10 pt-6 border-t border-gray-300 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-sm hover:bg-gray-800 transition-colors font-medium"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comments ({commentsList.length})</span>
          </button>
          
          <button
            onClick={onToggleBookmark}
            className="flex items-center gap-1.5 border border-gray-300 text-gray-800 px-3 py-1.5 rounded-sm hover:bg-gray-100 transition-colors font-medium"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'In Your Reading List' : 'Save Article'}</span>
          </button>
        </div>

        <div className="text-gray-500">
          A version of this article appears in print on Page A1 of the National edition.
        </div>
      </div>

      {/* Comments Section (Collapsible / Expandable) */}
      {showComments && (
        <section className="max-w-[700px] mx-auto mt-6 bg-gray-50 border border-gray-200 p-6 rounded-sm">
          <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-3">
            <h3 className="font-nyt-serif font-bold text-lg text-black">
              Reader Discussion ({commentsList.length})
            </h3>
            <span className="text-[11px] font-sans text-gray-500">Moderated by Times Staff</span>
          </div>

          {/* Add a comment */}
          <form onSubmit={handleAddComment} className="mb-6 space-y-2">
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="What are your thoughts on this story? Share your perspective..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded text-sm font-sans focus:outline-none focus:ring-1 focus:ring-black"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="bg-[#567b95] text-white hover:bg-[#326891] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
              >
                Submit Comment
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {commentsList.map((c) => (
              <div key={c.id} className="bg-white p-4 border border-gray-200 rounded-xs space-y-1.5">
                <div className="flex items-center justify-between text-xs font-sans">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-gray-900">{c.author}</span>
                    <span className="text-gray-400">·</span>
                    <span className="text-gray-500">{c.location}</span>
                  </div>
                  <span className="text-gray-400 text-[11px]">{c.timeAgo}</span>
                </div>
                <p className="font-nyt-serif text-sm text-gray-800 leading-relaxed">
                  {c.text}
                </p>
                <div className="flex items-center justify-between pt-1 text-[11px] font-sans text-gray-500">
                  <button
                    onClick={() => handleUpvoteComment(c.id)}
                    className="hover:text-black flex items-center gap-1 text-gray-600"
                  >
                    <span>Recommend</span>
                    <span className="font-bold">({c.recommendations})</span>
                  </button>
                  {c.verifiedSubscriber && (
                    <span className="text-emerald-700 font-medium text-[10px]">NYT Subscriber</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* More from the New York Times */}
      <section className="max-w-[760px] mx-auto mt-14 pt-8 border-t-2 border-black">
        <h3 className="font-nyt-serif font-bold text-lg text-black mb-4 uppercase tracking-wider text-xs">
          More News & Analysis
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherStories.map((story) => (
            <article
              key={story.id}
              onClick={() => onNavigateArticle(story.id)}
              className="space-y-2 cursor-pointer group"
            >
              <h4 className="font-nyt-serif font-bold text-base leading-snug group-hover:underline text-gray-950">
                {story.title}
              </h4>
              <p className="font-nyt-serif text-xs text-gray-600 line-clamp-3">
                {story.summary}
              </p>
              <div className="text-[11px] font-sans text-gray-500">
                {story.readTime}
              </div>
            </article>
          ))}
        </div>
      </section>

      </div>
    </div>
  );
};
