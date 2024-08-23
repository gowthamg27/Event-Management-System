import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'ABC Catering', service: 'Food & Beverage', contact: 'john@abccatering.com', status: 'Confirmed' },
    { id: 2, name: 'XYZ Audio', service: 'Sound System', contact: 'info@xyzaudio.com', status: 'Pending' },
  ]);

  const addVendor = (newVendor) => {
    // Implementation for adding a new vendor
  };

  const editVendor = (id, updatedVendor) => {
    // Implementation for editing a vendor
  };

  const deleteVendor = (id) => {
    // Implementation for deleting a vendor
  };

  return (
    <div className="vendor-management">
      <motion.div
        className="vendor-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Vendor List</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {/* Open add vendor form */}}
        >
          Add Vendor
        </motion.button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <motion.tr
                key={vendor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td>{vendor.name}</td>
                <td>{vendor.service}</td>
                <td>{vendor.contact}</td>
                <td>{vendor.status}</td>
                <td>
                  <button onClick={() => editVendor(vendor.id)}>Edit</button>
                  <button onClick={() => deleteVendor(vendor.id)}>Delete</button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default VendorManagement;