import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Calendar, 
  Target, 
  TrendingUp, 
  Loader2,
  AlertCircle,
  BrainCircuit,
  Heart,
  Lightbulb,
  ChevronRight
} from 'lucide-react';

const ReflectionCard = ({ title, icon: Icon, children, delay = 0, color = "primary" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-6 h-full border-t-2 border-t-primary/30"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 bg-${color}/10 rounded-lg text-${color}`}>
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
    </div>
    <div className="text-text-secondary leading-relaxed space-y-3">
      {children}
    </div>
  </motion.div>
);

const AIReflections = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reflections, setReflections] = useState({
    weekly: null,
    monthly: null,
    growth: null,
    recommendations: []
  });

  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const [weeklyRes, monthlyRes, growthRes, recsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/reflection/weekly', config),
          axios.get('http://localhost:8000/api/reflection/monthly', config),
          axios.get('http://localhost:8000/api/reflection/growth', config),
          axios.get('http://localhost:8000/api/reflection/recommendations', config)
        ]);

        setReflections({
          weekly: weeklyRes.data,
          monthly: monthlyRes.data,
          growth: growthRes.data,
          recommendations: recsRes.data.recommendations
        });
      } catch (err) {
        console.error('Error fetching reflections:', err);
        setError('Failed to generate your personal reflections. Please ensure you have enough journal entries.');
      } finally {
        setLoading(false);
      }
    };

    fetchReflections();
  }, []);

  if (loading) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
          />
          <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" size={24} />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Reflecting on your journey...</h2>
          <p className="text-text-secondary animate-pulse">Our AI is analyzing patterns and growth in your entries.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-10 flex flex-col items-center gap-4 text-center border-red-500/20">
        <AlertCircle className="text-red-400" size={48} />
        <h2 className="text-xl font-bold">Reflection Unavailable</h2>
        <p className="text-text-secondary max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-medium mb-1">
            <Sparkles size={18} />
            <span>AI Powered</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white">Your Reflections</h1>
          <p className="text-text-secondary mt-2 text-lg">Deep insights into your habits, emotions, and personal growth.</p>
        </div>
        <div className="hidden md:block">
          <div className="glass-card px-4 py-2 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium">Reflection Engine Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Weekly & Monthly */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ReflectionCard title="Weekly Reflection" icon={Calendar} delay={0.1}>
              <p className="text-white font-medium leading-relaxed italic border-l-2 border-primary/30 pl-4 py-1">
                "{reflections.weekly?.reflection}"
              </p>
            </ReflectionCard>

            <ReflectionCard title="Monthly Perspective" icon={Target} delay={0.2}>
              <p className="text-white font-medium leading-relaxed italic border-l-2 border-primary/30 pl-4 py-1">
                "{reflections.monthly?.reflection}"
              </p>
            </ReflectionCard>
          </div>

          {/* Growth Analysis - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8 bg-gradient-to-br from-white/[0.03] to-primary/[0.05]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-xl text-primary">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Growth Insights</h3>
                <p className="text-text-secondary text-sm">Long-term evolution analysis</p>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/90 leading-relaxed mb-6">
                {reflections.growth?.growth}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                  <Heart size={16} /> Emotional Trend
                </h4>
                <p className="text-sm text-text-secondary">
                  {reflections.weekly?.patterns?.emotional_trend}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                <h4 className="text-primary font-bold mb-2 flex items-center gap-2">
                  <BrainCircuit size={16} /> Key Habits
                </h4>
                <div className="flex flex-wrap gap-2">
                  {reflections.weekly?.patterns?.habits?.length > 0 ? (
                    reflections.weekly.patterns.habits.map((h, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-primary/10 rounded-md text-primary-light">
                        {h}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-text-secondary">Continuing to observe patterns...</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Recommendations */}
        <div className="lg:col-span-1">
          <ReflectionCard title="Recommendations" icon={Lightbulb} delay={0.4} color="yellow-400">
            <div className="space-y-4">
              <p className="text-sm mb-4">Actionable steps based on your recent activity:</p>
              {reflections.recommendations.map((rec, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + (i * 0.1) }}
                  className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <p className="text-sm text-white/80 leading-snug">
                    {rec}
                  </p>
                </motion.div>
              ))}
              
              <div className="mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
                <p className="text-xs text-primary font-medium mb-2 uppercase tracking-wider">Next Milestone</p>
                <p className="text-white font-bold">30 Day Reflection</p>
                <div className="w-full bg-white/10 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-primary h-full w-[65%]" />
                </div>
              </div>
            </div>
          </ReflectionCard>
        </div>
      </div>

      <footer className="text-center pt-8 border-t border-white/5">
        <p className="text-text-secondary text-sm flex items-center justify-center gap-2">
          Made with <Heart size={14} className="text-red-500" /> by MindVault AI Reflection Engine
        </p>
      </footer>
    </div>
  );
};

export default AIReflections;
