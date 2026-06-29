import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  // require login
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      nav('/login');
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [nav]);

  if (!user) return null;

  return (
    <div className="text-center mt-5">
      <h1 className="display-4 mb-3">Welcome, {user.fullName}</h1>
      <p className="lead text-muted mb-5">
        Library Management System Dashboard
      </p>

      <div className="row justify-content-center">
        <div className="col-md-3 mb-3">
          <Link to="/list/Books" className="btn btn-outline-primary w-100 py-3 fs-5">📚 Manage Books</Link>
        </div>
        <div className="col-md-3 mb-3">
          <Link to="/list/Customers" className="btn btn-outline-success w-100 py-3 fs-5">👥 Manage Customers</Link>
        </div>
        <div className="col-md-3 mb-3">
          {/* fixed link */}
          <Link to="/loans" className="btn btn-outline-warning w-100 py-3 fs-5">🔄 Manage Loans</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;