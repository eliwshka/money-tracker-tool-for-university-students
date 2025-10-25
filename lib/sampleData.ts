import { Transaction } from './types';

export const sampleTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 500,
    category: 'Part-time Job',
    description: 'Campus bookstore cashier',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: '2',
    type: 'expense',
    amount: 1200,
    category: 'Housing & Rent',
    description: 'Monthly rent',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: '3',
    type: 'expense',
    amount: 300,
    category: 'Food & Groceries',
    description: 'Weekly groceries',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: '4',
    type: 'expense',
    amount: 50,
    category: 'Transportation',
    description: 'Bus pass',
    date: new Date().toISOString().split('T')[0],
  },
  {
    id: '5',
    type: 'expense',
    amount: 200,
    category: 'Books & Supplies',
    description: 'Textbooks for semester',
    date: new Date().toISOString().split('T')[0],
  },
];

export const addSampleData = () => {
  if (typeof window === 'undefined') return;
  
  const existingTransactions = localStorage.getItem('university-money-tracker-transactions');
  if (!existingTransactions || JSON.parse(existingTransactions).length === 0) {
    localStorage.setItem('university-money-tracker-transactions', JSON.stringify(sampleTransactions));
    window.location.reload();
  }
};
