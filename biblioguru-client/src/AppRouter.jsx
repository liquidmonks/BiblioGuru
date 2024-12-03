import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BorrowerPage from './pages/BorrowerPage';
import RegisterPage from './pages/RegisterPage';
import BorrowerDashboardPage from './pages/BorrowerDashboardPage'; // Import the Borrower Dashboard Page
import ManageBooksPage from './pages/ManageBooksPage'; // Import Manage Books Page
import ManageBorrowersPage from './pages/ManageBorrowersPage'; // Import Manage Borrowers Page
import ManageLoansPage from './pages/ManageLoansPage'; // Import Manage Loans Page
import ReportsPage from './pages/ReportsPage'; // Import Reports Page

function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<BorrowerPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>

                {/* Borrower Routes */}
                <Route path="/borrower-dashboard" element={<BorrowerDashboardPage/>}/>

                {/* Admin Routes */}
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/manage-books" element={<ManageBooksPage/>}/>
                <Route path="/manage-borrowers" element={<ManageBorrowersPage/>}/>
                <Route path="/manage-loans" element={<ManageLoansPage/>}/>
                <Route path="/reports" element={<ReportsPage/>}/>
            </Routes>
        </Router>
    );
}

export default AppRouter;
