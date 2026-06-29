import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function CustomerEdit() {
  const { id } = useParams();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const nav = useNavigate();

  // Run once
  useEffect(() => {
    fetchCustomer();
  }, [id]);

  // Load data
  const fetchCustomer = async () => {
    try {
      const res = await axios.get(`https://localhost:7066/api/Customers/${id}`);
      setFullName(res.data.fullName);
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

    const payload = { customerId: Number(id), fullName, phone, email };

    try {
      await axios.put(`https://localhost:7066/api/Customers/${id}`, payload);
      nav('/list/Customers');
    } catch (err) {
      console.log(err);
      setError('Update failed');
    }
  };

  return (
    <div className="card shadow mt-4 p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3">Edit Customer</h3>
      
      {error && <div className="alert alert-danger py-2">{error}</div>}
      
      <form onSubmit={handleUpdate}>
        <div className="mb-2">
          <label>Full Name *</label>
          <input type="text" className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} />
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
          <Link to="/list/Customers" className="btn btn-secondary">Cancel</Link>
          <button type="submit" className="btn btn-warning">Update</button>
        </div>
      </form>
    </div>
  );
}

export default CustomerEdit;