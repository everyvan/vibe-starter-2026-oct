/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { StickyHeader } from './components/StickyHeader';
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
  GiftArticleModal,
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
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

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

  // Hotlink image vs Generated image toggle
  const [useHotlinkImage, setUseHotlinkImage] = useState<boolean>(false);

  // Sync saved articles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nyt_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // Ignore storage errors in sandboxed iframes
    }
  }, [savedArticleIds]);

  // Global keyboard shortcuts: '/' or 'Cmd+K' to open search, 'Escape' to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' && (e.target as HTMLElement).tagName !== 'INPUT' && (e.target as HTMLElement).tagName !== 'TEXTAREA') ||
        ((e.metaKey || e.ctrlKey) && e.key === 'k')
      ) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsSubscribeOpen(false);
        setIsLoginOpen(false);
        setIsSavedDrawerOpen(false);
        setIsGiftModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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

  const currentArticle = ARTICLES[activeArticleId] || ARTICLES['trump-press-secretary'];

  // Render appropriate screen
  const renderScreen = () => {
    if (currentScreen === 'article') {
      return (
        <ArticleReaderView
          article={currentArticle}
          onBack={() => navigateTo('frontpage')}
          onNavigateArticle={handleOpenArticle}
          isBookmarked={savedArticleIds.includes(currentArticle.id)}
          onToggleBookmark={() => handleToggleBookmark(currentArticle.id)}
          onOpenGiftModal={() => setIsGiftModalOpen(true)}
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
            onOpenGiftModal={() => setIsGiftModalOpen(true)}
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

  // Get screen title for sticky header
  const getScreenTitle = () => {
    if (currentScreen === 'article') return currentArticle.section || 'Article';
    if (currentScreen === 'live-analysis') return 'Live Analysis';
    if (currentScreen === 'todays-paper') return "Today's Paper";
    if (currentScreen === 'section-games') return 'The Mini Crossword';
    if (currentScreen.startsWith('section-')) return currentScreen.replace('section-', '').toUpperCase();
    return 'Front Page';
  };

  return (
    <div className="min-h-screen bg-white text-[#121212] flex flex-col font-nyt-sans antialiased selection:bg-slate-200">
      
      {/* Sticky Mini Header revealed on scroll */}
      <StickyHeader
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        savedCount={savedArticleIds.length}
        currentScreenTitle={getScreenTitle()}
        isArticleScreen={currentScreen === 'article'}
        isBookmarked={savedArticleIds.includes(currentArticle.id)}
        onToggleBookmark={() => handleToggleBookmark(currentArticle.id)}
        onShare={() => {
          navigator.clipboard?.writeText(window.location.href);
          alert('Article link copied to clipboard!');
        }}
      />

      {/* Site Header with Navigation and Masthead */}
      <SiteHeader
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        onOpenGiftModal={() => setIsGiftModalOpen(true)}
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

      <GiftArticleModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        articleTitle={currentArticle.title}
      />
    </div>
  );
}
