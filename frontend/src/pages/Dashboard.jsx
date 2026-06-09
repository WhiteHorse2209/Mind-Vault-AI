import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { BookOpen, Plus, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

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

  const calculateStreak = (entries) => {
    if (!entries || entries.length === 0) return 0;
    
    // Sort entries by date (descending)
    const sortedDates = entries
      .map(e => new Date(e.created_at).setHours(0, 0, 0, 0))
      .sort((a, b) => b - a);
      
    // Remove duplicates (multiple entries on the same day)
    const uniqueDates = [...new Set(sortedDates)];
    
    let streak = 0;
    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = new Date(today - 86400000).setHours(0, 0, 0, 0);
    
    // Check if the latest entry is today or yesterday to continue the streak
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) return 0;
    
    for (let i = 0; i < uniqueDates.length; i++) {
      const expectedDate = uniqueDates[0] - (i * 86400000);
      if (uniqueDates[i] === expectedDate) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const streak = calculateStreak(journals);

  const stats = [
    { icon: BookOpen, label: 'Total Entries', value: journals.length, color: 'bg-blue-500/20 text-blue-500' },
    { icon: Clock, label: 'Last Entry', value: journals.length > 0 ? new Date(journals[0].created_at).toLocaleDateString() : 'None', color: 'bg-purple-500/20 text-purple-500' },
    { icon: TrendingUp, label: 'Streak', value: `${streak} Day${streak !== 1 ? 's' : ''}`, color: 'bg-emerald-500/20 text-emerald-500' },
  ];

  const latestInsight = journals.find(j => j.ai_insight)?.ai_insight;

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
        {/* Recent Entries */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Entries</h2>
            <Link to="/journals" className="text-primary hover:underline text-sm font-medium">View all</Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              [1, 2, 3].map(i => <div key={i} className="h-24 glass-card animate-pulse" />)
            ) : journals.length > 0 ? (
              journals.slice(0, 3).map((journal) => (
                <Link 
                  key={journal.id} 
                  to={`/journals/edit/${journal.id}`}
                  className="block glass-card p-6 hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{journal.title}</h3>
                    <span className="text-xs text-text-secondary">{new Date(journal.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className={`text-text-secondary line-clamp-1 ${settings.privacyMode ? 'blur-sm select-none' : ''}`}>
                    {journal.content}
                  </p>
                </Link>
              ))
            ) : (
              <div className="glass-card p-12 text-center">
                <p className="text-text-secondary mb-6">You haven't created any entries yet.</p>
                <Link to="/journals/new" className="btn-secondary inline-flex items-center gap-2">
                  <Plus size={18} /> Create your first entry
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions / Tips */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Insights Guide</h2>
          <div className="glass-card p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <Sparkles className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-3">{latestInsight ? 'Latest Insight' : 'AI Discovery'}</h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              {latestInsight 
                ? `"${latestInsight}"`
                : "In Week 2, this space will show emotion trends and AI-powered reflections based on your writing."
              }
            </p>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-sm text-text-secondary italic">
              "Consistency is the key to deep self-discovery."
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
