import { Transaction, Budget, FinancialOverview } from './types';

// Re-export types for external use
export type { FinancialOverview } from './types';

const STORAGE_KEYS = {
  TRANSACTIONS: 'university-money-tracker-transactions',
  BUDGETS: 'university-money-tracker-budgets',
} as const;

export const storage = {
  // Transaction management
  getTransactions: (): Transaction[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return stored ? JSON.parse(stored) : [];
  },

  saveTransaction: (transaction: Transaction): void => {
    if (typeof window === 'undefined') return;
    const transactions = storage.getTransactions();
    const updated = [...transactions, transaction];
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
  },

  updateTransaction: (id: string, updates: Partial<Transaction>): void => {
    if (typeof window === 'undefined') return;
    const transactions = storage.getTransactions();
    const updated = transactions.map(t => 
      t.id === id ? { ...t, ...updates } : t
    );
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
  },

  deleteTransaction: (id: string): void => {
    if (typeof window === 'undefined') return;
    const transactions = storage.getTransactions();
    const updated = transactions.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updated));
  },

  // Budget management
  getBudgets: (): Budget[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    return stored ? JSON.parse(stored) : [];
  },

  saveBudget: (budget: Budget): void => {
    if (typeof window === 'undefined') return;
    const budgets = storage.getBudgets();
    const updated = [...budgets, budget];
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(updated));
  },

  updateBudget: (id: string, updates: Partial<Budget>): void => {
    if (typeof window === 'undefined') return;
    const budgets = storage.getBudgets();
    const updated = budgets.map(b => 
      b.id === id ? { ...b, ...updates } : b
    );
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(updated));
  },

  deleteBudget: (id: string): void => {
    if (typeof window === 'undefined') return;
    const budgets = storage.getBudgets();
    const updated = budgets.filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(updated));
  },

  // Financial calculations
  getFinancialOverview: (): FinancialOverview => {
    const transactions = storage.getTransactions();
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const allIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const allExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyIncome = transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.type === 'income' && 
               date.getMonth() === currentMonth && 
               date.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = transactions
      .filter(t => {
        const date = new Date(t.date);
        return t.type === 'expense' && 
               date.getMonth() === currentMonth && 
               date.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome: allIncome,
      totalExpenses: allExpenses,
      balance: allIncome - allExpenses,
      monthlyIncome,
      monthlyExpenses,
    };
  },
};
