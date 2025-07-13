import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmotionalInsightsPanel = ({ timeRange, className = "" }) => {
  const [insights, setInsights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState(null);

  // Mock insights data
  const generateMockInsights = () => {
    const insightTypes = [
      {
        id: 'pattern',
        title: 'Weekly Pattern Detected',
        type: 'pattern',
        icon: 'TrendingUp',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        description: `You tend to feel most focused on Tuesday and Wednesday mornings. Consider scheduling important tasks during these peak focus periods.`,
        confidence: 85,
        actionable: true,
        recommendation: 'Block calendar time for deep work on Tuesday-Wednesday 9-11 AM'
      },
      {
        id: 'trigger',
        title: 'Stress Trigger Identified',
        type: 'warning',
        icon: 'AlertTriangle',
        color: 'text-warning',
        bgColor: 'bg-warning/10',
        description: `Stress levels increase by 40% when you have more than 5 tasks scheduled in a single day. Consider breaking down large tasks or spreading them across multiple days.`,
        confidence: 92,
        actionable: true,
        recommendation: 'Limit daily task count to 4 or fewer for optimal emotional balance'
      },
      {
        id: 'positive',
        title: 'Creative Peak Hours',
        type: 'success',
        icon: 'Lightbulb',
        color: 'text-success',
        bgColor: 'bg-success/10',
        description: `Your creativity scores are highest between 2-4 PM. This coincides with 73% of your best note-taking sessions.`,
        confidence: 78,
        actionable: true,
        recommendation: 'Schedule brainstorming and creative work for early afternoon'
      },
      {
        id: 'correlation',
        title: 'Mood-Productivity Link',
        type: 'info',
        icon: 'BarChart3',
        color: 'text-secondary',
        bgColor: 'bg-secondary/10',
        description: `There's a strong correlation (r=0.82) between your calm emotional state and task completion rate. Calm days result in 35% more completed tasks.`,
        confidence: 89,
        actionable: true,
        recommendation: 'Start each day with 5 minutes of breathing exercises'
      },
      {
        id: 'improvement',title: 'Emotional Balance Improving',type: 'success',icon: 'TrendingUp',color: 'text-success',bgColor: 'bg-success/10',description: `Your emotional stability has improved by 23% over the past month. Stress episodes are shorter and less frequent.`,confidence: 94,actionable: false,recommendation: 'Continue current wellness practices - they\'re working well!'
      }
    ];

    return insightTypes.slice(0, Math.floor(Math.random() * 3) + 3);
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setInsights(generateMockInsights());
      setIsLoading(false);
    }, 800);
  }, [timeRange]);

  const handleToggleExpanded = (insightId) => {
    setExpandedInsight(expandedInsight === insightId ? null : insightId);
  };

  const handleApplyRecommendation = (insight) => {
    // Mock implementation - would integrate with task/calendar system
    console.log('Applying recommendation:', insight.recommendation);
    // Show success feedback
  };

  if (isLoading) {
    return (
      <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
        <div className="p-4 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            AI Insights
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              AI Insights
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Personalized patterns and recommendations
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Brain" size={16} />
            <span>{insights.length} insights</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {insights.map((insight) => (
          <div 
            key={insight.id}
            className="border border-border rounded-lg overflow-hidden hover:shadow-soft transition-gentle"
          >
            <div 
              className="p-4 cursor-pointer"
              onClick={() => handleToggleExpanded(insight.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg ${insight.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={insight.icon} size={20} className={insight.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-text-primary mb-1">
                        {insight.title}
                      </h4>
                      <p className="text-sm text-text-secondary line-clamp-2">
                        {insight.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-3">
                      <div className="flex items-center space-x-1 text-xs text-text-secondary">
                        <Icon name="Zap" size={12} />
                        <span>{insight.confidence}%</span>
                      </div>
                      <Icon 
                        name="ChevronDown" 
                        size={16} 
                        className={`text-text-secondary transition-transform ${
                          expandedInsight === insight.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {expandedInsight === insight.id && (
              <div className="px-4 pb-4 border-t border-border bg-muted/30">
                <div className="pt-4 space-y-4">
                  {/* Detailed Description */}
                  <div>
                    <h5 className="text-sm font-medium text-text-primary mb-2">
                      Detailed Analysis
                    </h5>
                    <p className="text-sm text-text-secondary">
                      {insight.description}
                    </p>
                  </div>

                  {/* Confidence Score */}
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-text-secondary">Confidence Level</span>
                      <span className="font-medium text-text-primary">{insight.confidence}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Recommendation */}
                  {insight.actionable && (
                    <div className="bg-background rounded-lg p-3">
                      <div className="flex items-start space-x-2 mb-3">
                        <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                        <div className="flex-1">
                          <h6 className="text-sm font-medium text-text-primary mb-1">
                            Recommended Action
                          </h6>
                          <p className="text-sm text-text-secondary">
                            {insight.recommendation}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="default"
                          iconName="Plus"
                          onClick={() => handleApplyRecommendation(insight)}
                        >
                          Apply to Schedule
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          iconName="BookOpen"
                        >
                          Learn More
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {insights.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Brain" size={48} className="mx-auto text-text-secondary opacity-50 mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">
              Generating Insights
            </h4>
            <p className="text-text-secondary">
              We need more data to provide personalized insights. Keep using NeuroScribe to unlock AI-powered recommendations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionalInsightsPanel;