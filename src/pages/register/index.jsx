import React from 'react';
import { Helmet } from 'react-helmet';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import WelcomeHeader from './components/WelcomeHeader';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import TestimonialCarousel from './components/TestimonialCarousel';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Register - NeuroScribe | AI-Powered Productivity & Wellness</title>
        <meta name="description" content="Join NeuroScribe to experience AI-powered note-taking with emotional insights, smart task management, and personalized wellness recommendations." />
        <meta name="keywords" content="AI productivity, emotional wellness, note-taking, task management, sentiment analysis" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <ContextualHeader />
        
        <main className="lg:ml-64 pb-16 lg:pb-0">
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              
              {/* Left Column - Welcome & Info */}
              <div className="space-y-8">
                <WelcomeHeader />
                
                {/* Desktop Testimonial */}
                <div className="hidden lg:block">
                  <TestimonialCarousel />
                </div>
                
                {/* Trust Signals */}
                <div className="hidden lg:block">
                  <TrustSignals />
                </div>
              </div>

              {/* Right Column - Registration Form */}
              <div className="space-y-8">
                <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-soft-lg">
                  <div className="mb-6">
                    <h2 className="text-xl font-heading font-semibold text-text-primary mb-2">
                      Create Your Account
                    </h2>
                    <p className="text-sm text-text-secondary">
                      Start your journey to mindful productivity
                    </p>
                  </div>
                  
                  <RegistrationForm />
                </div>

                {/* Mobile Testimonial */}
                <div className="lg:hidden">
                  <TestimonialCarousel />
                </div>

                {/* Mobile Trust Signals */}
                <div className="lg:hidden">
                  <TrustSignals />
                </div>
              </div>
            </div>

            {/* Bottom CTA Section */}
            <div className="mt-16 text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-8">
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                Ready to Transform Your Productivity?
              </h3>
              <p className="text-sm text-text-secondary mb-4 max-w-2xl mx-auto">
                Join thousands of professionals who use NeuroScribe to enhance their productivity 
                while maintaining emotional wellness. Experience the power of AI-driven insights 
                tailored to your unique work patterns and emotional states.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-xs text-text-secondary">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Free 14-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <BottomTabNavigation />
      </div>
    </>
  );
};

export default Register;