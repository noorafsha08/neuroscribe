import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProfileHeader = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    bio: user.bio
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      bio: user.bio
    });
    setIsEditing(false);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      // Simulate upload delay
      setTimeout(() => {
        setIsUploading(false);
        // In real app, would upload to server and update user profile
      }, 2000);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden bg-muted border-4 border-background shadow-soft">
            <Image
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Upload Button */}
          <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer shadow-soft hover:bg-primary/90 transition-gentle">
            <Icon name="Camera" size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
          
          {/* Upload Loading */}
          {isUploading && (
            <div className="absolute inset-0 bg-background/80 rounded-full flex items-center justify-center">
              <Icon name="Loader2" size={20} className="animate-spin text-primary" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          {!isEditing ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-heading font-semibold text-text-primary">
                  {user.name}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit2"
                  onClick={() => setIsEditing(true)}
                  className="lg:hidden"
                >
                  Edit
                </Button>
              </div>
              
              <p className="text-text-secondary font-body">
                {user.email}
              </p>
              
              {user.bio && (
                <p className="text-text-primary font-body mt-3">
                  {user.bio}
                </p>
              )}
              
              <div className="flex items-center space-x-4 mt-4 text-sm text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={16} />
                  <span>Joined {user.joinDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="FileText" size={16} />
                  <span>{user.notesCount} notes</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                iconName="Edit2"
                onClick={() => setIsEditing(true)}
                className="hidden lg:inline-flex mt-4"
              >
                Edit Profile
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
              />
              
              <div className="flex space-x-3">
                <Button
                  variant="default"
                  iconName="Check"
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  iconName="X"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;