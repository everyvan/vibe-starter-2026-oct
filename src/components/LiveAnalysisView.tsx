import React from 'react';
import { ArrowLeft, RefreshCw, Radio, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { LIVE_UPDATES } from '../data/newsData';

interface LiveAnalysisViewProps {
  onBack: () => void;
  onOpenArticle: (id: string) => void;
}

export const LiveAnalysisView: React.FC<LiveAnalysisViewProps> = ({ onBack, onOpenArticle }) => {
  return (
    <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Top back button */}
      <div className="border-b border-[#e2e2e2] pb-3 mb-6 font-sans text-xs text-gray-600 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 hover:text-black font-medium transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Front Page</span>
          <span className="text-gray-300">/</span>
          <span className="text-red-700 font-bold uppercase tracking-wider">Live Analysis</span>
        </button>

        <div className="flex items-center gap-2 text-red-700 font-semibold text-xs uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          <span>Live Reporting Active</span>
        </div>
      </div>

      {/* Live Header */}
      <header className="max-w-[800px] mx-auto space-y-3 mb-8">
        <div className="inline-block bg-red-700 text-white text-[11px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
          Live Analysis
        </div>
        <h1 className="font-nyt-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-950 leading-tight">
          Federal Reserve Signals Cautious Optimism on Interest Rate Stabilization
        </h1>
        <p className="font-nyt-serif text-lg text-gray-600 leading-relaxed">
          Federal Reserve officials and Wall Street analysts parse economic indicators as central bankers indicate policy rates may remain stable through the next quarter.
        </p>

        <div className="pt-3 border-t border-gray-200 text-xs font-sans text-gray-500 flex items-center justify-between">
          <div>By Jeanna Smialek, Joe Rennison and Ben Casselman</div>
          <div>Updated 12 minutes ago</div>
        </div>
      </header>

      {/* Key Takeaways Box */}
      <div className="max-w-[800px] mx-auto bg-gray-50 border border-gray-200 p-5 rounded-xs mb-8">
        <div className="font-nyt-serif font-bold text-sm uppercase tracking-wider text-black mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
          <span>Key Takeaways So Far</span>
        </div>
        <ul className="space-y-2 text-sm font-nyt-serif text-gray-800 list-disc list-inside">
          <li><strong>Rate Pause Confirmed:</strong> Chairman indicated the benchmark funds rate will stay within 4.25% - 4.50% range.</li>
          <li><strong>Inflation Disinflation:</strong> Core PCE metrics show consistent alignment towards the central bank's 2.0% objective.</li>
          <li><strong>Bond Markets Rally:</strong> Yields on 2-year and 10-year Treasury notes retreated following the opening press conference.</li>
          <li><strong>Global Coordination:</strong> Officials in London and Frankfurt echoed similar monetary stance assessments.</li>
        </ul>
      </div>

      {/* Real-time Timeline Feed */}
      <div className="max-w-[800px] mx-auto space-y-6">
        <div className="flex items-center justify-between border-b-2 border-black pb-2">
          <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-black">
            Timeline of Updates
          </h3>
          <span className="text-xs text-gray-500 font-sans">Chronological updates</span>
        </div>

        <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gray-200">
          {LIVE_UPDATES.map((update) => (
            <div key={update.id} className="relative pl-8 space-y-1.5">
              {/* Dot */}
              <div className="absolute left-2.5 top-1.5 w-2.5 h-2.5 rounded-full bg-red-600 ring-4 ring-white"></div>
              
              <div className="flex items-center gap-2 text-xs font-sans text-gray-500">
                <span className="font-bold text-red-700">{update.timestamp}</span>
                <span>·</span>
                <span className="font-medium text-gray-700">{update.author}</span>
              </div>

              <h4 className="font-nyt-serif font-bold text-lg text-gray-950 leading-snug">
                {update.headline}
              </h4>

              <p className="font-nyt-serif text-sm text-gray-700 leading-relaxed">
                {update.body}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
