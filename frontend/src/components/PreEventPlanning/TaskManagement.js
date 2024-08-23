import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Finalize venue contract', assignedTo: 'Alice', dueDate: '2023-06-01', status: 'In Progress' },
    { id: 2, title: 'Design event logo', assignedTo: 'Bob', dueDate: '2023-05-15', status: 'Completed' },
  ]);

  const addTask = (newTask) => {
    // Implementation for adding a new task
  };

  const assignTask = (id, assignee) => {
    // Implementation for assigning a task
  };

  const updateTaskProgress = (id, progress) => {
    // Implementation for updating task progress
  };

  return (
    <div className="task-management">
      <motion.div
        className="task-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Task List</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {/* Open add task form */}}
        >
          Add Task
        </motion.button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Assigned To</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <motion.tr
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td>{task.title}</td>
                <td>{task.assignedTo}</td>
                <td>{task.dueDate}</td>
                <td>{task.status}</td>
                <td>
                  <progress value={50} max="100"></progress>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default TaskManagement;