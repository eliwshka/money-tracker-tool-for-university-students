'use client';

import { useState, useEffect } from 'react';
import { storage, FinancialOverview } from '@/lib/storage';
import { Transaction } from '@/lib/types';
import Dashboard from '@/components/Dashboard';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import BudgetManager from '@/components/BudgetManager';
import { Plus, TrendingUp, TrendingDown, DollarSign, Database } from 'lucide-react';
import { addSampleData } from '@/lib/sampleData';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions' | 'budgets'>('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [overview, setOverview] = useState<FinancialOverview>({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
  });

  useEffect(() => {
    const loadData = () => {
      const storedTransactions = storage.getTransactions();
      const financialOverview = storage.getFinancialOverview();
      setTransactions(storedTransactions);
      setOverview(financialOverview);
    };

    loadData();
  }, []);

  const handleTransactionAdded = (transaction: Transaction) => {
    storage.saveTransaction(transaction);
    const updatedTransactions = storage.getTransactions();
    const updatedOverview = storage.getFinancialOverview();
    setTransactions(updatedTransactions);
    setOverview(updatedOverview);
  };

  const handleTransactionDeleted = (id: string) => {
    storage.deleteTransaction(id);
    const updatedTransactions = storage.getTransactions();
    const updatedOverview = storage.getFinancialOverview();
    setTransactions(updatedTransactions);
    setOverview(updatedOverview);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-primary-600 p-2 rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">University Money Tracker</h1>
                <p className="text-sm text-gray-600">Track your student finances</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {transactions.length === 0 && (
                <button
                  onClick={() => {
                    addSampleData();
                  }}
                  className="btn-secondary flex items-center space-x-2"
                  title="Load sample data for testing"
                >
                  <Database className="h-4 w-4" />
                  <span>Load Sample Data</span>
                </button>
              )}
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className={`text-2xl font-bold ${overview.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${overview.balance.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transactions'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('budgets')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'budgets'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Budgets
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard overview={overview} transactions={transactions} />
        )}
        
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
              <TransactionForm onTransactionAdded={handleTransactionAdded} />
            </div>
            <TransactionList 
              transactions={transactions} 
              onTransactionDeleted={handleTransactionDeleted}
            />
          </div>
        )}
        
        {activeTab === 'budgets' && (
          <BudgetManager />
        )}
      </main>
    </div>
  );
}
