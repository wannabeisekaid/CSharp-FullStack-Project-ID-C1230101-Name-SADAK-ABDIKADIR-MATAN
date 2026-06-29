import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function LoanAdd() {
  // Form state
  const [bookId, setBookId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [loanDate, setLoanDate] = useState('');
  const [isRetro, setIsRetro] = useState(false);
  const [error, setError] = useState('');

  // Drop lists
  const [books, setBooks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  // Page router
  const nav = useNavigate();

  // Run once
  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      // Get data
      const bRes = await axios.get('https://localhost:7066/api/Books');
      const cRes = await axios.get('https://localhost:7066/api/Customers');
      const eRes = await axios.get('https://localhost:7066/api/Employees');
      
      setBooks(bRes.data);
      setCustomers(cRes.data);
      setEmployees(eRes.data);

      // Set default
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const u = JSON.parse(userStr);
        setEmployeeId(u.employeeId);
      }
    } catch (err) {
      console.log(err);
      
      // Catch errors
      setError('Loading failed');
    }
  };

  // Save trigger
  const handleSave = async (e) => {
    e.preventDefault();
    setError('');

    // Check empty
    if (!bookId || !customerId || !employeeId) {
      setError('Fill required fields');
      return;
    }

    // Check retro
    if (isRetro && !loanDate) {
      setError('Date is required');
      return;
    }

    // Build payload
    const payload = {
      bookId: Number(bookId),
      customerId: Number(customerId),
      employeeId: Number(employeeId),
      isReturned: false,
      
      // Fix date
      loanDate: isRetro ? loanDate : new Date().toISOString()
    };

    try {
      // Setup URL
      const url = isRetro 
        ? 'https://localhost:7066/api/Loans/retroactive' 
        : 'https://localhost:7066/api/Loans';
        
      // Do post
      await axios.post(url, payload);
      nav('/loans');
    } catch (err) {
      console.log(err);
      
      // Read errors
      if (err.response && err.response.data) {
        if (err.response.data.errors) {
          
          // Extract text
          const messages = Object.values(err.response.data.errors).flat().join(' | ');
          setError(messages);
        } else if (typeof err.response.data === 'string') {
          
          // String error
          setError(err.response.data);
        } else {
          
          // Fallback error
          setError('Save failed');
        }
      } else {
        
        // Server offline
        setError('Server offline');
      }
    }
  };

  return (
    <div className="card shadow mt-4 p-4 mx-auto" style={{ maxWidth: '600px' }}>
      <h3 className="mb-3">Issue New Loan</h3>
      
      {/* Show alert */}
      {error && <div className="alert alert-danger py-2">{error}</div>}
      
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label">Select Book *</label>
          <select className="form-select" value={bookId} onChange={e => setBookId(e.target.value)}>
            <option value="">-- Choose Book --</option>
            {books.map(b => (
              <option key={b.bookId} value={b.bookId}>{b.title} (ID: {b.bookId})</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Select Customer *</label>
          <select className="form-select" value={customerId} onChange={e => setCustomerId(e.target.value)}>
            <option value="">-- Choose Customer --</option>
            {customers.map(c => (
              <option key={c.customerId} value={c.customerId}>{c.fullName} (ID: {c.customerId})</option>
            ))}
          </select>
        </div>

        <div className="mb-3 border p-3 bg-light rounded">
          <div className="form-check form-switch mb-2">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="retroSwitch" 
              checked={isRetro} 
              onChange={e => setIsRetro(e.target.checked)} 
            />
            <label className="form-check-label fw-bold" htmlFor="retroSwitch">
              Retroactive Loan (Log for past date)
            </label>
          </div>

          {isRetro && (
            <div className="row mt-3">
              <div className="col-md-6 mb-2">
                <label className="form-label text-muted small">Employee Who Loaned</label>
                <select className="form-select form-select-sm" value={employeeId} onChange={e => setEmployeeId(e.target.value)}>
                  {employees.map(e => (
                    <option key={e.employeeId} value={e.employeeId}>{e.fullName}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-2">
                <label className="form-label text-muted small">Original Loan Date</label>
                <input type="date" className="form-control form-control-sm" value={loanDate} onChange={e => setLoanDate(e.target.value)} />
              </div>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <Link to="/loans" className="btn btn-secondary">Cancel</Link>
          <button type="submit" className="btn btn-success">Issue Loan</button>
        </div>
      </form>
    </div>
  );
}

export default LoanAdd;