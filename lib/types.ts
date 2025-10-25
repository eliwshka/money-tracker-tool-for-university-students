export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  tags?: string[];
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
}

export interface FinancialOverview {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export const INCOME_CATEGORIES = [
  'Part-time Job',
  'Internship',
  'Scholarship',
  'Financial Aid',
  'Family Support',
  'Freelance Work',
  'Tutoring',
  'Research Assistant',
  'Teaching Assistant',
  'Campus Job',
  'Side Hustle',
  'Investment Returns',
  'Refunds',
  'Other'
] as const;

export const EXPENSE_CATEGORIES = [
  'Tuition & Fees',
  'Books & Supplies',
  'Housing & Rent',
  'Food & Groceries',
  'Transportation',
  'Entertainment',
  'Health & Medical',
  'Clothing',
  'Technology',
  'Utilities',
  'Phone & Internet',
  'Insurance',
  'Personal Care',
  'Travel',
  'Emergency Fund',
  'Other'
] as const;

export type IncomeCategory = typeof INCOME_CATEGORIES[number];
export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
