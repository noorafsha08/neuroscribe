import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

import Button from '../../../components/ui/Button';

const EmotionalTrendChart = ({ timeRange, selectedEmotions, className = "" }) => {
  const [chartType, setChartType] = useState('line');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for emotional trends
  const generateMockData = () => {
    const emotions = ['calm', 'focused', 'energized', 'stressed', 'creative', 'neutral'];
    const data = [];
    
    const days = timeRange === 'daily' ? 7 : timeRange === 'weekly' ? 12 : 30;
    const labelFormat = timeRange === 'daily' ? 'Mon' : timeRange === 'weekly' ? 'Week' : 'Day';
    
    for (let i = 0; i < days; i++) {
      const entry = {
        label: timeRange === 'daily' 
          ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i] 
          : timeRange === 'weekly' 
            ? `Week ${i + 1}`
            : `Day ${i + 1}`,
        date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      
      emotions.forEach(emotion => {
        entry[emotion] = Math.floor(Math.random() * 80) + 10;
      });
      
      data.push(entry);
    }
    
    return data;
  };

  const [chartData, setChartData] = useState(generateMockData());

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setChartData(generateMockData());
      setIsLoading(false);
    }, 500);
  }, [timeRange]);

  const emotionColors = {
    calm: '#4A90E2',
    focused: '#27AE60',
    energized: '#F39C12',
    stressed: '#E67E22',
    creative: '#7B68EE',
    neutral: '#7F8C8D'
  };

  const filteredEmotions = selectedEmotions.length > 0 ? selectedEmotions : Object.keys(emotionColors);

  const renderLineChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E1E8ED" />
        <XAxis 
          dataKey="label" 
          stroke="#7F8C8D"
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#7F8C8D"
          fontSize={12}
          tickLine={false}
          domain={[0, 100]}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E1E8ED',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
          }}
        />
        {filteredEmotions.map(emotion => (
          <Line
            key={emotion}
            type="monotone"
            dataKey={emotion}
            stroke={emotionColors[emotion]}
            strokeWidth={2}
            dot={{ fill: emotionColors[emotion], strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: emotionColors[emotion], strokeWidth: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E1E8ED" />
        <XAxis 
          dataKey="label" 
          stroke="#7F8C8D"
          fontSize={12}
          tickLine={false}
        />
        <YAxis 
          stroke="#7F8C8D"
          fontSize={12}
          tickLine={false}
          domain={[0, 100]}
        />
        <Tooltip 
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E1E8ED',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
          }}
        />
        {filteredEmotions.map((emotion, index) => (
          <Bar
            key={emotion}
            dataKey={emotion}
            fill={emotionColors[emotion]}
            radius={[2, 2, 0, 0]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Emotional Trends
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              {timeRange === 'daily' ? 'Last 7 days' : timeRange === 'weekly' ? 'Last 12 weeks' : 'Last 30 days'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              iconName="TrendingUp"
              onClick={() => setChartType('line')}
            >
              Line
            </Button>
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              iconName="BarChart3"
              onClick={() => setChartType('bar')}
            >
              Bar
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="h-80 flex items-center justify-center">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-text-secondary">Loading chart data...</span>
            </div>
          </div>
        ) : (
          <div className="h-80">
            {chartType === 'line' ? renderLineChart() : renderBarChart()}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap gap-4">
          {filteredEmotions.map(emotion => (
            <div key={emotion} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: emotionColors[emotion] }}
              />
              <span className="text-sm text-text-secondary capitalize">
                {emotion}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionalTrendChart;