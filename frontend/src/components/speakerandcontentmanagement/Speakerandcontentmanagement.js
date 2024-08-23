import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import './SpeakerContentManagement.css';
import { createSpeaker, getAllSpeakers, updateSpeaker, deleteSpeaker } from '../../services/api';
import { getAllSponsors, createSponsor, updateSponsor, deleteSponsor } from '../../services/api';
import * as XLSX from 'xlsx';

const RESET_TIMEOUT = 1 * 60 * 1000; 


const Speakerandcontentmanagement = () => {
  const [speakers, setSpeakers] = useState([]);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [newSubmissions, setNewSubmissions] = useState(0);
  const resetTimerRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSpeaker, setNewSpeaker] = useState({ name: '', topic: '', status: 'Pending' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const speakerDetailsRef = useRef(null);


  

  useEffect(() => {
    fetchSpeakers();
  }, []);

  useEffect(() => {
    fetchSpeakers();
    startResetTimer();

    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const startResetTimer = () => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setNewSubmissions(0);
      startResetTimer(); // Restart the timer
    }, RESET_TIMEOUT);
  };




  const generateReport = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const speakerData = speakers.map((speaker) => ({
        Name: speaker.name,
        Topic: speaker.topic,
        Status: speaker.status,
      }));
      const worksheet = XLSX.utils.json_to_sheet(speakerData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Speakers');
      XLSX.writeFile(workbook, 'speakers_report.xlsx');
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report. Please try again.');
    }
  };


  const exportSpeaker = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const filteredSpeakers = getFilteredSpeakers();
      const speakerNames = filteredSpeakers.map((speaker) => ({ Name: speaker.name }));
      const worksheet = XLSX.utils.json_to_sheet(speakerNames);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Speakers');
      XLSX.writeFile(workbook, 'speakers_report.xlsx');
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report. Please try again.');
    }
  };

  const fetchSpeakers = async () => {
    try {
      setIsLoading(true);
      const fetchedSpeakers = await getAllSpeakers();
      setSpeakers(fetchedSpeakers);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching speakers:', error);
      setError('Failed to fetch speakers. Please try again.');
      setIsLoading(false);
    }
  };

  

  
  const handleEdit = (speaker) => {
    setSelectedSpeaker(speaker);
    setIsEditing(true);
    setIsViewing(false);
    scrollToSpeakerDetails();
  };

  const handleView = (speaker) => {
    setSelectedSpeaker(speaker);
    setIsViewing(true);
    setIsEditing(false);
    scrollToSpeakerDetails();
    };
    const scrollToSpeakerDetails = () => {
      if (speakerDetailsRef.current) {
         speakerDetailsRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    };
  
  const handleUpdate = async () => {
    try {
      const updatedSpeaker = await updateSpeaker(selectedSpeaker._id, selectedSpeaker);
      setSpeakers(speakers.map(s => s._id === updatedSpeaker._id ? updatedSpeaker : s));
      setIsEditing(false);
      setSelectedSpeaker(null);
    } catch (error) {
      console.error('Error updating speaker:', error);
      setError('Failed to update speaker. Please try again.');
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this speaker?')) {
      try {
        const rejectedSpeaker = { ...selectedSpeaker, status: 'Rejected' };
        const updatedSpeaker = await updateSpeaker(selectedSpeaker._id, rejectedSpeaker);
        setSpeakers(speakers.map(s => s._id === updatedSpeaker._id ? updatedSpeaker : s));
        setSelectedSpeaker(updatedSpeaker);
      } catch (error) {
        console.error('Error rejecting speaker:', error);
        setError('Failed to reject speaker. Please try again.');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this speaker?')) {
      try {
        await deleteSpeaker(selectedSpeaker._id);
        setSpeakers(speakers.filter(s => s._id !== selectedSpeaker._id));
        setSelectedSpeaker(null);
        setIsViewing(false);
        setIsEditing(false);
      } catch (error) {
        console.error('Error deleting speaker:', error);
        setError('Failed to delete speaker. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    if (isEditing) {
      setSelectedSpeaker({ ...selectedSpeaker, [e.target.name]: e.target.value });
    } else {
      setNewSpeaker({ ...newSpeaker, [e.target.name]: e.target.value });
    }
  };

  const handleApprove = async () => {
    try {
      const approvedSpeaker = { ...selectedSpeaker, status: 'Active' };
      const updatedSpeaker = await updateSpeaker(selectedSpeaker._id, approvedSpeaker);
      setSpeakers(speakers.map(s => s._id === updatedSpeaker._id ? updatedSpeaker : s));
      setSelectedSpeaker(updatedSpeaker);
    } catch (error) {
      console.error('Error approving speaker:', error);
      setError('Failed to approve speaker. Please try again.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const getFilteredSpeakers = () => {
    return speakers.filter((speaker) => {
      const matchesTopic = selectedTopic === 'All Topics' || speaker.topic === selectedTopic;
      const matchesSearch = speaker.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'All Statuses' || speaker.status === selectedStatus;
      return matchesTopic && matchesSearch && matchesStatus;
    });
  };

  const filteredSpeakers = getFilteredSpeakers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdSpeaker = await createSpeaker(newSpeaker);
      setSpeakers([...speakers, createdSpeaker]);
      setNewSpeaker({ name: '', topic: '', status: 'Pending' });
      setShowAddForm(false);
      setNewSubmissions(prevCount => prevCount + 1);
      // No need to restart the timer here, it's always running
    } catch (error) {
      console.error('Error creating speaker:', error);
      setError('Failed to create speaker. Please try again.');
    }
  };
 

  if (isLoading) return <div>Loading speakers...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="speaker-content-management">
      <main className="main-content">
        <header className="page-header">
          <button className="back-button">Back</button>
          <h1 className="page-title">Speaker & Content Management</h1>
        </header>

        <section className="speakers-overview">
          <div className="overview-card">
            <h3>Total Speakers</h3>
            <p className="overview-number">{filteredSpeakers.length}</p>
          </div>
          <div className="overview-card">
            <h3>New Submissions</h3>
            <p className="overview-number">{newSubmissions}</p>
          </div>
          <div className="overview-card">
            <h3>Pending Approvals</h3>
            <p className="overview-number">{speakers.filter(s => s.status === 'Pending').length}</p>
          </div>
        </section>

        <section className="speakers-list">
          <div className="list-controls">
            <input 
              type="text" 
              placeholder="Search speakers" 
              className="search-bar" 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select 
              className="filter-options" 
              value={selectedTopic} 
              onChange={handleTopicChange}
            >
              <option>All Topics</option>
              <option>AI</option>
              <option>Sustainable Tech</option>
              <option>Cybersecurity</option>
              {/* Add more topics as needed */}
            </select>
            <select 
              className="filter-options"
              value={selectedStatus}
              onChange={handleStatusChange}
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
          <table className="speakers-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Topic</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {filteredSpeakers.map((speaker) => (
                <tr key={speaker._id}>
                  <td>{speaker.name}</td>
                  <td>{speaker.topic}</td>
                  <td>{speaker.status}</td>
                  <td>
                    <button className="action-button" onClick={() => handleView(speaker)}>View</button>
                    <button className="action-button" onClick={() => handleEdit(speaker)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {/* Pagination controls */}
          </div>
        </section>

        {(isViewing || isEditing) && selectedSpeaker && (
          <section className="speaker-details"  ref={speakerDetailsRef}>
            <h2>Speaker Details</h2>
        {isEditing ?  (
              <>
                <input
                  name="name"
                  value={selectedSpeaker.name}
                  onChange={handleInputChange}
                />
                <input
                  name="topic"
                  value={selectedSpeaker.topic}
                  onChange={handleInputChange}
                />
                <select
                  name="status"
                  value={selectedSpeaker.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button className="action-button" onClick={handleUpdate}>Save</button>
                <button className="action-button" onClick={() => {
                  setIsEditing(false);
                  setSelectedSpeaker(null);
                }}>Cancel</button>
              </>
            ) : (
              <>
          <p>Name: {selectedSpeaker.name}</p>
            <p>Topic: {selectedSpeaker.topic}</p>
            <p>Status: {selectedSpeaker.status}</p>
            <div className="speaker-actions">
              <button className="action-button" onClick={() => setIsEditing(true)}>Edit</button>
              {selectedSpeaker.status === 'Pending' && (
                <button className="action-button" onClick={handleApprove}>Approve</button>
              )}
              {selectedSpeaker.status !== 'Rejected' && (
                <button className="action-button" onClick={handleReject}>Reject</button>
              )}
              <button className="action-button" onClick={handleDelete}>Delete</button>
              <button className="action-button" onClick={() => {
                setIsViewing(false);
                setSelectedSpeaker(null);
              }}>Close</button>
            </div>
              </>
            )}
          </section>
        )}

        <section className="add-speaker" >
        <button className="add-button" onClick={() => setShowAddForm(true)}>Add New Speaker</button>
          {showAddForm && (
            <form onSubmit={handleSubmit}>
             
                <input type="text" placeholder="Speaker Name" name="name" value={newSpeaker.name} onChange={handleInputChange} />
         
              
            
                <input type="text"  placeholder="Topic" name="topic" value={newSpeaker.topic} onChange={handleInputChange} />
            
                <select
                name="status"
                value={newSpeaker.status}
                onChange={handleInputChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Active">Active</option>
                <option value="Rejected">Rejected</option>
              </select>
          
              <button type="submit">Submit</button>
              <button onClick={() => setShowAddForm(false)}>Cancel</button>
            </form>
          )}
        </section>

        <section className="export-reports">
          <button className="export-button"onClick={exportSpeaker}>Export Speakers</button>
          <button className="report-button"onClick={generateReport}>Generate Report</button>
        </section>
      </main>
    </div>
  );
};

export default Speakerandcontentmanagement;