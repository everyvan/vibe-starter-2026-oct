import React, { useState } from 'react';
import { X, Search, Check, Bookmark, ArrowRight, ShieldCheck, Sparkles, Trash2 } from 'lucide-react';
import { Article, ARTICLES } from '../data/newsData';

// SEARCH MODAL
interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (id: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = Object.values(ARTICLES).filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.summary.toLowerCase().includes(query.toLowerCase()) ||
      a.byline.toLowerCase().includes(query.toLowerCase()) ||
      a.section.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 pt-16 sm:pt-24 backdrop-blur-xs">
      <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-gray-300 overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-gray-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search news, topics, reporters, opinions..."
            className="w-full text-base sm:text-lg font-nyt-serif focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-3">
          {query.trim() === '' ? (
            <div className="text-center py-6 text-gray-400 text-sm font-sans">
              Type keywords such as "Trump", "Federal Reserve", "Brain Scans", or "Brooks"
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-6 text-gray-500 text-sm font-sans">
              No articles found matching "{query}".
            </div>
          ) : (
            results.map((article) => (
              <div
                key={article.id}
                onClick={() => {
                  onSelectArticle(article.id);
                  onClose();
                }}
                className="p-3 hover:bg-gray-50 rounded cursor-pointer border border-transparent hover:border-gray-200 transition-colors"
              >
                <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#567b95] mb-1">
                  {article.section} · {article.readTime}
                </div>
                <h4 className="font-nyt-serif font-bold text-base text-gray-950">
                  {article.title}
                </h4>
                <p className="font-nyt-serif text-xs text-gray-600 line-clamp-2 mt-0.5">
                  {article.summary}
                </p>
                <div className="text-[11px] font-sans text-gray-400 mt-1">
                  {article.byline}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// SUBSCRIBE MODAL
interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'digital' | 'all-access'>('all-access');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      onSuccess(email);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white w-full max-w-lg rounded-sm shadow-2xl border border-gray-300 p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="font-nyt-serif text-2xl font-bold text-black">Welcome to The New York Times</h3>
            <p className="text-sm font-sans text-gray-600">Your All Access subscription is now active for {email}.</p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="text-center space-y-1">
              <div className="font-masthead text-3xl text-black">The New York Times</div>
              <h3 className="font-nyt-serif text-2xl font-bold text-gray-950">
                Special Introductory Offer
              </h3>
              <p className="text-xs font-sans text-gray-600">
                Understand the world with original, on-the-ground reporting.
              </p>
            </div>

            {/* Plans */}
            <div className="space-y-3">
              <div
                onClick={() => setSelectedPlan('all-access')}
                className={`p-3.5 border rounded-sm cursor-pointer transition-colors relative ${
                  selectedPlan === 'all-access'
                    ? 'border-black bg-gray-50/80 ring-1 ring-black'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-sans font-bold text-sm text-gray-900 block">NYT All Access</span>
                    <span className="text-xs font-sans text-gray-600">News, Games, Cooking, Wirecutter & The Athletic</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-sans text-black">$1</span>
                    <span className="text-xs text-gray-500"> / week</span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setSelectedPlan('digital')}
                className={`p-3.5 border rounded-sm cursor-pointer transition-colors ${
                  selectedPlan === 'digital'
                    ? 'border-black bg-gray-50/80 ring-1 ring-black'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-sans font-bold text-sm text-gray-900 block">News Basic</span>
                    <span className="text-xs font-sans text-gray-600">Unlimited digital articles and audio</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold font-sans text-black">$0.75</span>
                    <span className="text-xs text-gray-500"> / week</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-sans font-bold text-gray-700 mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full p-2.5 border border-gray-300 rounded text-sm font-sans focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#567b95] hover:bg-[#326891] text-white py-2.5 rounded font-sans font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs"
              >
                Start Subscription for $1/week
              </button>
            </form>

            <p className="text-[10px] text-gray-400 text-center font-sans">
              Cancel anytime. Billed every 4 weeks. No long-term commitment required.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// LOG IN MODAL
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogin(email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md rounded-sm shadow-2xl border border-gray-300 p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-1 mb-6">
          <div className="font-masthead text-3xl text-black">The New York Times</div>
          <h3 className="font-nyt-serif text-xl font-bold text-gray-950">Log In to Your Account</h3>
          <p className="text-xs font-sans text-gray-500">Access your saved articles and subscriber benefits.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-sans font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@example.com"
              className="w-full p-2.5 border border-gray-300 rounded text-sm font-sans focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-xs font-sans font-bold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full p-2.5 border border-gray-300 rounded text-sm font-sans focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded font-sans font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            Continue
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs font-sans text-gray-500">
          Need an account? <span className="underline cursor-pointer font-semibold text-black">Create one</span>
        </div>
      </div>
    </div>
  );
};

// SAVED ARTICLES DRAWER
interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onSelectArticle: (id: string) => void;
  onRemoveBookmark: (id: string) => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedIds,
  onSelectArticle,
  onRemoveBookmark,
}) => {
  if (!isOpen) return null;

  const savedArticles = savedIds.map((id) => ARTICLES[id]).filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col">
        {/* Drawer Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-black fill-black" />
            <h3 className="font-nyt-serif font-bold text-lg text-black">
              Saved for Later ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-sans space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-gray-300" />
              <p className="text-sm font-medium">Your reading list is empty.</p>
              <p className="text-xs text-gray-400">Click the bookmark icon on any headline or inside an article to save it for later.</p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-3 border border-gray-200 rounded-xs hover:border-gray-400 transition-colors flex justify-between gap-3 group"
              >
                <div
                  onClick={() => {
                    onSelectArticle(article.id);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer space-y-1"
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#567b95]">
                    {article.section} · {article.readTime}
                  </span>
                  <h4 className="font-nyt-serif font-bold text-sm text-gray-950 group-hover:underline">
                    {article.title}
                  </h4>
                  <div className="text-[11px] font-sans text-gray-400">
                    {article.byline}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveBookmark(article.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors self-start"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
