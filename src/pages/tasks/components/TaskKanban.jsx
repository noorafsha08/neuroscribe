import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import TaskCard from './TaskCard';

const TaskKanban = ({ 
  tasks, 
  onTaskUpdate, 
  onTaskEdit, 
  onTaskDelete, 
  onTaskCreate,
  viewMode = 'status' // 'status', 'emotion', 'priority'
}) => {
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const getColumns = () => {
    switch (viewMode) {
      case 'status':
        return [
          { id: 'pending', title: 'Pending', color: 'border-muted', bgColor: 'bg-muted/20' },
          { id: 'in-progress', title: 'In Progress', color: 'border-primary', bgColor: 'bg-primary/10' },
          { id: 'completed', title: 'Completed', color: 'border-success', bgColor: 'bg-success/10' }
        ];
      case 'emotion':
        return [
          { id: 'calm', title: 'Calm', color: 'border-calm', bgColor: 'bg-calm/10' },
          { id: 'focused', title: 'Focused', color: 'border-focused', bgColor: 'bg-focused/10' },
          { id: 'energized', title: 'Energized', color: 'border-energized', bgColor: 'bg-energized/10' },
          { id: 'stressed', title: 'Stressed', color: 'border-stressed', bgColor: 'bg-stressed/10' },
          { id: 'creative', title: 'Creative', color: 'border-secondary', bgColor: 'bg-secondary/10' },
          { id: 'neutral', title: 'Neutral', color: 'border-neutral', bgColor: 'bg-neutral/10' }
        ];
      case 'priority':
        return [
          { id: 'high', title: 'High Priority', color: 'border-error', bgColor: 'bg-error/10' },
          { id: 'medium', title: 'Medium Priority', color: 'border-warning', bgColor: 'bg-warning/10' },
          { id: 'low', title: 'Low Priority', color: 'border-success', bgColor: 'bg-success/10' }
        ];
      default:
        return [];
    }
  };

  const getTasksForColumn = (columnId) => {
    switch (viewMode) {
      case 'status':
        return tasks.filter(task => task.status === columnId);
      case 'emotion':
        return tasks.filter(task => task.emotionalContext === columnId);
      case 'priority':
        return tasks.filter(task => task.priority === columnId);
      default:
        return [];
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (draggedTask && draggedTask[viewMode] !== columnId) {
      const updatedTask = {
        ...draggedTask,
        [viewMode]: columnId,
        updatedAt: new Date().toISOString()
      };
      
      onTaskUpdate(updatedTask);
    }
    
    setDraggedTask(null);
  };

  const handleTaskToggleComplete = (taskId, completed) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = {
        ...task,
        status: completed ? 'completed' : 'pending',
        updatedAt: new Date().toISOString()
      };
      onTaskUpdate(updatedTask);
    }
  };

  const columns = getColumns();

  return (
    <div className="h-full flex flex-col">
      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto">
        <div className="flex space-x-6 h-full min-w-max p-6">
          {columns.map(column => {
            const columnTasks = getTasksForColumn(column.id);
            const isDragOver = dragOverColumn === column.id;
            
            return (
              <div
                key={column.id}
                className={`
                  flex flex-col w-80 bg-card border-2 rounded-lg transition-all duration-200
                  ${isDragOver ? `${column.color} ${column.bgColor}` : 'border-border'}
                `}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-heading font-semibold text-text-primary">
                      {column.title}
                    </h3>
                    <span className="bg-muted text-text-secondary text-xs px-2 py-1 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                  
                  {viewMode === 'status' && column.id === 'pending' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Plus"
                      onClick={onTaskCreate}
                      className="h-8 w-8"
                    />
                  )}
                </div>

                {/* Column Content */}
                <div className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[200px]">
                  {columnTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-text-secondary">
                      <Icon name="Package" size={32} className="mb-2 opacity-50" />
                      <p className="text-sm">No tasks</p>
                    </div>
                  ) : (
                    columnTasks.map(task => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        className="cursor-move"
                      >
                        <TaskCard
                          task={task}
                          onEdit={onTaskEdit}
                          onDelete={onTaskDelete}
                          onToggleComplete={handleTaskToggleComplete}
                          isDragging={draggedTask?.id === task.id}
                        />
                      </div>
                    ))
                  )}
                </div>

                {/* Quick Add for Status Columns */}
                {viewMode === 'status' && column.id !== 'completed' && (
                  <div className="p-4 border-t border-border">
                    <Button
                      variant="ghost"
                      fullWidth
                      iconName="Plus"
                      onClick={onTaskCreate}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      Add Task
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-text-primary">Group by:</span>
          <div className="flex space-x-1">
            {[
              { id: 'status', label: 'Status', icon: 'CheckSquare' },
              { id: 'emotion', label: 'Emotion', icon: 'Heart' },
              { id: 'priority', label: 'Priority', icon: 'AlertCircle' }
            ].map(mode => (
              <Button
                key={mode.id}
                variant={viewMode === mode.id ? 'default' : 'ghost'}
                size="sm"
                iconName={mode.icon}
                onClick={() => {}} // This would be handled by parent component
              >
                {mode.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskKanban;