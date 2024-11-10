'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './employees.css';
import Link from 'next/link';

interface Option {
  id: number;
  name: string;
}

const employeeRoles = [
 // { id: 1, name: 'Admin' },
  { id: 2, name: 'Team Leader' },
  { id: 3, name: 'Junior' },
  { id: 4, name: 'Senior' },
];


function Employee() {
  const [Name, setEmployeeName] = useState<string>('');
  const [Title, setEmployeeTitle] = useState<string>('');
  const [Email, setEmployeeEmail] = useState<string>('');
  const [GradeId, setSelectedGrade] = useState('');
 // const [ReportTo, setReportTo] = useState<string | null>(null);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createEmployeeCommand = {
      Name,
      Title,
      Email,
      Jobgrade : GradeId,
      ReportTo : 'aae0e2dd-e0e4-41b2-8c12-c746530afddb'
    };

    try {
      const response = await axios.post('https://localhost:44376/api/Employees', createEmployeeCommand, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        alert('Employee created successfully!');
        // Reset form fields after successful submission
        setEmployeeName('');
        setEmployeeTitle('');
        setSelectedGrade('');
        // setSelectedRegionId(null);
        // setSelectedLocationId(null);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to create employee. Please try again.');
    }
  };

  return (
    <div className="project-container">
      <h1>Add New Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Eng Name : </label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setEmployeeName(e.target.value)}
            placeholder="Enter Eng name"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Eng Title : </label>
          <input
            type="text"
            value={Title}
            onChange={(e) => setEmployeeTitle(e.target.value)}
            placeholder="Enter Eng Title"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Email : </label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            placeholder="Enter Eng Email"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select value={GradeId?? ''} onChange={(e) => setSelectedGrade(e.target.value)} required>
            <option value="" disabled>Select Role</option>
            {employeeRoles.map((role) => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
        </div>

        {/* <div className="form-group">
          <label>Report to</label>
          <select
            value={RegionId ?? ''}
            onChange={(e) => setSelectedRegionId(e.target.value)}
            className="dropdown"
            required
          >
            <option value="" disabled>Please Select a Region</option>
            {regions.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div> */}

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Employee;