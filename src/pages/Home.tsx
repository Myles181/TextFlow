import { Phone, MessageSquare, Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-neutral-100">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              TextFlow Dashboard
            </h1>
            <h2 className="text-xl font-semibold text-ocean-900 mb-6">
              Virtual Phone Number Management Platform
            </h2>
            <p className="text-sm text-neutral-600 max-w-2xl mx-auto mb-8">
              Streamline your business communications with our powerful virtual phone number solution. 
              Manage SMS, calls, and messaging workflows from one intuitive dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="bg-ocean-500 text-white px-6 py-3 rounded-lg hover:bg-ocean-900 transition-colors font-medium text-center">
                Get Started
              </Link>
              <Link to="/dashboard" className="bg-neutral-100 text-neutral-900 px-6 py-3 rounded-lg hover:bg-neutral-200 transition-colors font-medium text-center">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-neutral-200 text-center">
            <div className="w-12 h-12 bg-ocean-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-ocean-500" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Virtual Numbers</h3>
            <p className="text-sm text-neutral-600">Get local and toll-free numbers instantly</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200 text-center">
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-success-500" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">SMS Management</h3>
            <p className="text-sm text-neutral-600">Send and receive messages with ease</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200 text-center">
            <div className="w-12 h-12 bg-energy-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-energy-500" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Automation</h3>
            <p className="text-sm text-neutral-600">Automate responses and workflows</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-neutral-200 text-center">
            <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-neutral-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Security</h3>
            <p className="text-sm text-neutral-600">Enterprise-grade security and compliance</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-xl font-semibold text-ocean-900 mb-4">
            Ready to get started?
          </h2>
          <p className="text-sm text-neutral-600 mb-6">
            Join thousands of businesses using TextFlow for their communication needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-ocean-500 text-white px-6 py-3 rounded-lg hover:bg-ocean-900 transition-colors font-medium">
              Create Free Account
            </Link>
            <Link to="/login" className="bg-neutral-100 text-neutral-900 px-6 py-3 rounded-lg hover:bg-neutral-200 transition-colors font-medium">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 