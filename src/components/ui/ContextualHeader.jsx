import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ContextualHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [emotionalState, setEmotionalState] = useState('neutral');

  // Simulate emotional state detection
  useEffect(() => {
    const states = ['calm', 'focused', 'energized', 'neutral'];
    const randomState = states[Math.floor(Math.random() * states.length)];
    setEmotionalState(randomState);
  }, [location.pathname]);

  const getPageConfig = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/notes':
        return {
          title: 'Notes',
          showSearch: true,
          showBack: false,
          actions: [
            { icon: 'Plus', label: 'New Note', onClick: () => navigate('/note-editor') },
            { icon: 'Filter', label: 'Filter', onClick: () => {} }
          ]
        };
      case '/note-editor':
        return {
          title: 'Note Editor',
          showSearch: false,
          showBack: true,
          backPath: '/notes',
          actions: [
            { icon: 'Save', label: 'Save', onClick: () => {} },
            { icon: 'MoreHorizontal', label: 'More', onClick: () => {} }
          ]
        };
      case '/tasks':
        return {
          title: 'Tasks',
          showSearch: true,
          showBack: false,
          actions: [
            { icon: 'Plus', label: 'New Task', onClick: () => {} },
            { icon: 'Calendar', label: 'Calendar', onClick: () => {} }
          ]
        };
      case '/emotional-analytics':
        return {
          title: 'Emotional Analytics',
          showSearch: false,
          showBack: false,
          actions: [
            { icon: 'Download', label: 'Export', onClick: () => {} },
            { icon: 'Settings', label: 'Settings', onClick: () => {} }
          ]
        };
      case '/profile-settings':
        return {
          title: 'Profile Settings',
          showSearch: false,
          showBack: false,
          actions: [
            { icon: 'Bell', label: 'Notifications', onClick: () => {} }
          ]
        };
      case '/register':
        return {
          title: 'Welcome to NeuroScribe',
          showSearch: false,
          showBack: false,
          actions: []
        };
      default:
        return {
          title: 'NeuroScribe',
          showSearch: false,
          showBack: false,
          actions: []
        };
    }
  };

  const pageConfig = getPageConfig();

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search query:', searchQuery);
  };

  const handleBack = () => {
    if (pageConfig.backPath) {
      navigate(pageConfig.backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="sticky top-0 bg-surface/95 backdrop-blur-sm border-b border-border z-navigation pt-safe">
      <div className="lg:ml-64">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Left Section */}
          <div className="flex items-center space-x-4 flex-1">
            {/* Mobile Logo (when no back button) */}
            {!pageConfig.showBack && (
              <div className="lg:hidden flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-md flex items-center justify-center">
                  <Icon name="Brain" size={14} className="text-white" />
                </div>
                <span className="font-heading font-semibold text-text-primary text-sm">
                  NeuroScribe
                </span>
              </div>
            )}

            {/* Back Button */}
            {pageConfig.showBack && (
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={handleBack}
                className="lg:hidden"
              >
                Back
              </Button>
            )}

            {/* Page Title */}
            <div className="hidden lg:block">
              <h1 className="text-lg font-heading font-semibold text-text-primary">
                {pageConfig.title}
              </h1>
            </div>

            {/* Mobile Search (Expanded) */}
            {isSearchExpanded && pageConfig.showSearch && (
              <div className="lg:hidden flex-1 mx-4">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    autoFocus
                  />
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                </form>
              </div>
            )}
          </div>

          {/* Center Section - Mobile Title */}
          {!isSearchExpanded && (
            <div className="lg:hidden absolute left-1/2 transform -translate-x-1/2">
              <h1 className="text-base font-heading font-medium text-text-primary">
                {pageConfig.title}
              </h1>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search */}
            {pageConfig.showSearch && (
              <div className="hidden lg:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                </form>
              </div>
            )}

            {/* Mobile Search Toggle */}
            {pageConfig.showSearch && (
              <Button
                variant="ghost"
                size="icon"
                iconName={isSearchExpanded ? "X" : "Search"}
                onClick={handleSearchToggle}
                className="lg:hidden"
              />
            )}

            {/* Emotional State Indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
              <div className={`w-2 h-2 rounded-full emotional-indicator ${emotionalState}`} />
              <span className="text-xs font-caption text-text-secondary capitalize">
                {emotionalState}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-1">
              {pageConfig.actions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  iconName={action.icon}
                  onClick={action.onClick}
                  className="hidden lg:flex"
                />
              ))}
              
              {/* Mobile Actions - Show only primary action */}
              {pageConfig.actions.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  iconName={pageConfig.actions[0].icon}
                  onClick={pageConfig.actions[0].onClick}
                  className="lg:hidden"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ContextualHeader;