import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskModal = ({ 
  isOpen, 
  onClose, 
  task = null, 
  onSave,
  currentEmotionalState = 'neutral'
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: '',
    emotionalContext: currentEmotionalState,
    subtasks: [],
    status: 'pending'
  });
  const [newSubtask, setNewSubtask] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        category: task.category || '',
        dueDate: task.dueDate || '',
        emotionalContext: task.emotionalContext || currentEmotionalState,
        subtasks: task.subtasks || [],
        status: task.status || 'pending'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: '',
        dueDate: '',
        emotionalContext: currentEmotionalState,
        subtasks: [],
        status: 'pending'
      });
    }
    setErrors({});
  }, [task, isOpen, currentEmotionalState]);

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' }
  ];

  const emotionOptions = [
    { value: 'calm', label: 'Calm' },
    { value: 'focused', label: 'Focused' },
    { value: 'energized', label: 'Energized' },
    { value: 'stressed', label: 'Stressed' },
    { value: 'creative', label: 'Creative' },
    { value: 'neutral', label: 'Neutral' }
  ];

  const categoryOptions = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'health', label: 'Health & Wellness' },
    { value: 'learning', label: 'Learning' },
    { value: 'creative', label: 'Creative Projects' },
    { value: 'social', label: 'Social' },
    { value: 'finance', label: 'Finance' },
    { value: 'home', label: 'Home & Family' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setFormData(prev => ({
        ...prev,
        subtasks: [
          ...prev.subtasks,
          {
            id: Date.now(),
            title: newSubtask.trim(),
            completed: false
          }
        ]
      }));
      setNewSubtask('');
    }
  };

  const handleRemoveSubtask = (subtaskId) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.filter(st => st.id !== subtaskId)
    }));
  };

  const handleToggleSubtask = (subtaskId) => {
    setFormData(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(st => 
        st.id === subtaskId ? { ...st, completed: !st.completed } : st
      )
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const taskData = {
        ...formData,
        id: task?.id || Date.now(),
        createdAt: task?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      onSave(taskData);
      onClose();
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-surface border border-border rounded-lg shadow-soft-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <Input
              label="Task Title"
              type="text"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={errors.title}
              required
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Description
              </label>
              <textarea
                placeholder="Add task description..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Priority"
                options={priorityOptions}
                value={formData.priority}
                onChange={(value) => handleInputChange('priority', value)}
              />
              
              {task && (
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(value) => handleInputChange('status', value)}
                />
              )}
            </div>

            {/* Category and Emotional Context */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                value={formData.category}
                onChange={(value) => handleInputChange('category', value)}
                placeholder="Select category..."
              />
              
              <Select
                label="Emotional Context"
                options={emotionOptions}
                value={formData.emotionalContext}
                onChange={(value) => handleInputChange('emotionalContext', value)}
                description="Current emotional state when creating this task"
              />
            </div>

            {/* Due Date */}
            <Input
              label="Due Date"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              error={errors.dueDate}
              min={getTodayDate()}
            />

            {/* Subtasks */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Subtasks
              </label>
              
              {/* Add Subtask */}
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  placeholder="Add a subtask..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                  className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <Button
                  type="button"
                  variant="outline"
                  iconName="Plus"
                  onClick={handleAddSubtask}
                  disabled={!newSubtask.trim()}
                >
                  Add
                </Button>
              </div>

              {/* Subtask List */}
              {formData.subtasks.length > 0 && (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {formData.subtasks.map(subtask => (
                    <div key={subtask.id} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                      <Checkbox
                        checked={subtask.completed}
                        onChange={() => handleToggleSubtask(subtask.id)}
                      />
                      <span className={`flex-1 text-sm ${subtask.completed ? 'line-through opacity-60' : ''}`}>
                        {subtask.title}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        iconName="X"
                        onClick={() => handleRemoveSubtask(subtask.id)}
                        className="h-6 w-6"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                iconName="Save"
              >
                {task ? 'Update Task' : 'Create Task'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TaskModal;