import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, Shield, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileInfo = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 glass-card">
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs text-text-secondary uppercase tracking-wider font-bold">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-bold mb-2">My Profile</h1>
        <p className="text-text-secondary">Manage your personal information and account status.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8 flex flex-col items-center text-center space-y-6"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent p-1 shadow-2xl shadow-primary/20">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-5xl font-bold text-primary">
              {user?.name?.charAt(0)}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-text-secondary">{user?.email}</p>
          </div>
          <div className="px-4 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold uppercase tracking-widest">
            Free Member
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <ProfileInfo icon={User} label="Full Name" value={user?.name} />
          <ProfileInfo icon={Mail} label="Email Address" value={user?.email} />
          <ProfileInfo icon={Calendar} label="Member Since" value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'June 2026'} />
          <ProfileInfo icon={Award} label="Achievements" value="5 Journal Entries" />
        </motion.div>
      </div>

      <div className="glass-card p-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="text-primary" size={24} />
          <h2 className="text-2xl font-bold">Security Status</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div>
              <p className="font-semibold">Password</p>
              <p className="text-sm text-text-secondary">Last updated 3 days ago</p>
            </div>
            <button 
              onClick={() => alert('Password change feature coming soon!')}
              className="btn-secondary text-sm"
            >
              Change Password
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div>
              <p className="font-semibold">Two-Factor Authentication</p>
              <p className="text-sm text-text-secondary">Add an extra layer of security</p>
            </div>
            <button 
              onClick={() => alert('2FA feature coming soon!')}
              className="btn-secondary text-sm"
            >
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
