import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function BookAdd() {
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [error, setError] = useState('');
  
  const nav = useNavigate();

  // save
  const handleSave = async (e) => {
    e.preventDefault();
    setError('');

    // check empty
    if (!title || !authorName || !publishedYear) {
      setError('Fill required fields');
      return;
    }

    const payload = { title, authorName, isbn, publishedYear: Number(publishedYear) };

    try {
      await axios.post('http://localhost:5236/api/Books', payload);
      nav('/list/Books'); // return
    } catch (err) {
      console.log(err);
      setError('Save failed');
    }
  };

  return (
    <div className="card shadow mt-4 p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3">New Book</h3>
      
      {/* alert */}
      {error && <div className="alert alert-danger py-2">{error}</div>}
      
      <form onSubmit={handleSave}>
        <div className="mb-2">
          <label className="form-label">Title *</label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className="mb-2">
          <label className="form-label">Author *</label>
          <input type="text" className="form-control" value={authorName} onChange={e => setAuthorName(e.target.value)} />
        </div>

        <div className="mb-2">
          <label className="form-label">ISBN</label>
          <input type="text" className="form-control" value={isbn} onChange={e => setIsbn(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Published Year *</label>
          <input type="number" className="form-control" value={publishedYear} onChange={e => setPublishedYear(e.target.value)} />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <Link to="/list/Books" className="btn btn-secondary">Cancel</Link>
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>
    </div>
  );
}

export default BookAdd;