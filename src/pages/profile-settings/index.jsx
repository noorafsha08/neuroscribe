import React, { useState } from 'react';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ProfileHeader from './components/ProfileHeader';
import SecuritySettings from './components/SecuritySettings';
import NotificationSettings from './components/NotificationSettings';
import WellnessCustomization from './components/WellnessCustomization';
import DataPrivacySettings from './components/DataPrivacySettings';
import IntegrationSettings from './components/IntegrationSettings';
import AppearanceSettings from './components/AppearanceSettings';
import Icon from '../../components/AppIcon';

const ProfileSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    bio: "Productivity enthusiast and mindfulness practitioner. Using NeuroScribe to balance work and wellness.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "March 2024",
    notesCount: 127,
    emotionalInsights: 89,
    wellnessStreak: 12
  };

  const settingsSections = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      description: 'Personal information and account details'
    },
    {
      id: 'security',
      label: 'Security',
      icon: 'Shield',
      description: 'Password, 2FA, and session management'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      description: 'Email, push, and wellness reminders'
    },
    {
      id: 'wellness',
      label: 'Wellness',
      icon: 'Heart',
      description: 'Emotional tracking and AI suggestions'
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Lock',
      description: 'Data control and export options'
    },
    {
      id: 'integrations',
      label: 'Integrations',
      icon: 'Zap',
      description: 'Connected apps and services'
    },
    {
      id: 'appearance',
      label: 'Appearance',
      icon: 'Palette',
      description: 'Theme, language, and display options'
    }
  ];

  const handleUpdateProfile = (updatedData) => {
    // In real app, would update user profile via API
    console.log('Profile updated:', updatedData);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileHeader user={userData} onUpdateProfile={handleUpdateProfile} />;
      case 'security':
        return <SecuritySettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'wellness':
        return <WellnessCustomization />;
      case 'privacy':
        return <DataPrivacySettings />;
      case 'integrations':
        return <IntegrationSettings />;
      case 'appearance':
        return <AppearanceSettings />;
      default:
        return <ProfileHeader user={userData} onUpdateProfile={handleUpdateProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      <div className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Mobile Section Selector */}
          <div className="lg:hidden mb-6">
            <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
              <h2 className="text-lg font-heading font-semibold text-text-primary mb-4">
                Settings
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {settingsSections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`p-3 border rounded-lg text-left transition-gentle ${
                      activeSection === section.id
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/80'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <Icon name={section.icon} size={16} />
                      <span className="font-medium text-sm">{section.label}</span>
                    </div>
                    <p className="text-xs opacity-70 line-clamp-2">
                      {section.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="bg-card border border-border rounded-lg shadow-soft sticky top-20">
                <div className="p-6 border-b border-border">
                  <h2 className="text-lg font-heading font-semibold text-text-primary">
                    Settings
                  </h2>
                  <p className="text-sm text-text-secondary mt-1">
                    Manage your account and preferences
                  </p>
                </div>
                
                <nav className="p-4">
                  <div className="space-y-2">
                    {settingsSections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-gentle ${
                          activeSection === section.id
                            ? 'bg-primary/10 text-primary border border-primary/20' :'text-text-secondary hover:text-text-primary hover:bg-muted'
                        }`}
                      >
                        <Icon name={section.icon} size={18} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{section.label}</div>
                          <div className="text-xs opacity-70 truncate">
                            {section.description}
                          </div>
                        </div>
                        {activeSection === section.id && (
                          <div className="w-1 h-6 bg-primary rounded-full" />
                        )}
                      </button>
                    ))}
                  </div>
                </nav>

                {/* Quick Stats */}
                <div className="p-4 border-t border-border">
                  <h3 className="text-sm font-medium text-text-primary mb-3">
                    Account Overview
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Notes Created</span>
                      <span className="font-medium text-text-primary">{userData.notesCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Emotional Insights</span>
                      <span className="font-medium text-text-primary">{userData.emotionalInsights}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">Wellness Streak</span>
                      <span className="font-medium text-success">{userData.wellnessStreak} days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="space-y-6">
                {/* Mobile Section Header */}
                <div className="lg:hidden">
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon 
                      name={settingsSections.find(s => s.id === activeSection)?.icon || 'Settings'} 
                      size={20} 
                      className="text-primary" 
                    />
                    <div>
                      <h1 className="text-xl font-heading font-semibold text-text-primary">
                        {settingsSections.find(s => s.id === activeSection)?.label}
                      </h1>
                      <p className="text-sm text-text-secondary">
                        {settingsSections.find(s => s.id === activeSection)?.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active Section Content */}
                {renderActiveSection()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomTabNavigation />
    </div>
  );
};

export default ProfileSettings;