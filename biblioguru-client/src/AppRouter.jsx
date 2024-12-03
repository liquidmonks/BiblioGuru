import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BorrowerPage from './pages/BorrowerPage';
import RegisterPage from './pages/RegisterPage';
import BorrowerDashboardPage from './pages/BorrowerDashboardPage'; // Import the new page

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<BorrowerPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/borrower-dashboard" element={<BorrowerDashboardPage/>}/> {/* Add this */}
            </Routes>
        </Router>
    );
}

export default AppRouter;
