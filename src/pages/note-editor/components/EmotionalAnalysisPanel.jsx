import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmotionalAnalysisPanel = ({ content, isVisible, onToggle }) => {
  const [currentEmotion, setCurrentEmotion] = useState({
    primary: 'neutral',
    intensity: 0.5,
    confidence: 0.8,
    timestamp: new Date()
  });
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock emotional analysis with debounced updates
  useEffect(() => {
    if (!content || content.length < 10) {
      setCurrentEmotion(prev => ({ ...prev, primary: 'neutral', intensity: 0.2 }));
      return;
    }

    setIsAnalyzing(true);
    const timeoutId = setTimeout(() => {
      // Mock sentiment analysis based on content keywords
      const emotions = ['calm', 'focused', 'energized', 'stressed', 'creative', 'motivated'];
      const positiveWords = ['happy', 'excited', 'great', 'amazing', 'wonderful', 'love', 'perfect'];
      const negativeWords = ['sad', 'angry', 'frustrated', 'tired', 'stressed', 'worried', 'difficult'];
      const focusWords = ['work', 'project', 'goal', 'plan', 'focus', 'concentrate', 'deadline'];
      
      let detectedEmotion = 'neutral';
      let intensity = 0.5;
      
      const lowerContent = content.toLowerCase();
      
      if (positiveWords.some(word => lowerContent.includes(word))) {
        detectedEmotion = Math.random() > 0.5 ? 'energized' : 'motivated';
        intensity = Math.random() * 0.3 + 0.6;
      } else if (negativeWords.some(word => lowerContent.includes(word))) {
        detectedEmotion = 'stressed';
        intensity = Math.random() * 0.4 + 0.5;
      } else if (focusWords.some(word => lowerContent.includes(word))) {
        detectedEmotion = 'focused';
        intensity = Math.random() * 0.3 + 0.5;
      } else {
        detectedEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        intensity = Math.random() * 0.6 + 0.2;
      }

      const newEmotion = {
        primary: detectedEmotion,
        intensity,
        confidence: Math.random() * 0.3 + 0.7,
        timestamp: new Date()
      };

      setCurrentEmotion(newEmotion);
      setEmotionHistory(prev => [newEmotion, ...prev.slice(0, 9)]);
      setIsAnalyzing(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [content]);

  const getEmotionConfig = (emotion) => {
    const configs = {
      calm: { color: 'text-calm', bg: 'bg-calm/10', icon: 'Waves', label: 'Calm' },
      focused: { color: 'text-focused', bg: 'bg-focused/10', icon: 'Target', label: 'Focused' },
      energized: { color: 'text-energized', bg: 'bg-energized/10', icon: 'Zap', label: 'Energized' },
      stressed: { color: 'text-stressed', bg: 'bg-stressed/10', icon: 'AlertTriangle', label: 'Stressed' },
      creative: { color: 'text-secondary', bg: 'bg-secondary/10', icon: 'Lightbulb', label: 'Creative' },
      motivated: { color: 'text-success', bg: 'bg-success/10', icon: 'TrendingUp', label: 'Motivated' },
      neutral: { color: 'text-neutral', bg: 'bg-neutral/10', icon: 'Circle', label: 'Neutral' }
    };
    return configs[emotion] || configs.neutral;
  };

  const config = getEmotionConfig(currentEmotion.primary);

  if (!isVisible) {
    return (
      <Button
        variant="ghost"
        size="icon"
        iconName="Brain"
        onClick={onToggle}
        className="fixed bottom-20 right-4 lg:bottom-4 lg:right-4 z-10 bg-surface shadow-soft-lg border border-border"
        title="Show Emotional Analysis"
      />
    );
  }

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-4 lg:right-4 w-80 max-w-[calc(100vw-2rem)] bg-surface border border-border rounded-lg shadow-soft-lg z-10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="font-heading font-medium text-text-primary">Emotional Analysis</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          iconName="X"
          onClick={onToggle}
          className="h-6 w-6"
        />
      </div>

      {/* Current Emotion */}
      <div className="p-4 space-y-4">
        <div className={`p-3 rounded-lg ${config.bg} border border-border/50`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name={config.icon} size={16} className={config.color} />
              <span className={`font-medium ${config.color}`}>{config.label}</span>
            </div>
            {isAnalyzing && (
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-1 h-1 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-text-secondary">
              <span>Intensity</span>
              <span>{Math.round(currentEmotion.intensity * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${config.color.replace('text-', 'bg-')}`}
                style={{ width: `${currentEmotion.intensity * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-secondary">
              <span>Confidence</span>
              <span>{Math.round(currentEmotion.confidence * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Emotion History */}
        {emotionHistory.length > 1 && (
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Recent Emotions</h4>
            <div className="space-y-1">
              {emotionHistory.slice(1, 4).map((emotion, index) => {
                const historyConfig = getEmotionConfig(emotion.primary);
                return (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${historyConfig.color.replace('text-', 'bg-')}`} />
                      <span className={historyConfig.color}>{historyConfig.label}</span>
                    </div>
                    <span className="text-text-secondary">
                      {emotion.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wellness Suggestions */}
        {(currentEmotion.primary === 'stressed' || currentEmotion.intensity > 0.7) && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Heart" size={14} className="text-warning" />
              <span className="text-sm font-medium text-warning">Wellness Suggestion</span>
            </div>
            <p className="text-xs text-text-secondary mb-2">
              {currentEmotion.primary === 'stressed' 
                ? "High stress detected. Consider taking a short break." :"High emotional intensity. Take a moment to breathe."
              }
            </p>
            <Button variant="outline" size="xs" iconName="Play" className="w-full">
              Start Breathing Exercise
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionalAnalysisPanel;