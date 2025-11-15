# Kodicos Crackers - E-Commerce Platform

A modern e-commerce platform for boutiques, tailors, and customers built with React and Vite. This platform connects fashion businesses with customers, providing tools for order management, product showcase, and streamlined commerce operations.

## 🚀 Features

- **Multi-User Support**: Boutiques, tailors, and customers
- **Product Management**: Complete CRUD operations for products
- **Order Management**: Track and manage orders
- **Payment Integration**: Secure payment processing with Guiddini ePay
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Comprehensive form validation system
- **Real-time Updates**: Dynamic content updates
- **PDF Export**: Order and invoice generation

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── api/                    # API services and integrations
│   ├── auth.js            # Authentication services
│   ├── paymentService.js  # Payment API integration
│   └── mock*.js           # Mock data for development
├── components/            # Reusable UI components
│   ├── FormInput.jsx      # Form input with validation
│   ├── Navbar.jsx         # Navigation component
│   ├── Sidebar.jsx        # Sidebar navigation
│   └── Modals/            # Modal components
├── pages/                 # Route components
│   ├── Home.jsx           # Landing page
│   ├── Auth/              # Login/Signup pages
│   ├── Boutiques/         # Boutique management
│   ├── Products/          # Product management
│   └── Orders/            # Order management
├── hooks/                 # Custom React hooks
│   └── useFormValidation.js # Form validation logic
├── context/               # React Context providers
│   └── CartContext.jsx    # Shopping cart state
└── utils/                 # Utility functions
    └── pdfExport.js       # PDF generation utilities
```

### System Flow
```
┌─────────────────────────────────────────────────────────────────┐
│                    KODICOS CRACKERS SYSTEM                      │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐    ┌──────────────────────┐    ┌──────────────────────┐
│      CUSTOMERS       │    │      BOUTIQUES       │    │       TAILORS        │
│                      │    │                      │    │                      │
│ - Browse Products    │    │ - Manage Products    │    │ - Create Orders      │
│ - Place Orders       │    │ - View Orders        │    │ - Manage Services    │
│ - Make Payments      │    │ - Track Sales        │    │ - Customer Relations │
└──────────────────────┘    └──────────────────────┘    └──────────────────────┘
           │                           │                           │
           └─────────────────┬─────────────────┬─────────────────┘
                            │                 │
                    ┌───────────────────────────────────┐
                    │        CORE PLATFORM             │
                    │                                   │
                    │ - Authentication System           │
                    │ - Product Catalog                 │
                    │ - Order Management                │
                    │ - Payment Processing              │
                    │ - Form Validation                 │
                    └───────────────────────────────────┘
                                      │
                              ┌───────────────────┐
                              │  EXTERNAL APIs    │
                              │                   │
                              │ - Guiddini ePay   │
                              │ - Payment Gateway │
                              └───────────────────┘
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 
- **Styling**: Tailwind CSS 4.1.17
- **Routing**: React Router DOM 7.9.5
- **HTTP Client**: Axios 1.13.2
- **Icons**: Lucide React 0.553.0
- **Development**: ESLint, Hot Module Replacement

## 💳 Payment Integration

This project integrates with **Guiddini ePay**, an Algerian payment gateway service.

### Payment API Configuration
- **Base URL**: `https://epay.guiddini.dz/api`
- **Login URL**: `https://epay.guiddini.dz/user/login`
- **Documentation**: `https://www.guiddini.dz/docs/api/initiate`
- **Supported Languages**: French (FR), English (EN), Arabic (AR)
- **Payment Methods**: Local Algerian payment methods

### Payment Service Features
- Secure payment processing
- Transaction status tracking
- Multi-language support
- Development mode simulation
- Error handling and retry logic

### Test Credentials & Environment Setup

⚠️ **Note**: Payment integration is currently in development. The API code structure is implemented but not fully functional yet.

#### Development Account
```bash
# Guiddini ePay Test Account
Email: groupe4@guiddini.com
Password: xv82DFy3mnE6
```

#### Test Credit Card Information
```bash
# Test Card Details (for development/testing only)
Card Number: 6280580610061011
CVV2: 992
Expiration Date: 01/2027
Cardholder Name: Davy jones
Card Password: 123456
```

#### Environment Variables for Payment
```bash
VITE_PAYMENT_KEY=your_app_key_here
VITE_PAYMENT_SECRET=your_app_secret_here
VITE_PAYMENT_BASE_URL=https://epay.guiddini.dz/api
```

### Implementation Status
- ✅ Payment service structure implemented
- ✅ API client configuration ready
- ✅ Test credentials configured
- ⚠️ **Payment flow integration in progress**
- ⚠️ **Full transaction processing pending**

## 📦 Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Step-by-Step Installation

1. **Clone the repository**
```bash
git clone https://github.com/Crackers-kodikos/frontend.git
cd kodicos-hackathon-crackers
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```bash
# Payment Configuration (Guiddini ePay)
VITE_PAYMENT_KEY=your_payment_app_key
VITE_PAYMENT_SECRET=your_payment_secret_key

# API Configuration
VITE_API_BASE_URL=your_backend_api_url
```

4. **Start development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
```

6. **Preview production build**
```bash
npm run preview
```

### Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🚀 Project Structure

### Key Directories

- **`/src/api/`**: Contains all API service integrations including authentication, payment processing, and mock data for development
- **`/src/components/`**: Reusable UI components with consistent styling and behavior
- **`/src/pages/`**: Route-specific components organized by feature areas
- **`/src/hooks/`**: Custom React hooks for shared logic
- **`/src/context/`**: React Context providers for global state management
- **`/src/utils/`**: Utility functions and helpers

### Main Features

1. **Authentication System**
   - User registration and login
   - Role-based access (Customer, Boutique, Tailor)
   - Session management

2. **Product Management**
   - CRUD operations for products
   - Image upload and management
   - Category organization

3. **Order System**
   - Order creation and tracking
   - Status updates
   - Order history

4. **Payment Processing**
   - Secure payment gateway integration
   - Transaction management
   - Payment status tracking

## 🔒 Security Features

- Input validation and sanitization
- Secure payment processing
- Environment-based configuration
- Error handling and logging

## 📱 Responsive Design

The application is built with a mobile-first approach using Tailwind CSS, ensuring optimal user experience across all devices.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team Crackers

Developed with ❤️ by Team Crackers for the Kodicos Hackathon.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

