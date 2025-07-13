import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFiltersPanel = ({ isOpen, onClose, filters, onFiltersChange, className = "" }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const emotionIntensityLevels = [
    { id: 'low', label: 'Low (0-33%)', range: [0, 0.33] },
    { id: 'medium', label: 'Medium (34-66%)', range: [0.34, 0.66] },
    { id: 'high', label: 'High (67-100%)', range: [0.67, 1] }
  ];

  const dateRanges = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'oldest', label: 'Oldest First' },
    { id: 'alphabetical', label: 'Alphabetical' },
    { id: 'emotion', label: 'By Emotion' },
    { id: 'wordCount', label: 'By Word Count' }
  ];

  const handleFilterChange = (category, value, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...(prev[category] || []), value]
        : (prev[category] || []).filter(item => item !== value)
    }));
  };

  const handleSingleFilterChange = (category, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      emotions: [],
      intensityLevels: [],
      dateRange: '',
      customDateStart: '',
      customDateEnd: '',
      sortBy: 'recent',
      hasBookmarks: false,
      hasTags: false,
      wordCountMin: '',
      wordCountMax: ''
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (localFilters.emotions?.length > 0) count++;
    if (localFilters.intensityLevels?.length > 0) count++;
    if (localFilters.dateRange) count++;
    if (localFilters.hasBookmarks) count++;
    if (localFilters.hasTags) count++;
    if (localFilters.wordCountMin || localFilters.wordCountMax) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className={`
        fixed lg:absolute top-0 right-0 h-full lg:h-auto w-full lg:w-80 
        bg-surface border-l lg:border border-border shadow-soft-lg z-50
        lg:rounded-lg lg:top-full lg:mt-2 lg:shadow-soft-lg
        ${className}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-medium text-text-primary">Advanced Filters</h3>
            {getActiveFiltersCount() > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                {getActiveFiltersCount()}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Filter Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Emotion Intensity */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Emotion Intensity</h4>
            <div className="space-y-2">
              {emotionIntensityLevels.map((level) => (
                <Checkbox
                  key={level.id}
                  label={level.label}
                  checked={localFilters.intensityLevels?.includes(level.id) || false}
                  onChange={(e) => handleFilterChange('intensityLevels', level.id, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Date Range</h4>
            <div className="space-y-2">
              {dateRanges.map((range) => (
                <label key={range.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="dateRange"
                    value={range.id}
                    checked={localFilters.dateRange === range.id}
                    onChange={(e) => handleSingleFilterChange('dateRange', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary/20"
                  />
                  <span className="text-sm text-text-primary">{range.label}</span>
                </label>
              ))}
            </div>
            
            {/* Custom Date Range */}
            {localFilters.dateRange === 'custom' && (
              <div className="mt-3 space-y-2">
                <input
                  type="date"
                  placeholder="Start date"
                  value={localFilters.customDateStart || ''}
                  onChange={(e) => handleSingleFilterChange('customDateStart', e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="date"
                  placeholder="End date"
                  value={localFilters.customDateEnd || ''}
                  onChange={(e) => handleSingleFilterChange('customDateEnd', e.target.value)}
                  className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Sort By</h4>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <label key={option.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.id}
                    checked={localFilters.sortBy === option.id}
                    onChange={(e) => handleSingleFilterChange('sortBy', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-primary/20"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Content Filters */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Content</h4>
            <div className="space-y-2">
              <Checkbox
                label="Bookmarked notes only"
                checked={localFilters.hasBookmarks || false}
                onChange={(e) => handleSingleFilterChange('hasBookmarks', e.target.checked)}
              />
              <Checkbox
                label="Notes with tags"
                checked={localFilters.hasTags || false}
                onChange={(e) => handleSingleFilterChange('hasTags', e.target.checked)}
              />
            </div>
          </div>

          {/* Word Count Range */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Word Count</h4>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={localFilters.wordCountMin || ''}
                onChange={(e) => handleSingleFilterChange('wordCountMin', e.target.value)}
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <span className="text-text-secondary">to</span>
              <input
                type="number"
                placeholder="Max"
                value={localFilters.wordCountMax || ''}
                onChange={(e) => handleSingleFilterChange('wordCountMax', e.target.value)}
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-border p-4 space-y-3">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="flex-1"
            >
              Reset All
            </Button>
            <Button
              variant="default"
              onClick={handleApplyFilters}
              className="flex-1"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedFiltersPanel;