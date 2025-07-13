import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const MoodDistributionChart = ({ timeRange, className = "" }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  // Mock data for mood distribution
  const generateMockData = () => {
    const emotions = [
      { name: 'Calm', value: 28, color: '#4A90E2', icon: 'Waves' },
      { name: 'Focused', value: 24, color: '#27AE60', icon: 'Target' },
      { name: 'Energized', value: 18, color: '#F39C12', icon: 'Zap' },
      { name: 'Creative', value: 15, color: '#7B68EE', icon: 'Lightbulb' },
      { name: 'Stressed', value: 10, color: '#E67E22', icon: 'AlertTriangle' },
      { name: 'Neutral', value: 5, color: '#7F8C8D', icon: 'Circle' }
    ];
    
    return emotions.map(emotion => ({
      ...emotion,
      value: Math.floor(Math.random() * 30) + 5
    }));
  };

  const [chartData, setChartData] = useState(generateMockData());

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateMockData());
      setIsLoading(false);
    }, 300);
  }, [timeRange]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-popover border border-border rounded-lg shadow-soft-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            <span className="font-medium text-text-primary">{data.name}</span>
          </div>
          <p className="text-sm text-text-secondary">
            {data.value}% of total emotions
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.05) return null; // Don't show labels for segments < 5%
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const totalEntries = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Mood Distribution
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              Emotional breakdown for {timeRange === 'daily' ? 'today' : timeRange === 'weekly' ? 'this week' : 'this month'}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="PieChart" size={16} />
            <span>{totalEntries} total entries</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-text-secondary">Loading distribution...</span>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={(_, index) => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        stroke={hoveredSegment === index ? '#FFFFFF' : 'none'}
                        strokeWidth={hoveredSegment === index ? 2 : 0}
                        style={{
                          filter: hoveredSegment === index ? 'brightness(1.1)' : 'none',
                          cursor: 'pointer'
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend with Details */}
            <div className="space-y-3">
              <h4 className="font-medium text-text-primary mb-4">Emotion Breakdown</h4>
              {chartData
                .sort((a, b) => b.value - a.value)
                .map((emotion, index) => {
                  const percentage = ((emotion.value / totalEntries) * 100).toFixed(1);
                  return (
                    <div 
                      key={emotion.name}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-gentle cursor-pointer"
                      onMouseEnter={() => setHoveredSegment(chartData.findIndex(item => item.name === emotion.name))}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: emotion.color }}
                          />
                          <Icon name={emotion.icon} size={16} className="text-text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{emotion.name}</p>
                          <p className="text-xs text-text-secondary">
                            {emotion.value} entries
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-text-primary">{percentage}%</p>
                        <div className="w-16 bg-border rounded-full h-1.5 mt-1">
                          <div 
                            className="h-full rounded-full transition-all duration-300"
                            style={{ 
                              width: `${percentage}%`,
                              backgroundColor: emotion.color 
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodDistributionChart;