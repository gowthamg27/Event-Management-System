import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContentPlanning = () => {
  const [sessions, setSessions] = useState([
    { id: 1, title: 'Opening Keynote', time: '09:00 AM', speaker: 'John Doe', location: 'Main Hall' },
    { id: 2, title: 'Panel Discussion', time: '11:00 AM', speaker: 'Various', location: 'Room A' },
  ]);

  const addSession = (newSession) => {
    // Implementation for adding a new session
  };

  const editSession = (id, updatedSession) => {
    // Implementation for editing a session
  };

  const deleteSession = (id) => {
    // Implementation for deleting a session
  };

  return (
    <div className="content-planning">
      <motion.div
        className="agenda-overview"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Agenda Overview</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {/* Open add session form */}}
        >
          Add Session
        </motion.button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Time</th>
              <th>Speaker</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <motion.tr
                key={session.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td>{session.title}</td>
                <td>{session.time}</td>
                <td>{session.speaker}</td>
                <td>{session.location}</td>
                <td>
                  <button onClick={() => editSession(session.id)}>Edit</button>
                  <button onClick={() => deleteSession(session.id)}>Delete</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ContentPlanning;