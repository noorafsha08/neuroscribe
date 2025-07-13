import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import NavigationSearchBar from '../../components/ui/NavigationSearchBar';
import EmotionalContextIndicator from '../../components/ui/EmotionalContextIndicator';
import TaskCard from './components/TaskCard';
import TaskFilters from './components/TaskFilters';
import TaskModal from './components/TaskModal';
import TaskKanban from './components/TaskKanban';
import AIRecommendations from './components/AIRecommendations';

const TasksPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list', 'kanban'
  const [kanbanGroupBy, setKanbanGroupBy] = useState('status'); // 'status', 'emotion', 'priority'
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate', 'priority', 'created', 'updated'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [showFilters, setShowFilters] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentEmotionalState, setCurrentEmotionalState] = useState('neutral');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    status: [],
    priority: [],
    emotion: [],
    dateRange: [],
    category: []
  });

  // Mock tasks data
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: "Complete quarterly report",
        description: "Finish the Q4 financial analysis and prepare presentation slides for the board meeting next week.",
        priority: "high",
        status: "in-progress",
        category: "work",
        dueDate: "2025-01-15",
        emotionalContext: "focused",
        progress: 65,
        createdAt: "2025-01-10T09:00:00Z",
        updatedAt: "2025-01-13T14:30:00Z",
        subtasks: [
          { id: 101, title: "Gather financial data", completed: true },
          { id: 102, title: "Create charts and graphs", completed: true },
          { id: 103, title: "Write executive summary", completed: false },
          { id: 104, title: "Prepare presentation", completed: false }
        ]
      },
      {
        id: 2,
        title: "Plan weekend hiking trip",
        description: "Research trails, check weather, and pack gear for the mountain hiking adventure.",
        priority: "medium",
        status: "pending",
        category: "personal",
        dueDate: "2025-01-18",
        emotionalContext: "energized",
        createdAt: "2025-01-12T16:45:00Z",
        updatedAt: "2025-01-12T16:45:00Z",
        subtasks: [
          { id: 201, title: "Check weather forecast", completed: false },
          { id: 202, title: "Pack hiking gear", completed: false }
        ]
      },
      {
        id: 3,
        title: "Morning meditation practice",
        description: "Daily 15-minute mindfulness meditation to start the day with clarity and focus.",
        priority: "low",
        status: "completed",
        category: "health",
        dueDate: "2025-01-13",
        emotionalContext: "calm",
        createdAt: "2025-01-13T06:00:00Z",
        updatedAt: "2025-01-13T06:15:00Z",
        subtasks: []
      },
      {
        id: 4,
        title: "Learn React Native basics",
        description: "Complete the first three modules of the React Native course and build a simple mobile app.",
        priority: "medium",
        status: "pending",
        category: "learning",
        dueDate: "2025-01-20",
        emotionalContext: "creative",
        createdAt: "2025-01-11T20:00:00Z",
        updatedAt: "2025-01-11T20:00:00Z",
        subtasks: [
          { id: 301, title: "Set up development environment", completed: false },
          { id: 302, title: "Complete Module 1", completed: false },
          { id: 303, title: "Complete Module 2", completed: false }
        ]
      },
      {
        id: 5,
        title: "Call mom for birthday planning",
        description: "Discuss plans for mom\'s surprise birthday party next month and coordinate with siblings.",
        priority: "high",
        status: "pending",
        category: "personal",
        dueDate: "2025-01-14",
        emotionalContext: "neutral",
        createdAt: "2025-01-12T10:30:00Z",
        updatedAt: "2025-01-12T10:30:00Z",
        subtasks: []
      },
      {
        id: 6,
        title: "Fix kitchen cabinet door",
        description: "The cabinet door hinge is loose and needs to be tightened or replaced.",
        priority: "low",
        status: "pending",
        category: "home",
        dueDate: "2025-01-16",
        emotionalContext: "neutral",
        createdAt: "2025-01-10T15:20:00Z",
        updatedAt: "2025-01-10T15:20:00Z",
        subtasks: []
      },
      {
        id: 7,
        title: "Review investment portfolio",
        description: "Quarterly review of investment performance and rebalancing if needed.",
        priority: "medium",
        status: "pending",
        category: "finance",
        dueDate: "2025-01-12",
        emotionalContext: "stressed",
        createdAt: "2025-01-08T11:00:00Z",
        updatedAt: "2025-01-08T11:00:00Z",
        subtasks: []
      },
      {
        id: 8,
        title: "Write blog post about productivity",
        description: "Share insights about emotional context in task management and productivity tips.",
        priority: "low",
        status: "in-progress",
        category: "creative",
        dueDate: "2025-01-25",
        emotionalContext: "creative",
        progress: 30,
        createdAt: "2025-01-09T14:00:00Z",
        updatedAt: "2025-01-13T16:00:00Z",
        subtasks: [
          { id: 401, title: "Research topic", completed: true },
          { id: 402, title: "Create outline", completed: false },
          { id: 403, title: "Write first draft", completed: false }
        ]
      }
    ];

    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
  }, []);

  // Simulate emotional state detection
  useEffect(() => {
    const states = ['calm', 'focused', 'energized', 'stressed', 'creative', 'neutral'];
    const randomState = states[Math.floor(Math.random() * states.length)];
    setCurrentEmotionalState(randomState);
  }, []);

  // Filter and search tasks
  useEffect(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      );
    }

    // Apply status filters
    if (activeFilters.status.length > 0) {
      filtered = filtered.filter(task => activeFilters.status.includes(task.status));
    }

    // Apply priority filters
    if (activeFilters.priority.length > 0) {
      filtered = filtered.filter(task => activeFilters.priority.includes(task.priority));
    }

    // Apply emotion filters
    if (activeFilters.emotion.length > 0) {
      filtered = filtered.filter(task => activeFilters.emotion.includes(task.emotionalContext));
    }

    // Apply date range filters
    if (activeFilters.dateRange.length > 0) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const thisWeekEnd = new Date(today);
      thisWeekEnd.setDate(thisWeekEnd.getDate() + (7 - today.getDay()));
      const nextWeekEnd = new Date(thisWeekEnd);
      nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);

      filtered = filtered.filter(task => {
        if (!task.dueDate) return activeFilters.dateRange.includes('no-date');
        
        const dueDate = new Date(task.dueDate);
        
        return activeFilters.dateRange.some(range => {
          switch (range) {
            case 'today':
              return dueDate.toDateString() === today.toDateString();
            case 'tomorrow':
              return dueDate.toDateString() === tomorrow.toDateString();
            case 'this-week':
              return dueDate >= today && dueDate <= thisWeekEnd;
            case 'next-week':
              return dueDate > thisWeekEnd && dueDate <= nextWeekEnd;
            case 'overdue':
              return dueDate < today && task.status !== 'completed';
            case 'no-date':
              return !task.dueDate;
            default:
              return false;
          }
        });
      });
    }

    // Apply category filters
    if (activeFilters.category.length > 0) {
      filtered = filtered.filter(task => activeFilters.category.includes(task.category));
    }

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'dueDate':
          aValue = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
          bValue = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          aValue = priorityOrder[a.priority];
          bValue = priorityOrder[b.priority];
          break;
        case 'created':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'updated':
          aValue = new Date(a.updatedAt);
          bValue = new Date(b.updatedAt);
          break;
        default:
          aValue = a.title;
          bValue = b.title;
      }

      if (sortOrder === 'desc') {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      }
    });

    setFilteredTasks(filtered);
  }, [tasks, searchQuery, activeFilters, sortBy, sortOrder]);

  const handleSearch = (query, emotionalFilters = []) => {
    setSearchQuery(query);
    if (emotionalFilters.length > 0) {
      setActiveFilters(prev => ({
        ...prev,
        emotion: emotionalFilters
      }));
    }
  };

  const handleFiltersChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleTaskCreate = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleTaskSave = (taskData) => {
    if (editingTask) {
      // Update existing task
      setTasks(prev => prev.map(task => 
        task.id === editingTask.id ? taskData : task
      ));
    } else {
      // Create new task
      setTasks(prev => [...prev, taskData]);
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const handleTaskToggleComplete = (taskId, completed) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const updatedTask = {
        ...task,
        status: completed ? 'completed' : 'pending',
        updatedAt: new Date().toISOString()
      };
      handleTaskUpdate(updatedTask);
    }
  };

  const getTaskCounts = () => {
    return {
      pending: tasks.filter(t => t.status === 'pending').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length
    };
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filterArray) => {
      return count + (filterArray?.length || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      <div className="lg:ml-64 pb-16 lg:pb-0">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                Tasks
              </h1>
              <p className="text-text-secondary mt-1">
                Manage your tasks with emotional context awareness
              </p>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <EmotionalContextIndicator 
                position="header" 
                showLabel={true}
                showDetails={true}
              />
              <Button
                variant="default"
                iconName="Plus"
                onClick={handleTaskCreate}
              >
                New Task
              </Button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <NavigationSearchBar
                onSearch={handleSearch}
                placeholder="Search tasks..."
              />
            </div>

            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="hidden lg:flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="List"
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
                <Button
                  variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                  size="sm"
                  iconName="Columns"
                  onClick={() => setViewMode('kanban')}
                >
                  Board
                </Button>
              </div>

              {/* Sort Options */}
              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order);
                  }}
                  className="appearance-none bg-muted border border-border rounded-lg px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="dueDate-asc">Due Date ↑</option>
                  <option value="dueDate-desc">Due Date ↓</option>
                  <option value="priority-desc">Priority ↓</option>
                  <option value="priority-asc">Priority ↑</option>
                  <option value="created-desc">Newest</option>
                  <option value="created-asc">Oldest</option>
                  <option value="updated-desc">Recently Updated</option>
                </select>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
                />
              </div>

              {/* Filter Button */}
              <div className="relative">
                <Button
                  variant="outline"
                  iconName="Filter"
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative"
                >
                  Filter
                  {getActiveFilterCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </Button>

                <TaskFilters
                  isOpen={showFilters}
                  onClose={() => setShowFilters(false)}
                  filters={activeFilters}
                  onFiltersChange={handleFiltersChange}
                  taskCounts={getTaskCounts()}
                />
              </div>
            </div>
          </div>

          {/* AI Recommendations */}
          <AIRecommendations
            currentEmotionalState={currentEmotionalState}
            tasks={tasks}
            onTaskCreate={handleTaskCreate}
            onTaskUpdate={handleTaskUpdate}
          />

          {/* Task Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Tasks', value: tasks.length, color: 'text-text-primary' },
              { label: 'Pending', value: getTaskCounts().pending, color: 'text-warning' },
              { label: 'In Progress', value: getTaskCounts().inProgress, color: 'text-primary' },
              { label: 'Completed', value: getTaskCounts().completed, color: 'text-success' }
            ].map((stat, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl font-heading font-bold text-text-primary">
                  {stat.value}
                </div>
                <div className={`text-sm ${stat.color}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tasks Content */}
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="CheckSquare" size={48} className="mx-auto text-text-secondary opacity-50 mb-4" />
                  <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                    {searchQuery || getActiveFilterCount() > 0 ? 'No tasks found' : 'No tasks yet'}
                  </h3>
                  <p className="text-text-secondary mb-6">
                    {searchQuery || getActiveFilterCount() > 0 
                      ? 'Try adjusting your search or filters' :'Create your first task to get started with mindful productivity'
                    }
                  </p>
                  {!searchQuery && getActiveFilterCount() === 0 && (
                    <Button
                      variant="default"
                      iconName="Plus"
                      onClick={handleTaskCreate}
                    >
                      Create Your First Task
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid gap-4">
                  {filteredTasks.map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleTaskEdit}
                      onDelete={handleTaskDelete}
                      onToggleComplete={handleTaskToggleComplete}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <TaskKanban
                tasks={filteredTasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskEdit={handleTaskEdit}
                onTaskDelete={handleTaskDelete}
                onTaskCreate={handleTaskCreate}
                viewMode={kanbanGroupBy}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile FAB */}
      <div className="lg:hidden fixed bottom-20 right-4 z-30">
        <Button
          variant="default"
          size="icon"
          iconName="Plus"
          onClick={handleTaskCreate}
          className="w-14 h-14 rounded-full shadow-soft-lg"
        />
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        task={editingTask}
        onSave={handleTaskSave}
        currentEmotionalState={currentEmotionalState}
      />

      <BottomTabNavigation />
    </div>
  );
};

export default TasksPage;