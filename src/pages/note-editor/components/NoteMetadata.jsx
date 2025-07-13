import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NoteMetadata = ({ content, tags, onTagsChange, isVisible, onToggle }) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [createdAt] = useState(new Date());
  const [lastModified, setLastModified] = useState(new Date());
  const [isEditingTags, setIsEditingTags] = useState(false);
  const [newTag, setNewTag] = useState('');

  // Predefined emotional tags
  const emotionalTags = [
    { id: 'calm', label: 'Calm', color: 'bg-calm/20 text-calm' },
    { id: 'focused', label: 'Focused', color: 'bg-focused/20 text-focused' },
    { id: 'energized', label: 'Energized', color: 'bg-energized/20 text-energized' },
    { id: 'stressed', label: 'Stressed', color: 'bg-stressed/20 text-stressed' },
    { id: 'creative', label: 'Creative', color: 'bg-secondary/20 text-secondary' },
    { id: 'motivated', label: 'Motivated', color: 'bg-success/20 text-success' },
    { id: 'reflective', label: 'Reflective', color: 'bg-primary/20 text-primary' },
    { id: 'grateful', label: 'Grateful', color: 'bg-warning/20 text-warning' }
  ];

  // Calculate statistics when content changes
  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).filter(word => word.length > 0);
      const chars = content.length;
      const reading = Math.ceil(words.length / 200); // Average reading speed: 200 WPM
      
      setWordCount(words.length);
      setCharCount(chars);
      setReadingTime(reading);
      setLastModified(new Date());
    } else {
      setWordCount(0);
      setCharCount(0);
      setReadingTime(0);
    }
  }, [content]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddTag = (tagId) => {
    if (!tags.includes(tagId)) {
      onTagsChange([...tags, tagId]);
    }
  };

  const handleRemoveTag = (tagId) => {
    onTagsChange(tags.filter(tag => tag !== tagId));
  };

  const handleAddCustomTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag('');
      setIsEditingTags(false);
    }
  };

  const getTagDisplay = (tagId) => {
    const emotionalTag = emotionalTags.find(tag => tag.id === tagId);
    return emotionalTag || { id: tagId, label: tagId, color: 'bg-muted text-text-primary' };
  };

  if (!isVisible) {
    return (
      <Button
        variant="ghost"
        size="icon"
        iconName="Info"
        onClick={onToggle}
        className="fixed bottom-44 right-4 lg:bottom-28 lg:right-4 z-10 bg-surface shadow-soft-lg border border-border"
        title="Show Note Info"
      />
    );
  }

  return (
    <div className="fixed bottom-44 right-4 lg:bottom-28 lg:right-4 w-80 max-w-[calc(100vw-2rem)] bg-surface border border-border rounded-lg shadow-soft-lg z-10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={20} className="text-primary" />
          <h3 className="font-heading font-medium text-text-primary">Note Info</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          iconName="X"
          onClick={onToggle}
          className="h-6 w-6"
        />
      </div>

      <div className="p-4 space-y-4">
        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-text-primary">{wordCount}</div>
            <div className="text-xs text-text-secondary">Words</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-text-primary">{charCount}</div>
            <div className="text-xs text-text-secondary">Characters</div>
          </div>
          <div className="text-center p-2 bg-muted rounded-lg">
            <div className="text-lg font-semibold text-text-primary">{readingTime}</div>
            <div className="text-xs text-text-secondary">Min read</div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Created:</span>
            <span className="text-text-primary">{formatDate(createdAt)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Modified:</span>
            <span className="text-text-primary">{formatDate(lastModified)}</span>
          </div>
        </div>

        {/* Tags Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-text-primary">Emotional Tags</h4>
            <Button
              variant="ghost"
              size="icon"
              iconName="Plus"
              onClick={() => setIsEditingTags(!isEditingTags)}
              className="h-6 w-6"
            />
          </div>

          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tagId) => {
                const tag = getTagDisplay(tagId);
                return (
                  <span
                    key={tagId}
                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${tag.color}`}
                  >
                    <span>{tag.label}</span>
                    <button
                      onClick={() => handleRemoveTag(tagId)}
                      className="hover:bg-black/10 rounded-full p-0.5"
                    >
                      <Icon name="X" size={10} />
                    </button>
                  </span>
                );
              })}
            </div>
          )}

          {/* Add Tags Interface */}
          {isEditingTags && (
            <div className="space-y-2">
              {/* Emotional Tags */}
              <div>
                <p className="text-xs text-text-secondary mb-1">Quick add:</p>
                <div className="flex flex-wrap gap-1">
                  {emotionalTags.filter(tag => !tags.includes(tag.id)).slice(0, 6).map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => handleAddTag(tag.id)}
                      className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 text-text-primary rounded-full transition-gentle"
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Tag Input */}
              <div className="flex space-x-1">
                <input
                  type="text"
                  placeholder="Custom tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCustomTag()}
                  className="flex-1 px-2 py-1 text-xs bg-muted border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary/20"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Plus"
                  onClick={handleAddCustomTag}
                  className="h-6 w-6"
                />
              </div>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-text-secondary mb-2">Export options:</p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="xs"
              iconName="Download"
              className="text-xs"
            >
              Text
            </Button>
            <Button
              variant="outline"
              size="xs"
              iconName="FileText"
              className="text-xs"
            >
              PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteMetadata;