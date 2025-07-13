import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-soft-lg">
          <Icon name="Brain" size={32} className="text-white" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="space-y-3">
        <h1 className="text-2xl lg:text-3xl font-heading font-semibold text-text-primary">
          Welcome to NeuroScribe
        </h1>
        <p className="text-base lg:text-lg text-text-secondary max-w-md mx-auto leading-relaxed">
          Your AI-powered companion for mindful productivity and emotional wellness
        </p>
      </div>

      {/* Value Propositions */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="w-10 h-10 bg-calm/10 rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={20} className="text-calm" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-text-primary">Emotional Insights</h3>
            <p className="text-xs text-text-secondary">Real-time sentiment analysis</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="w-10 h-10 bg-focused/10 rounded-lg flex items-center justify-center">
            <Icon name="Target" size={20} className="text-focused" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-text-primary">Smart Productivity</h3>
            <p className="text-xs text-text-secondary">AI-powered task management</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 p-4">
          <div className="w-10 h-10 bg-energized/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-energized" />
          </div>
          <div className="text-center">
            <h3 className="text-sm font-medium text-text-primary">Wellness Guidance</h3>
            <p className="text-xs text-text-secondary">Personalized recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;