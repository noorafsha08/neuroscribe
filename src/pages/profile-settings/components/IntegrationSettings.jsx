import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const IntegrationSettings = () => {
  const [spotifyConnection, setSpotifyConnection] = useState({
    connected: false,
    username: '',
    lastSync: null,
    autoSync: true,
    playlistCreation: true
  });

  const [thirdPartyApps, setThirdPartyApps] = useState([
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Sync tasks and wellness reminders with your calendar',
      icon: 'Calendar',
      connected: true,
      permissions: ['read_calendar', 'write_events'],
      lastSync: '2 hours ago'
    },
    {
      id: 'apple-health',
      name: 'Apple Health',
      description: 'Share wellness data with Apple Health app',
      icon: 'Heart',
      connected: false,
      permissions: ['read_health', 'write_health'],
      lastSync: null
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get wellness reminders in your Slack workspace',
      icon: 'MessageSquare',
      connected: false,
      permissions: ['send_messages'],
      lastSync: null
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Export notes and insights to your Notion workspace',
      icon: 'FileText',
      connected: true,
      permissions: ['read_pages', 'write_pages'],
      lastSync: '1 day ago'
    }
  ]);

  const [apiSettings, setApiSettings] = useState({
    webhooksEnabled: false,
    webhookUrl: '',
    apiKeyGenerated: false,
    rateLimitNotifications: true
  });

  const [isConnectingSpotify, setIsConnectingSpotify] = useState(false);

  const handleSpotifyConnect = async () => {
    setIsConnectingSpotify(true);
    
    // Simulate Spotify OAuth flow
    setTimeout(() => {
      setSpotifyConnection({
        connected: true,
        username: 'user@example.com',
        lastSync: 'Just now',
        autoSync: true,
        playlistCreation: true
      });
      setIsConnectingSpotify(false);
    }, 2000);
  };

  const handleSpotifyDisconnect = () => {
    if (window.confirm('Are you sure you want to disconnect Spotify? You will lose access to music recommendations.')) {
      setSpotifyConnection({
        connected: false,
        username: '',
        lastSync: null,
        autoSync: true,
        playlistCreation: true
      });
    }
  };

  const handleSpotifySettingChange = (key, value) => {
    setSpotifyConnection(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleThirdPartyToggle = (appId) => {
    setThirdPartyApps(prev => prev.map(app => 
      app.id === appId 
        ? { 
            ...app, 
            connected: !app.connected,
            lastSync: !app.connected ? 'Just now' : null
          }
        : app
    ));
  };

  const handleApiSettingChange = (key, value) => {
    setApiSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const generateApiKey = () => {
    if (window.confirm('Generate a new API key? This will invalidate any existing keys.')) {
      setApiSettings(prev => ({
        ...prev,
        apiKeyGenerated: true
      }));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Integrations & Connections
          </h3>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Connect NeuroScribe with your favorite apps and services
        </p>
      </div>

      <div className="p-6 space-y-8">
        {/* Spotify Integration */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Music" size={16} className="text-text-secondary" />
            <span>Spotify Integration</span>
          </h4>
          
          <div className="p-4 bg-muted rounded-lg">
            {!spotifyConnection.connected ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <Icon name="Music" size={24} className="text-white" />
                  </div>
                  <div>
                    <h5 className="font-medium text-text-primary">Connect Spotify</h5>
                    <p className="text-sm text-text-secondary">
                      Get personalized music recommendations based on your emotional state
                    </p>
                  </div>
                </div>
                <Button
                  variant="default"
                  iconName="ExternalLink"
                  onClick={handleSpotifyConnect}
                  loading={isConnectingSpotify}
                >
                  {isConnectingSpotify ? 'Connecting...' : 'Connect'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <Icon name="Music" size={24} className="text-white" />
                    </div>
                    <div>
                      <h5 className="font-medium text-text-primary">Spotify Connected</h5>
                      <p className="text-sm text-text-secondary">
                        {spotifyConnection.username} • Last sync: {spotifyConnection.lastSync}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    iconName="Unlink"
                    onClick={handleSpotifyDisconnect}
                  >
                    Disconnect
                  </Button>
                </div>
                
                <div className="space-y-3 pt-3 border-t border-border">
                  <Checkbox
                    label="Auto-sync playlists"
                    description="Automatically update playlists based on your emotional patterns"
                    checked={spotifyConnection.autoSync}
                    onChange={(e) => handleSpotifySettingChange('autoSync', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Create wellness playlists"
                    description="Allow NeuroScribe to create playlists for different emotional states"
                    checked={spotifyConnection.playlistCreation}
                    onChange={(e) => handleSpotifySettingChange('playlistCreation', e.target.checked)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Third-Party Apps */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Grid3x3" size={16} className="text-text-secondary" />
            <span>Third-Party Applications</span>
          </h4>
          
          <div className="space-y-4">
            {thirdPartyApps.map(app => (
              <div key={app.id} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={app.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-text-primary">{app.name}</h5>
                      <p className="text-sm text-text-secondary">{app.description}</p>
                      {app.connected && app.lastSync && (
                        <p className="text-xs text-success mt-1">
                          Connected • Last sync: {app.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {app.connected && (
                      <Button variant="ghost" size="sm" iconName="Settings">
                        Configure
                      </Button>
                    )}
                    <Button
                      variant={app.connected ? "outline" : "default"}
                      size="sm"
                      iconName={app.connected ? "Unlink" : "ExternalLink"}
                      onClick={() => handleThirdPartyToggle(app.id)}
                    >
                      {app.connected ? 'Disconnect' : 'Connect'}
                    </Button>
                  </div>
                </div>
                
                {app.connected && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs text-text-secondary">Permissions:</span>
                      {app.permissions.map(permission => (
                        <span
                          key={permission}
                          className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                        >
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* API & Webhooks */}
        <div>
          <h4 className="font-medium text-text-primary mb-4 flex items-center space-x-2">
            <Icon name="Code" size={16} className="text-text-secondary" />
            <span>API & Developer Settings</span>
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="font-medium text-text-primary">API Access</h5>
                  <p className="text-sm text-text-secondary">
                    Generate API keys for custom integrations
                  </p>
                </div>
                <Button
                  variant="outline"
                  iconName="Key"
                  onClick={generateApiKey}
                >
                  {apiSettings.apiKeyGenerated ? 'Regenerate Key' : 'Generate API Key'}
                </Button>
              </div>
              
              {apiSettings.apiKeyGenerated && (
                <div className="p-3 bg-background rounded border border-border">
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono text-text-primary">
                      ns_api_key_1234567890abcdef...
                    </code>
                    <Button variant="ghost" size="sm" iconName="Copy">
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h5 className="font-medium text-text-primary mb-3">Webhooks</h5>
              
              <div className="space-y-3">
                <Checkbox
                  label="Enable Webhooks"
                  description="Receive real-time notifications about emotional state changes"
                  checked={apiSettings.webhooksEnabled}
                  onChange={(e) => handleApiSettingChange('webhooksEnabled', e.target.checked)}
                />
                
                {apiSettings.webhooksEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://your-app.com/webhooks/neuroscribe"
                      value={apiSettings.webhookUrl}
                      onChange={(e) => handleApiSettingChange('webhookUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                )}
                
                <Checkbox
                  label="Rate Limit Notifications"
                  description="Get notified when approaching API rate limits"
                  checked={apiSettings.rateLimitNotifications}
                  onChange={(e) => handleApiSettingChange('rateLimitNotifications', e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Integration Status */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-medium text-text-primary mb-4">Integration Status</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">
                  {thirdPartyApps.filter(app => app.connected).length} Connected
                </span>
              </div>
            </div>
            
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">
                  Last sync: 2 hours ago
                </span>
              </div>
            </div>
            
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  All systems operational
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationSettings;