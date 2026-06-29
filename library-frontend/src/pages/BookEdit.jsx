import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

function BookEdit() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [error, setError] = useState('');
  
  const nav = useNavigate();

  // run once
  useEffect(() => {
    fetchBook();
  }, [id]);

  // get book
  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:5236/api/Books/${id}`);
      setTitle(res.data.title);
      setAuthorName(res.data.authorName);
      setIsbn(res.data.isbn || '');
      setPublishedYear(res.data.publishedYear);
    } catch (err) {
      console.log(err);
      setError('Failed to load book');
    }
  };

  // save edit
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !authorName || !publishedYear) {
      setError('Fill required fields');
      return;
    }

    const payload = { 
      bookId: Number(id), 
      title, 
      authorName, 
      isbn, 
      publishedYear: Number(publishedYear) 
    };

    try {
      await axios.put(`http://localhost:5236/api/Books/${id}`, payload);
      nav('/list/Books'); // go to smart list
    } catch (err) {
      console.log(err);
      setError('Update failed');
    }
  };

  return (
    <div className="card shadow mt-4 p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3">Edit Book</h3>
      
      {error && <div className="alert alert-danger py-2">{error}</div>}
      
      <form onSubmit={handleUpdate}>
        <div className="mb-2">
          <label>Title *</label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className="mb-2">
          <label>Author *</label>
          <input type="text" className="form-control" value={authorName} onChange={e => setAuthorName(e.target.value)} />
        </div>
        <div className="mb-2">
          <label>ISBN</label>
          <input type="text" className="form-control" value={isbn} onChange={e => setIsbn(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Year *</label>
          <input type="number" className="form-control" value={publishedYear} onChange={e => setPublishedYear(e.target.value)} />
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Link to="/list/Books" className="btn btn-secondary">Cancel</Link>
          <button type="submit" className="btn btn-warning">Update</button>
        </div>
      </form>
    </div>
  );
}

export default BookEdit;