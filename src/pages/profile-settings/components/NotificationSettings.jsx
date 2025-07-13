import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    emotionalInsights: true,
    wellnessReminders: true,
    productivityTips: false,
    weeklyReports: true,
    securityAlerts: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    emotionalAlerts: true,
    breathingReminders: true,
    taskDeadlines: true,
    motivationalQuotes: false
  });

  const [scheduleSettings, setScheduleSettings] = useState({
    quietHoursEnabled: true,
    quietStart: '22:00',
    quietEnd: '08:00',
    timezone: 'America/New_York',
    frequency: 'moderate'
  });

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'UTC', label: 'UTC' }
  ];

  const frequencyOptions = [
    { value: 'minimal', label: 'Minimal - Only critical alerts' },
    { value: 'moderate', label: 'Moderate - Important updates' },
    { value: 'frequent', label: 'Frequent - All notifications' }
  ];

  const handleEmailNotificationChange = (key, value) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePushNotificationChange = (key, value) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleScheduleChange = (key, value) => {
    setScheduleSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Notification Preferences
          </h3>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Control how and when you receive notifications
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Email Notifications */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Mail" size={16} className="text-text-secondary" />
            <span>Email Notifications</span>
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Emotional Insights & Analysis"
              description="Weekly emotional pattern reports and insights"
              checked={emailNotifications.emotionalInsights}
              onChange={(e) => handleEmailNotificationChange('emotionalInsights', e.target.checked)}
            />
            
            <Checkbox
              label="Wellness Reminders"
              description="Breathing exercises and mindfulness suggestions"
              checked={emailNotifications.wellnessReminders}
              onChange={(e) => handleEmailNotificationChange('wellnessReminders', e.target.checked)}
            />
            
            <Checkbox
              label="Productivity Tips"
              description="AI-powered productivity recommendations"
              checked={emailNotifications.productivityTips}
              onChange={(e) => handleEmailNotificationChange('productivityTips', e.target.checked)}
            />
            
            <Checkbox
              label="Weekly Reports"
              description="Summary of your emotional and productivity trends"
              checked={emailNotifications.weeklyReports}
              onChange={(e) => handleEmailNotificationChange('weeklyReports', e.target.checked)}
            />
            
            <Checkbox
              label="Security Alerts"
              description="Important account security notifications"
              checked={emailNotifications.securityAlerts}
              onChange={(e) => handleEmailNotificationChange('securityAlerts', e.target.checked)}
            />
          </div>
        </div>

        {/* Push Notifications */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Smartphone" size={16} className="text-text-secondary" />
            <span>Push Notifications</span>
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Emotional State Alerts"
              description="Notifications when stress or negative emotions are detected"
              checked={pushNotifications.emotionalAlerts}
              onChange={(e) => handlePushNotificationChange('emotionalAlerts', e.target.checked)}
            />
            
            <Checkbox
              label="Breathing Exercise Reminders"
              description="Gentle reminders to take breathing breaks"
              checked={pushNotifications.breathingReminders}
              onChange={(e) => handlePushNotificationChange('breathingReminders', e.target.checked)}
            />
            
            <Checkbox
              label="Task Deadline Alerts"
              description="Reminders for upcoming task deadlines"
              checked={pushNotifications.taskDeadlines}
              onChange={(e) => handlePushNotificationChange('taskDeadlines', e.target.checked)}
            />
            
            <Checkbox
              label="Motivational Quotes"
              description="Daily inspirational messages based on your mood"
              checked={pushNotifications.motivationalQuotes}
              onChange={(e) => handlePushNotificationChange('motivationalQuotes', e.target.checked)}
            />
          </div>
        </div>

        {/* Schedule Settings */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <span>Schedule & Timing</span>
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Enable Quiet Hours"
              description="Pause non-critical notifications during specified hours"
              checked={scheduleSettings.quietHoursEnabled}
              onChange={(e) => handleScheduleChange('quietHoursEnabled', e.target.checked)}
            />
            
            {scheduleSettings.quietHoursEnabled && (
              <div className="ml-6 space-y-4 p-4 bg-muted rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Quiet Hours Start
                    </label>
                    <input
                      type="time"
                      value={scheduleSettings.quietStart}
                      onChange={(e) => handleScheduleChange('quietStart', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Quiet Hours End
                    </label>
                    <input
                      type="time"
                      value={scheduleSettings.quietEnd}
                      onChange={(e) => handleScheduleChange('quietEnd', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            )}
            
            <Select
              label="Timezone"
              options={timezoneOptions}
              value={scheduleSettings.timezone}
              onChange={(value) => handleScheduleChange('timezone', value)}
              className="max-w-md"
            />
            
            <Select
              label="Notification Frequency"
              description="Control how often you receive notifications"
              options={frequencyOptions}
              value={scheduleSettings.frequency}
              onChange={(value) => handleScheduleChange('frequency', value)}
              className="max-w-md"
            />
          </div>
        </div>

        {/* Notification Preview */}
        <div className="p-4 bg-muted rounded-lg">
          <h5 className="font-medium text-text-primary mb-3 flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-text-secondary" />
            <span>Preview</span>
          </h5>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border">
              <div className="w-2 h-2 bg-calm rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Calm state detected 🧘‍♀️
                </p>
                <p className="text-xs text-text-secondary">
                  Perfect time for deep work or reflection
                </p>
              </div>
              <span className="text-xs text-text-secondary">2m ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Breathing reminder 💨
                </p>
                <p className="text-xs text-text-secondary">
                  Take a moment for a 2-minute breathing exercise
                </p>
              </div>
              <span className="text-xs text-text-secondary">15m ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;