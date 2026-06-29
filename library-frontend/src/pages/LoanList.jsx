import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoanList() {
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  // load on mount
  useEffect(() => {
    fetchData();
  }, []);

  // fetch all data
  const fetchData = async () => {
    try {
      const res = await axios.get('https://localhost:7066/api/Loans');
      const sorted = res.data.sort((a, b) => b.loanId - a.loanId);
      setData(sorted);
    } catch (err) {
      console.log(err);
    }
  };

  // call c# api
  const doSearch = async (e) => {
    e.preventDefault();
    if (!search) {
      fetchData();
      return;
    }
    try {
      // exact match only
      const res = await axios.get(`https://localhost:7066/api/Loans/search/${search}`);
      const sorted = res.data.sort((a, b) => b.loanId - a.loanId);
      setData(sorted);
    } catch (err) {
      console.log(err);
      alert("Invalid Customer ID");
    }
  };

  // row actions
  const goAdd = () => nav(`/loans/add`);
  
  const goEdit = () => {
    if (!selectedId) return alert("Select row first");
    nav(`/loans/edit/${selectedId}`);
  };
  
  const goDelete = () => {
    if (!selectedId) return alert("Select row first");
    nav(`/loans/delete/${selectedId}`);
  };

  return (
    <div>
      <h2>Loan Inventory</h2>
      
      {/* top controls */}
      <div className="d-flex justify-content-between bg-light p-3 border rounded mb-3">
        <div>
          <button onClick={goAdd} className="btn btn-success me-2">Add Loan</button>
          <button onClick={goEdit} className="btn btn-warning me-2">Edit Selected</button>
          <button onClick={goDelete} className="btn btn-danger">Delete Selected</button>
        </div>
        
        {/* standard search */}
        <form onSubmit={doSearch} className="d-flex">
          <input 
            type="number" 
            className="form-control me-2" 
            placeholder="Exact Customer ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form>
      </div>

      {/* data table */}
      {data.length > 0 ? (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Customer ID</th>
              <th>Customer</th>
              <th>Book Loaned</th>
              <th>Employee</th>
              <th>Loan ID</th>
              <th>Loan Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const rowId = row.loanId;
              const isSelected = selectedId === rowId;
              
              return (
                <tr 
                  key={index} 
                  onClick={() => setSelectedId(rowId)}
                  className={isSelected ? "table-primary" : ""}
                  style={{ cursor: "pointer" }}
                >
                  <td>{row.customerId}</td>
                  <td>{row.customer ? row.customer.fullName : 'N/A'}</td>
                  <td>{row.book ? row.book.title : 'N/A'}</td>
                  <td>{row.employee ? row.employee.fullName : 'N/A'}</td>
                  <td><strong className="text-primary">#{row.loanId}</strong></td>
                  <td>{new Date(row.loanDate).toLocaleDateString()}</td>
                  <td>{row.returnDate ? new Date(row.returnDate).toLocaleDateString() : 'Not Returned'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No records found.</p>
      )}
    </div>
  );
}

export default LoanList;