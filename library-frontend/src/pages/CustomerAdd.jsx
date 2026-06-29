import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function CustomerAdd() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const nav = useNavigate();

  // Save data
  const handleSave = async (e) => {
    e.preventDefault();
    setError('');

    // Check empty
    if (!fullName || !phone || !email) {
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

    const payload = { fullName, phone, email };

    try {
      await axios.post('https://localhost:7066/api/Customers', payload);
      nav('/list/Customers');
    } catch (err) {
      console.log(err);
      setError('Save failed');
    }
  };

  return (
    <div className="card shadow mt-4 p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3">New Customer</h3>
      
      {error && <div className="alert alert-danger py-2">{error}</div>}
      
      <form onSubmit={handleSave}>
        <div className="mb-2">
          <label className="form-label">Full Name *</label>
          <input type="text" className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} />
        </div>
        <div className="mb-2">
          <label className="form-label">Phone (Numbers only) *</label>
          <input type="text" className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email *</label>
          <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Link to="/list/Customers" className="btn btn-secondary">Cancel</Link>
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  );
}

export default CustomerAdd;