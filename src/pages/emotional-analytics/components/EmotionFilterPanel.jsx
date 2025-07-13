import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmotionFilterPanel = ({ 
  selectedEmotions, 
  onEmotionToggle, 
  onClearAll,
  onSelectAll,
  className = "" 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const emotions = [
    { 
      id: 'calm', 
      label: 'Calm', 
      icon: 'Waves', 
      color: '#4A90E2',
      description: 'Peaceful and centered states'
    },
    { 
      id: 'focused', 
      label: 'Focused', 
      icon: 'Target', 
      color: '#27AE60',
      description: 'Deep concentration periods'
    },
    { 
      id: 'energized', 
      label: 'Energized', 
      icon: 'Zap', 
      color: '#F39C12',
      description: 'High energy and motivation'
    },
    { 
      id: 'creative', 
      label: 'Creative', 
      icon: 'Lightbulb', 
      color: '#7B68EE',
      description: 'Innovative thinking sessions'
    },
    { 
      id: 'stressed', 
      label: 'Stressed', 
      icon: 'AlertTriangle', 
      color: '#E67E22',
      description: 'Tension and pressure moments'
    },
    { 
      id: 'neutral', 
      label: 'Neutral', 
      icon: 'Circle', 
      color: '#7F8C8D',
      description: 'Balanced emotional state'
    }
  ];

  const handleEmotionClick = (emotionId) => {
    onEmotionToggle(emotionId);
  };

  const isSelected = (emotionId) => {
    return selectedEmotions.includes(emotionId);
  };

  const allSelected = selectedEmotions.length === emotions.length;
  const noneSelected = selectedEmotions.length === 0;

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Emotion Filters
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              {selectedEmotions.length === 0 
                ? 'All emotions shown' 
                : `${selectedEmotions.length} of ${emotions.length} emotions selected`
              }
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          />
        </div>
      </div>

      <div className={`p-4 ${!isExpanded ? 'hidden lg:block' : ''}`}>
        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mb-4">
          <Button
            size="sm"
            variant={allSelected ? "default" : "outline"}
            iconName="CheckSquare"
            onClick={onSelectAll}
            disabled={allSelected}
          >
            Select All
          </Button>
          <Button
            size="sm"
            variant={noneSelected ? "default" : "outline"}
            iconName="Square"
            onClick={onClearAll}
            disabled={noneSelected}
          >
            Clear All
          </Button>
        </div>

        {/* Emotion Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {emotions.map((emotion) => {
            const selected = isSelected(emotion.id);
            return (
              <button
                key={emotion.id}
                onClick={() => handleEmotionClick(emotion.id)}
                className={`
                  p-3 rounded-lg border transition-gentle text-left group
                  ${selected
                    ? 'border-primary bg-primary/10 shadow-soft'
                    : 'border-border bg-background hover:bg-muted hover:border-border/80'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  {/* Emotion Indicator */}
                  <div className="relative">
                    <div 
                      className={`w-4 h-4 rounded-full transition-all duration-200 ${
                        selected ? 'scale-110' : 'group-hover:scale-105'
                      }`}
                      style={{ backgroundColor: emotion.color }}
                    />
                    {selected && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Check" size={10} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Emotion Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={emotion.icon} 
                        size={16} 
                        className={selected ? 'text-primary' : 'text-text-secondary'} 
                      />
                      <span className={`font-medium ${
                        selected ? 'text-primary' : 'text-text-primary'
                      }`}>
                        {emotion.label}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-1">
                      {emotion.description}
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                    selected 
                      ? 'border-primary bg-primary' :'border-border group-hover:border-primary/50'
                  }`}>
                    {selected && (
                      <Icon name="Check" size={12} className="text-white" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Filter Summary */}
        {selectedEmotions.length > 0 && selectedEmotions.length < emotions.length && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={14} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  Filtering by:
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedEmotions.slice(0, 3).map(emotionId => {
                  const emotion = emotions.find(e => e.id === emotionId);
                  return emotion ? (
                    <span 
                      key={emotionId}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: emotion.color }}
                      />
                      <span>{emotion.label}</span>
                    </span>
                  ) : null;
                })}
                {selectedEmotions.length > 3 && (
                  <span className="text-xs text-text-secondary">
                    +{selectedEmotions.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionFilterPanel;