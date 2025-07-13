import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskFilters = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  taskCounts = {}
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const statusOptions = [
    { id: 'pending', label: 'Pending', count: taskCounts.pending || 0 },
    { id: 'in-progress', label: 'In Progress', count: taskCounts.inProgress || 0 },
    { id: 'completed', label: 'Completed', count: taskCounts.completed || 0 }
  ];

  const priorityOptions = [
    { id: 'high', label: 'High Priority', color: 'text-error' },
    { id: 'medium', label: 'Medium Priority', color: 'text-warning' },
    { id: 'low', label: 'Low Priority', color: 'text-success' }
  ];

  const emotionOptions = [
    { id: 'calm', label: 'Calm', color: 'text-calm', icon: 'Waves' },
    { id: 'focused', label: 'Focused', color: 'text-focused', icon: 'Target' },
    { id: 'energized', label: 'Energized', color: 'text-energized', icon: 'Zap' },
    { id: 'stressed', label: 'Stressed', color: 'text-stressed', icon: 'AlertTriangle' },
    { id: 'creative', label: 'Creative', color: 'text-secondary', icon: 'Lightbulb' },
    { id: 'neutral', label: 'Neutral', color: 'text-neutral', icon: 'Circle' }
  ];

  const dateRangeOptions = [
    { id: 'today', label: 'Due Today' },
    { id: 'tomorrow', label: 'Due Tomorrow' },
    { id: 'this-week', label: 'This Week' },
    { id: 'next-week', label: 'Next Week' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'no-date', label: 'No Due Date' }
  ];

  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...localFilters };
    
    if (checked) {
      newFilters[category] = [...(newFilters[category] || []), value];
    } else {
      newFilters[category] = (newFilters[category] || []).filter(item => item !== value);
    }
    
    setLocalFilters(newFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      status: [],
      priority: [],
      emotion: [],
      dateRange: [],
      category: []
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters).reduce((count, filterArray) => {
      return count + (filterArray?.length || 0);
    }, 0);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      
      {/* Filter Panel */}
      <div className={`
        fixed lg:absolute top-0 right-0 h-full lg:h-auto lg:top-12 lg:right-0
        w-full lg:w-80 bg-surface border-l lg:border border-border shadow-soft-lg z-50
        lg:rounded-lg overflow-y-auto
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Filters
            </h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-4 space-y-6">
          {/* Status Filters */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Status</h4>
            <div className="space-y-2">
              {statusOptions.map(option => (
                <div key={option.id} className="flex items-center justify-between">
                  <Checkbox
                    label={option.label}
                    checked={(localFilters.status || []).includes(option.id)}
                    onChange={(e) => handleFilterChange('status', option.id, e.target.checked)}
                  />
                  <span className="text-xs text-text-secondary bg-muted px-2 py-1 rounded-full">
                    {option.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Filters */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Priority</h4>
            <div className="space-y-2">
              {priorityOptions.map(option => (
                <Checkbox
                  key={option.id}
                  label={
                    <span className={option.color}>
                      {option.label}
                    </span>
                  }
                  checked={(localFilters.priority || []).includes(option.id)}
                  onChange={(e) => handleFilterChange('priority', option.id, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Emotional Context Filters */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Emotional Context</h4>
            <div className="space-y-2">
              {emotionOptions.map(option => (
                <Checkbox
                  key={option.id}
                  label={
                    <div className="flex items-center space-x-2">
                      <Icon name={option.icon} size={14} className={option.color} />
                      <span className={option.color}>{option.label}</span>
                    </div>
                  }
                  checked={(localFilters.emotion || []).includes(option.id)}
                  onChange={(e) => handleFilterChange('emotion', option.id, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Date Range Filters */}
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Due Date</h4>
            <div className="space-y-2">
              {dateRangeOptions.map(option => (
                <Checkbox
                  key={option.id}
                  label={option.label}
                  checked={(localFilters.dateRange || []).includes(option.id)}
                  onChange={(e) => handleFilterChange('dateRange', option.id, e.target.checked)}
                />
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t border-border space-y-3">
            <Button
              variant="outline"
              fullWidth
              onClick={handleClearFilters}
              iconName="RotateCcw"
            >
              Clear All Filters
            </Button>
            
            <Button
              variant="default"
              fullWidth
              onClick={handleApplyFilters}
              iconName="Check"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskFilters;