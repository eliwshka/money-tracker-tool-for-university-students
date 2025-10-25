'use client';

import { useState, useEffect } from 'react';
import { Budget, EXPENSE_CATEGORIES, Transaction } from '@/lib/types';
import { storage } from '@/lib/storage';
import { Target, Plus, Trash2, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export default function BudgetManager() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    limit: '',
    period: 'monthly' as 'monthly' | 'weekly' | 'yearly',
  });

  useEffect(() => {
    const loadData = () => {
      const storedBudgets = storage.getBudgets();
      const storedTransactions = storage.getTransactions();
      setBudgets(storedBudgets);
      setTransactions(storedTransactions);
    };
    loadData();
  }, []);

  // Refresh data when transactions change
  const refreshData = () => {
    const storedBudgets = storage.getBudgets();
    const storedTransactions = storage.getTransactions();
    setBudgets(storedBudgets);
    setTransactions(storedTransactions);
  };

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newBudget.category || !newBudget.limit) {
      alert('Please fill in all required fields');
      return;
    }

    const budget: Budget = {
      id: Date.now().toString(),
      category: newBudget.category,
      limit: parseFloat(newBudget.limit),
      spent: 0, // This will be calculated dynamically from transactions
      period: newBudget.period,
    };

    storage.saveBudget(budget);
    setBudgets(storage.getBudgets());
    
    // Reset form
    setNewBudget({
      category: '',
      limit: '',
      period: 'monthly',
    });
    setIsAddingBudget(false);
  };

  const handleDeleteBudget = (id: string) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      storage.deleteBudget(id);
      setBudgets(storage.getBudgets());
    }
  };

  const calculateSpentAmount = (budget: Budget): number => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentWeek = Math.ceil(now.getDate() / 7);

    return transactions
      .filter(transaction => {
        if (transaction.type !== 'expense' || transaction.category !== budget.category) {
          return false;
        }

        const transactionDate = new Date(transaction.date);
        const transactionMonth = transactionDate.getMonth();
        const transactionYear = transactionDate.getFullYear();
        const transactionWeek = Math.ceil(transactionDate.getDate() / 7);

        switch (budget.period) {
          case 'monthly':
            return transactionMonth === currentMonth && transactionYear === currentYear;
          case 'weekly':
            return transactionWeek === currentWeek && transactionMonth === currentMonth && transactionYear === currentYear;
          case 'yearly':
            return transactionYear === currentYear;
          default:
            return false;
        }
      })
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  };

  const getBudgetStatus = (budget: Budget) => {
    const spentAmount = calculateSpentAmount(budget);
    const percentage = (spentAmount / budget.limit) * 100;
    if (percentage >= 100) return 'exceeded';
    if (percentage >= 80) return 'warning';
    return 'good';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeded': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'exceeded': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Budget Management</h2>
          <p className="text-gray-600">Set and track your spending limits</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={refreshData}
            className="btn-secondary flex items-center space-x-2"
            title="Refresh budget data"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setIsAddingBudget(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Budget</span>
          </button>
        </div>
      </div>

      {/* Add Budget Form */}
      {isAddingBudget && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Budget</h3>
          <form onSubmit={handleAddBudget} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={newBudget.category}
                  onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select category</option>
                  {EXPENSE_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Limit *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={newBudget.limit}
                  onChange={(e) => setNewBudget({ ...newBudget, limit: e.target.value })}
                  className="input-field"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period
                </label>
                <select
                  value={newBudget.period}
                  onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value as 'monthly' | 'weekly' | 'yearly' })}
                  className="input-field"
                >
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button type="submit" className="btn-primary">
                Create Budget
              </button>
              <button
                type="button"
                onClick={() => setIsAddingBudget(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Budget List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Budgets</h3>
        
        {budgets.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Target className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500">No budgets set yet</p>
            <p className="text-sm text-gray-400 mt-1">Create your first budget to start tracking</p>
          </div>
        ) : (
          <div className="space-y-4">
            {budgets.map((budget) => {
              const spentAmount = calculateSpentAmount(budget);
              const status = getBudgetStatus(budget);
              const percentage = Math.min((spentAmount / budget.limit) * 100, 100);
              
              return (
                <div key={budget.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{budget.category}</h4>
                        <p className="text-sm text-gray-600 capitalize">{budget.period} budget</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          ${spentAmount.toFixed(2)} / ${budget.limit.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {percentage.toFixed(1)}% used
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteBudget(budget.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete budget"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        status === 'exceeded' ? 'bg-red-500' :
                        status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  
                  {status === 'exceeded' && (
                    <p className="text-sm text-red-600 mt-2">
                      ⚠️ Budget exceeded by ${(spentAmount - budget.limit).toFixed(2)}
                    </p>
                  )}
                  {status === 'warning' && (
                    <p className="text-sm text-yellow-600 mt-2">
                      ⚠️ Close to budget limit
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Budget Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Budget Tips for Students</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Set realistic budgets based on your actual income and needs</li>
          <li>• Track your spending regularly to stay within limits</li>
          <li>• Allocate more budget for essential categories like food and housing</li>
          <li>• Leave some room for unexpected expenses</li>
          <li>• Review and adjust your budgets monthly</li>
        </ul>
      </div>
    </div>
  );
}
