# University Money Tracker

A comprehensive money tracking tool designed specifically for university students to manage their income and expenses.

## Features

### 💰 Income Tracking
- **Part-time Jobs**: Track earnings from campus jobs, internships, and part-time work
- **Scholarships & Financial Aid**: Monitor scholarship payments and financial aid disbursements
- **Family Support**: Record family contributions and support
- **Freelance Work**: Track tutoring, research assistant work, and side hustles
- **Investment Returns**: Monitor any investment income

### 💸 Expense Tracking
- **Academic Expenses**: Tuition, books, supplies, and course materials
- **Living Costs**: Housing, rent, utilities, and groceries
- **Transportation**: Public transport, gas, and vehicle maintenance
- **Entertainment**: Movies, games, social activities, and subscriptions
- **Health & Personal**: Medical expenses, personal care, and clothing
- **Technology**: Laptops, software, and tech accessories

### 📊 Dashboard & Analytics
- **Financial Overview**: Total balance, monthly income/expenses
- **Visual Charts**: Income vs expense trends
- **Recent Transactions**: Quick view of latest activity
- **Quick Stats**: Transaction counts and averages

### 🎯 Budget Management
- **Category-based Budgets**: Set limits for different expense categories
- **Progress Tracking**: Visual progress bars and warnings
- **Budget Alerts**: Notifications when approaching or exceeding limits
- **Flexible Periods**: Weekly, monthly, or yearly budget cycles

### 🔍 Advanced Features
- **Transaction Filtering**: Filter by type, category, or date range
- **Search Functionality**: Find transactions quickly
- **Data Export**: Export your financial data
- **Responsive Design**: Works on desktop, tablet, and mobile

## Student-Specific Categories

### Income Sources
- Part-time Job
- Internship
- Scholarship
- Financial Aid
- Family Support
- Freelance Work
- Tutoring
- Research Assistant
- Teaching Assistant
- Campus Job
- Side Hustle
- Investment Returns
- Refunds
- Other

### Expense Categories
- Tuition & Fees
- Books & Supplies
- Housing & Rent
- Food & Groceries
- Transportation
- Entertainment
- Health & Medical
- Clothing
- Technology
- Utilities
- Phone & Internet
- Insurance
- Personal Care
- Travel
- Emergency Fund
- Other

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd university-money-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

This project is optimized for Vercel deployment:

1. **Connect to Vercel**: Link your GitHub repository to Vercel
2. **Automatic Deployment**: Vercel will automatically deploy on every push
3. **Environment Variables**: No additional configuration needed
4. **Static Export**: The app uses static export for optimal performance

### Manual Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to configure your deployment

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Charts**: Recharts
- **Storage**: Local Storage (client-side)
- **TypeScript**: Full type safety

## Data Storage

The application uses browser localStorage for data persistence, making it:
- **Fast**: No server requests needed
- **Private**: Data stays on your device
- **Offline**: Works without internet connection
- **Portable**: Easy to backup and restore

## Features for Students

### Budget-Friendly Design
- **Free to Use**: No subscription fees
- **Privacy-Focused**: Data stays on your device
- **Student Categories**: Pre-configured for student life
- **Mobile-Friendly**: Track expenses on the go

### Academic Integration
- **Semester Planning**: Plan budgets for academic terms
- **Financial Aid Tracking**: Monitor scholarship and aid disbursements
- **Campus Life**: Categories for campus dining, activities, and services
- **Study Abroad**: Track expenses for international programs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your own money tracking needs!

## Support

For questions or issues, please open an issue on GitHub.

---

**Made with ❤️ for university students**
