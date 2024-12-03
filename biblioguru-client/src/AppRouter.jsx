import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BorrowerPage from './pages/BorrowerPage';
import RegisterPage from './pages/RegisterPage';
import ReportsPage from './pages/ReportsPage';
import ManageBooksPage from './pages/ManageBooksPage';
import ManageBorrowersPage from './pages/ManageBorrowersPage';
import ManageLoansPage from './pages/ManageLoansPage';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BorrowerPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/reports" element={<ReportsPage/>}/>
                <Route path="/manage-books" element={<ManageBooksPage/>}/>
                <Route path="/manage-borrowers" element={<ManageBorrowersPage/>}/>
                <Route path="/manage-loans" element={<ManageLoansPage/>}/>
            </Routes>
        </Router>
    );
}

export default AppRouter;
