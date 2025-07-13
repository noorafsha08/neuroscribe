import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const WellnessCustomization = () => {
  const [emotionalTracking, setEmotionalTracking] = useState({
    enabled: true,
    sensitivity: 'medium',
    autoTagging: true,
    realTimeAnalysis: true,
    historicalTrends: true
  });

  const [aiSuggestions, setAiSuggestions] = useState({
    motivationalQuotes: true,
    breathingExercises: true,
    musicRecommendations: false,
    productivityTips: true,
    frequency: 'moderate'
  });

  const [wellnessGoals, setWellnessGoals] = useState({
    primaryFocus: 'stress_reduction',
    dailyMindfulness: 10,
    emotionalAwareness: true,
    workLifeBalance: true
  });

  const [preferences, setPreferences] = useState({
    preferredExercises: ['breathing', 'meditation'],
    musicGenres: ['ambient', 'classical'],
    reminderStyle: 'gentle',
    dataSharing: false
  });

  const sensitivityOptions = [
    { value: 'low', label: 'Low - Only strong emotions', description: 'Detect clear emotional patterns' },
    { value: 'medium', label: 'Medium - Balanced detection', description: 'Standard emotional sensitivity' },
    { value: 'high', label: 'High - Subtle emotions', description: 'Detect minor mood changes' }
  ];

  const frequencyOptions = [
    { value: 'minimal', label: 'Minimal - 1-2 per day' },
    { value: 'moderate', label: 'Moderate - 3-5 per day' },
    { value: 'frequent', label: 'Frequent - As needed' }
  ];

  const focusOptions = [
    { value: 'stress_reduction', label: 'Stress Reduction' },
    { value: 'productivity', label: 'Productivity Enhancement' },
    { value: 'emotional_awareness', label: 'Emotional Awareness' },
    { value: 'work_life_balance', label: 'Work-Life Balance' },
    { value: 'creativity', label: 'Creative Flow' }
  ];

  const exerciseOptions = [
    { value: 'breathing', label: 'Breathing Exercises' },
    { value: 'meditation', label: 'Guided Meditation' },
    { value: 'progressive_relaxation', label: 'Progressive Muscle Relaxation' },
    { value: 'mindfulness', label: 'Mindfulness Practices' },
    { value: 'visualization', label: 'Visualization Techniques' }
  ];

  const musicGenreOptions = [
    { value: 'ambient', label: 'Ambient' },
    { value: 'classical', label: 'Classical' },
    { value: 'nature', label: 'Nature Sounds' },
    { value: 'binaural', label: 'Binaural Beats' },
    { value: 'instrumental', label: 'Instrumental' }
  ];

  const reminderStyleOptions = [
    { value: 'gentle', label: 'Gentle - Soft suggestions' },
    { value: 'encouraging', label: 'Encouraging - Motivational tone' },
    { value: 'direct', label: 'Direct - Clear instructions' }
  ];

  const handleEmotionalTrackingChange = (key, value) => {
    setEmotionalTracking(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAiSuggestionsChange = (key, value) => {
    setAiSuggestions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleWellnessGoalsChange = (key, value) => {
    setWellnessGoals(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePreferencesChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExerciseToggle = (exercise) => {
    const current = preferences.preferredExercises;
    const updated = current.includes(exercise)
      ? current.filter(e => e !== exercise)
      : [...current, exercise];
    handlePreferencesChange('preferredExercises', updated);
  };

  const handleMusicGenreToggle = (genre) => {
    const current = preferences.musicGenres;
    const updated = current.includes(genre)
      ? current.filter(g => g !== genre)
      : [...current, genre];
    handlePreferencesChange('musicGenres', updated);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Heart" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Wellness Customization
          </h3>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Personalize your emotional wellness experience
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Emotional Tracking */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Brain" size={16} className="text-text-secondary" />
            <span>Emotional Tracking</span>
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Enable Emotional Analysis"
              description="Analyze your writing for emotional patterns and insights"
              checked={emotionalTracking.enabled}
              onChange={(e) => handleEmotionalTrackingChange('enabled', e.target.checked)}
            />
            
            {emotionalTracking.enabled && (
              <div className="ml-6 space-y-4">
                <Select
                  label="Detection Sensitivity"
                  description="How sensitive should emotion detection be?"
                  options={sensitivityOptions}
                  value={emotionalTracking.sensitivity}
                  onChange={(value) => handleEmotionalTrackingChange('sensitivity', value)}
                  className="max-w-md"
                />
                
                <Checkbox
                  label="Automatic Tagging"
                  description="Automatically tag notes with detected emotions"
                  checked={emotionalTracking.autoTagging}
                  onChange={(e) => handleEmotionalTrackingChange('autoTagging', e.target.checked)}
                />
                
                <Checkbox
                  label="Real-time Analysis"
                  description="Analyze emotions as you type (may impact performance)"
                  checked={emotionalTracking.realTimeAnalysis}
                  onChange={(e) => handleEmotionalTrackingChange('realTimeAnalysis', e.target.checked)}
                />
                
                <Checkbox
                  label="Historical Trend Analysis"
                  description="Track emotional patterns over time"
                  checked={emotionalTracking.historicalTrends}
                  onChange={(e) => handleEmotionalTrackingChange('historicalTrends', e.target.checked)}
                />
              </div>
            )}
          </div>
        </div>

        {/* AI Suggestions */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Sparkles" size={16} className="text-text-secondary" />
            <span>AI-Powered Suggestions</span>
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Motivational Quotes"
              description="Receive uplifting quotes when negative emotions are detected"
              checked={aiSuggestions.motivationalQuotes}
              onChange={(e) => handleAiSuggestionsChange('motivationalQuotes', e.target.checked)}
            />
            
            <Checkbox
              label="Breathing Exercise Recommendations"
              description="Get breathing exercise suggestions based on your emotional state"
              checked={aiSuggestions.breathingExercises}
              onChange={(e) => handleAiSuggestionsChange('breathingExercises', e.target.checked)}
            />
            
            <Checkbox
              label="Music Recommendations"
              description="Receive Spotify playlist suggestions to match or improve your mood"
              checked={aiSuggestions.musicRecommendations}
              onChange={(e) => handleAiSuggestionsChange('musicRecommendations', e.target.checked)}
            />
            
            <Checkbox
              label="Productivity Tips"
              description="Get productivity suggestions based on your emotional energy"
              checked={aiSuggestions.productivityTips}
              onChange={(e) => handleAiSuggestionsChange('productivityTips', e.target.checked)}
            />
            
            <Select
              label="Suggestion Frequency"
              description="How often should you receive AI suggestions?"
              options={frequencyOptions}
              value={aiSuggestions.frequency}
              onChange={(value) => handleAiSuggestionsChange('frequency', value)}
              className="max-w-md"
            />
          </div>
        </div>

        {/* Wellness Goals */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-text-secondary" />
            <span>Wellness Goals</span>
          </h4>
          
          <div className="space-y-4">
            <Select
              label="Primary Focus"
              description="What's your main wellness objective?"
              options={focusOptions}
              value={wellnessGoals.primaryFocus}
              onChange={(value) => handleWellnessGoalsChange('primaryFocus', value)}
              className="max-w-md"
            />
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Daily Mindfulness Goal (minutes)
              </label>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={wellnessGoals.dailyMindfulness}
                onChange={(e) => handleWellnessGoalsChange('dailyMindfulness', parseInt(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>5 min</span>
                <span className="font-medium text-primary">{wellnessGoals.dailyMindfulness} min</span>
                <span>60 min</span>
              </div>
            </div>
            
            <Checkbox
              label="Emotional Awareness Tracking"
              description="Track your emotional awareness and growth over time"
              checked={wellnessGoals.emotionalAwareness}
              onChange={(e) => handleWellnessGoalsChange('emotionalAwareness', e.target.checked)}
            />
            
            <Checkbox
              label="Work-Life Balance Monitoring"
              description="Monitor work-related stress and suggest balance improvements"
              checked={wellnessGoals.workLifeBalance}
              onChange={(e) => handleWellnessGoalsChange('workLifeBalance', e.target.checked)}
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Settings" size={16} className="text-text-secondary" />
            <span>Personal Preferences</span>
          </h4>
          
          <div className="space-y-6">
            {/* Preferred Exercises */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Preferred Wellness Exercises
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exerciseOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => handleExerciseToggle(option.value)}
                    className={`p-3 border rounded-lg cursor-pointer transition-gentle ${
                      preferences.preferredExercises.includes(option.value)
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/80'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={preferences.preferredExercises.includes(option.value) ? "CheckCircle" : "Circle"} 
                        size={16} 
                      />
                      <span className="text-sm font-medium">{option.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Music Preferences */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Preferred Music Genres for Wellness
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {musicGenreOptions.map(option => (
                  <div
                    key={option.value}
                    onClick={() => handleMusicGenreToggle(option.value)}
                    className={`p-3 border rounded-lg cursor-pointer transition-gentle text-center ${
                      preferences.musicGenres.includes(option.value)
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/80'
                    }`}
                  >
                    <Icon 
                      name={preferences.musicGenres.includes(option.value) ? "Music" : "Music"} 
                      size={16} 
                      className="mx-auto mb-1"
                    />
                    <span className="text-sm font-medium">{option.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reminder Style */}
            <Select
              label="Reminder Style"
              description="How would you like to receive wellness reminders?"
              options={reminderStyleOptions}
              value={preferences.reminderStyle}
              onChange={(value) => handlePreferencesChange('reminderStyle', value)}
              className="max-w-md"
            />

            {/* Data Sharing */}
            <Checkbox
              label="Anonymous Data Sharing"
              description="Help improve NeuroScribe by sharing anonymous usage patterns (no personal content)"
              checked={preferences.dataSharing}
              onChange={(e) => handlePreferencesChange('dataSharing', e.target.checked)}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-border">
          <Button iconName="Save" className="w-full md:w-auto">
            Save Wellness Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WellnessCustomization;