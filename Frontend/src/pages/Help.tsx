import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  HelpCircle, 
  Book, 
  MessageCircle, 
  Mail,
  Phone,
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

const Help: React.FC = () => {
  const faqs = [
    {
      question: "How do I connect with a peer supporter?",
      answer: "You can find peer supporters by visiting the 'Find Support' page. Use the filters to find someone with similar experiences, then click 'Connect' to start a conversation."
    },
    {
      question: "What should I do in a crisis?",
      answer: "If you're experiencing a mental health crisis, please contact emergency services immediately. You can find crisis hotline numbers in our 'Emergency Resources' section."
    },
    {
      question: "How does the matching system work?",
      answer: "Our AI-powered matching system analyzes your experiences, preferences, and support needs to connect you with peers who can best understand and support you."
    },
    {
      question: "Is my information private?",
      answer: "Yes, your privacy is our priority. All conversations are encrypted, and you can control your privacy settings in your account preferences."
    },
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Learn how to make the most of our platform",
      icon: <Book className="h-6 w-6" />,
    },
    {
      title: "Community Guidelines",
      description: "Understanding our community rules and values",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      title: "Safety Resources",
      description: "Important information about mental health safety",
      icon: <HelpCircle className="h-6 w-6" />,
    },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        <p className="mt-2 text-gray-600">
          Find answers to common questions and get the support you need
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="flex items-center animate-fade-in">
            <div className="mr-4 rounded-full bg-primary/10 p-3">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Live Chat</h3>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </div>
          </Card>
          
          <Card className="flex items-center animate-fade-in">
            <div className="mr-4 rounded-full bg-accent/10 p-3">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-medium">Email Support</h3>
              <p className="text-sm text-gray-500">Response in 24h</p>
            </div>
          </Card>
          
          <Card className="flex items-center animate-fade-in">
            <div className="mr-4 rounded-full bg-success/10 p-3">
              <Phone className="h-6 w-6 text-success" />
            </div>
            <div>
              <h3 className="font-medium">Phone Support</h3>
              <p className="text-sm text-gray-500">Mon-Fri 9-5 EST</p>
            </div>
          </Card>
        </div>

        {/* FAQs */}
        <Card className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <button
                  className="w-full text-left"
                  onClick={() => {}}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{faq.question}</h3>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Help Resources */}
        <Card className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Help Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {resources.map((resource, index) => (
              <button
                key={index}
                className="p-4 rounded-lg border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors text-left"
              >
                <div className="flex items-center mb-2">
                  <div className="text-primary">{resource.icon}</div>
                  <ExternalLink className="h-4 w-4 ml-2 text-gray-400" />
                </div>
                <h3 className="font-medium mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.description}</p>
              </button>
            ))}
          </div>
        </Card>

        {/* Contact Form */}
        <Card className="animate-fade-in">
          <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                placeholder="What can we help you with?"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:ring-primary"
                placeholder="Describe your issue in detail"
              />
            </div>
            
            <Button type="submit" fullWidth>
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Help;