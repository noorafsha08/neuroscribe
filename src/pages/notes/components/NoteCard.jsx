import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NoteCard = ({ note, onDelete, onArchive, className = "" }) => {
  const navigate = useNavigate();
  const [isSwipeMenuOpen, setIsSwipeMenuOpen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const getEmotionConfig = (emotion) => {
    const configs = {
      happy: { color: 'text-green-600', bg: 'bg-green-100', icon: 'Smile', label: 'Happy' },
      sad: { color: 'text-blue-600', bg: 'bg-blue-100', icon: 'Frown', label: 'Sad' },
      anxious: { color: 'text-orange-600', bg: 'bg-orange-100', icon: 'AlertTriangle', label: 'Anxious' },
      motivated: { color: 'text-purple-600', bg: 'bg-purple-100', icon: 'Zap', label: 'Motivated' },
      calm: { color: 'text-blue-500', bg: 'bg-blue-50', icon: 'Waves', label: 'Calm' },
      focused: { color: 'text-green-500', bg: 'bg-green-50', icon: 'Target', label: 'Focused' },
      stressed: { color: 'text-red-500', bg: 'bg-red-50', icon: 'AlertCircle', label: 'Stressed' },
      neutral: { color: 'text-gray-500', bg: 'bg-gray-50', icon: 'Circle', label: 'Neutral' }
    };
    return configs[emotion] || configs.neutral;
  };

  const emotionConfig = getEmotionConfig(note.emotion);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setIsSwipeMenuOpen(true);
    } else if (isRightSwipe) {
      setIsSwipeMenuOpen(false);
    }
  };

  const handleCardClick = () => {
    if (!isSwipeMenuOpen) {
      navigate('/note-editor', { state: { note } });
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(note.id);
    setIsSwipeMenuOpen(false);
  };

  const handleArchive = (e) => {
    e.stopPropagation();
    onArchive(note.id);
    setIsSwipeMenuOpen(false);
  };

  const formatDate = (date) => {
    const now = new Date();
    const noteDate = new Date(date);
    const diffTime = Math.abs(now - noteDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return noteDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className={`
          bg-card border border-border rounded-lg shadow-soft transition-all duration-300 cursor-pointer
          hover:shadow-soft-lg hover:border-primary/20 transform
          ${isSwipeMenuOpen ? 'translate-x-[-80px]' : 'translate-x-0'}
        `}
        onClick={handleCardClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="p-4">
          {/* Header with emotion tag */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-text-primary truncate mb-1">
                {note.title}
              </h3>
              <p className="text-xs text-text-secondary">
                {formatDate(note.createdAt)}
              </p>
            </div>
            <div className={`
              flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
              ${emotionConfig.bg} ${emotionConfig.color} ml-3 flex-shrink-0
            `}>
              <Icon name={emotionConfig.icon} size={12} />
              <span>{emotionConfig.label}</span>
            </div>
          </div>

          {/* Preview content */}
          <p className="text-sm text-text-secondary line-clamp-3 mb-3">
            {note.preview}
          </p>

          {/* Footer with tags and stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {note.tags && note.tags.length > 0 && (
                <div className="flex items-center space-x-1">
                  {note.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-muted text-text-secondary text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {note.tags.length > 2 && (
                    <span className="text-xs text-text-secondary">
                      +{note.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center space-x-3 text-xs text-text-secondary">
              {note.wordCount && (
                <span className="flex items-center space-x-1">
                  <Icon name="FileText" size={12} />
                  <span>{note.wordCount} words</span>
                </span>
              )}
              {note.isBookmarked && (
                <Icon name="Bookmark" size={12} className="text-primary" />
              )}
            </div>
          </div>
        </div>

        {/* Emotion intensity indicator */}
        <div className="h-1 bg-muted">
          <div 
            className={`h-full ${emotionConfig.bg.replace('bg-', 'bg-').replace('-100', '-400')} transition-all duration-300`}
            style={{ width: `${(note.emotionIntensity || 0.5) * 100}%` }}
          />
        </div>
      </div>

      {/* Swipe action menu */}
      <div className={`
        absolute top-0 right-0 h-full w-20 flex items-center justify-center space-x-1
        transition-all duration-300 ${isSwipeMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <Button
          variant="ghost"
          size="icon"
          iconName="Archive"
          onClick={handleArchive}
          className="h-8 w-8 text-blue-600 hover:bg-blue-100"
        />
        <Button
          variant="ghost"
          size="icon"
          iconName="Trash2"
          onClick={handleDelete}
          className="h-8 w-8 text-red-600 hover:bg-red-100"
        />
      </div>
    </div>
  );
};

export default NoteCard;