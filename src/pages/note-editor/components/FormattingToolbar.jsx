import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const FormattingToolbar = ({ onFormat, isVisible, onToggle }) => {
  const [activeFormats, setActiveFormats] = useState(new Set());

  const formatOptions = [
    { id: 'bold', icon: 'Bold', label: 'Bold', shortcut: 'Ctrl+B' },
    { id: 'italic', icon: 'Italic', label: 'Italic', shortcut: 'Ctrl+I' },
    { id: 'underline', icon: 'Underline', label: 'Underline', shortcut: 'Ctrl+U' },
    { id: 'strikethrough', icon: 'Strikethrough', label: 'Strikethrough' },
    { id: 'separator1', type: 'separator' },
    { id: 'bulletList', icon: 'List', label: 'Bullet List' },
    { id: 'numberedList', icon: 'ListOrdered', label: 'Numbered List' },
    { id: 'separator2', type: 'separator' },
    { id: 'quote', icon: 'Quote', label: 'Quote' },
    { id: 'code', icon: 'Code', label: 'Code' },
    { id: 'separator3', type: 'separator' },
    { id: 'link', icon: 'Link', label: 'Insert Link', shortcut: 'Ctrl+K' }
  ];

  const headingOptions = [
    { id: 'h1', label: 'Heading 1', shortcut: 'Ctrl+1' },
    { id: 'h2', label: 'Heading 2', shortcut: 'Ctrl+2' },
    { id: 'h3', label: 'Heading 3', shortcut: 'Ctrl+3' },
    { id: 'paragraph', label: 'Paragraph', shortcut: 'Ctrl+0' }
  ];

  const [showHeadingDropdown, setShowHeadingDropdown] = useState(false);
  const [currentHeading, setCurrentHeading] = useState('paragraph');

  const handleFormat = (formatId) => {
    if (formatId.startsWith('h') || formatId === 'paragraph') {
      setCurrentHeading(formatId);
      setShowHeadingDropdown(false);
    } else {
      // Toggle format state
      const newActiveFormats = new Set(activeFormats);
      if (newActiveFormats.has(formatId)) {
        newActiveFormats.delete(formatId);
      } else {
        newActiveFormats.add(formatId);
      }
      setActiveFormats(newActiveFormats);
    }
    
    if (onFormat) {
      onFormat(formatId);
    }
  };

  const getCurrentHeadingLabel = () => {
    const heading = headingOptions.find(h => h.id === currentHeading);
    return heading ? heading.label : 'Paragraph';
  };

  if (!isVisible) {
    return (
      <Button
        variant="ghost"
        size="icon"
        iconName="Type"
        onClick={onToggle}
        className="fixed bottom-32 right-4 lg:bottom-16 lg:right-4 z-10 bg-surface shadow-soft-lg border border-border"
        title="Show Formatting Toolbar"
      />
    );
  }

  return (
    <div className="fixed bottom-32 right-4 lg:bottom-16 lg:right-4 bg-surface border border-border rounded-lg shadow-soft-lg z-10">
      {/* Mobile Toolbar */}
      <div className="lg:hidden p-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Format</span>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onToggle}
            className="h-6 w-6"
          />
        </div>
        
        {/* Essential formatting options for mobile */}
        <div className="grid grid-cols-4 gap-1">
          {formatOptions.slice(0, 4).map((option) => (
            <Button
              key={option.id}
              variant={activeFormats.has(option.id) ? "default" : "ghost"}
              size="icon"
              iconName={option.icon}
              onClick={() => handleFormat(option.id)}
              className="h-8 w-8"
              title={option.label}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-1 mt-1">
          <Button
            variant={activeFormats.has('bulletList') ? "default" : "ghost"}
            size="xs"
            iconName="List"
            onClick={() => handleFormat('bulletList')}
          >
            List
          </Button>
          <Button
            variant={activeFormats.has('quote') ? "default" : "ghost"}
            size="xs"
            iconName="Quote"
            onClick={() => handleFormat('quote')}
          >
            Quote
          </Button>
        </div>
      </div>

      {/* Desktop Toolbar */}
      <div className="hidden lg:block p-3 w-80">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-text-primary">Formatting</span>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onToggle}
            className="h-6 w-6"
          />
        </div>

        {/* Heading Selector */}
        <div className="relative mb-3">
          <Button
            variant="outline"
            onClick={() => setShowHeadingDropdown(!showHeadingDropdown)}
            className="w-full justify-between"
            iconName="ChevronDown"
            iconPosition="right"
          >
            {getCurrentHeadingLabel()}
          </Button>
          
          {showHeadingDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-soft-lg z-20">
              {headingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleFormat(option.id)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-gentle first:rounded-t-lg last:rounded-b-lg ${
                    currentHeading === option.id ? 'bg-primary/10 text-primary' : 'text-text-primary'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{option.label}</span>
                    {option.shortcut && (
                      <span className="text-xs text-text-secondary">{option.shortcut}</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Formatting Options */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {formatOptions.map((option) => {
              if (option.type === 'separator') {
                return <div key={option.id} className="w-px h-6 bg-border mx-1" />;
              }
              
              return (
                <Button
                  key={option.id}
                  variant={activeFormats.has(option.id) ? "default" : "ghost"}
                  size="icon"
                  iconName={option.icon}
                  onClick={() => handleFormat(option.id)}
                  className="h-8 w-8"
                  title={`${option.label}${option.shortcut ? ` (${option.shortcut})` : ''}`}
                />
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="xs"
              iconName="Palette"
              onClick={() => handleFormat('highlight')}
            >
              Highlight
            </Button>
            <Button
              variant="outline"
              size="xs"
              iconName="AlignLeft"
              onClick={() => handleFormat('align')}
            >
              Align
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormattingToolbar;