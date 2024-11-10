'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './projects.css';
import Link from 'next/link';

interface Option {
  id: number;
  name: string;
}

function Project() {
  const [Name, setProjectName] = useState<string>('');
  const [Description, setProjectDescription] = useState<string>('');
  const [regions, setRegions] = useState<Option[]>([]);
  const [locations, setLocations] = useState<Option[]>([]);
  const [scopes, setScopes] = useState<Option[]>([]);
  const [ScopeOfWorkId, setSelectedScopeId] = useState<string | null>(null);
  const [RegionId, setSelectedRegionId] = useState<string | null>(null);
  const [LocationId, setSelectedLocationId] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://localhost:44376/api/Regions')
      .then(response => {
        const options = response.data.$values;
        setRegions(options);
      })
      .catch(error => console.error('Error fetching regions:', error));
  }, []);

  useEffect(() => {
    axios.get('https://localhost:44376/api/ScopeOWorks')
      .then(response => {
        const options = response.data.$values;
        setScopes(options);
      })
      .catch(error => console.error('Error fetching scopes:', error));
  }, []);

  useEffect(() => {
    if (RegionId) {
      axios.get(`https://localhost:44376/api/Locations/by-regionid/${RegionId}`)
        .then(response => {
          const locationsArray = response.data.$values;
          setLocations(locationsArray);
        })
        .catch(error => console.error('Error fetching locations by region:', error));
    }
  }, [RegionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createProjectCommand = {
      Name,
      Description,
      ScopeOfWorkId: ScopeOfWorkId,
      RegionId: RegionId,
      locationId: LocationId,
      TeamLeadId : 'aae0e2dd-e0e4-41b2-8c12-c746530afddb'
    };

    try {
      const response = await axios.post('https://localhost:44376/api/Projects', createProjectCommand, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        alert('Project created successfully!');
        // Reset form fields after successful submission
        setProjectName('');
        setProjectDescription('');
        setSelectedScopeId(null);
        setSelectedRegionId(null);
        setSelectedLocationId(null);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('Failed to create project. Please try again.');
    }
  };

  
  <Link href={"/employees"}>Employee</Link>
  
  return (
    <div className="project-container">
      <h1>Add New Project</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            className="input-field"
            required
          />
        </div>

        <div className="form-group">
          <label>Project Description</label>
          <textarea
            value={Description}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Enter project description"
            className="input-field textarea-field"
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
          <label>Select Region</label>
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
        </div>

        <div className="form-group">
          <label>Select Location</label>
          <select
            value={LocationId ?? ''}
            onChange={(e) => setSelectedLocationId(e.target.value)}
            className="dropdown"
            required
          >
            <option value="" disabled>Select a Location</option>
            {locations.map(option => (
              <option key={option.id} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>

      
     <Link href="/employees"> Employees </Link>
    </div>


  );
}

export default Project;