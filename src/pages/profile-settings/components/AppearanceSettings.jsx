import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AppearanceSettings = () => {
  const [theme, setTheme] = useState('system');
  const [fontSize, setFontSize] = useState('medium');
  const [compactMode, setCompactMode] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [colorScheme, setColorScheme] = useState('default');
  const [language, setLanguage] = useState('en');

  // Load saved preferences
  useEffect(() => {
    const savedTheme = localStorage.getItem('neuro-scribe-theme') || 'system';
    const savedFontSize = localStorage.getItem('neuro-scribe-font-size') || 'medium';
    const savedCompactMode = localStorage.getItem('neuro-scribe-compact-mode') === 'true';
    const savedAnimations = localStorage.getItem('neuro-scribe-animations') !== 'false';
    const savedColorScheme = localStorage.getItem('neuro-scribe-color-scheme') || 'default';
    const savedLanguage = localStorage.getItem('neuro-scribe-language') || 'en';

    setTheme(savedTheme);
    setFontSize(savedFontSize);
    setCompactMode(savedCompactMode);
    setAnimations(savedAnimations);
    setColorScheme(savedColorScheme);
    setLanguage(savedLanguage);
  }, []);

  const themeOptions = [
    {
      value: 'light',
      label: 'Light',
      description: 'Clean and bright interface',
      icon: 'Sun',
      preview: 'bg-white border-gray-200'
    },
    {
      value: 'dark',
      label: 'Dark',
      description: 'Easy on the eyes in low light',
      icon: 'Moon',
      preview: 'bg-gray-900 border-gray-700'
    },
    {
      value: 'system',
      label: 'System',
      description: 'Matches your device settings',
      icon: 'Monitor',
      preview: 'bg-gradient-to-r from-white to-gray-900 border-gray-400'
    }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small', size: 'text-sm' },
    { value: 'medium', label: 'Medium', size: 'text-base' },
    { value: 'large', label: 'Large', size: 'text-lg' },
    { value: 'extra-large', label: 'Extra Large', size: 'text-xl' }
  ];

  const colorSchemeOptions = [
    {
      value: 'default',
      label: 'Default Blue',
      primary: 'bg-blue-500',
      secondary: 'bg-purple-500'
    },
    {
      value: 'green',
      label: 'Nature Green',
      primary: 'bg-green-500',
      secondary: 'bg-teal-500'
    },
    {
      value: 'purple',
      label: 'Creative Purple',
      primary: 'bg-purple-500',
      secondary: 'bg-pink-500'
    },
    {
      value: 'orange',
      label: 'Energetic Orange',
      primary: 'bg-orange-500',
      secondary: 'bg-red-500'
    }
  ];

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'it', label: 'Italiano', flag: '🇮🇹' },
    { value: 'pt', label: 'Português', flag: '🇵🇹' },
    { value: 'zh', label: '中文', flag: '🇨🇳' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' }
  ];

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('neuro-scribe-theme', newTheme);
    // In real app, would apply theme changes
  };

  const handleFontSizeChange = (newSize) => {
    setFontSize(newSize);
    localStorage.setItem('neuro-scribe-font-size', newSize);
    // In real app, would apply font size changes
  };

  const handleCompactModeChange = (enabled) => {
    setCompactMode(enabled);
    localStorage.setItem('neuro-scribe-compact-mode', enabled.toString());
  };

  const handleAnimationsChange = (enabled) => {
    setAnimations(enabled);
    localStorage.setItem('neuro-scribe-animations', enabled.toString());
  };

  const handleColorSchemeChange = (scheme) => {
    setColorScheme(scheme);
    localStorage.setItem('neuro-scribe-color-scheme', scheme);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('neuro-scribe-language', lang);
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all appearance settings to defaults?')) {
      setTheme('system');
      setFontSize('medium');
      setCompactMode(false);
      setAnimations(true);
      setColorScheme('default');
      setLanguage('en');
      
      localStorage.removeItem('neuro-scribe-theme');
      localStorage.removeItem('neuro-scribe-font-size');
      localStorage.removeItem('neuro-scribe-compact-mode');
      localStorage.removeItem('neuro-scribe-animations');
      localStorage.removeItem('neuro-scribe-color-scheme');
      localStorage.removeItem('neuro-scribe-language');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Palette" size={20} className="text-primary" />
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Appearance & Language
            </h3>
          </div>
          <Button variant="outline" size="sm" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Customize the look and feel of NeuroScribe
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Theme Selection */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Paintbrush" size={16} className="text-text-secondary" />
            <span>Theme</span>
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {themeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className={`p-4 border rounded-lg text-left transition-gentle ${
                  theme === option.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-border/80'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name={option.icon} size={20} className="text-text-secondary" />
                  <span className="font-medium text-text-primary">{option.label}</span>
                  {theme === option.value && (
                    <Icon name="Check" size={16} className="text-primary ml-auto" />
                  )}
                </div>
                <div className={`w-full h-8 rounded ${option.preview} mb-2`}></div>
                <p className="text-sm text-text-secondary">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Color Scheme */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Droplet" size={16} className="text-text-secondary" />
            <span>Color Scheme</span>
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorSchemeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleColorSchemeChange(option.value)}
                className={`p-3 border rounded-lg text-center transition-gentle ${
                  colorScheme === option.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-border/80'
                }`}
              >
                <div className="flex justify-center space-x-1 mb-2">
                  <div className={`w-4 h-4 rounded-full ${option.primary}`}></div>
                  <div className={`w-4 h-4 rounded-full ${option.secondary}`}></div>
                </div>
                <span className="text-sm font-medium text-text-primary">{option.label}</span>
                {colorScheme === option.value && (
                  <Icon name="Check" size={14} className="text-primary mx-auto mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Type" size={16} className="text-text-secondary" />
            <span>Font Size</span>
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {fontSizeOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleFontSizeChange(option.value)}
                className={`p-4 border rounded-lg text-center transition-gentle ${
                  fontSize === option.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-border/80'
                }`}
              >
                <div className={`${option.size} font-medium text-text-primary mb-1`}>
                  Aa
                </div>
                <span className="text-sm text-text-secondary">{option.label}</span>
                {fontSize === option.value && (
                  <Icon name="Check" size={14} className="text-primary mx-auto mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Globe" size={16} className="text-text-secondary" />
            <span>Language</span>
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {languageOptions.map(option => (
              <button
                key={option.value}
                onClick={() => handleLanguageChange(option.value)}
                className={`p-3 border rounded-lg text-left transition-gentle ${
                  language === option.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-border/80'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{option.flag}</span>
                  <span className="text-sm font-medium text-text-primary">{option.label}</span>
                  {language === option.value && (
                    <Icon name="Check" size={14} className="text-primary ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Display Options */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Layout" size={16} className="text-text-secondary" />
            <span>Display Options</span>
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Compact Mode"
              description="Reduce spacing and padding for more content on screen"
              checked={compactMode}
              onChange={(e) => handleCompactModeChange(e.target.checked)}
            />
            
            <Checkbox
              label="Enable Animations"
              description="Show smooth transitions and micro-interactions"
              checked={animations}
              onChange={(e) => handleAnimationsChange(e.target.checked)}
            />
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-text-secondary" />
            <span>Preview</span>
          </h4>
          
          <div className="p-4 bg-muted rounded-lg border border-border">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={16} className="text-white" />
                </div>
                <div>
                  <h5 className={`font-medium text-text-primary ${fontSizeOptions.find(o => o.value === fontSize)?.size}`}>
                    Sample Note Title
                  </h5>
                  <p className="text-sm text-text-secondary">
                    This is how your notes will appear with current settings
                  </p>
                </div>
              </div>
              
              <div className={`p-3 bg-background rounded border border-border ${compactMode ? 'py-2' : ''}`}>
                <p className={`text-text-primary ${fontSizeOptions.find(o => o.value === fontSize)?.size}`}>
                  Your note content will be displayed like this. The font size and spacing 
                  will adjust based on your preferences.
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-calm rounded-full"></div>
                <span className="text-sm text-text-secondary">Calm emotional state detected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Save Notice */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h5 className="font-medium text-primary mb-1">Auto-Save Enabled</h5>
              <p className="text-sm text-text-secondary">
                Your appearance preferences are automatically saved and will be applied 
                across all your devices when you sign in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;