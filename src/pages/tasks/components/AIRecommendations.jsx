import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ 
  currentEmotionalState = 'neutral',
  tasks = [],
  onTaskCreate,
  onTaskUpdate,
  className = ""
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every minute
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    generateRecommendations();
  }, [currentEmotionalState, tasks, currentTime]);

  const generateRecommendations = () => {
    const hour = currentTime.getHours();
    const pendingTasks = tasks.filter(task => task.status === 'pending');
    const highPriorityTasks = tasks.filter(task => task.priority === 'high' && task.status !== 'completed');
    const overdueTasks = tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return dueDate < new Date() && task.status !== 'completed';
    });

    const newRecommendations = [];

    // Time-based recommendations
    if (hour >= 9 && hour <= 11) {
      newRecommendations.push({
        id: 'morning-focus',
        type: 'scheduling',
        title: 'Morning Focus Time',
        description: 'Great time for deep work and complex tasks',
        icon: 'Sun',
        color: 'text-energized',
        bgColor: 'bg-energized/10',
        action: 'Schedule high-priority tasks',
        confidence: 0.85
      });
    }

    if (hour >= 14 && hour <= 16) {
      newRecommendations.push({
        id: 'afternoon-energy',
        type: 'scheduling',
        title: 'Afternoon Energy Peak',
        description: 'Perfect for collaborative work and meetings',
        icon: 'Users',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        action: 'Focus on team tasks',
        confidence: 0.78
      });
    }

    // Emotional state recommendations
    switch (currentEmotionalState) {
      case 'focused':
        newRecommendations.push({
          id: 'deep-work',
          type: 'emotional',
          title: 'Deep Work Session',
          description: 'Your focus is high - tackle complex tasks now',
          icon: 'Target',
          color: 'text-focused',
          bgColor: 'bg-focused/10',
          action: 'Work on challenging projects',
          confidence: 0.92,
          suggestedTasks: highPriorityTasks.slice(0, 3)
        });
        break;

      case 'energized':
        newRecommendations.push({
          id: 'high-energy',
          type: 'emotional',
          title: 'High Energy Mode',
          description: 'Great time for physical tasks and brainstorming',
          icon: 'Zap',
          color: 'text-energized',
          bgColor: 'bg-energized/10',
          action: 'Tackle multiple quick tasks',
          confidence: 0.88,
          suggestedTasks: pendingTasks.filter(task => task.category === 'work').slice(0, 5)
        });
        break;

      case 'calm':
        newRecommendations.push({
          id: 'planning-time',
          type: 'emotional',
          title: 'Planning & Reflection',
          description: 'Perfect state for organizing and planning ahead',
          icon: 'Calendar',
          color: 'text-calm',
          bgColor: 'bg-calm/10',
          action: 'Review and organize tasks',
          confidence: 0.82
        });
        break;

      case 'stressed':
        newRecommendations.push({
          id: 'stress-relief',
          type: 'wellness',
          title: 'Take a Break',
          description: 'Consider a short break or breathing exercise',
          icon: 'Heart',
          color: 'text-stressed',
          bgColor: 'bg-stressed/10',
          action: 'Practice mindfulness',
          confidence: 0.95
        });
        break;

      case 'creative':
        newRecommendations.push({
          id: 'creative-flow',
          type: 'emotional',
          title: 'Creative Flow State',
          description: 'Perfect for innovative and creative work',
          icon: 'Lightbulb',
          color: 'text-secondary',
          bgColor: 'bg-secondary/10',
          action: 'Work on creative projects',
          confidence: 0.89,
          suggestedTasks: tasks.filter(task => task.category === 'creative').slice(0, 3)
        });
        break;
    }

    // Overdue task alerts
    if (overdueTasks.length > 0) {
      newRecommendations.push({
        id: 'overdue-alert',
        type: 'urgent',
        title: 'Overdue Tasks Alert',
        description: `You have ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''}`,
        icon: 'AlertTriangle',
        color: 'text-error',
        bgColor: 'bg-error/10',
        action: 'Review overdue items',
        confidence: 1.0,
        suggestedTasks: overdueTasks.slice(0, 3)
      });
    }

    // Productivity patterns
    if (pendingTasks.length > 10) {
      newRecommendations.push({
        id: 'task-overload',
        type: 'productivity',
        title: 'Task Overload Detected',
        description: 'Consider breaking down large tasks or delegating',
        icon: 'Package',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        action: 'Organize task list',
        confidence: 0.75
      });
    }

    setRecommendations(newRecommendations.slice(0, 4));
  };

  const handleApplyRecommendation = (recommendation) => {
    switch (recommendation.type) {
      case 'emotional': case'scheduling':
        if (recommendation.suggestedTasks && recommendation.suggestedTasks.length > 0) {
          // Update suggested tasks with higher priority or move to in-progress
          recommendation.suggestedTasks.forEach(task => {
            onTaskUpdate({
              ...task,
              status: 'in-progress',
              updatedAt: new Date().toISOString()
            });
          });
        }
        break;
      
      case 'wellness':
        // Could trigger a wellness modal or breathing exercise
        break;
      
      case 'urgent':
        // Focus on overdue tasks
        if (recommendation.suggestedTasks) {
          recommendation.suggestedTasks.forEach(task => {
            onTaskUpdate({
              ...task,
              priority: 'high',
              updatedAt: new Date().toISOString()
            });
          });
        }
        break;
    }
  };

  if (recommendations.length === 0) return null;

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              AI Recommendations
            </h3>
            <p className="text-xs text-text-secondary">
              Based on your current state: {currentEmotionalState}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            {recommendations.length}
          </span>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`transition-transform text-text-secondary ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>

      {/* Recommendations List */}
      {isExpanded && (
        <div className="border-t border-border">
          {recommendations.map((rec, index) => (
            <div key={rec.id} className={`p-4 ${index < recommendations.length - 1 ? 'border-b border-border' : ''}`}>
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${rec.bgColor}`}>
                  <Icon name={rec.icon} size={18} className={rec.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-text-primary text-sm">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-text-secondary mt-1">
                        {rec.description}
                      </p>
                    </div>
                    <div className="text-right ml-2">
                      <div className="text-xs text-text-secondary">
                        {Math.round(rec.confidence * 100)}% confidence
                      </div>
                    </div>
                  </div>

                  {/* Suggested Tasks */}
                  {rec.suggestedTasks && rec.suggestedTasks.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium text-text-primary mb-1">Suggested tasks:</p>
                      <div className="space-y-1">
                        {rec.suggestedTasks.map(task => (
                          <div key={task.id} className="text-xs text-text-secondary bg-muted px-2 py-1 rounded">
                            {task.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApplyRecommendation(rec)}
                    className="text-xs"
                  >
                    {rec.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;