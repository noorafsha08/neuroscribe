import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskCard = ({ 
  task, 
  onStatusChange, 
  onEdit, 
  onDelete, 
  onToggleComplete,
  isDragging = false,
  dragHandleProps = {}
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const getEmotionalConfig = (emotion) => {
    const configs = {
      calm: { color: 'text-calm', bgColor: 'bg-calm/10', icon: 'Waves' },
      focused: { color: 'text-focused', bgColor: 'bg-focused/10', icon: 'Target' },
      energized: { color: 'text-energized', bgColor: 'bg-energized/10', icon: 'Zap' },
      stressed: { color: 'text-stressed', bgColor: 'bg-stressed/10', icon: 'AlertTriangle' },
      creative: { color: 'text-secondary', bgColor: 'bg-secondary/10', icon: 'Lightbulb' },
      neutral: { color: 'text-neutral', bgColor: 'bg-neutral/10', icon: 'Circle' }
    };
    return configs[emotion] || configs.neutral;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { color: 'text-error', bgColor: 'bg-error/10', icon: 'AlertCircle' },
      medium: { color: 'text-warning', bgColor: 'bg-warning/10', icon: 'Clock' },
      low: { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle' }
    };
    return configs[priority] || configs.medium;
  };

  const formatDate = (date) => {
    const today = new Date();
    const taskDate = new Date(date);
    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays === -1) return 'Yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days ago`;
    if (diffDays <= 7) return `In ${diffDays} days`;
    
    return taskDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: taskDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  };

  const isOverdue = () => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);
    return taskDate < today && task.status !== 'completed';
  };

  const emotionalConfig = getEmotionalConfig(task.emotionalContext);
  const priorityConfig = getPriorityConfig(task.priority);

  return (
    <div 
      className={`
        bg-card border border-border rounded-lg p-4 shadow-soft transition-gentle
        ${isDragging ? 'opacity-50 rotate-2' : 'hover:shadow-soft-lg'}
        ${task.status === 'completed' ? 'opacity-75' : ''}
        ${isOverdue() ? 'border-error/30' : ''}
      `}
      {...dragHandleProps}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <Checkbox
            checked={task.status === 'completed'}
            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            className="mt-0.5"
          />
          <div className="flex-1 min-w-0">
            <h3 className={`
              font-medium text-text-primary line-clamp-2
              ${task.status === 'completed' ? 'line-through opacity-60' : ''}
            `}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            iconName="MoreHorizontal"
            onClick={() => setShowMenu(!showMenu)}
            className="h-8 w-8"
          />
          
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-8 bg-popover border border-border rounded-lg shadow-soft-lg z-20 py-1 min-w-[120px]">
                <button
                  onClick={() => {
                    onEdit(task);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-gentle flex items-center space-x-2"
                >
                  <Icon name="Edit" size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-gentle flex items-center space-x-2 text-error"
                >
                  <Icon name="Trash2" size={14} />
                  <span>Delete</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Tags and Metadata */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Priority Badge */}
        <div className={`
          inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs
          ${priorityConfig.bgColor} ${priorityConfig.color}
        `}>
          <Icon name={priorityConfig.icon} size={12} />
          <span className="capitalize">{task.priority}</span>
        </div>

        {/* Emotional Context Badge */}
        <div className={`
          inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs
          ${emotionalConfig.bgColor} ${emotionalConfig.color}
        `}>
          <Icon name={emotionalConfig.icon} size={12} />
          <span className="capitalize">{task.emotionalContext}</span>
        </div>

        {/* Category Tag */}
        {task.category && (
          <span className="inline-flex items-center px-2 py-1 bg-muted text-text-secondary rounded-full text-xs">
            {task.category}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center space-x-4">
          {/* Due Date */}
          <div className={`
            flex items-center space-x-1
            ${isOverdue() ? 'text-error' : ''}
          `}>
            <Icon name="Calendar" size={12} />
            <span>{formatDate(task.dueDate)}</span>
          </div>

          {/* Subtasks Progress */}
          {task.subtasks && task.subtasks.length > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="CheckSquare" size={12} />
              <span>
                {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}
              </span>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${task.status === 'completed' ? 'bg-success/10 text-success' : 
            task.status === 'in-progress'? 'bg-primary/10 text-primary' : 'bg-muted text-text-secondary'}
        `}>
          {task.status === 'completed' ? 'Done' : 
           task.status === 'in-progress' ? 'In Progress' : 'Pending'}
        </div>
      </div>

      {/* Progress Bar for In-Progress Tasks */}
      {task.status === 'in-progress' && task.progress !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-text-secondary mb-1">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;