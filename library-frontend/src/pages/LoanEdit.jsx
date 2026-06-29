import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function LoanEdit() {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [returnDate, setReturnDate] = useState('');
  const [isReturned, setIsReturned] = useState(false);
  const [error, setError] = useState('');
  
  const nav = useNavigate();

  // Run once
  useEffect(() => {
    fetchLoan();
  }, [id]);

  // Load data
  const fetchLoan = async () => {
    try {
      const res = await axios.get(`https://localhost:7066/api/Loans/${id}`);
      setLoan(res.data);
      setIsReturned(res.data.isReturned);
      
      if (res.data.returnDate) {
        setReturnDate(res.data.returnDate.split('T')[0]);
      }
    } catch (err) {
      console.log(err);
      setError('Load failed');
    }
  };

  // Save changes
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    if (isReturned && !returnDate) {
      setError('Need return date');
      return;
    }

    const payload = {
      loanId: Number(id),
      bookId: loan.bookId,
      customerId: loan.customerId,
      employeeId: loan.employeeId,
      loanDate: loan.loanDate,
      returnDate: returnDate ? new Date(returnDate).toISOString() : null,
      isReturned
    };

    try {
      await axios.put(`https://localhost:7066/api/Loans/${id}`, payload);
      nav('/loans');
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && typeof err.response.data === 'string') {
        setError(err.response.data);
      } else {
        setError('Update failed');
      }
    }
  };

  if (!loan) return <p>Loading...</p>;

  return (
    <div className="card shadow mt-4 p-4 mx-auto" style={{ maxWidth: '600px' }}>
      <h3 className="mb-3">Update Loan Status</h3>
      
      {error && <div className="alert alert-danger py-2">{error}</div>}
      
      <div className="bg-light p-3 border rounded mb-4">
        <p className="mb-1"><strong>Book ID:</strong> {loan.bookId}</p>
        <p className="mb-1"><strong>Customer ID:</strong> {loan.customerId}</p>
        <p className="mb-0"><strong>Loaned On:</strong> {new Date(loan.loanDate).toLocaleDateString()}</p>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="form-check form-switch mb-3">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="returnSwitch"
            checked={isReturned}
            onChange={(e) => setIsReturned(e.target.checked)}
          />
          <label className="form-check-label fw-bold" htmlFor="returnSwitch">
            Book has been returned
          </label>
        </div>

        {isReturned && (
          <div className="mb-3">
            <label className="form-label">Return Date *</label>
            <input 
              type="date" 
              className="form-control" 
              value={returnDate} 
              onChange={e => setReturnDate(e.target.value)} 
            />
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          <Link to="/loans" className="btn btn-secondary">Cancel</Link>
          <button type="submit" className="btn btn-warning">Save Status</button>
        </div>
      </form>
    </div>
  );
}

export default LoanEdit;