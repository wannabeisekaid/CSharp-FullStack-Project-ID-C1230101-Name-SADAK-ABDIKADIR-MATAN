import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function EmployeeEdit() {
  const { id } = useParams();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const nav = useNavigate();

  // Run once
  useEffect(() => {
    fetchEmployee();
  }, [id]);

  // Load data
  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`https://localhost:7066/api/Employees/${id}`);
      setFullName(res.data.fullName);
      setUsername(res.data.username);
      setPassword(res.data.password);
      setPhone(res.data.phone);
      setEmail(res.data.email);
    } catch (err) {
      console.log(err);
      setError('Load failed');
    }
  };

  // Save changes
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    // Check empty
    if (!fullName || !username || !password || !phone || !email) {
      setError('Fill required fields');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Validate phone
    const phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone)) {
      setError('Phone must be numbers');
      return;
    }

    const payload = { employeeId: Number(id), fullName, username, password, phone, email };

    try {
      await axios.put(`https://localhost:7066/api/Employees/${id}`, payload);
      nav('/list/Employees');
    } catch (err) {
      console.log(err);
      setError('Update failed');
    }
  };

  return (
    <div className="card shadow mt-4 p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3">Edit Employee</h3>
      
      {error && <div className="alert alert-danger py-2">{error}</div>}
      
      <form onSubmit={handleUpdate}>
        <div className="mb-2">
          <label>Full Name *</label>
          <input type="text" className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} />
        </div>
        <div className="row">
          <div className="col-md-6 mb-2">
            <label>Username *</label>
            <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="col-md-6 mb-2">
            <label>Password *</label>
            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
        </div>
        <div className="mb-2">
          <label>Phone *</label>
          <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Email *</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Link to="/list/Employees" className="btn btn-secondary">Cancel</Link>
          <button type="submit" className="btn btn-warning">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EmployeeEdit;