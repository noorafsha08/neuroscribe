import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      content: "NeuroScribe helped me understand my productivity patterns. The emotional insights are incredibly accurate and helpful.",
      rating: 5,
      emotionalTag: "focused"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Software Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      content: "The AI-powered wellness recommendations have transformed how I manage stress during intense coding sessions.",
      rating: 5,
      emotionalTag: "calm"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Graduate Student",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      content: "Perfect for research notes! The emotional context helps me track my learning journey and mental state.",
      rating: 5,
      emotionalTag: "energized"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const getEmotionalColor = (tag) => {
    const colors = {
      focused: 'text-focused',
      calm: 'text-calm',
      energized: 'text-energized',
      creative: 'text-secondary'
    };
    return colors[tag] || 'text-neutral';
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="text-center space-y-4">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={currentTestimonial.avatar}
              alt={currentTestimonial.name}
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full emotional-indicator ${currentTestimonial.emotionalTag}`} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="flex justify-center space-x-1">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <Icon key={i} name="Star" size={16} className="text-warning fill-current" />
            ))}
          </div>
          
          <blockquote className="text-sm text-text-primary italic leading-relaxed">
            "{currentTestimonial.content}"
          </blockquote>
          
          <div>
            <p className="text-sm font-medium text-text-primary">
              {currentTestimonial.name}
            </p>
            <p className="text-xs text-text-secondary">
              {currentTestimonial.role}
            </p>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;