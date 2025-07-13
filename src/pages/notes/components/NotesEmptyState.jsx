import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotesEmptyState = ({ hasSearchQuery, searchQuery, className = "" }) => {
  const navigate = useNavigate();

  const handleCreateNote = () => {
    navigate('/note-editor');
  };

  if (hasSearchQuery) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
          <Icon name="Search" size={32} className="text-text-secondary" />
        </div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No notes found
        </h3>
        <p className="text-text-secondary mb-6 max-w-md">
          We couldn't find any notes matching "{searchQuery}". Try adjusting your search terms or emotion filters.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            iconName="RotateCcw"
            onClick={() => window.location.reload()}
          >
            Clear Search
          </Button>
          <Button
            variant="default"
            iconName="Plus"
            onClick={handleCreateNote}
          >
            Create New Note
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}>
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
          <Icon name="FileText" size={40} className="text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-energized/20 to-focused/20 rounded-full flex items-center justify-center">
          <Icon name="Heart" size={16} className="text-energized" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-text-primary mb-3">
        Start Your Mindful Journey
      </h3>
      <p className="text-text-secondary mb-8 max-w-md leading-relaxed">
        Create your first note and let NeuroScribe analyze your emotions in real-time. 
        Track your mental wellness while staying productive.
      </p>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl">
        <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
          <div className="w-10 h-10 bg-calm/20 rounded-full flex items-center justify-center mb-2">
            <Icon name="Brain" size={20} className="text-calm" />
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">Smart Analysis</p>
          <p className="text-xs text-text-secondary text-center">
            AI-powered emotion detection from your writing
          </p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
          <div className="w-10 h-10 bg-focused/20 rounded-full flex items-center justify-center mb-2">
            <Icon name="TrendingUp" size={20} className="text-focused" />
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">Track Progress</p>
          <p className="text-xs text-text-secondary text-center">
            Monitor emotional patterns over time
          </p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-muted rounded-lg">
          <div className="w-10 h-10 bg-energized/20 rounded-full flex items-center justify-center mb-2">
            <Icon name="Lightbulb" size={20} className="text-energized" />
          </div>
          <p className="text-sm font-medium text-text-primary mb-1">Get Insights</p>
          <p className="text-xs text-text-secondary text-center">
            Personalized wellness recommendations
          </p>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="default"
        size="lg"
        iconName="Plus"
        onClick={handleCreateNote}
        className="px-8"
      >
        Create Your First Note
      </Button>

      {/* Tips */}
      <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg max-w-md">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary mb-1">Pro Tip</p>
            <p className="text-xs text-text-secondary">
              Write naturally about your day, thoughts, or goals. NeuroScribe will automatically detect and categorize your emotions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesEmptyState;