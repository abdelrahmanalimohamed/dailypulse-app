'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './tasks.css';


interface Option {
  id: number;
  name: string;
}

const prioty = [
     { id: 1, name: 'High' },
     { id: 2, name: 'Low' },
   ];

function Tasks() {
  const [Taskname, setTaskName] = useState<string>('');
  const [Area, setArea] = useState<string>('');
  const [DrawingNo, setDrawingNo] = useState<string>('');
  const [DrawingTitle, setDrawingTitle] = useState<string>('');
  const [file, setFile] = useState<string>('');

  const [ScopeOfWorkId, setSelectedScopeId] = useState<string | null>(null);
  const [employeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [projectId, setSelectedProjectId] = useState<string | null>(null);

  const [priortId, setPriorty] = useState('');

  const [dateFrom , setDateFrom] = useState<Date>();
  const [dateTo , setDateTo] = useState<Date>();

  const [employees, setEmployee] = useState<Option[]>([]);
  const [scopes, setScopes] = useState<Option[]>([]);
  const [projects, setProjects] = useState<Option[]>([]);


  useEffect(() => {
    axios.get('https://localhost:44376/api/ScopeOWorks')
      .then(response => {
        const options = response.data.$values;
        setScopes(options);
      })
      .catch(error => console.error('Error fetching scopes:', error));
  }, []);

  useEffect(() => {
    axios.get('https://localhost:44376/api/Projects')
      .then(response => {
        const options = response.data.$values;
        setProjects(options);
      })
      .catch(error => console.error('Error fetching scopes:', error));
  }, []);

  useEffect(() => {
    axios.get('https://localhost:44376/api/Employees/getemployess')
      .then(response => {
        const options = response.data.$values;
        setEmployee(options);
      })
      .catch(error => console.error('Error fetching scopes:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createTaskCommand = {
      Taskname,
      Area,
      DrawingNo,
      DrawingTitle,
      file,
      dateFrom , 
      dateTo ,
      Priority : priortId ,
      ProjectId : projectId , 
      ScopeId : ScopeOfWorkId,
      EmployeeId : employeeId
    };

    try {
      const response = await axios.post('https://localhost:44376/api/Tasks', createTaskCommand, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        alert('Task created successfully!');
        // Reset form fields after successful submission
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="project-container">
      <h1>Add New Task</h1>
      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <label>Select Project</label>
          <select
            value={projectId ?? ''}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="dropdown"
            required
          >
            <option value="" disabled>Please Select a Project</option>
            {projects.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Eng Name : </label>
          <select
            value={employeeId ?? ''}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className="dropdown"
            required
          >
            <option value="" disabled>Please Select an Employee</option>
            {employees.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Task Name : </label>
          <input
            type="text"
            value={Taskname}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter Eng name"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Select Scope Of Work</label>
          <select
            value={ScopeOfWorkId ?? ''}
            onChange={(e) => setSelectedScopeId(e.target.value)}
            className="dropdown"
            required
          >
            <option value="" disabled>Please Select a Scope Of Work</option>
            {scopes.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Area : </label>
          <input
            type="text"
            value={Area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Enter Area"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Drawing No : </label>
          <input
            type="text"
            value={DrawingNo}
            onChange={(e) => setDrawingNo(e.target.value)}
            placeholder="Enter Drawing Number"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Drawing No : </label>
          <input
            type="text"
            value={DrawingTitle}
            onChange={(e) => setDrawingTitle(e.target.value)}
            placeholder="Enter Drawing Title"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Upload File : </label>
          <input
            type="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Priority :</label>
          <select value={priortId?? ''} onChange={(e) => setPriorty(e.target.value)} required>
            <option value="" disabled>Select Priority</option>
            {prioty.map((role) => (
              <option key={role.id} value={role.name}>{role.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date From : </label>
          <input
            type="date"
            value={dateFrom ? dateFrom.toISOString().split('T')[0] : ''} // Format Date to YYYY-MM-DD
            onChange={(e) => setDateFrom(new Date(e.target.value))}
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Date To : </label>
          <input
            type="date"
            value={dateTo ? dateTo.toISOString().split('T')[0] : ''} // Format Date to YYYY-MM-DD
            onChange={(e) => setDateTo(new Date(e.target.value))}
            className="input-field"
            required
          />
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Tasks;