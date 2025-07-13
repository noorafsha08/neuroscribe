import React from 'react';
import Icon from '../../../components/AppIcon';

const EmotionFilterChips = ({ selectedEmotions, onEmotionToggle, className = "" }) => {
  const emotions = [
    { id: 'all', label: 'All', icon: 'Grid3X3', color: 'text-gray-600', bg: 'bg-gray-100' },
    { id: 'happy', label: 'Happy', icon: 'Smile', color: 'text-green-600', bg: 'bg-green-100' },
    { id: 'sad', label: 'Sad', icon: 'Frown', color: 'text-blue-600', bg: 'bg-blue-100' },
    { id: 'anxious', label: 'Anxious', icon: 'AlertTriangle', color: 'text-orange-600', bg: 'bg-orange-100' },
    { id: 'motivated', label: 'Motivated', icon: 'Zap', color: 'text-purple-600', bg: 'bg-purple-100' },
    { id: 'calm', label: 'Calm', icon: 'Waves', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'focused', label: 'Focused', icon: 'Target', color: 'text-green-500', bg: 'bg-green-50' },
    { id: 'stressed', label: 'Stressed', icon: 'AlertCircle', color: 'text-red-500', bg: 'bg-red-50' }
  ];

  const handleChipClick = (emotionId) => {
    if (emotionId === 'all') {
      onEmotionToggle([]);
    } else {
      const newSelection = selectedEmotions.includes(emotionId)
        ? selectedEmotions.filter(id => id !== emotionId)
        : [...selectedEmotions, emotionId];
      onEmotionToggle(newSelection);
    }
  };

  const isSelected = (emotionId) => {
    if (emotionId === 'all') {
      return selectedEmotions.length === 0;
    }
    return selectedEmotions.includes(emotionId);
  };

  return (
    <div className={`flex items-center space-x-2 overflow-x-auto pb-2 ${className}`}>
      {emotions.map((emotion) => (
        <button
          key={emotion.id}
          onClick={() => handleChipClick(emotion.id)}
          className={`
            flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium
            transition-all duration-200 whitespace-nowrap flex-shrink-0
            ${isSelected(emotion.id)
              ? `${emotion.bg} ${emotion.color} border-2 border-current`
              : 'bg-muted text-text-secondary hover:bg-muted/80 border-2 border-transparent'
            }
          `}
        >
          <Icon name={emotion.icon} size={14} />
          <span>{emotion.label}</span>
          {isSelected(emotion.id) && emotion.id !== 'all' && (
            <Icon name="X" size={12} />
          )}
        </button>
      ))}
    </div>
  );
};

export default EmotionFilterChips;