import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Dashboard.css';
import { FaCalendar, FaUsers, FaCreditCard, FaMicrophone, FaHandshake, FaQrcode, FaComments, FaUserTie } from 'react-icons/fa';

// Import your components
import EventList from '../EventList/EventList.js';
import PreEventPlanning from '../PreEventPlanning/PreEventPlanning.js';
import SponsorManagement from '../sponsormanagement/sponsormanagement.js';
import BoothPlacementPage from '../booth/BoothPlacementPage.js';
import SpeakerAndContentManagement from '../speakerandcontentmanagement/Speakerandcontentmanagement';
// Import SpeakerAndContentManagement

const RegistrationForm = () => <div>Registration Form Page</div>;
const PaymentProcessing = () => <div>Payment Processing Page</div>;
const AttendeeProfiles = () => <div>Attendee Profiles Page</div>;
const SessionScheduling = () => <div>Session Scheduling Page</div>;
const SponsorPortals = () => <div>Sponsor/Exhibitor Portals Page</div>;
const CheckIn = () => <div>Check-in Dashboard Page</div>;
const NetworkingDashboard = () => <div>Networking Dashboard Page</div>;

const Tile = ({ title, metrics, icon, link }) => (
  <Link to={link} className="dashboard-tile">
    <div className="tile-content">
      <h3>{title}</h3>
      <div className="tile-icon">{icon}</div>
      {metrics.map((metric, index) => (
        <p key={index}>{metric.label}: <span>{metric.value}</span></p>
      ))}
    </div>
  </Link>
);

const Dashboard = () => {
  const tiles = [
    {
      title: "Event Summary",
      metrics: [
        { label: "Total Events", value: 10 },
        { label: "Upcoming Event", value: "Annual Conference (May 15)" }
      ],
      icon: <FaCalendar />,
      link: "/events"
    },
    {
      title: "Registrations",
      metrics: [
        { label: "Total Registrations", value: 500 },
        { label: "New Registrations", value: 50 }
      ],
      icon: <FaUsers />,
      link: "/registrations"
    },
    {
      title: "Payment Processing",
      metrics: [
        { label: "Total Revenue", value: "$50,000" },
        { label: "Pending Payments", value: 25 }
      ],
      icon: <FaCreditCard />,
      link: "/payments"
    },
    {
      title: "Attendee Management",
      metrics: [
        { label: "Total Attendees", value: 450 },
        { label: "VIP Attendees", value: 30 }
      ],
      icon: <FaUserTie />,
      link: "/attendees"
    },
    {
      title: "Speaker & Content Management",
      metrics: [
        { label: "Total Sessions", value: 40 },
        { label: "Upcoming Sessions", value: 5 }
      ],
      icon: <FaMicrophone />,
      link: "/sessions"
    },
    {
      title: "Sponsor & Exhibitor Management",
      metrics: [
        { label: "Total Sponsors", value: 20 },
        { label: "New Sponsors", value: 3 }
      ],
      icon: <FaHandshake />,
      link: "/sponsors"
    },
    {
      title: "On-Site Check-in",
      metrics: [
        { label: "Total Check-ins", value: 300 },
        { label: "Pending Check-ins", value: 150 }
      ],
      icon: <FaQrcode />,
      link: "/check-in"
    },
    {
      title: "Networking & Engagement",
      metrics: [
        { label: "Messages Sent", value: 1500 },
        { label: "Meetings Scheduled", value: 75 }
      ],
      icon: <FaComments />,
      link: "/networking"
    },
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-grid">
        {tiles.map((tile, index) => (
          <Tile key={index} {...tile} />
        ))}
      </div>
    </div>
  );
};

const Sidebar = () => (
  <nav className="sidebar">
    <div className="sidebar-header">
      <h2>Event Manager</h2>
    </div>
    <ul className="sidebar-menu">
      <li><Link to="/"><i className="fas fa-tachometer-alt"></i>Dashboard</Link></li>
      <li className="menu-section">Events</li>
      <li><Link to="/events"><i className="fas fa-calendar-alt"></i>Event List</Link></li>
      <li><Link to="/pre-event"><i className="fas fa-tasks"></i>Pre-event Planning</Link></li>
      <li className="menu-section">Registrations</li>
      <li><Link to="/registrations"><i className="fas fa-user-plus"></i>Registration Form</Link></li>
      <li><Link to="/payments"><i className="fas fa-credit-card"></i>Payment Processing</Link></li>
      <li className="menu-section">Attendee Management</li>
      <li><Link to="/attendees"><i className="fas fa-users"></i>Attendee Profiles</Link></li>
      <li className="menu-section">Sponsors Management</li>
      <li><Link to="/sponsors"><i className="fas fa-handshake"></i>Sponsor/Exhibitor Portals</Link></li>
      <li><Link to="/booth-placement"><i className="fas fa-map-marker-alt"></i>Booth Placement</Link></li> {/* Updated Sidebar link */}
      <li className="menu-section">Speaker & Content Management</li>
      <li><Link to="/speaker-and-content-management"><i className="fas fa-microphone"></i>Speaker & Content Management</Link></li>
      <li><Link to="/sessions"><i className="fas fa-microphone"></i>Session Scheduling</Link></li>
      <li><Link to="/live-qa"><i className="fas fa-question-circle"></i>Live Q&A and Polling</Link></li>
      <li className="menu-section">On-site Management</li>
      <li><Link to="/check-in"><i className="fas fa-qrcode"></i>Check-in</Link></li>
      <li><Link to="/badge-printing"><i className="fas fa-id-card"></i>Badge Printing</Link></li>
      <li><Link to="/signage"><i className="fas fa-signs-post"></i>Dynamic Signage</Link></li>
      <li className="menu-section">Networking & Engagement</li>
      <li><Link to="/messaging"><i className="fas fa-comments"></i>In-App Messaging</Link></li>
      <li><Link to="/meeting-scheduling"><i className="fas fa-calendar-check"></i>Meeting Scheduling</Link></li>
    </ul>
  </nav>
);

const App = () => (
  <Router>
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/pre-event" element={<PreEventPlanning />} />
          <Route path="/registrations" element={<RegistrationForm />} />
          <Route path="/payments" element={<PaymentProcessing />} />
          <Route path="/attendees" element={<AttendeeProfiles />} />
          <Route path="/sessions" element={<SessionScheduling />} />
          <Route path="/sponsors" element={<SponsorManagement />} />
          <Route path="/booth-placement" element={<BoothPlacementPage />} /> {/* Added Route */}
          <Route path="/speaker-and-content-management" element={<SpeakerAndContentManagement />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/networking" element={<NetworkingDashboard />} />
        </Routes>
      </main>
    </div>
  </Router>
);

export default App;

