import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(9);
  const [filterDate, setFilterDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Simulated event data (replace with actual API call)
  useEffect(() => {
    const fetchedEvents = [
      { id: 1, title: 'Tech Conference 2024', date: '2024-06-15', location: 'San Francisco, CA', status: 'upcoming' },
      { id: 2, title: 'Marketing Summit', date: '2024-07-22', location: 'New York, NY', status: 'upcoming' },
      { id: 3, title: 'Product Launch', date: '2024-05-10', location: 'London, UK', status: 'past' },
      // Add more events...
    ];
    setEvents(fetchedEvents);
    setFilteredEvents(fetchedEvents);
  }, []);

  useEffect(() => {
    const results = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterDate ? event.date === filterDate : true) &&
      (filterLocation ? event.location.includes(filterLocation) : true) &&
      (filterStatus ? event.status === filterStatus : true)
    );
    setFilteredEvents(results);
    setCurrentPage(1);
  }, [searchTerm, filterDate, filterLocation, filterStatus, events]);

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <motion.div 
      className="event-list-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="event-list-header">
        <motion.h1
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          My Events
        </motion.h1>
        <Link to="/create-event" className="create-event-btn">
          <FaPlus /> Create Event
        </Link>
      </header>

      <motion.div 
        className="search-filter-container"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="search-bar">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-dropdowns">
          <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
            <option value="">Filter by Date</option>
            {/* Add date options */}
          </select>
          <select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)}>
            <option value="">Filter by Location</option>
            {/* Add location options */}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">Filter by Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="past">Past</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </motion.div>

      <AnimatePresence>
        <motion.div className="event-grid">
          {currentEvents.map((event) => (
            <motion.div 
              key={event.id} 
              className="event-card"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
              <span className={`event-status ${event.status}`}>{event.status}</span>
              <div className="event-actions">
                <motion.button 
                  className="view-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEye /> View
                </motion.button>
                <motion.button 
                  className="edit-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEdit /> Edit
                </motion.button>
                <motion.button 
                  className="delete-btn" 
                  onClick={() => handleDelete(event.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTrash /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <motion.div 
        className="pagination"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Array.from({ length: Math.ceil(filteredEvents.length / eventsPerPage) }).map((_, index) => (
          <motion.button 
            key={index} 
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default EventList;