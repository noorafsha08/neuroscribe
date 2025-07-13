import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [emotionalState, setEmotionalState] = useState('neutral');

  // Simulate emotional state detection
  useEffect(() => {
    const states = ['calm', 'focused', 'energized', 'neutral'];
    const randomState = states[Math.floor(Math.random() * states.length)];
    setEmotionalState(randomState);
  }, [location.pathname]);

  const navigationItems = [
    {
      label: 'Notes',
      icon: 'FileText',
      path: '/notes',
      emotionalContext: true
    },
    {
      label: 'Tasks',
      icon: 'CheckSquare',
      path: '/tasks',
      emotionalContext: true
    },
    {
      label: 'Analytics',
      icon: 'BarChart3',
      path: '/emotional-analytics',
      emotionalContext: false
    },
    {
      label: 'Profile',
      icon: 'User',
      path: '/profile-settings',
      emotionalContext: false
    }
  ];

  const isActive = (path) => {
    if (path === '/notes') {
      return location.pathname === '/notes' || location.pathname === '/note-editor';
    }
    return location.pathname === path;
  };

  const getEmotionalColor = (state) => {
    const colors = {
      calm: 'text-calm',
      focused: 'text-focused',
      energized: 'text-energized',
      stressed: 'text-stressed',
      neutral: 'text-neutral'
    };
    return colors[state] || 'text-neutral';
  };

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border pb-safe z-navigation">
        <div className="flex items-center justify-around px-4 py-2">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleTabClick(item.path)}
              className={`
                flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 
                transition-gentle relative group
                ${isActive(item.path) 
                  ? 'text-primary' :'text-text-secondary hover:text-text-primary'
                }
              `}
              style={{ minHeight: '48px' }}
            >
              <div className="relative">
                <Icon 
                  name={item.icon} 
                  size={24} 
                  className={`transition-gentle ${
                    isActive(item.path) ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                />
                {item.emotionalContext && (
                  <div 
                    className={`
                      absolute -top-1 -right-1 w-2 h-2 rounded-full 
                      emotional-indicator ${emotionalState}
                      transition-all duration-300
                    `}
                  />
                )}
              </div>
              <span className="text-xs font-caption mt-1 truncate w-full text-center">
                {item.label}
              </span>
              {isActive(item.path) && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:bottom-0 lg:w-64 bg-surface border-r border-border z-navigation flex-col">
        {/* Logo Section */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-heading font-semibold text-text-primary">
                NeuroScribe
              </h1>
              <p className="text-xs font-caption text-text-secondary">
                Mindful Productivity
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleTabClick(item.path)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg 
                  transition-gentle group relative
                  ${isActive(item.path)
                    ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }
                `}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className="transition-gentle"
                  />
                  {item.emotionalContext && (
                    <div 
                      className={`
                        absolute -top-1 -right-1 w-2 h-2 rounded-full 
                        emotional-indicator ${emotionalState}
                        transition-all duration-300
                      `}
                    />
                  )}
                </div>
                <span className="font-body font-medium">
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <div className="absolute right-2 w-1 h-6 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Emotional State Indicator */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className={`w-3 h-3 rounded-full emotional-indicator ${emotionalState}`} />
            <div className="flex-1">
              <p className="text-sm font-caption text-text-primary capitalize">
                {emotionalState} State
              </p>
              <p className="text-xs text-text-secondary">
                Emotional context active
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;