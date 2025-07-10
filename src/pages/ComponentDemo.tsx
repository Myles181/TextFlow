import { useState } from 'react'
import { 
  Button, 
  Card, 
  Input, 
  Badge, 
  Heading1, 
  Heading2, 
  Heading3, 
  BodyText, 
  SmallText 
} from '../components/ui'
import { 
  Phone, 
  Mail, 
  User, 
  CheckCircle, 
  AlertCircle, 
  Star,
  ArrowRight,
  Download
} from 'lucide-react'

export function ComponentDemo() {
  const [inputValue, setInputValue] = useState('')
  const [inputError, setInputError] = useState('')
  const [inputSuccess, setInputSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    
    if (value.length > 0) {
      if (value.length < 3) {
        setInputError('Input must be at least 3 characters')
        setInputSuccess(false)
      } else {
        setInputError('')
        setInputSuccess(true)
      }
    } else {
      setInputError('')
      setInputSuccess(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <Heading1>TextFlow UI Component Library</Heading1>
          <BodyText className="mt-4">
            A comprehensive collection of dopamine-driven UI components
          </BodyText>
        </div>

        {/* Typography Section */}
        <Card className="mb-8">
          <Heading2 className="mb-6">Typography System</Heading2>
          <div className="space-y-4">
            <Heading1>Heading 1 - 28px Bold</Heading1>
            <Heading2>Heading 2 - 20px Semibold</Heading2>
            <Heading3>Heading 3 - 16px Medium</Heading3>
            <BodyText>
              Body Text - 14px Regular with proper line height for optimal readability. 
              This text demonstrates our neutral-600 color for body content.
            </BodyText>
            <SmallText>
              Small Text - 12px Regular for secondary information and captions.
            </SmallText>
          </div>
        </Card>

        {/* Button Section */}
        <Card className="mb-8">
          <Heading2 className="mb-6">Button Components</Heading2>
          
          <div className="space-y-6">
            {/* Button Variants */}
            <div>
              <Heading3 className="mb-4">Button Variants</Heading3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="success">Success Button</Button>
                <Button variant="energy">Energy Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <Heading3 className="mb-4">Button Sizes</Heading3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Button with Icons */}
            <div>
              <Heading3 className="mb-4">Buttons with Icons</Heading3>
              <div className="flex flex-wrap gap-4">
                <Button icon={<Phone className="w-4 h-4" />}>
                  Call Now
                </Button>
                <Button variant="success" icon={<CheckCircle className="w-4 h-4" />}>
                  Complete
                </Button>
                <Button variant="energy" icon={<Download className="w-4 h-4" />}>
                  Download
                </Button>
              </div>
            </div>

            {/* Button States */}
            <div>
              <Heading3 className="mb-4">Button States</Heading3>
              <div className="flex flex-wrap gap-4">
                <Button loading>Loading...</Button>
                <Button disabled>Disabled</Button>
                <Button variant="secondary" loading>Loading...</Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Card Section */}
        <Card className="mb-8">
          <Heading2 className="mb-6">Card Components</Heading2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card padding="sm" hoverable>
              <Heading3 className="mb-2">Small Padding</Heading3>
              <BodyText>Card with small padding and hover effect</BodyText>
            </Card>
            
            <Card padding="md" hoverable>
              <Heading3 className="mb-2">Medium Padding</Heading3>
              <BodyText>Card with medium padding and hover effect</BodyText>
            </Card>
            
            <Card padding="lg" hoverable>
              <Heading3 className="mb-2">Large Padding</Heading3>
              <BodyText>Card with large padding and hover effect</BodyText>
            </Card>
          </div>
        </Card>

        {/* Input Section */}
        <Card className="mb-8">
          <Heading2 className="mb-6">Input Components</Heading2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input 
                label="Email Address"
                placeholder="Enter your email"
                icon={<Mail className="w-5 h-5" />}
              />
              
              <Input 
                label="Phone Number"
                placeholder="Enter phone number"
                icon={<Phone className="w-5 h-5" />}
              />
              
              <Input 
                label="Username"
                placeholder="Enter username"
                icon={<User className="w-5 h-5" />}
              />
            </div>
            
            <div className="space-y-4">
              <Input 
                label="Interactive Input"
                placeholder="Type to see states"
                value={inputValue}
                onChange={handleInputChange}
                error={inputError}
                success={inputSuccess}
              />
              
              <Input 
                label="Disabled Input"
                placeholder="This input is disabled"
                disabled
              />
              
              <Input 
                label="Read Only Input"
                value="This is read-only content"
                readOnly
              />
            </div>
          </div>
        </Card>

        {/* Badge Section */}
        <Card className="mb-8">
          <Heading2 className="mb-6">Badge Components</Heading2>
          
          <div className="space-y-6">
            <div>
              <Heading3 className="mb-4">Badge Variants</Heading3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="energy">Energy</Badge>
              </div>
            </div>
            
            <div>
              <Heading3 className="mb-4">Badge Sizes</Heading3>
              <div className="flex flex-wrap items-center gap-4">
                <Badge size="sm">Small Badge</Badge>
                <Badge size="md">Medium Badge</Badge>
              </div>
            </div>
            
            <div>
              <Heading3 className="mb-4">Badge Examples</Heading3>
              <div className="flex flex-wrap gap-4">
                <Badge variant="success" className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </Badge>
                <Badge variant="warning" className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Pending
                </Badge>
                <Badge variant="energy" className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Premium
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Interactive Demo */}
        <Card className="mb-8">
          <Heading2 className="mb-6">Interactive Demo</Heading2>
          <BodyText className="mb-6">
            Try interacting with the components below to see the microinteractions and states in action.
          </BodyText>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => alert('Primary button clicked!')}
            >
              Try Me
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={() => alert('Ghost button clicked!')}
            >
              Hover Me
            </Button>
            
            <Badge variant="energy" className="cursor-pointer hover:scale-105">
              Click Me
            </Badge>
          </div>
        </Card>

        {/* Design System Info */}
        <Card>
          <Heading2 className="mb-6">Design System Principles</Heading2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Heading3 className="mb-3">Color Psychology</Heading3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-ocean-500 rounded"></div>
                  <SmallText>Ocean Blue - Trust & Navigation</SmallText>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-success-500 rounded"></div>
                  <SmallText>Success Green - Achievement & Feedback</SmallText>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-energy-500 rounded"></div>
                  <SmallText>Energy Orange - Urgent Actions</SmallText>
                </div>
              </div>
            </div>
            
            <div>
              <Heading3 className="mb-3">Accessibility Features</Heading3>
              <div className="space-y-2">
                <SmallText>• 44px minimum touch targets</SmallText>
                <SmallText>• 4.5:1 minimum contrast ratios</SmallText>
                <SmallText>• Focus indicators on all interactive elements</SmallText>
                <SmallText>• Smooth transitions for microinteractions</SmallText>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 