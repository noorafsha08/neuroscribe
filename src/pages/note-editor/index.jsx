import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import EmotionalAnalysisPanel from './components/EmotionalAnalysisPanel';
import FormattingToolbar from './components/FormattingToolbar';
import AIWellnessSuggestions from './components/AIWellnessSuggestions';
import NoteMetadata from './components/NoteMetadata';
import AutoSaveIndicator from './components/AutoSaveIndicator';

const NoteEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const textareaRef = useRef(null);
  
  // Editor state
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  
  // Panel visibility states
  const [showEmotionalAnalysis, setShowEmotionalAnalysis] = useState(true);
  const [showFormattingToolbar, setShowFormattingToolbar] = useState(false);
  const [showMetadata, setShowMetadata] = useState(false);
  const [showWellnessSuggestions, setShowWellnessSuggestions] = useState(false);
  
  // Emotional state
  const [currentEmotion, setCurrentEmotion] = useState({
    primary: 'neutral',
    intensity: 0.5,
    confidence: 0.8
  });

  // Initialize with existing note data if editing
  useEffect(() => {
    const noteData = location.state?.note;
    if (noteData) {
      setTitle(noteData.title || '');
      setContent(noteData.content || '');
      setTags(noteData.tags || []);
    }
  }, [location.state]);

  // Update word count when content changes
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'b':
            e.preventDefault();
            handleFormat('bold');
            break;
          case 'i':
            e.preventDefault();
            handleFormat('italic');
            break;
          case 'k':
            e.preventDefault();
            handleFormat('link');
            break;
          case 'Enter':
            e.preventDefault();
            setIsFullscreen(!isFullscreen);
            break;
        }
      }
      
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  // Auto-focus textarea on mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    // Mock save operation
    const noteData = {
      id: Date.now(),
      title: title || 'Untitled Note',
      content,
      tags,
      createdAt: new Date(),
      modifiedAt: new Date(),
      wordCount,
      emotionalContext: currentEmotion
    };
    
    console.log('Saving note:', noteData);
    // In real app, this would be an API call
    return Promise.resolve(noteData);
  };

  const handleFormat = (formatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = selectedText;
    let newContent = content;

    switch (formatType) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'strikethrough':
        formattedText = `~~${selectedText}~~`;
        break;
      case 'bulletList':
        formattedText = `\n• ${selectedText}`;
        break;
      case 'numberedList':
        formattedText = `\n1. ${selectedText}`;
        break;
      case 'quote':
        formattedText = `\n> ${selectedText}`;
        break;
      case 'code':
        formattedText = `\`${selectedText}\``;
        break;
      case 'h1':
        formattedText = `\n# ${selectedText}`;
        break;
      case 'h2':
        formattedText = `\n## ${selectedText}`;
        break;
      case 'h3':
        formattedText = `\n### ${selectedText}`;
        break;
      default:
        return;
    }

    newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const handleBack = () => {
    if (content.trim() || title.trim()) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    navigate('/notes');
  };

  const handleEmotionUpdate = (emotion) => {
    setCurrentEmotion(emotion);
    
    // Show wellness suggestions for negative emotions
    if (emotion.primary === 'stressed' || emotion.intensity > 0.7) {
      setShowWellnessSuggestions(true);
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      {!isFullscreen && <ContextualHeader />}
      
      {/* Auto-save Indicator */}
      <AutoSaveIndicator content={content} onSave={handleSave} />

      {/* Main Editor Container */}
      <div className={`${!isFullscreen ? 'lg:ml-64 pt-14' : ''} ${isFullscreen ? 'p-0' : 'pb-16 lg:pb-4'}`}>
        <div className="h-full flex flex-col">
          {/* Fullscreen Header */}
          {isFullscreen && (
            <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Minimize2"
                  onClick={() => setIsFullscreen(false)}
                  title="Exit Fullscreen (Esc)"
                />
                <div className="text-sm text-text-secondary">
                  {wordCount} words
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Save"
                  onClick={handleSave}
                  title="Save (Ctrl+S)"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={handleBack}
                />
              </div>
            </div>
          )}

          {/* Title Input */}
          <div className="p-4 border-b border-border bg-surface">
            <input
              type="text"
              placeholder="Note title..."
              value={title}
              onChange={handleTitleChange}
              className="w-full text-xl lg:text-2xl font-heading font-semibold bg-transparent border-none outline-none text-text-primary placeholder-text-secondary"
            />
          </div>

          {/* Editor Area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              placeholder="Start writing your thoughts...\n\nTip: Your emotional state will be analyzed in real-time to provide personalized wellness suggestions."
              className="w-full h-full min-h-[calc(100vh-200px)] p-4 lg:p-6 bg-transparent border-none outline-none resize-none text-text-primary placeholder-text-secondary leading-relaxed text-base lg:text-lg font-body"
              style={{ 
                fontFamily: "'Source Sans Pro', sans-serif",
                lineHeight: '1.7'
              }}
            />

            {/* Floating Action Buttons */}
            {!isFullscreen && (
              <>
                {/* Fullscreen Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Maximize2"
                  onClick={() => setIsFullscreen(true)}
                  className="fixed bottom-56 right-4 lg:bottom-40 lg:right-4 z-10 bg-surface shadow-soft-lg border border-border"
                  title="Fullscreen (Ctrl+Enter)"
                />

                {/* Quick Save */}
                <Button
                  variant="default"
                  iconName="Save"
                  onClick={handleSave}
                  className="fixed bottom-68 right-4 lg:bottom-52 lg:right-4 z-10 shadow-soft-lg"
                >
                  Save
                </Button>
              </>
            )}
          </div>

          {/* Bottom Status Bar */}
          {!isFullscreen && (
            <div className="flex items-center justify-between p-4 border-t border-border bg-surface text-sm text-text-secondary">
              <div className="flex items-center space-x-4">
                <span>{wordCount} words</span>
                <span>{content.length} characters</span>
                {tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Tag" size={14} />
                    <span>{tags.length} tags</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  currentEmotion.primary === 'calm' ? 'bg-calm' :
                  currentEmotion.primary === 'focused' ? 'bg-focused' :
                  currentEmotion.primary === 'energized' ? 'bg-energized' :
                  currentEmotion.primary === 'stressed'? 'bg-stressed' : 'bg-neutral'
                }`} />
                <span className="capitalize">{currentEmotion.primary}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Panels */}
      {!isFullscreen && (
        <>
          <EmotionalAnalysisPanel
            content={content}
            isVisible={showEmotionalAnalysis}
            onToggle={() => setShowEmotionalAnalysis(!showEmotionalAnalysis)}
          />
          
          <FormattingToolbar
            onFormat={handleFormat}
            isVisible={showFormattingToolbar}
            onToggle={() => setShowFormattingToolbar(!showFormattingToolbar)}
          />
          
          <NoteMetadata
            content={content}
            tags={tags}
            onTagsChange={setTags}
            isVisible={showMetadata}
            onToggle={() => setShowMetadata(!showMetadata)}
          />
        </>
      )}

      {/* AI Wellness Suggestions Modal */}
      <AIWellnessSuggestions
        emotionalState={currentEmotion}
        isVisible={showWellnessSuggestions}
        onClose={() => setShowWellnessSuggestions(false)}
      />

      {/* Bottom Navigation */}
      {!isFullscreen && <BottomTabNavigation />}
    </div>
  );
};

export default NoteEditor;