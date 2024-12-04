import PropTypes from 'prop-types';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BorrowerPage from './pages/BorrowerPage';
import RegisterPage from './pages/RegisterPage';
import BorrowerDashboardPage from './pages/BorrowerDashboardPage'; // Import the Borrower Dashboard Page
import ManageBooksPage from './pages/ManageBooksPage'; // Import Manage Books Page
import ManageBorrowersPage from './pages/ManageBorrowersPage'; // Import Manage Borrowers Page
import ManageLoansPage from './pages/ManageLoansPage'; // Import Manage Loans Page
import ReportsPage from './pages/ReportsPage'; // Import Reports Page
import BorrowerLoginPage from './pages/BorrowerLoginPage'; // Import Borrower Login Page

function AppRouter({redirectTo, element}) {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<BorrowerPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/borrower-login" element={<BorrowerLoginPage/>}/> {/* Added Borrower Login Page */}

                {/* Borrower Routes */}
                <Route path="/borrower-dashboard" element={<BorrowerDashboardPage/>}/>

                {/* Admin Routes */}
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/manage-books" element={<ManageBooksPage/>}/>
                <Route path="/manage-borrowers" element={<ManageBorrowersPage/>}/>
                <Route path="/manage-loans" element={element || <ManageLoansPage/>}/>
                <Route path="/reports" element={<ReportsPage/>}/>

                {/* Redirect Route Example */}
                {redirectTo && <Route path="*" element={<Navigate to={redirectTo} replace/>}/>}
            </Routes>
        </Router>
    );
}

// Prop Types Validation
AppRouter.propTypes = {
    redirectTo: PropTypes.string,
    element: PropTypes.element,
};

export default AppRouter;
