import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  
  // get user
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  
  // check login
  if (!userString) return null;

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsOpen(false);
    nav('/login');
  };

  return (
    <>
      {/* top bar */}
      <div className="bg-dark text-white p-3 d-flex justify-content-between align-items-center shadow-sm">
        <h4 className="m-0 d-flex align-items-center">
          Library Manager
          {user && (
            <span className="fs-6 fw-normal ms-3 text-info">
              👤 {user.fullName}
            </span>
          )}
        </h4>
        <button className="btn btn-outline-light" onClick={() => setIsOpen(true)}>
          ☰ Menu
        </button>
      </div>

      {/* side menu */}
      {isOpen && (
        <div 
          className="bg-light border-start position-fixed top-0 end-0 h-100 p-4 shadow-lg d-flex flex-column" 
          style={{ width: '280px', zIndex: 1050 }}
        >
          <div className="d-flex justify-content-between mb-4 border-bottom pb-2">
            <h4>Menu</h4>
            <button className="btn-close" onClick={() => setIsOpen(false)}></button>
          </div>
          
          <ul className="list-unstyled fs-5 flex-grow-1">
            <li className="mb-3"><Link to="/home" onClick={() => setIsOpen(false)} className="text-decoration-none text-dark">🏠 Home</Link></li>
            <li className="mb-3"><Link to="/list/Books" onClick={() => setIsOpen(false)} className="text-decoration-none text-dark">📚 Books</Link></li>
            <li className="mb-3"><Link to="/list/Employees" onClick={() => setIsOpen(false)} className="text-decoration-none text-dark">👔 Employees</Link></li>
            <li className="mb-3"><Link to="/list/Customers" onClick={() => setIsOpen(false)} className="text-decoration-none text-dark">👥 Customers</Link></li>
            <li className="mb-3"><Link to="/loans" onClick={() => setIsOpen(false)} className="text-decoration-none text-dark">🔄 Loans</Link></li>
            <li className="mb-3"><Link to="/report" onClick={() => setIsOpen(false)} className="text-decoration-none text-dark">📊 Reports</Link></li>
            <li className="mb-3"><Link to="/about" onClick={() => setIsOpen(false)} className="text-decoration-none text-dark">ℹ️ About</Link></li>
          </ul>

          <div className="border-top pt-3">
            <button onClick={handleLogout} className="btn btn-danger w-100">Logout</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;