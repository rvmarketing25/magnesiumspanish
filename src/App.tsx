import React, { useState } from 'react';
import { AuthGuard } from './components/AuthGuard';
import { LoginPage } from './pages/LoginPage';
import { Topbar } from './components/Topbar';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './pages/HomePage';
import { ModulePage } from './pages/ModulePage';
import { ContinuePage } from './pages/ContinuePage';
import { ContentPage } from './pages/ContentPage';
import { SettingsPage } from './pages/SettingsPage';
import { isAuthValid, getRedirectPath } from './utils/auth';

type ViewState = 
  | { type: 'tab'; tab: string }
  | { type: 'module'; moduleId: string }
  | { type: 'login' };

function App() {
  const [viewState, setViewState] = useState<ViewState>(() => {
    if (!isAuthValid()) {
      return { type: 'login' };
    }
    return { type: 'tab', tab: 'home' };
  });

  const handleTabChange = (tab: string) => {
    setViewState({ type: 'tab', tab });
  };

  const handleModuleClick = (moduleId: string) => {
    setViewState({ type: 'module', moduleId });
  };

  const handleBackToHome = () => {
    setViewState({ type: 'tab', tab: 'home' });
  };

  const handleLoginSuccess = () => {
    const redirectPath = getRedirectPath();
    if (redirectPath === '/' || redirectPath.startsWith('/home')) {
      setViewState({ type: 'tab', tab: 'home' });
    } else if (redirectPath.startsWith('/continue')) {
      setViewState({ type: 'tab', tab: 'continue' });
    } else if (redirectPath.startsWith('/content')) {
      setViewState({ type: 'tab', tab: 'content' });
    } else if (redirectPath.startsWith('/settings')) {
      setViewState({ type: 'tab', tab: 'settings' });
    } else {
      setViewState({ type: 'tab', tab: 'home' });
    }
  };

  const handleRedirectToLogin = () => {
    setViewState({ type: 'login' });
  };

  const handleLogout = () => {
    setViewState({ type: 'login' });
  };

  const getCurrentPath = () => {
    if (viewState.type === 'login') return '/login';
    if (viewState.type === 'module') return `/module/${viewState.moduleId}`;
    return `/${viewState.tab}`;
  };

  const renderContent = () => {
    if (viewState.type === 'login') {
      return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    if (viewState.type === 'module') {
      return (
        <ModulePage
          moduleId={viewState.moduleId}
          onBack={handleBackToHome}
        />
      );
    }

    switch (viewState.tab) {
      case 'home':
        return (
          <HomePage
            onModuleClick={handleModuleClick}
          />
        );
      case 'continue':
        return <ContinuePage onModuleClick={handleModuleClick} />;
      case 'content':
        return <ContentPage onModuleClick={handleModuleClick} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <HomePage onModuleClick={handleModuleClick} />;
    }
  };

  return (
    <AuthGuard 
      currentPath={getCurrentPath()} 
      onRedirectToLogin={handleRedirectToLogin}
    >
      <div className="min-h-screen bg-gray-50">
        {viewState.type !== 'login' && <Topbar onLogout={handleLogout} />}
        <main className="min-h-screen">
          {renderContent()}
        </main>
        {viewState.type === 'tab' && (
          <BottomNav
            activeTab={viewState.tab}
            onTabChange={handleTabChange}
          />
        )}
      </div>
    </AuthGuard>
  );
}

export default App;