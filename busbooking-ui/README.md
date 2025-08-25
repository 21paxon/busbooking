# BusBooking UI - Professional Angular Frontend

A modern, professional bus booking application built with Angular 18 and standalone components.

## ✨ Features

### 🎨 Professional Design
- **Modern UI/UX** with gradient backgrounds and smooth animations
- **Responsive Design** that works on all devices
- **Professional Color Scheme** with consistent branding
- **Smooth Transitions** and hover effects throughout

### 🧭 Navigation & Layout
- **Sticky Header** with gradient background and professional logo
- **Responsive Navigation** with active state indicators
- **User Menu** with avatar and dropdown functionality
- **Professional Footer** with company information and social links

### 🚌 Core Functionality
- **Trips Page** with hero section, search form, and trip cards
- **My Bookings** page to view and manage reservations
- **Contact Form** with professional styling and validation
- **Search & Filter** capabilities for finding trips

### 🎯 Component Architecture
- **Standalone Components** for better tree-shaking
- **Reusable UI Components** with consistent styling
- **Service Layer** for API communication
- **Responsive Grid System** for optimal layouts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Angular CLI 18+

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Development
```bash
# Generate new component
ng generate component components/my-component

# Generate new service
ng generate service services/my-service

# Run tests
npm test
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── header/         # Navigation header
│   │   └── footer/         # Site footer
│   ├── core/               # Core services and interfaces
│   │   └── services/       # API services
│   ├── features/           # Feature components
│   │   ├── trips/          # Trips listing and search
│   │   ├── bookings/       # User bookings management
│   │   └── contact/        # Contact form and info
│   ├── app.component.ts    # Main app component
│   ├── app.routes.ts       # Application routing
│   └── app.config.ts       # App configuration
├── styles.css              # Global styles and utilities
└── main.ts                 # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#667eea → #764ba2)
- **Success**: Green gradient (#059669 → #10b981)
- **Background**: Light gray (#f8fafc → #e2e8f0)
- **Text**: Dark gray (#1f2937)
- **Muted**: Medium gray (#6b7280)

### Typography
- **Font Family**: System fonts (San Francisco, Segoe UI, Roboto)
- **Headings**: Bold weights (600-800)
- **Body Text**: Regular weight with optimal line height

### Components
- **Cards**: White background with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with backdrop blur

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (adjusted grid)
- **Mobile**: < 768px (stacked layout)

### Mobile-First Approach
- Responsive navigation that collapses to icons
- Touch-friendly button sizes
- Optimized spacing for mobile devices
- Flexible grid system that adapts to screen size

## 🔧 Technical Features

### Performance
- **Standalone Components** for better tree-shaking
- **Lazy Loading** ready routing structure
- **Optimized Images** with SVG icons
- **CSS Variables** for consistent theming

### Accessibility
- **Semantic HTML** structure
- **ARIA Labels** for screen readers
- **Keyboard Navigation** support
- **Color Contrast** compliance

### Browser Support
- **Modern Browsers** (Chrome, Firefox, Safari, Edge)
- **ES2020+** JavaScript features
- **CSS Grid** and Flexbox layouts
- **CSS Custom Properties** (variables)

## 🚀 Deployment

### Build Commands
```bash
# Development build
npm run build

# Production build with optimization
npm run build --configuration production

# Preview production build
npm run preview
```

### Environment Configuration
- Configure API endpoints in `proxy.conf.json`
- Set environment variables for different deployments
- Optimize bundle size for production

## 🤝 Contributing

1. Follow the existing code style and architecture
2. Use standalone components for new features
3. Maintain responsive design principles
4. Add proper TypeScript types and interfaces
5. Include responsive design considerations
6. Test on multiple devices and screen sizes

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review the component examples
- Contact the development team
- Submit issues through the project repository

---

**Built with ❤️ using Angular 18 and modern web technologies**
