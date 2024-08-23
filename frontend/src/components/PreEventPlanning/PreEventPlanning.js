import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './PreEventPlanning.css';

import BudgetManagement from './BudgetManagement';
import ContentPlanning from './ContentPlanning';
import TaskManagement from './TaskManagement';
import VendorManagement from './VendorManagement';
import FloorPlanOptimization from './FloorPlanOptimization';

const PreEventPlanning = () => {
  const [activeSection, setActiveSection] = useState('budget');
  const navigate = useNavigate();

  const sectionComponents = {
    budget: BudgetManagement,
    content: ContentPlanning,
    tasks: TaskManagement,
    vendors: VendorManagement,
    floorplan: FloorPlanOptimization
  };

  const ActiveComponent = sectionComponents[activeSection];

  return (
    <motion.div 
      className="pre-event-planning"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          className="back-button"
        >
          Back
        </motion.button>
        <h1>Pre-event Planning and Management</h1>
      </header>

      <nav className="section-nav">
        {Object.keys(sectionComponents).map((section) => (
          <motion.button
            key={section}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveSection(section)}
            className={`nav-button ${activeSection === section ? 'active' : ''}`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </motion.button>
        ))}
      </nav>

      <motion.main
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <ActiveComponent />
      </motion.main>
    </motion.div>
  );
};

export default PreEventPlanning;