import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataPrivacySettings = () => {
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    emotionalAnalysis: true,
    thirdPartySharing: false,
    analyticsTracking: true,
    marketingEmails: false
  });

  const [exportSettings, setExportSettings] = useState({
    includeNotes: true,
    includeEmotionalData: true,
    includeTasks: true,
    includeAnalytics: false,
    format: 'json'
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handlePrivacyChange = (key, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExportSettingChange = (key, value) => {
    setExportSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDataExport = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In real app, would trigger download
      alert('Data export completed! Download will begin shortly.');
    }, 3000);
  };

  const handleAccountDeletion = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setIsDeletingAccount(true);
      // In real app, would handle account deletion
      setTimeout(() => {
        setIsDeletingAccount(false);
        alert('Account deletion request submitted. You will receive a confirmation email.');
      }, 2000);
    }
  };

  const formatOptions = [
    { value: 'json', label: 'JSON', description: 'Machine-readable format' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet compatible' },
    { value: 'pdf', label: 'PDF', description: 'Human-readable report' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Data & Privacy
          </h3>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Control your data and privacy preferences
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Privacy Controls */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Eye" size={16} className="text-text-secondary" />
            <span>Privacy Controls</span>
          </h4>
          
          <div className="space-y-4">
            <Checkbox
              label="Data Collection for Service Improvement"
              description="Allow NeuroScribe to collect usage data to improve the service"
              checked={privacySettings.dataCollection}
              onChange={(e) => handlePrivacyChange('dataCollection', e.target.checked)}
            />
            
            <Checkbox
              label="Emotional Analysis Processing"
              description="Enable AI processing of your text for emotional insights"
              checked={privacySettings.emotionalAnalysis}
              onChange={(e) => handlePrivacyChange('emotionalAnalysis', e.target.checked)}
            />
            
            <Checkbox
              label="Third-Party Data Sharing"
              description="Share anonymized data with research partners (never personal content)"
              checked={privacySettings.thirdPartySharing}
              onChange={(e) => handlePrivacyChange('thirdPartySharing', e.target.checked)}
            />
            
            <Checkbox
              label="Analytics Tracking"
              description="Track app usage for analytics and feature improvement"
              checked={privacySettings.analyticsTracking}
              onChange={(e) => handlePrivacyChange('analyticsTracking', e.target.checked)}
            />
            
            <Checkbox
              label="Marketing Communications"
              description="Receive emails about new features and wellness tips"
              checked={privacySettings.marketingEmails}
              onChange={(e) => handlePrivacyChange('marketingEmails', e.target.checked)}
            />
          </div>
        </div>

        {/* Data Rights */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-text-secondary" />
            <span>Your Data Rights</span>
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Download" size={20} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary mb-2">Data Portability</h5>
                  <p className="text-sm text-text-secondary mb-4">
                    You have the right to export all your personal data in a machine-readable format.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-text-primary">Export Options:</div>
                    
                    <div className="space-y-2">
                      <Checkbox
                        label="Notes and Content"
                        description="All your notes, drafts, and written content"
                        checked={exportSettings.includeNotes}
                        onChange={(e) => handleExportSettingChange('includeNotes', e.target.checked)}
                        size="sm"
                      />
                      
                      <Checkbox
                        label="Emotional Data"
                        description="Emotional analysis results and patterns"
                        checked={exportSettings.includeEmotionalData}
                        onChange={(e) => handleExportSettingChange('includeEmotionalData', e.target.checked)}
                        size="sm"
                      />
                      
                      <Checkbox
                        label="Tasks and Goals"
                        description="Task lists, goals, and productivity data"
                        checked={exportSettings.includeTasks}
                        onChange={(e) => handleExportSettingChange('includeTasks', e.target.checked)}
                        size="sm"
                      />
                      
                      <Checkbox
                        label="Analytics Data"
                        description="Usage statistics and app analytics"
                        checked={exportSettings.includeAnalytics}
                        onChange={(e) => handleExportSettingChange('includeAnalytics', e.target.checked)}
                        size="sm"
                      />
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Export Format
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {formatOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => handleExportSettingChange('format', option.value)}
                            className={`p-2 border rounded-lg text-sm transition-gentle ${
                              exportSettings.format === option.value
                                ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/80'
                            }`}
                          >
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs opacity-70">{option.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    iconName="Download"
                    onClick={handleDataExport}
                    loading={isExporting}
                    className="mt-4"
                  >
                    {isExporting ? 'Preparing Export...' : 'Export My Data'}
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary mb-2">Data Retention</h5>
                  <p className="text-sm text-text-secondary">
                    Your data is retained as long as your account is active. Deleted notes are permanently 
                    removed after 30 days. Emotional analysis data is anonymized after 2 years.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary mb-2">Data Location</h5>
                  <p className="text-sm text-text-secondary">
                    Your data is stored in secure data centers in the United States and European Union, 
                    compliant with GDPR and other privacy regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Deletion */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Trash2" size={16} className="text-destructive" />
            <span>Account Deletion</span>
          </h4>
          
          <div className="p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
              <div className="flex-1">
                <h5 className="font-medium text-destructive mb-2">Delete Account</h5>
                <p className="text-sm text-text-secondary mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                  You will lose access to all notes, emotional insights, and wellness data.
                </p>
                
                <div className="space-y-2 text-sm text-text-secondary mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="X" size={14} className="text-destructive" />
                    <span>All notes and content will be permanently deleted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="X" size={14} className="text-destructive" />
                    <span>Emotional analysis data will be removed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="X" size={14} className="text-destructive" />
                    <span>Account cannot be recovered after deletion</span>
                  </div>
                </div>
                
                <Button
                  variant="destructive"
                  iconName="Trash2"
                  onClick={handleAccountDeletion}
                  loading={isDeletingAccount}
                >
                  {isDeletingAccount ? 'Processing...' : 'Delete My Account'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Information */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-medium text-text-primary mb-4">Legal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" iconName="FileText" className="justify-start">
              Privacy Policy
            </Button>
            <Button variant="outline" iconName="FileText" className="justify-start">
              Terms of Service
            </Button>
            <Button variant="outline" iconName="FileText" className="justify-start">
              Data Processing Agreement
            </Button>
            <Button variant="outline" iconName="FileText" className="justify-start">
              Cookie Policy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPrivacySettings;