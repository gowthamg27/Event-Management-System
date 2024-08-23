import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import '../../components/sponsormanagement/SponsorsManagement.css';
import { createSponsor, getAllSponsors, updateSponsor, deleteSponsor } from '../../services/api';
import * as XLSX from 'xlsx';

const RESET_TIMEOUT = 1 * 60 * 1000; 

const SponsorAndContentManagement = () => {
  const [sponsors, setSponsors] = useState([]);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [newSubmissions, setNewSubmissions] = useState(0);
  const resetTimerRef = useRef(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSponsor, setNewSponsor] = useState({ name: '', package: '', status: 'Pending' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('All Packages');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const sponsorDetailsRef = useRef(null);

  useEffect(() => {
    fetchSponsors();
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
      const sponsorData = sponsors.map((sponsor) => ({
        Name: sponsor.name,
        Package: sponsor.package,
        Status: sponsor.status,
      }));
      const worksheet = XLSX.utils.json_to_sheet(sponsorData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sponsors');
      XLSX.writeFile(workbook, 'sponsors_report.xlsx');
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report. Please try again.');
    }
  };

  const exportSponsors = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const filteredSponsors = getFilteredSponsors();
      const sponsorNames = filteredSponsors.map((sponsor) => ({ Name: sponsor.name }));
      const worksheet = XLSX.utils.json_to_sheet(sponsorNames);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sponsors');
      XLSX.writeFile(workbook, 'sponsors_report.xlsx');
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Failed to generate report. Please try again.');
    }
  };

  const fetchSponsors = async () => {
    try {
      setIsLoading(true);
      const fetchedSponsors = await getAllSponsors();
      setSponsors(fetchedSponsors);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      setError('Failed to fetch sponsors. Please try again.');
      setIsLoading(false);
    }
  };

  const handleEdit = (sponsor) => {
    setSelectedSponsor(sponsor);
    setIsEditing(true);
    setIsViewing(false);
    scrollToSponsorDetails();
  };

  const handleView = (sponsor) => {
    setSelectedSponsor(sponsor);
    setIsViewing(true);
    setIsEditing(false);
    scrollToSponsorDetails();
  };

  const scrollToSponsorDetails = () => {
    if (sponsorDetailsRef.current) {
      sponsorDetailsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const updatedSponsor = await updateSponsor(selectedSponsor._id, selectedSponsor);
      setSponsors(sponsors.map(s => s._id === updatedSponsor._id ? updatedSponsor : s));
      setIsEditing(false);
      setSelectedSponsor(null);
    } catch (error) {
      console.error('Error updating sponsor:', error);
      setError('Failed to update sponsor. Please try again.');
    }
  };

  const handleReject = async () => {
    if (window.confirm('Are you sure you want to reject this sponsor?')) {
      try {
        const rejectedSponsor = { ...selectedSponsor, status: 'Rejected' };
        const updatedSponsor = await updateSponsor(selectedSponsor._id, rejectedSponsor);
        setSponsors(sponsors.map(s => s._id === updatedSponsor._id ? updatedSponsor : s));
        setSelectedSponsor(updatedSponsor);
      } catch (error) {
        console.error('Error rejecting sponsor:', error);
        setError('Failed to reject sponsor. Please try again.');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this sponsor?')) {
      try {
        await deleteSponsor(selectedSponsor._id);
        setSponsors(sponsors.filter(s => s._id !== selectedSponsor._id));
        setSelectedSponsor(null);
        setIsViewing(false);
        setIsEditing(false);
      } catch (error) {
        console.error('Error deleting sponsor:', error);
        setError('Failed to delete sponsor. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    if (isEditing) {
      setSelectedSponsor({ ...selectedSponsor, [e.target.name]: e.target.value });
    } else {
      setNewSponsor({ ...newSponsor, [e.target.name]: e.target.value });
    }
  };

  const handleApprove = async () => {
    try {
      const approvedSponsor = { ...selectedSponsor, status: 'Active' };
      const updatedSponsor = await updateSponsor(selectedSponsor._id, approvedSponsor);
      setSponsors(sponsors.map(s => s._id === updatedSponsor._id ? updatedSponsor : s));
      setSelectedSponsor(updatedSponsor);
    } catch (error) {
      console.error('Error approving sponsor:', error);
      setError('Failed to approve sponsor. Please try again.');
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const getFilteredSponsors = () => {
    return sponsors.filter((sponsor) => {
      const matchesPackage = selectedPackage === 'All Packages' || sponsor.package === selectedPackage;
      const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'All Statuses' || sponsor.status === selectedStatus;
      return matchesPackage && matchesSearch && matchesStatus;
    });
  };

  const filteredSponsors = getFilteredSponsors();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdSponsor = await createSponsor(newSponsor);
      setSponsors([...sponsors, createdSponsor]);
      setNewSponsor({ name: '', package: '', status: 'Pending' });
      setShowAddForm(false);
      setNewSubmissions(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error creating sponsor:', error);
      setError('Failed to create sponsor. Please try again.');
    }
  };

  if (isLoading) return <div>Loading sponsors...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="sponsor-content-management">
      <main className="main-content">
        <header className="page-header">
          <button className="back-button">Back</button>
          <h1 className="page-title">Sponsor & Content Management</h1>
        </header>

        <section className="sponsors-overview">
          <div className="overview-card">
            <h3>Total Sponsors</h3>
            <p className="overview-number">{filteredSponsors.length}</p>
          </div>
          <div className="overview-card">
            <h3>New Submissions</h3>
            <p className="overview-number">{newSubmissions}</p>
          </div>
          <div className="overview-card">
            <h3>Pending Approvals</h3>
            <p className="overview-number">{sponsors.filter(s => s.status === 'Pending').length}</p>
          </div>
        </section>

        <section className="sponsors-list">
          <div className="list-controls">
            <input 
              type="text" 
              placeholder="Search sponsors" 
              className="search-bar" 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <select 
              className="filter-options" 
              value={selectedPackage} 
              onChange={handlePackageChange}
            >
              <option>All Packages</option>
              <option>Gold</option>
              <option>Silver</option>
              <option>Bronze</option>
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
          <table className="sponsors-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Package</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSponsors.map((sponsor) => (
                <tr key={sponsor._id}>
                  <td>{sponsor.name}</td>
                  <td>{sponsor.package}</td>
                  <td>{sponsor.status}</td>
                  <td>
                    <button className="action-button" onClick={() => handleView(sponsor)}>View</button>
                    <button className="action-button" onClick={() => handleEdit(sponsor)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {/* Pagination controls */}
          </div>
        </section>

        {(isViewing || isEditing) && selectedSponsor && (
          <section className="sponsor-details" ref={sponsorDetailsRef}>
            <h2>Sponsor Details</h2>
            {isEditing ? (
              <>
                <input
                  name="name"
                  value={selectedSponsor.name}
                  onChange={handleInputChange}
                />
                <input
                  name="package"
                  value={selectedSponsor.package}
                  onChange={handleInputChange}
                />
                <select
                  name="status"
                  value={selectedSponsor.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <button className="action-button" onClick={handleUpdate}>Save</button>
                <button className="action-button" onClick={() => {
                  setIsEditing(false);
                  setSelectedSponsor(null);
                }}>Cancel</button>
              </>
            ) : (
              <>
                <p>Name: {selectedSponsor.name}</p>
                <p>Package: {selectedSponsor.package}</p>
                <p>Status: {selectedSponsor.status}</p>
                <div className="sponsor-actions">
                  <button className="action-button" onClick={() => setIsEditing(true)}>Edit</button>
                  {selectedSponsor.status === 'Pending' && (
                    <button className="action-button" onClick={handleApprove}>Approve</button>
                  )}
                  {selectedSponsor.status !== 'Rejected' && (
                    <button className="action-button" onClick={handleReject}>Reject</button>
                  )}
                  <button className="action-button" onClick={handleDelete}>Delete</button>
                  <button className="action-button" onClick={() => {
                    setIsViewing(false);
                    setSelectedSponsor(null);
                  }}>Close</button>
                </div>
              </>
            )}
          </section>
        )}

        <section className="add-sponsor">
          <button className="add-button" onClick={() => setShowAddForm(true)}>Add New Sponsor</button>
          {showAddForm && (
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Sponsor Name" name="name" value={newSponsor.name} onChange={handleInputChange} />
              <input type="text" placeholder="Package" name="package" value={newSponsor.package} onChange={handleInputChange} />
              <select
                name="status"
                value={newSponsor.status}
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
          <button className="export-button" onClick={exportSponsors}>Export Sponsors</button>
          <button className="report-button" onClick={generateReport}>Generate Report</button>
        </section>
      </main>
    </div>
  );
};

export default SponsorAndContentManagement;