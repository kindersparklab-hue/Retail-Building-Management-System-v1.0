import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Shops from './components/Shops';
import RentPayments from './components/RentPayments';
// Add other components as needed

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/shops" element={<Shops />} />
                <Route path="/rent" element={<RentPayments />} />
                {/* Add routes for other modules */}
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}
export default App;
