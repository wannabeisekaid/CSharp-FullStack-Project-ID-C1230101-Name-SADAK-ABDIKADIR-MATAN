import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Core components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Shared pages
import Login from './pages/Login';
import Home from './pages/Home';
import DataList from './pages/DataList';
import GenericDelete from './pages/GenericDelete';

// Book pages
import BookAdd from './pages/BookAdd';
import BookEdit from './pages/BookEdit';

// Customer pages
import CustomerAdd from './pages/CustomerAdd';
import CustomerEdit from './pages/CustomerEdit';

// Employee pages
import EmployeeAdd from './pages/EmployeeAdd';
import EmployeeEdit from './pages/EmployeeEdit';

// Loan pages
import LoanList from './pages/LoanList';
import LoanAdd from './pages/LoanAdd';
import LoanEdit from './pages/LoanEdit';

// About and report pages
import About from './pages/About';
import Report from './pages/Report';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <div className="container mt-4">
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          
          {/* Main routes */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/list/:table" element={<ProtectedRoute><DataList /></ProtectedRoute>} />
          
          {/* Book routes */}
          <Route path="/Books/add" element={<ProtectedRoute><BookAdd /></ProtectedRoute>} />
          <Route path="/Books/edit/:id" element={<ProtectedRoute><BookEdit /></ProtectedRoute>} />

          {/* Customer routes */}
          <Route path="/Customers/add" element={<ProtectedRoute><CustomerAdd /></ProtectedRoute>} />
          <Route path="/Customers/edit/:id" element={<ProtectedRoute><CustomerEdit /></ProtectedRoute>} />

          {/* Employee routes */}
          <Route path="/Employees/add" element={<ProtectedRoute><EmployeeAdd /></ProtectedRoute>} />
          <Route path="/Employees/edit/:id" element={<ProtectedRoute><EmployeeEdit /></ProtectedRoute>} />

          {/* Loan routes */}
          <Route path="/loans" element={<ProtectedRoute><LoanList /></ProtectedRoute>} />
          <Route path="/loans/add" element={<ProtectedRoute><LoanAdd /></ProtectedRoute>} />
          <Route path="/loans/edit/:id" element={<ProtectedRoute><LoanEdit /></ProtectedRoute>} />

          {/* About and report pages*/}
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
          
          {/* Generic delete */}
          <Route path="/:table/delete/:id" element={<ProtectedRoute><GenericDelete /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;