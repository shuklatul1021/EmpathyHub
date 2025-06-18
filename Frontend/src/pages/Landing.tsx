import React from 'react';
import { Heart, ArrowRight, Sparkles, Shield, Users, MessageCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Logo from "../public/black_circle_360x360.png"

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-black/20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-primary animate-pulse" />
              <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
                EmpathyHub
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">About</a>
              <a href="/features" className="text-sm text-gray-300 hover:text-white transition-colors">Features</a>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/login'}
                className="text-gray-300 hover:text-black"
              >
                Login
              </Button>
              <Button 
                onClick={() => window.location.href = '/signup'}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Get Started
              </Button>
              <div>
                <a title="Powered By Bolt" href="https://bolt.new" target="_blank">
                  <img className='h-[50px]' src={Logo} ></img>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

            <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://bolt.new"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-500 font-bold text-sm">⚡</span>
            </div>
            <span className="font-semibold text-sm">Built with Bolt.new</span>
          </div>
        </a>
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
        {/* Gradient Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent/30 blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6 space-x-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-gray-300">AI-Powered Mental Health Support</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">
              Empathy Meets
            </span>
            <br />
            <span className="mt-2 block">Intelligence</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg sm:text-xl text-gray-300 mb-12">
            Experience the future of mental health support. Connect with understanding peers through our AI-powered platform that matches you with the right support at the right time.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              onClick={() => window.location.href = '/signup'}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Start Your Journey
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => window.location.href = '/demo'}
              className="w-full sm:w-auto border-gray-700 text-gray-300 hover:bg-white/5"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative py-24 bg-black/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transition-transform group-hover:-translate-y-1">
                <Users className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                <p className="text-gray-400">Our AI understands your unique journey and connects you with peers who truly understand.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transition-transform group-hover:-translate-y-1">
                <MessageCircle className="h-8 w-8 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-400">Access a supportive community and resources whenever you need them, day or night.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-2xl blur-xl transition-all group-hover:blur-2xl"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 transition-transform group-hover:-translate-y-1">
                <Shield className="h-8 w-8 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
                <p className="text-gray-400">Your privacy is our priority. All conversations are end-to-end encrypted and secure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Journey?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands who have found support, understanding, and growth through our platform.
            </p>
            <Button
              size="lg"
              onClick={() => window.location.href = '/signup'}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;