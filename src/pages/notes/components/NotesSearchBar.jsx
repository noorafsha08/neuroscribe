import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotesSearchBar = ({ onSearch, onFilterToggle, className = "" }) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('neuroscribe-recent-searches');
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
    setShowSuggestions(value.length > 0 || recentSearches.length > 0);
    
    // Debounced search
    const timeoutId = setTimeout(() => {
      onSearch(value);
    }, 300);
    return () => clearTimeout(timeoutId);
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
      localStorage.setItem('neuroscribe-recent-searches', JSON.stringify(newRecentSearches));
      
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    onSearch(searchTerm);
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
    setShowSuggestions(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setShowSuggestions(true);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const quickSearchSuggestions = [
    { text: 'Today\'s notes', icon: 'Calendar' },
    { text: 'Bookmarked', icon: 'Bookmark' },
    { text: 'Recent', icon: 'Clock' },
    { text: 'Important', icon: 'Star' }
  ];

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Desktop Search Bar */}
      <div className="hidden lg:block">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search notes by content, emotion, or tags..."
              value={query}
              onChange={handleInputChange}
              onFocus={() => setShowSuggestions(true)}
              className="w-full pl-10 pr-20 py-3 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-gentle"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              {query && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={handleClear}
                  className="h-6 w-6"
                />
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                iconName="SlidersHorizontal"
                onClick={onFilterToggle}
                className="h-6 w-6"
              />
            </div>
          </div>
        </form>
      </div>

      {/* Mobile Search Toggle */}
      <div className="lg:hidden">
        {!isExpanded ? (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              iconName="Search"
              onClick={handleExpand}
            />
            <Button
              variant="ghost"
              size="icon"
              iconName="SlidersHorizontal"
              onClick={onFilterToggle}
            />
          </div>
        ) : (
          <div className="fixed inset-0 bg-background z-50">
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
                  placeholder="Search notes..."
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
                  onClick={handleClear}
                />
              )}
            </div>

            {/* Mobile Search Content */}
            <div className="p-4 space-y-6">
              {/* Quick Search Suggestions */}
              <div>
                <p className="text-sm font-medium text-text-primary mb-3">Quick search</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickSearchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleRecentSearchClick(suggestion.text)}
                      className="flex items-center space-x-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-gentle"
                    >
                      <Icon name={suggestion.icon} size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-primary">{suggestion.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
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
          </div>
        )}
      </div>

      {/* Desktop Suggestions Dropdown */}
      {showSuggestions && !isExpanded && (
        <div className="hidden lg:block absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-soft-lg z-50">
          {/* Quick Search */}
          <div className="p-4 border-b border-border">
            <p className="text-sm font-medium text-text-primary mb-3">Quick search</p>
            <div className="grid grid-cols-2 gap-2">
              {quickSearchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(suggestion.text)}
                  className="flex items-center space-x-2 p-2 text-left hover:bg-muted rounded-md transition-gentle"
                >
                  <Icon name={suggestion.icon} size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-primary">{suggestion.text}</span>
                </button>
              ))}
            </div>
          </div>

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
        </div>
      )}
    </div>
  );
};

export default NotesSearchBar;