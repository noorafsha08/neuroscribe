import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'End-to-End Encryption',
      description: 'Your data is encrypted and secure'
    },
    {
      icon: 'Lock',
      title: 'Privacy First',
      description: 'We never share your personal information'
    },
    {
      icon: 'Eye',
      title: 'Transparent AI',
      description: 'Clear insights into how AI analyzes your content'
    }
  ];

  const certifications = [
    { name: 'SSL Secured', icon: 'Shield' },
    { name: 'GDPR Compliant', icon: 'CheckCircle' },
    { name: 'SOC 2 Certified', icon: 'Award' }
  ];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-heading font-medium text-text-primary mb-4 text-center">
          Your Data is Safe with Us
        </h3>
        
        <div className="space-y-4">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={feature.icon} size={16} className="text-success" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-text-primary">{feature.title}</h4>
                <p className="text-xs text-text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="flex justify-center items-center space-x-6">
        {certifications.map((cert, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Icon name={cert.icon} size={16} className="text-success" />
            <span className="text-xs text-text-secondary">{cert.name}</span>
          </div>
        ))}
      </div>

      {/* Data Protection Notice */}
      <div className="text-center">
        <p className="text-xs text-text-secondary leading-relaxed">
          By creating an account, you're joining thousands of users who trust NeuroScribe 
          with their productivity and wellness journey. Your emotional data stays private 
          and is used only to provide personalized insights.
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;