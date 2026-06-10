import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { BookOpen, Plus, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = {
  joy: '#F59E0B',
  sadness: '#3B82F6',
  anger: '#EF4444',
  fear: '#8B5CF6',
  surprise: '#10B981',
  love: '#EC4899',
  neutral: '#6B7280'
};

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="glass-card p-6 flex items-center gap-6">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}>
      <Icon size={28} className="text-white" />
    </div>
    <div>
      <p className="text-text-secondary text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { settings } = useSettings();
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await api.get('/journal');
        setJournals(response.data);
      } catch (error) {
        console.error('Error fetching journals:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJournals();
  }, []);

  const calculateEmotionData = (entries) => {
    const counts = {};
    entries.forEach(e => {
      const emo = e.emotion?.toLowerCase() || 'neutral';
      counts[emo] = (counts[emo] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: counts[key],
      color: COLORS[key] || COLORS.neutral
    }));
  };

  const emotionData = calculateEmotionData(journals);

  const stats = [
    { icon: BookOpen, label: 'Total Entries', value: journals.length, color: 'bg-blue-500/20 text-blue-500' },
    { icon: TrendingUp, label: 'Positive', value: journals.filter(j => j.sentiment === 'positive').length, color: 'bg-emerald-500/20 text-emerald-500' },
    { icon: Clock, label: 'Negative', value: journals.filter(j => j.sentiment === 'negative').length, color: 'bg-red-500/20 text-red-500' },
  ];

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}</h1>
          <p className="text-text-secondary">Here's what's happening in your vault.</p>
        </div>
        <Link to="/journals/new" className="btn-primary flex items-center gap-2 self-start md:self-center">
          <Plus size={20} /> New Entry
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Emotion Trends</h2>
            <div className="glass-card p-6 h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emotionData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value">
                            {emotionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        
        {/* Recent Entries - Simplified */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Latest Entries</h2>
          <div className="space-y-4">
            {loading ? (
              [1, 2].map(i => <div key={i} className="h-24 glass-card animate-pulse" />)
            ) : (
              journals.slice(0, 2).map((journal) => (
                <div key={journal.id} className="glass-card p-4">
                  <h3 className="font-bold">{journal.title}</h3>
                  <p className="text-sm text-text-secondary">Emotion: {journal.emotion}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
