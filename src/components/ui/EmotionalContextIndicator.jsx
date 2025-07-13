import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const EmotionalContextIndicator = ({ 
  position = 'badge', // 'badge', 'header', 'standalone'
  size = 'default', // 'sm', 'default', 'lg'
  showLabel = true,
  showDetails = false,
  className = ""
}) => {
  const [emotionalState, setEmotionalState] = useState({
    primary: 'neutral',
    intensity: 0.5,
    confidence: 0.8,
    timestamp: new Date(),
    context: 'general'
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [history, setHistory] = useState([]);
  const location = useLocation();

  // Simulate emotional state detection with realistic patterns
  useEffect(() => {
    const detectEmotionalState = () => {
      const states = ['calm', 'focused', 'energized', 'stressed', 'neutral', 'creative'];
      const contexts = {
        '/notes': 'writing',
        '/note-editor': 'deep_focus',
        '/tasks': 'productivity',
        '/emotional-analytics': 'reflection',
        '/profile-settings': 'configuration'
      };

      const newState = {
        primary: states[Math.floor(Math.random() * states.length)],
        intensity: Math.random() * 0.6 + 0.2, // 0.2 to 0.8
        confidence: Math.random() * 0.4 + 0.6, // 0.6 to 1.0
        timestamp: new Date(),
        context: contexts[location.pathname] || 'general'
      };

      setEmotionalState(newState);
      
      // Add to history (keep last 10 states)
      setHistory(prev => [newState, ...prev.slice(0, 9)]);
    };

    // Initial detection
    detectEmotionalState();

    // Simulate periodic updates (every 30 seconds)
    const interval = setInterval(detectEmotionalState, 30000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  const getEmotionalConfig = (state) => {
    const configs = {
      calm: {
        color: 'text-calm',
        bgColor: 'bg-calm/10',
        borderColor: 'border-calm/20',
        icon: 'Waves',
        label: 'Calm',
        description: 'Peaceful and centered'
      },
      focused: {
        color: 'text-focused',
        bgColor: 'bg-focused/10',
        borderColor: 'border-focused/20',
        icon: 'Target',
        label: 'Focused',
        description: 'Deep concentration'
      },
      energized: {
        color: 'text-energized',
        bgColor: 'bg-energized/10',
        borderColor: 'border-energized/20',
        icon: 'Zap',
        label: 'Energized',
        description: 'High energy and motivation'
      },
      stressed: {
        color: 'text-stressed',
        bgColor: 'bg-stressed/10',
        borderColor: 'border-stressed/20',
        icon: 'AlertTriangle',
        label: 'Stressed',
        description: 'Tension detected'
      },
      creative: {
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        borderColor: 'border-secondary/20',
        icon: 'Lightbulb',
        label: 'Creative',
        description: 'Innovative thinking'
      },
      neutral: {
        color: 'text-neutral',
        bgColor: 'bg-neutral/10',
        borderColor: 'border-neutral/20',
        icon: 'Circle',
        label: 'Neutral',
        description: 'Balanced state'
      }
    };
    return configs[state] || configs.neutral;
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: {
        indicator: 'w-2 h-2',
        icon: 12,
        text: 'text-xs',
        padding: 'p-1'
      },
      default: {
        indicator: 'w-3 h-3',
        icon: 16,
        text: 'text-sm',
        padding: 'p-2'
      },
      lg: {
        indicator: 'w-4 h-4',
        icon: 20,
        text: 'text-base',
        padding: 'p-3'
      }
    };
    return sizes[size] || sizes.default;
  };

  const config = getEmotionalConfig(emotionalState.primary);
  const sizeClasses = getSizeClasses();

  const handleToggleExpanded = () => {
    if (showDetails) {
      setIsExpanded(!isExpanded);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getIntensityBar = () => {
    return (
      <div className="w-full bg-muted rounded-full h-1.5 mt-2">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${config.bgColor.replace('/10', '')}`}
          style={{ width: `${emotionalState.intensity * 100}%` }}
        />
      </div>
    );
  };

  // Badge position (for navigation tabs)
  if (position === 'badge') {
    return (
      <div 
        className={`
          absolute -top-1 -right-1 ${sizeClasses.indicator} rounded-full 
          emotional-indicator ${emotionalState.primary}
          transition-all duration-300 cursor-pointer
          ${className}
        `}
        onClick={handleToggleExpanded}
        title={`${config.label} - ${config.description}`}
      />
    );
  }

  // Header position (compact)
  if (position === 'header') {
    return (
      <div 
        className={`
          flex items-center space-x-2 px-3 py-1 bg-muted rounded-full 
          cursor-pointer transition-gentle hover:bg-muted/80
          ${className}
        `}
        onClick={handleToggleExpanded}
      >
        <div className={`${sizeClasses.indicator} rounded-full emotional-indicator ${emotionalState.primary}`} />
        {showLabel && (
          <span className={`font-caption ${config.color} capitalize ${sizeClasses.text}`}>
            {config.label}
          </span>
        )}
        {showDetails && (
          <Icon name="ChevronDown" size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        )}
      </div>
    );
  }

  // Standalone position (full component)
  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div 
        className={`flex items-center justify-between ${sizeClasses.padding} cursor-pointer`}
        onClick={handleToggleExpanded}
      >
        <div className="flex items-center space-x-3">
          <div className={`${sizeClasses.indicator} rounded-full emotional-indicator ${emotionalState.primary}`} />
          <div>
            <p className={`font-medium ${config.color} ${sizeClasses.text}`}>
              {config.label} State
            </p>
            {showLabel && (
              <p className="text-xs text-text-secondary">
                {config.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-right">
            <p className="text-xs text-text-secondary">
              {formatTime(emotionalState.timestamp)}
            </p>
            <p className="text-xs text-text-secondary">
              {Math.round(emotionalState.confidence * 100)}% confidence
            </p>
          </div>
          {showDetails && (
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`transition-transform text-text-secondary ${isExpanded ? 'rotate-180' : ''}`} 
            />
          )}
        </div>
      </div>

      {/* Intensity indicator */}
      {!isExpanded && (
        <div className="px-4 pb-3">
          {getIntensityBar()}
        </div>
      )}

      {/* Expanded details */}
      {isExpanded && showDetails && (
        <div className="border-t border-border p-4 space-y-4">
          {/* Current state details */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Current State</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Intensity:</span>
                <span className="text-text-primary">{Math.round(emotionalState.intensity * 100)}%</span>
              </div>
              {getIntensityBar()}
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Context:</span>
                <span className="text-text-primary capitalize">{emotionalState.context.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Detected:</span>
                <span className="text-text-primary">{formatTime(emotionalState.timestamp)}</span>
              </div>
            </div>
          </div>

          {/* Recent history */}
          {history.length > 1 && (
            <div>
              <h4 className="text-sm font-medium text-text-primary mb-2">Recent History</h4>
              <div className="space-y-1">
                {history.slice(1, 4).map((state, index) => {
                  const historyConfig = getEmotionalConfig(state.primary);
                  return (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full emotional-indicator ${state.primary}`} />
                        <span className={historyConfig.color}>{historyConfig.label}</span>
                      </div>
                      <span className="text-text-secondary">{formatTime(state.timestamp)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Suggestions based on state */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-2">Suggestions</h4>
            <div className="text-xs text-text-secondary">
              {emotionalState.primary === 'stressed' && "Consider taking a short break or trying breathing exercises."}
              {emotionalState.primary === 'focused' && "Great time for deep work! Minimize distractions."}
              {emotionalState.primary === 'energized' && "Perfect for tackling challenging tasks or brainstorming."}
              {emotionalState.primary === 'calm' && "Ideal for reflection, planning, or creative work."}
              {emotionalState.primary === 'creative' && "Capture your ideas! This is a great time for innovation."}
              {emotionalState.primary === 'neutral' && "A balanced state - good for any type of work."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionalContextIndicator;