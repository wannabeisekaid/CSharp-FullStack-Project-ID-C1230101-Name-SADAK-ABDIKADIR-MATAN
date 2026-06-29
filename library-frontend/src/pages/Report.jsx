import { useState, useEffect } from 'react';
import axios from 'axios';

function Report() {
  const [loans, setLoans] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const res = await axios.get('https://localhost:7066/api/Loans');
      setLoans(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Filtering
  const filteredLoans = loans.filter(loan => {
    if (filter === 'active') return loan.isReturned === false;
    if (filter === 'returned') return loan.isReturned === true;
    return true;
  });

  return (
    <div className="mt-4">
      <h2>System Reports: Loan Status</h2>
      
      <div className="bg-light p-3 border rounded mb-4 d-flex align-items-center">
        <label className="fw-bold me-3">Filter By Status:</label>
        <select 
          className="form-select w-auto" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Loans</option>
          <option value="active">Active (Not Returned)</option>
          <option value="returned">Returned</option>
        </select>
        
        <div className="ms-auto fw-bold text-muted">
          Total Records: {filteredLoans.length}
        </div>
      </div>

      {filteredLoans.length > 0 ? (
        <table className="table table-bordered table-striped shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Loan ID</th>
              <th>Book Title</th>
              <th>Customer</th>
              <th>Loan Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <tr key={loan.loanId}>
                <td>#{loan.loanId}</td>
                <td>{loan.book ? loan.book.title : `Book ID: ${loan.bookId}`}</td>
                <td>{loan.customer ? loan.customer.fullName : `Cust ID: ${loan.customerId}`}</td>
                <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
                <td>
                  {loan.isReturned ? (
                    <span className="badge bg-success">Returned on {new Date(loan.returnDate).toLocaleDateString()}</span>
                  ) : (
                    <span className="badge bg-warning text-dark">Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info">No loans match the selected filter.</div>
      )}
    </div>
  );
}

export default Report;