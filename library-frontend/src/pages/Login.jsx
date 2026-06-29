import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  // clear old login
  useEffect(() => {
    // If a user is already saved, redirect them to the home page immediately
    if (localStorage.getItem('user')) {
      nav('/home');
    }
  }, [nav]);


  // do login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Username and password required');
      return;
    }

    try {
      //dummy data for the missing fields to bypass C# validation
      const res = await axios.post('https://localhost:7066/api/Employees/login', {
        employeeId: 0,
        fullName: "dummy",
        username: username,
        password: password,
        phone: "dummy",
        email: "dummy@dummy.com"
      });

      // save user info
      localStorage.setItem('user', JSON.stringify(res.data));
      // force reload to update navbar
      window.location.href = '/home'; 
    } catch (err) {
      console.log(err);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4 w-100" style={{ maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Library Login</h3>
        
        {error && <div className="alert alert-danger py-2">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Username</label>
            <input 
              type="text" 
              className="form-control" 
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label>Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;