import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const TimeRangeSelector = ({ 
  selectedRange, 
  onRangeChange, 
  customDateRange,
  onCustomDateChange,
  className = "" 
}) => {
  const timeRanges = [
    { 
      id: 'daily', 
      label: 'Daily', 
      icon: 'Calendar',
      description: 'Last 7 days'
    },
    { 
      id: 'weekly', 
      label: 'Weekly', 
      icon: 'CalendarDays',
      description: 'Last 12 weeks'
    },
    { 
      id: 'monthly', 
      label: 'Monthly', 
      icon: 'CalendarRange',
      description: 'Last 6 months'
    },
    { 
      id: 'custom', 
      label: 'Custom', 
      icon: 'Settings',
      description: 'Select date range'
    }
  ];

  const handleRangeSelect = (rangeId) => {
    onRangeChange(rangeId);
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const handleCustomDateChange = (field, value) => {
    const newRange = { ...customDateRange };
    newRange[field] = new Date(value);
    onCustomDateChange(newRange);
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Time Range
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Select the period for emotional analysis
        </p>
      </div>

      <div className="p-4">
        {/* Quick Range Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => handleRangeSelect(range.id)}
              className={`
                p-3 rounded-lg border transition-gentle text-left
                ${selectedRange === range.id
                  ? 'border-primary bg-primary/10 text-primary' :'border-border bg-background hover:bg-muted text-text-secondary hover:text-text-primary'
                }
              `}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Icon 
                  name={range.icon} 
                  size={16} 
                  className={selectedRange === range.id ? 'text-primary' : 'text-text-secondary'} 
                />
                <span className="font-medium text-sm">
                  {range.label}
                </span>
              </div>
              <p className="text-xs opacity-80">
                {range.description}
              </p>
            </button>
          ))}
        </div>

        {/* Custom Date Range Inputs */}
        {selectedRange === 'custom' && (
          <div className="bg-muted rounded-lg p-4 space-y-4">
            <h4 className="font-medium text-text-primary mb-3">
              Custom Date Range
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formatDateForInput(customDateRange?.startDate)}
                    onChange={(e) => handleCustomDateChange('startDate', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    max={formatDateForInput(new Date())}
                  />
                  <Icon 
                    name="Calendar" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formatDateForInput(customDateRange?.endDate)}
                    onChange={(e) => handleCustomDateChange('endDate', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    min={formatDateForInput(customDateRange?.startDate)}
                    max={formatDateForInput(new Date())}
                  />
                  <Icon 
                    name="Calendar" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-text-secondary">
                Maximum range: 1 year
              </p>
              <Button
                size="sm"
                variant="outline"
                iconName="RotateCcw"
                onClick={() => {
                  const today = new Date();
                  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                  onCustomDateChange({
                    startDate: lastMonth,
                    endDate: today
                  });
                }}
              >
                Reset to Last Month
              </Button>
            </div>
          </div>
        )}

        {/* Quick Stats for Selected Range */}
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Selected Period:</span>
            <span className="font-medium text-text-primary">
              {selectedRange === 'daily' && 'Last 7 days'}
              {selectedRange === 'weekly' && 'Last 12 weeks'}
              {selectedRange === 'monthly' && 'Last 6 months'}
              {selectedRange === 'custom' && customDateRange?.startDate && customDateRange?.endDate && 
                `${customDateRange.startDate.toLocaleDateString()} - ${customDateRange.endDate.toLocaleDateString()}`
              }
              {selectedRange === 'custom' && (!customDateRange?.startDate || !customDateRange?.endDate) && 
                'Select start and end dates'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeRangeSelector;