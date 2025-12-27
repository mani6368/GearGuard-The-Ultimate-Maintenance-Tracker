import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Equipment from './pages/Equipment';
import Kanban from './pages/Kanban';
import CalendarView from './pages/CalendarView';
import Teams from './pages/Teams';
import Settings from './pages/Settings';

const DashboardLayout = () => {
    const [currentView, setCurrentView] = useState('dashboard');
    const [viewParams, setViewParams] = useState(null);

    const navigate = (view, params = null) => {
        setCurrentView(view);
        setViewParams(params);
    };

    const renderView = () => {
        switch (currentView) {
            case 'dashboard': return <Dashboard setView={navigate} />;
            case 'equipment': return <Equipment setView={navigate} />;
            case 'requests': return <Kanban viewParams={viewParams} setView={navigate} />;
            case 'calendar': return <CalendarView setView={navigate} />;
            case 'teams': return <Teams />;
            case 'settings': return <Settings />;
            default: return <Dashboard setView={navigate} />;
        }
    };

    return (
        <Layout currentView={currentView} setView={navigate}>
            {renderView()}
        </Layout>
    );
};

function App() {
    return (
        <HashRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/*" element={
                        <PrivateRoute>
                            <DashboardLayout />
                        </PrivateRoute>
                    } />
                </Routes>
            </AuthProvider>
        </HashRouter>
    );
}

export default App;
