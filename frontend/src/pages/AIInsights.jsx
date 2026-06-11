import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Calendar, 
  Hash, 
  TrendingUp, 
  Loader2,
  AlertCircle
} from 'lucide-react';

const InsightCard = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-6 h-full"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-bold text-white">{title}</h3>
    </div>
    <div className="text-text-secondary leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const AIInsights = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    weeklySummary: '',
    monthlySummary: '',
    topics: [],
    insights: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const [weeklyRes, monthlyRes, topicsRes, insightsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/summary/weekly', config),
          axios.get('http://localhost:8000/api/summary/monthly', config),
          axios.get('http://localhost:8000/api/summary/topics', config),
          axios.get('http://localhost:8000/api/summary/insights', config)
        ]);

        setData({
          weeklySummary: weeklyRes.data.summary,
          monthlySummary: monthlyRes.data.summary,
          topics: topicsRes.data.topics,
          insights: insightsRes.data.insights
        });
      } catch (err) {
        console.error('Error fetching AI insights:', err);
        setError('Failed to load insights. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-text-secondary animate-pulse">Analyzing your journals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-10 flex flex-col items-center gap-4 text-center">
        <AlertCircle className="text-red-400" size={48} />
        <h2 className="text-xl font-bold">Oops! Something went wrong</h2>
        <p className="text-text-secondary max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">AI Insights</h1>
        <p className="text-text-secondary">Your personal growth and productivity analysis.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weekly Summary */}
        <InsightCard title="Weekly Summary" icon={Calendar} delay={0.1}>
          <p className="text-white/90 italic">
            "{data.weeklySummary}"
          </p>
        </InsightCard>

        {/* Monthly Summary */}
        <InsightCard title="Monthly Summary" icon={Sparkles} delay={0.2}>
          <p className="text-white/90 italic">
            "{data.monthlySummary}"
          </p>
        </InsightCard>

        {/* Topics */}
        <InsightCard title="Recurring Themes" icon={Hash} delay={0.3}>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.topics.length > 0 ? (
              data.topics.map((topic, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium"
                >
                  {topic}
                </span>
              ))
            ) : (
              <p className="text-sm text-text-secondary">No topics identified yet.</p>
            )}
          </div>
        </InsightCard>

        {/* Productivity Insights */}
        <InsightCard title="Productivity Insights" icon={TrendingUp} delay={0.4}>
          <ul className="space-y-3">
            {data.insights.map((insight, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </InsightCard>
      </div>
    </div>
  );
};

export default AIInsights;
