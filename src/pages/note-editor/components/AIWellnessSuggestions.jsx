import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIWellnessSuggestions = ({ emotionalState, isVisible, onClose }) => {
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingCount, setBreathingCount] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState('inhale'); // inhale, hold, exhale

  const motivationalQuotes = {
    stressed: [
      "Take a deep breath. You\'ve got this. Every challenge is an opportunity to grow stronger.",
      "Stress is temporary, but your resilience is permanent. You've overcome difficulties before.",
      "One step at a time. Progress, not perfection, is the goal.",
      "Your current situation is not your final destination. Keep moving forward."
    ],
    anxious: [
      "Anxiety is a feeling, not a fact. You are safe in this moment.",
      "Breathe in courage, breathe out fear. You have the strength within you.",
      "This feeling will pass. You\'ve weathered storms before and emerged stronger.",
      "Focus on what you can control. Let go of what you cannot."
    ],
    sad: [
      "It's okay to feel sad. Your emotions are valid, and healing takes time.",
      "Even in darkness, there are stars. Look for the small lights in your day.",
      "You are not alone in this feeling. Reach out when you need support.",
      "Tomorrow is a new day with new possibilities. Hold onto hope."
    ],
    overwhelmed: [
      "Break it down into smaller pieces. You don't have to do everything at once.",
      "It\'s okay to ask for help. Strength comes from knowing when to lean on others.",
      "Prioritize what truly matters. Not everything urgent is important.",
      "You've handled 100% of your difficult days so far. You're stronger than you think."
    ]
  };

  const breathingExercises = [
    {
      name: "4-7-8 Breathing",
      description: "Inhale for 4, hold for 7, exhale for 8",
      pattern: [4, 7, 8],
      phases: ['inhale', 'hold', 'exhale']
    },
    {
      name: "Box Breathing",
      description: "Equal counts for inhale, hold, exhale, hold",
      pattern: [4, 4, 4, 4],
      phases: ['inhale', 'hold', 'exhale', 'hold']
    },
    {
      name: "Calm Breathing",
      description: "Simple deep breathing pattern",
      pattern: [6, 6],
      phases: ['inhale', 'exhale']
    }
  ];

  const musicPlaylists = {
    focus: [
      { name: "Deep Focus", description: "Instrumental music for concentration", genre: "Ambient" },
      { name: "Study Beats", description: "Lo-fi hip hop for productivity", genre: "Lo-fi" },
      { name: "Classical Focus", description: "Classical pieces for deep work", genre: "Classical" }
    ],
    calm: [
      { name: "Peaceful Moments", description: "Relaxing sounds for tranquility", genre: "Nature" },
      { name: "Meditation Music", description: "Gentle melodies for mindfulness", genre: "Meditation" },
      { name: "Soft Piano", description: "Soothing piano compositions", genre: "Piano" }
    ],
    energized: [
      { name: "Motivation Mix", description: "Upbeat tracks to boost energy", genre: "Pop" },
      { name: "Workout Vibes", description: "High-energy music for motivation", genre: "Electronic" },
      { name: "Feel Good Hits", description: "Positive songs to lift your mood", genre: "Indie" }
    ]
  };

  useEffect(() => {
    if (emotionalState && (emotionalState.primary === 'stressed' || emotionalState.intensity > 0.7)) {
      const suggestions = getSuggestionsForEmotion(emotionalState.primary);
      setCurrentSuggestion(suggestions);
    }
  }, [emotionalState]);

  const getSuggestionsForEmotion = (emotion) => {
    const quotes = motivationalQuotes[emotion] || motivationalQuotes.stressed;
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    return {
      quote: randomQuote,
      breathing: breathingExercises[Math.floor(Math.random() * breathingExercises.length)],
      music: musicPlaylists[emotion] || musicPlaylists.calm
    };
  };

  const startBreathingExercise = (exercise) => {
    setIsBreathingActive(true);
    setBreathingCount(0);
    setBreathingPhase(exercise.phases[0]);
    
    // Simulate breathing pattern
    let currentPhaseIndex = 0;
    let currentCount = 0;
    
    const interval = setInterval(() => {
      currentCount++;
      setBreathingCount(currentCount);
      
      if (currentCount >= exercise.pattern[currentPhaseIndex]) {
        currentPhaseIndex = (currentPhaseIndex + 1) % exercise.phases.length;
        currentCount = 0;
        setBreathingPhase(exercise.phases[currentPhaseIndex]);
        
        // Stop after 5 complete cycles
        if (currentPhaseIndex === 0 && breathingCount > 20) {
          clearInterval(interval);
          setIsBreathingActive(false);
        }
      }
    }, 1000);
    
    setTimeout(() => {
      clearInterval(interval);
      setIsBreathingActive(false);
    }, 60000); // Stop after 1 minute
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
    setBreathingCount(0);
  };

  if (!isVisible || !currentSuggestion) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-lg shadow-soft-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Heart" size={20} className="text-primary" />
            <h3 className="font-heading font-medium text-text-primary">Wellness Suggestions</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
            className="h-6 w-6"
          />
        </div>

        <div className="p-4 space-y-6">
          {/* Motivational Quote */}
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Quote" size={20} className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-text-primary mb-2">Motivational Message</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {currentSuggestion.quote}
                </p>
              </div>
            </div>
          </div>

          {/* Breathing Exercise */}
          <div className="p-4 bg-calm/5 border border-calm/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Wind" size={20} className="text-calm" />
              <h4 className="font-medium text-text-primary">Breathing Exercise</h4>
            </div>
            
            <div className="mb-3">
              <h5 className="font-medium text-sm text-text-primary">{currentSuggestion.breathing.name}</h5>
              <p className="text-xs text-text-secondary">{currentSuggestion.breathing.description}</p>
            </div>

            {!isBreathingActive ? (
              <Button
                variant="outline"
                onClick={() => startBreathingExercise(currentSuggestion.breathing)}
                iconName="Play"
                className="w-full"
              >
                Start Exercise
              </Button>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <div className={`w-20 h-20 mx-auto rounded-full border-4 transition-all duration-1000 ${
                    breathingPhase === 'inhale' ? 'border-calm scale-110' : 
                    breathingPhase === 'hold'? 'border-primary scale-105' : 'border-secondary scale-95'
                  }`}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-lg font-medium text-text-primary capitalize">
                        {breathingPhase}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  {breathingPhase === 'inhale' && "Breathe in slowly..."}
                  {breathingPhase === 'hold' && "Hold your breath..."}
                  {breathingPhase === 'exhale' && "Breathe out slowly..."}
                </p>
                <Button
                  variant="outline"
                  onClick={stopBreathingExercise}
                  iconName="Square"
                  size="sm"
                >
                  Stop
                </Button>
              </div>
            )}
          </div>

          {/* Music Suggestions */}
          <div className="p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Music" size={20} className="text-secondary" />
              <h4 className="font-medium text-text-primary">Music for Your Mood</h4>
            </div>
            
            <div className="space-y-2">
              {currentSuggestion.music.slice(0, 3).map((playlist, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm text-text-primary">{playlist.name}</h5>
                    <p className="text-xs text-text-secondary">{playlist.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary bg-background px-2 py-1 rounded">
                      {playlist.genre}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="ExternalLink"
                      className="h-6 w-6"
                      title="Open in Spotify"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Maybe Later
            </Button>
            <Button
              variant="default"
              onClick={onClose}
              className="flex-1"
            >
              Thanks!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWellnessSuggestions;