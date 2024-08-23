import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BudgetManagement = () => {
  const [budget, setBudget] = useState({
    total: 100000,
    spent: 25000,
    remaining: 75000
  });
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2023-05-01', description: 'Venue booking', amount: 15000, category: 'Venue' },
    { id: 2, date: '2023-05-05', description: 'Catering deposit', amount: 10000, category: 'Food' },
  ]);

  const addExpense = (newExpense) => {
    // Implementation for adding a new expense
  };

  const downloadReport = () => {
    // Implementation for downloading the budget report
  };

  return (
    <div className="budget-management">
      <motion.div 
        className="budget-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Budget Overview</h2>
        <p>Total Budget: ${budget.total}</p>
        <p>Spent: ${budget.spent}</p>
        <p>Remaining: ${budget.remaining}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadReport}
        >
          Download Report
        </motion.button>
      </motion.div>

      <motion.div 
        className="expense-tracking"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2>Expense Tracking</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {/* Open add expense form */}}
        >
          Add Expense
        </motion.button>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <motion.tr 
                key={expense.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>${expense.amount}</td>
                <td>{expense.category}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default BudgetManagement;