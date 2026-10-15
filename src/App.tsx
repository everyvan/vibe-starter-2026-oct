/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { FrontpageView } from './components/FrontpageView';
import { ArticleReaderView } from './components/ArticleReaderView';
import { LiveAnalysisView } from './components/LiveAnalysisView';
import { TodaysPaperView } from './components/TodaysPaperView';
import { MiniCrosswordView } from './components/MiniCrosswordView';
import { SectionHubView } from './components/SectionHubView';
import {
  SearchModal,
  SubscribeModal,
  LoginModal,
  SavedArticlesDrawer,
} from './components/Modals';
import { ARTICLES } from './data/newsData';

export default function App() {
  // Navigation state
  const [currentScreen, setCurrentScreen] = useState<string>('frontpage');
  const [activeArticleId, setActiveArticleId] = useState<string>('trump-press-secretary');
  const [currentEdition, setCurrentEdition] = useState<string>('U.S.');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  // Bookmarks state (saved articles)
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('nyt_saved_articles');
      return stored ? JSON.parse(stored) : ['trump-press-secretary'];
    } catch {
      return ['trump-press-secretary'];
    }
  });

  // Hotlink image vs Generated image toggle (user mentioned: "You can hotlink images from the html")
  const [useHotlinkImage, setUseHotlinkImage] = useState<boolean>(false);

  // Sync saved articles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nyt_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // Ignore storage errors in sandboxed iframes
    }
  }, [savedArticleIds]);

  // Scroll to top on navigation
  const navigateTo = (screen: string, articleId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentScreen(screen);
    if (articleId) {
      setActiveArticleId(articleId);
    }
  };

  const handleOpenArticle = (articleId: string) => {
    if (articleId === 'mini-crossword') {
      navigateTo('section-games');
      return;
    }
    navigateTo('article', articleId);
  };

  const handleToggleBookmark = (articleId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedArticleIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  // Render appropriate screen
  const renderScreen = () => {
    if (currentScreen === 'article') {
      const article = ARTICLES[activeArticleId] || ARTICLES['trump-press-secretary'];
      return (
        <ArticleReaderView
          article={article}
          onBack={() => navigateTo('frontpage')}
          onNavigateArticle={handleOpenArticle}
          isBookmarked={savedArticleIds.includes(article.id)}
          onToggleBookmark={() => handleToggleBookmark(article.id)}
          useHotlinkImage={useHotlinkImage}
        />
      );
    }

    if (currentScreen === 'live-analysis') {
      return (
        <LiveAnalysisView
          onBack={() => navigateTo('frontpage')}
          onOpenArticle={handleOpenArticle}
        />
      );
    }

    if (currentScreen === 'todays-paper') {
      return (
        <TodaysPaperView
          onBack={() => navigateTo('frontpage')}
          onOpenArticle={handleOpenArticle}
        />
      );
    }

    if (currentScreen === 'section-games') {
      return (
        <MiniCrosswordView
          onBack={() => navigateTo('frontpage')}
        />
      );
    }

    if (currentScreen.startsWith('section-')) {
      const sectionName = currentScreen.replace('section-', '');
      if (sectionName === 'audio') {
        // Direct to lead article with audio player
        return (
          <ArticleReaderView
            article={ARTICLES['trump-press-secretary']}
            onBack={() => navigateTo('frontpage')}
            onNavigateArticle={handleOpenArticle}
            isBookmarked={savedArticleIds.includes('trump-press-secretary')}
            onToggleBookmark={() => handleToggleBookmark('trump-press-secretary')}
            useHotlinkImage={useHotlinkImage}
          />
        );
      }
      return (
        <SectionHubView
          sectionName={sectionName}
          onBack={() => navigateTo('frontpage')}
          onOpenArticle={handleOpenArticle}
        />
      );
    }

    // Default: Frontpage view matching the screenshot & HTML snippet
    return (
      <FrontpageView
        onOpenArticle={handleOpenArticle}
        onOpenLiveAnalysis={() => navigateTo('live-analysis')}
        onToggleBookmark={handleToggleBookmark}
        savedArticleIds={savedArticleIds}
        useHotlinkImage={useHotlinkImage}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] flex flex-col font-nyt-sans antialiased selection:bg-slate-200">
      {/* Site Header with Navigation and Masthead */}
      <SiteHeader
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        savedCount={savedArticleIds.length}
        currentEdition={currentEdition}
        onSelectEdition={setCurrentEdition}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
        useHotlinkImage={useHotlinkImage}
        onToggleImageMode={() => setUseHotlinkImage(!useHotlinkImage)}
      />

      {/* Screen Body */}
      <div className="flex-1">
        {renderScreen()}
      </div>

      {/* Site Footer */}
      <SiteFooter onNavigate={navigateTo} />

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={handleOpenArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLoginSuccess}
      />

      <SavedArticlesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedIds={savedArticleIds}
        onSelectArticle={handleOpenArticle}
        onRemoveBookmark={(id) => handleToggleBookmark(id)}
      />
    </div>
  );
}
