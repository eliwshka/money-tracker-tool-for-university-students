'use client';

import { useState } from 'react';
import { Transaction } from '@/lib/types';
import { TrendingUp, TrendingDown, Trash2, Edit, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionDeleted: (id: string) => void;
}

export default function TransactionList({ transactions, onTransactionDeleted }: TransactionListProps) {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions
    .filter(transaction => {
      if (filter !== 'all' && transaction.type !== filter) return false;
      if (searchTerm && !transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !transaction.category.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return b.amount - a.amount;
      }
    });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      onTransactionDeleted(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Filter */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'all' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('income')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'income' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Income
            </button>
            <button
              onClick={() => setFilter('expense')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'expense' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              Expenses
            </button>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
              className="input-field"
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Transactions ({filteredTransactions.length})
        </h3>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Calendar className="h-12 w-12 mx-auto" />
            </div>
            <p className="text-gray-500">No transactions found</p>
            {searchTerm && (
              <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${
                    transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{transaction.description}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Tag className="h-3 w-3" />
                        <span>{transaction.category}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Calendar className="h-3 w-3" />
                        <span>{format(new Date(transaction.date), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete transaction"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
