import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AutoSaveIndicator = ({ content, onSave }) => {
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'error', 'unsaved'
  const [lastSaved, setLastSaved] = useState(new Date());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save functionality with debouncing
  useEffect(() => {
    if (!content) return;

    setHasUnsavedChanges(true);
    setSaveStatus('unsaved');

    // Debounce auto-save for 2 seconds after user stops typing
    const timeoutId = setTimeout(() => {
      handleAutoSave();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [content]);

  const handleAutoSave = async () => {
    if (!hasUnsavedChanges) return;

    setSaveStatus('saving');
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock save operation
      if (onSave) {
        await onSave(content);
      }
      
      setSaveStatus('saved');
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error) {
      setSaveStatus('error');
      console.error('Auto-save failed:', error);
    }
  };

  const handleManualSave = async () => {
    await handleAutoSave();
  };

  const getStatusConfig = () => {
    switch (saveStatus) {
      case 'saving':
        return {
          icon: 'Loader2',
          text: 'Saving...',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          animate: 'animate-spin'
        };
      case 'saved':
        return {
          icon: 'Check',
          text: 'Saved',
          color: 'text-success',
          bgColor: 'bg-success/10',
          animate: ''
        };
      case 'error':
        return {
          icon: 'AlertCircle',
          text: 'Save failed',
          color: 'text-error',
          bgColor: 'bg-error/10',
          animate: ''
        };
      case 'unsaved':
        return {
          icon: 'Clock',
          text: 'Unsaved changes',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          animate: ''
        };
      default:
        return {
          icon: 'Save',
          text: 'Ready',
          color: 'text-text-secondary',
          bgColor: 'bg-muted',
          animate: ''
        };
    }
  };

  const formatLastSaved = () => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - lastSaved) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} min ago`;
    } else {
      return lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const config = getStatusConfig();

  return (
    <>
      {/* Mobile Save Indicator */}
      <div className="lg:hidden fixed top-16 right-4 z-10">
        <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${config.bgColor} border border-border/50 shadow-soft`}>
          <Icon 
            name={config.icon} 
            size={14} 
            className={`${config.color} ${config.animate}`} 
          />
          <span className={`text-xs font-medium ${config.color}`}>
            {config.text}
          </span>
        </div>
      </div>

      {/* Desktop Save Indicator */}
      <div className="hidden lg:block fixed top-16 right-4 z-10">
        <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${config.bgColor} border border-border/50 shadow-soft`}>
          <Icon 
            name={config.icon} 
            size={16} 
            className={`${config.color} ${config.animate}`} 
          />
          <div className="text-sm">
            <div className={`font-medium ${config.color}`}>
              {config.text}
            </div>
            {saveStatus === 'saved' && (
              <div className="text-xs text-text-secondary">
                Last saved {formatLastSaved()}
              </div>
            )}
          </div>
          
          {/* Manual Save Button */}
          {(saveStatus === 'unsaved' || saveStatus === 'error') && (
            <button
              onClick={handleManualSave}
              disabled={saveStatus === 'saving'}
              className="ml-2 px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-gentle disabled:opacity-50"
            >
              Save Now
            </button>
          )}
        </div>
      </div>

      {/* Keyboard Shortcut Hint */}
      {hasUnsavedChanges && (
        <div className="hidden lg:block fixed top-32 right-4 z-10">
          <div className="px-3 py-1 bg-muted border border-border rounded text-xs text-text-secondary">
            Press <kbd className="px-1 py-0.5 bg-background border border-border rounded text-xs">Ctrl+S</kbd> to save
          </div>
        </div>
      )}

      {/* Connection Status */}
      <div className="fixed bottom-4 left-4 z-10">
        <div className="flex items-center space-x-2 px-2 py-1 bg-surface border border-border rounded-full shadow-soft">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs text-text-secondary">Online</span>
        </div>
      </div>
    </>
  );
};

export default AutoSaveIndicator;