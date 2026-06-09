import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Journals from '../pages/Journals';
import CreateJournal from '../pages/CreateJournal';
import EditJournal from '../pages/EditJournal';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import DashboardLayout from '../layouts/DashboardLayout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-background text-primary">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/journals" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Journals />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/journals/new" element={
        <ProtectedRoute>
          <DashboardLayout>
            <CreateJournal />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/journals/edit/:id" element={
        <ProtectedRoute>
          <DashboardLayout>
            <EditJournal />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Profile />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;
