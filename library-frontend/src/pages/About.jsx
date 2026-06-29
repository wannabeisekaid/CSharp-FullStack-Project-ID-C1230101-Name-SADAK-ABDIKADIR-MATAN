import React from 'react';

function About() {
  return (
    <div className="card shadow mt-4 p-5 mx-auto" style={{ maxWidth: '800px' }}>
      <h2 className="mb-4 text-center text-primary">About the Project</h2>
      
      <div className="mb-4">
        <h4>Library Management System</h4>
        <p className="text-muted">Version 1.0.0</p>
        <p>
          This system is designed to manage the daily operations of a library, including inventory management for books, 
          tracking customer records, managing employee access, and handling the core functionality of issuing and returning book loans.
        </p>
      </div>

      <div className="mb-4">
        <h4>Technologies Used</h4>
        <ul>
          <li><strong>Frontend:</strong> React, Vite, React Router, Bootstrap, Axios</li>
          <li><strong>Backend:</strong> C#, ASP.NET Core Web API, Entity Framework Core (LINQ)</li>
          <li><strong>Database:</strong> Microsoft SQL Server</li>
        </ul>
      </div>

      <hr />

      <div className="mt-4">
        <h4>Contact Information</h4>
        <p>For support or system administration queries, please contact the IT Helpdesk.</p>
        <ul className="list-unstyled">
          <li>📧 <strong>Email:</strong> sadak.matan@just.edu.so</li>
          <li>📞 <strong>Phone:</strong> (252) 610922810</li>
        </ul>
      </div>
    </div>
  );
}

export default About;