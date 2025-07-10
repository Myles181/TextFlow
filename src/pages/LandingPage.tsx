import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Globe, 
  Shield, 
  DollarSign, 
  CheckCircle, 
  Star, 
  Users, 
  ArrowRight,
  Play,
  Zap,
  Lock,
  Award
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  const [userCount, setUserCount] = useState(50000);
  const [isVisible, setIsVisible] = useState(false);

  // Animate user count on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('user-count');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Animate user count
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setUserCount(prev => {
          if (prev < 50000) {
            return prev + 100;
          }
          return prev;
        });
      }, 50);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const features = [
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Keep your personal number private with a dedicated virtual number',
      color: 'ocean'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Get local numbers from 50+ countries for international connections',
      color: 'energy'
    },
    {
      icon: DollarSign,
      title: 'Cost Savings',
      description: 'Save up to 80% on international calls and messaging',
      color: 'success'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Business Owner',
      content: 'TextFlow has transformed how I communicate with international clients. The cost savings are incredible!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Digital Nomad',
      content: 'Having local numbers wherever I travel has made staying connected so much easier.',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Freelancer',
      content: 'The privacy features are amazing. I can keep my personal and work communications separate.',
      rating: 5
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'ocean':
        return 'bg-ocean-50 text-ocean-600 border-ocean-200';
      case 'energy':
        return 'bg-energy-50 text-energy-600 border-energy-200';
      case 'success':
        return 'bg-success-50 text-success-600 border-success-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-white to-energy-50">
      {/* Navigation */}
      <nav className="relative z-10 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ocean-500 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TextFlow</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-ocean-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-ocean-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-ocean-600 transition-colors">Reviews</a>
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button variant="ocean">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-ocean-100 text-ocean-700 rounded-full text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  Limited time: Free setup (usually $10)
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Get Your Virtual Phone Number in{' '}
                  <span className="text-ocean-600">Minutes</span>
                </h1>
                
                <p className="text-xl text-gray-600 max-w-2xl">
                  Stay connected globally with local numbers. Perfect for business, travel, and privacy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button variant="energy" size="lg" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  <span>Setup in 2 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success-500" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-success-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-warning-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-error-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-gray-500">TextFlow Dashboard</div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-ocean-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-ocean-600">+1 (555) 123-4567</div>
                    <div className="text-sm text-ocean-600">Your active number</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-gray-900">127</div>
                      <div className="text-xs text-gray-500">Call Minutes</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-bold text-gray-900">89</div>
                      <div className="text-xs text-gray-500">Messages</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-success-500 text-white px-3 py-1 rounded-full text-sm font-medium animate-bounce">
                Active
              </div>
              <div className="absolute -bottom-4 -left-4 bg-energy-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                $45.75 saved
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-2">
            Trusted by{' '}
            <span id="user-count" className="font-bold text-ocean-600">
              {userCount.toLocaleString()}+
            </span>{' '}
            users worldwide
          </p>
          <div className="flex justify-center items-center space-x-8 text-gray-400">
            <div className="flex items-center space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
              <span className="ml-2 text-sm">4.9/5 rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay connected
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get a virtual phone number that works like your regular number, but with powerful features for privacy and global connectivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${getColorClasses(feature.color)}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-4 sm:px-6 lg:px-8 py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Loved by users worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying about TextFlow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-ocean-500 to-energy-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-xl text-ocean-100 mb-8">
            Join thousands of users who are already enjoying the benefits of virtual phone numbers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="white" size="lg">
                Get Your Free Number
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-ocean-500">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-ocean-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TextFlow</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for virtual phone numbers and global communication.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TextFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}; 