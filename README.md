# TextFlow - Virtual Phone Number Platform

A modern React TypeScript application for managing virtual phone numbers and SMS communications.

## 🚀 Features

- **Modern Tech Stack**: Built with Vite, React, TypeScript, and Tailwind CSS
- **Custom Design System**: Dopamine-driven color palette for optimal user experience
- **Responsive Design**: Mobile-first approach with responsive components
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Accessible Components**: Built with Headless UI for accessibility

## 🎨 Design System

### Color Palette
- **Ocean Blue** (`ocean-*`): Primary brand color for trust and navigation
- **Success Green** (`success-*`): Achievement and confirmation states
- **Energy Orange** (`energy-*`): Notifications and call-to-action elements
- **Neutral Gray** (`neutral-*`): Text, borders, and background elements

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, etc.)
│   ├── layout/       # Layout components (Header, etc.)
│   └── dashboard/    # Dashboard-specific components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── styles/           # Global styles and CSS modules
```

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **UI Components**: Headless UI
- **Routing**: React Router DOM
- **Utilities**: clsx for conditional classes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TextFlow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🎯 Key Components

### Button Component
A flexible button component with multiple variants and sizes:
- **Variants**: primary, secondary, success, energy
- **Sizes**: sm, md, lg
- **Features**: Disabled state, custom styling, accessibility

### Header Component
Responsive navigation header with:
- Mobile-friendly hamburger menu
- Logo and branding
- Navigation links
- Smooth transitions

## 📝 Type Definitions

The project includes comprehensive TypeScript definitions for:
- Phone numbers and their properties
- Message objects and statuses
- User profiles and plans
- Dashboard statistics

## 🎨 Customization

### Adding New Colors
Edit `tailwind.config.js` to add new color variants to the design system.

### Component Styling
All components use the custom color system and can be styled using Tailwind classes with the custom color palette.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository.
