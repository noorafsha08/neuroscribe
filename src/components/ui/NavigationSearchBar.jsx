import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationSearchBar = ({ onSearch, placeholder = "Search...", className = "" }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [emotionalFilters, setEmotionalFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize emotional filters based on current page
  useEffect(() => {
    const path = location.pathname;
    if (path === '/notes' || path === '/note-editor') {
      setEmotionalFilters([
        { id: 'calm', label: 'Calm', color: 'text-calm' },
        { id: 'focused', label: 'Focused', color: 'text-focused' },
        { id: 'energized', label: 'Energized', color: 'text-energized' },
        { id: 'stressed', label: 'Stressed', color: 'text-stressed' },
        { id: 'creative', label: 'Creative', color: 'text-secondary' }
      ]);
    } else if (path === '/tasks') {
      setEmotionalFilters([
        { id: 'urgent', label: 'Urgent', color: 'text-warning' },
        { id: 'important', label: 'Important', color: 'text-primary' },
        { id: 'routine', label: 'Routine', color: 'text-neutral' },
        { id: 'creative', label: 'Creative', color: 'text-secondary' }
      ]);
    }
  }, [location.pathname]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('neuro-scribe-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length > 0 || selectedFilters.length > 0);
    
    // Debounced search
    if (onSearch) {
      const timeoutId = setTimeout(() => {
        onSearch(value, selectedFilters);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Save to recent searches
      const newRecentSearches = [
        query,
        ...recentSearches.filter(search => search !== query)
      ].slice(0, 5);
      
      setRecentSearches(newRecentSearches);
      localStorage.setItem('neuro-scribe-recent-searches', JSON.stringify(newRecentSearches));
      
      if (onSearch) {
        onSearch(query, selectedFilters);
      }
      setShowSuggestions(false);
    }
  };

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    if (onSearch) {
      onSearch(searchTerm, selectedFilters);
    }
    setShowSuggestions(false);
  };

  const handleFilterToggle = (filterId) => {
    const newFilters = selectedFilters.includes(filterId)
      ? selectedFilters.filter(id => id !== filterId)
      : [...selectedFilters, filterId];
    
    setSelectedFilters(newFilters);
    if (onSearch) {
      onSearch(query, newFilters);
    }
  };

  const handleClearAll = () => {
    setQuery('');
    setSelectedFilters([]);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch('', []);
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setShowSuggestions(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Desktop Search Bar */}
      <div className="hidden lg:block">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={query}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-10 pr-12 py-2.5 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-gentle"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            {(query || selectedFilters.length > 0) && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={handleClearAll}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6"
              />
            )}
          </div>
        </form>

        {/* Selected Filters */}
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFilters.map(filterId => {
              const filter = emotionalFilters.find(f => f.id === filterId);
              return filter ? (
                <span
                  key={filterId}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={() => handleFilterToggle(filterId)}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ) : null;
            })}
          </div>
        )}
      </div>

      {/* Mobile Search Toggle */}
      <div className="lg:hidden">
        {!isExpanded ? (
          <Button
            variant="ghost"
            size="icon"
            iconName="Search"
            onClick={handleExpand}
          />
        ) : (
          <div className="fixed inset-0 bg-background z-search-overlay">
            <div className="flex items-center space-x-4 p-4 border-b border-border">
              <Button
                variant="ghost"
                size="icon"
                iconName="ArrowLeft"
                onClick={() => {
                  setIsExpanded(false);
                  setShowSuggestions(false);
                }}
              />
              <form onSubmit={handleSubmit} className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  autoFocus
                />
              </form>
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={() => setQuery('')}
                />
              )}
            </div>

            {/* Mobile Filters */}
            {emotionalFilters.length > 0 && (
              <div className="p-4 border-b border-border">
                <p className="text-sm font-medium text-text-primary mb-3">Filter by emotion</p>
                <div className="flex flex-wrap gap-2">
                  {emotionalFilters.map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => handleFilterToggle(filter.id)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-gentle ${
                        selectedFilters.includes(filter.id)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-text-secondary hover:bg-muted/80'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mobile Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-4">
                <p className="text-sm font-medium text-text-primary mb-3">Recent searches</p>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(search)}
                      className="flex items-center space-x-3 w-full p-2 text-left hover:bg-muted rounded-lg transition-gentle"
                    >
                      <Icon name="Clock" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Suggestions Dropdown */}
      {showSuggestions && !isExpanded && (
        <div className="hidden lg:block absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-soft-lg z-dropdown">
          {/* Emotional Filters */}
          {emotionalFilters.length > 0 && (
            <div className="p-4 border-b border-border">
              <p className="text-sm font-medium text-text-primary mb-3">Filter by emotion</p>
              <div className="flex flex-wrap gap-2">
                {emotionalFilters.map(filter => (
                  <button
                    key={filter.id}
                    onClick={() => handleFilterToggle(filter.id)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-gentle ${
                      selectedFilters.includes(filter.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-text-secondary hover:bg-muted/80'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-2">
              <p className="text-sm font-medium text-text-primary px-2 py-1 mb-1">Recent searches</p>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="flex items-center space-x-3 w-full p-2 text-left hover:bg-muted rounded-md transition-gentle"
                >
                  <Icon name="Clock" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* No results message */}
          {query && recentSearches.length === 0 && emotionalFilters.length === 0 && (
            <div className="p-4 text-center text-text-secondary">
              <Icon name="Search" size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">Start typing to search</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavigationSearchBar;