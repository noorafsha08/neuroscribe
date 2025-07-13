import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import EmotionalContextIndicator from '../../components/ui/EmotionalContextIndicator';
import EmotionalTrendChart from './components/EmotionalTrendChart';
import MoodDistributionChart from './components/MoodDistributionChart';
import EmotionalInsightsPanel from './components/EmotionalInsightsPanel';
import TimeRangeSelector from './components/TimeRangeSelector';
import EmotionFilterPanel from './components/EmotionFilterPanel';
import ExportDataPanel from './components/ExportDataPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EmotionalAnalytics = () => {
  const [timeRange, setTimeRange] = useState('weekly');
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [customDateRange, setCustomDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Mock analytics summary data
  const [analyticsData, setAnalyticsData] = useState({
    totalEntries: 0,
    averageMood: 0,
    mostFrequentEmotion: '',
    productivityCorrelation: 0,
    weeklyTrend: 0
  });

  useEffect(() => {
    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      setAnalyticsData({
        totalEntries: Math.floor(Math.random() * 200) + 50,
        averageMood: Math.floor(Math.random() * 40) + 60,
        mostFrequentEmotion: ['Calm', 'Focused', 'Energized', 'Creative'][Math.floor(Math.random() * 4)],
        productivityCorrelation: Math.floor(Math.random() * 30) + 70,
        weeklyTrend: Math.floor(Math.random() * 20) - 10
      });
      setIsLoading(false);
    }, 1000);
  }, [timeRange, selectedEmotions]);

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  const handleEmotionToggle = (emotionId) => {
    setSelectedEmotions(prev => 
      prev.includes(emotionId)
        ? prev.filter(id => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  const handleSelectAllEmotions = () => {
    setSelectedEmotions(['calm', 'focused', 'energized', 'creative', 'stressed', 'neutral']);
  };

  const handleClearAllEmotions = () => {
    setSelectedEmotions([]);
  };

  const handleCustomDateChange = (dateRange) => {
    setCustomDateRange(dateRange);
  };

  const summaryCards = [
    {
      title: 'Total Entries',
      value: analyticsData.totalEntries,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      suffix: 'entries'
    },
    {
      title: 'Average Mood',
      value: analyticsData.averageMood,
      icon: 'Heart',
      color: 'text-success',
      bgColor: 'bg-success/10',
      suffix: '%'
    },
    {
      title: 'Top Emotion',
      value: analyticsData.mostFrequentEmotion,
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      suffix: ''
    },
    {
      title: 'Productivity Link',
      value: analyticsData.productivityCorrelation,
      icon: 'BarChart3',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      suffix: '%'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Emotional Analytics - NeuroScribe</title>
        <meta name="description" content="Comprehensive visualization of emotional patterns and trends for enhanced self-awareness and wellness tracking" />
      </Helmet>

      <ContextualHeader />

      <main className="lg:ml-64 pb-16 lg:pb-0">
        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                Emotional Analytics
              </h1>
              <p className="text-text-secondary mt-1">
                Discover patterns in your emotional journey and enhance self-awareness
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-3">
              <EmotionalContextIndicator 
                position="header" 
                showLabel={true} 
                showDetails={true} 
              />
              <Button
                variant="outline"
                iconName="Filter"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden"
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryCards.map((card, index) => (
              <div key={index} className="bg-card border border-border rounded-lg shadow-soft p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                    <Icon name={card.icon} size={20} className={card.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-secondary truncate">
                      {card.title}
                    </p>
                    {isLoading ? (
                      <div className="h-6 bg-muted rounded animate-pulse mt-1" />
                    ) : (
                      <p className="text-lg font-semibold text-text-primary">
                        {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                        {card.suffix && <span className="text-sm font-normal text-text-secondary ml-1">{card.suffix}</span>}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              iconName="Filter"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              fullWidth
            >
              {showMobileFilters ? 'Hide Filters' : 'Show Filters & Controls'}
            </Button>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Sidebar Controls */}
            <div className={`lg:col-span-1 space-y-6 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
              <TimeRangeSelector
                selectedRange={timeRange}
                onRangeChange={handleTimeRangeChange}
                customDateRange={customDateRange}
                onCustomDateChange={handleCustomDateChange}
              />
              
              <EmotionFilterPanel
                selectedEmotions={selectedEmotions}
                onEmotionToggle={handleEmotionToggle}
                onClearAll={handleClearAllEmotions}
                onSelectAll={handleSelectAllEmotions}
              />

              <ExportDataPanel
                timeRange={timeRange}
                selectedEmotions={selectedEmotions}
              />
            </div>

            {/* Charts and Analytics */}
            <div className="lg:col-span-3 space-y-6">
              {/* Emotional Trends Chart */}
              <EmotionalTrendChart
                timeRange={timeRange}
                selectedEmotions={selectedEmotions}
              />

              {/* Two Column Layout for Medium Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <MoodDistributionChart
                  timeRange={timeRange}
                />
                
                <EmotionalInsightsPanel
                  timeRange={timeRange}
                />
              </div>

              {/* Emotional Context Indicator - Standalone */}
              <div className="lg:hidden">
                <EmotionalContextIndicator 
                  position="standalone" 
                  showLabel={true} 
                  showDetails={true}
                  size="lg"
                />
              </div>

              {/* Additional Analytics Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Weekly Pattern Card */}
                <div className="bg-card border border-border rounded-lg shadow-soft p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Calendar" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary">
                        Weekly Patterns
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Your emotional rhythms
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => {
                      const intensity = Math.random() * 100;
                      const emotion = ['Calm', 'Focused', 'Energized', 'Creative', 'Neutral'][Math.floor(Math.random() * 5)];
                      return (
                        <div key={day} className="flex items-center justify-between">
                          <span className="text-sm text-text-primary">{day}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-text-secondary">{emotion}</span>
                            <div className="w-16 bg-muted rounded-full h-2">
                              <div 
                                className="h-full bg-primary rounded-full transition-all duration-300"
                                style={{ width: `${intensity}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Correlation Analysis Card */}
                <div className="bg-card border border-border rounded-lg shadow-soft p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="TrendingUp" size={20} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary">
                        Productivity Correlation
                      </h3>
                      <p className="text-sm text-text-secondary">
                        Emotion-performance links
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-primary">Task Completion</span>
                      <span className="text-sm font-semibold text-success">+{analyticsData.productivityCorrelation}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-primary">Focus Duration</span>
                      <span className="text-sm font-semibold text-primary">+{Math.floor(Math.random() * 25) + 15}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-text-primary">Creative Output</span>
                      <span className="text-sm font-semibold text-secondary">+{Math.floor(Math.random() * 30) + 20}%</span>
                    </div>
                    
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-text-secondary">
                        Strong positive correlation between calm/focused states and productivity metrics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default EmotionalAnalytics;