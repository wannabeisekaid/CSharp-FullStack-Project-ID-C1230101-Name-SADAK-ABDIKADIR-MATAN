import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  
  // kick out
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // let in
  return children;
}

export default ProtectedRoute;