import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                {/* Placeholder routes for future components */}
                <Route path="/manage-books" element={<div>Manage Books Page (Coming Soon)</div>}/>
                <Route path="/manage-borrowers" element={<div>Manage Borrowers Page (Coming Soon)</div>}/>
            </Routes>
        </Router>
    );
}

export default AppRouter;
