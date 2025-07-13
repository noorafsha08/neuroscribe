import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const SecuritySettings = () => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessionSettings, setSessionSettings] = useState({
    autoLogout: true,
    rememberDevice: false
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Handle password change
    console.log('Password change submitted');
    setIsChangingPassword(false);
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // In real app, would trigger 2FA setup flow
  };

  const handleSessionSettingChange = (setting, value) => {
    setSessionSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Security & Privacy
          </h3>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Manage your account security and privacy settings
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Password Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-text-primary">Password</h4>
              <p className="text-sm text-text-secondary">
                Last changed 3 months ago
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Key"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
            >
              Change Password
            </Button>
          </div>

          {isChangingPassword && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4 p-4 bg-muted rounded-lg">
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
              />
              
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                description="Must be at least 8 characters with numbers and symbols"
                required
              />
              
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
              
              <div className="flex space-x-3">
                <Button type="submit" size="sm">
                  Update Password
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsChangingPassword(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div className="flex items-center space-x-3">
            <Icon 
              name={twoFactorEnabled ? "ShieldCheck" : "Shield"} 
              size={20} 
              className={twoFactorEnabled ? "text-success" : "text-text-secondary"} 
            />
            <div>
              <h4 className="font-medium text-text-primary">Two-Factor Authentication</h4>
              <p className="text-sm text-text-secondary">
                {twoFactorEnabled ? "Enabled" : "Add an extra layer of security"}
              </p>
            </div>
          </div>
          <Button
            variant={twoFactorEnabled ? "outline" : "default"}
            size="sm"
            onClick={handleTwoFactorToggle}
          >
            {twoFactorEnabled ? "Disable" : "Enable"}
          </Button>
        </div>

        {/* Session Management */}
        <div>
          <h4 className="font-medium text-text-primary mb-4">Session Management</h4>
          <div className="space-y-3">
            <Checkbox
              label="Auto-logout after 30 minutes of inactivity"
              description="Automatically sign out for security"
              checked={sessionSettings.autoLogout}
              onChange={(e) => handleSessionSettingChange('autoLogout', e.target.checked)}
            />
            
            <Checkbox
              label="Remember this device for 30 days"
              description="Skip 2FA on trusted devices"
              checked={sessionSettings.rememberDevice}
              onChange={(e) => handleSessionSettingChange('rememberDevice', e.target.checked)}
            />
          </div>
        </div>

        {/* Active Sessions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-text-primary">Active Sessions</h4>
            <Button variant="outline" size="sm" iconName="LogOut">
              Sign Out All Devices
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Monitor" size={16} className="text-text-secondary" />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Current Session - Chrome on Windows
                  </p>
                  <p className="text-xs text-text-secondary">
                    Last active: Now • IP: 192.168.1.100
                  </p>
                </div>
              </div>
              <span className="text-xs text-success font-medium">Current</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Smartphone" size={16} className="text-text-secondary" />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    Mobile App - iPhone
                  </p>
                  <p className="text-xs text-text-secondary">
                    Last active: 2 hours ago • IP: 192.168.1.101
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" iconName="LogOut">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;