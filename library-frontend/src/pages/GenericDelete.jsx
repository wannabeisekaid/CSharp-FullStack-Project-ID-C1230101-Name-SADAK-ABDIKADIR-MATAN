import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function GenericDelete() {
  const { table, id } = useParams();
  const [error, setError] = useState('');
  const nav = useNavigate();

  // run delete
  const handleDelete = async () => {
    try {
      await axios.delete(`https://localhost:7066/api/${table}/${id}`);
      
      // go back
      if (table.toLowerCase() === 'loans') nav('/loans');
      else nav(`/list/${table}`);
      
    } catch (err) {
      console.log(err);
      setError('Delete failed');
    }
  };

  return (
    <div className="card shadow mt-5 p-4 mx-auto border-danger" style={{ maxWidth: '500px' }}>
      <h3 className="text-danger mb-3">Confirm Delete</h3>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <p>Delete record <strong>#{id}</strong> from <strong>{table}</strong>?</p>
      <p className="text-muted small">Cannot be undone.</p>

      <div className="d-flex justify-content-between mt-4">
        <button onClick={() => nav(-1)} className="btn btn-secondary">Cancel</button>
        <button onClick={handleDelete} className="btn btn-danger">Yes, Delete</button>
      </div>
    </div>
  );
}

export default GenericDelete;