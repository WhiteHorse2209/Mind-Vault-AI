import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Plus, MoreVertical, Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Journals = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchJournals();
  }, []);

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

  const deleteJournal = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.delete(`/journal/${id}`);
        setJournals(journals.filter(j => j.id !== id));
      } catch (error) {
        alert('Failed to delete journal');
      }
    }
  };

  const filteredJournals = journals.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    j.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Journals</h1>
          <p className="text-text-secondary">A collection of your thoughts and memories.</p>
        </div>
        <Link to="/journals/new" className="btn-primary flex items-center gap-2">
          <Plus size={20} /> New Entry
        </Link>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50" size={20} />
        <input 
          type="text"
          placeholder="Search journals..."
          className="input-field pl-12 bg-white/5 border-white/10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 glass-card animate-pulse" />)
        ) : filteredJournals.length > 0 ? (
          <AnimatePresence>
            {filteredJournals.map((journal, i) => (
              <motion.div
                key={journal.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6 flex flex-col group hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Calendar size={14} />
                    {new Date(journal.created_at).toLocaleDateString()}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/journals/edit/${journal.id}`} className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-primary transition-colors">
                      <Edit2 size={16} />
                    </Link>
                    <button 
                      onClick={() => deleteJournal(journal.id)}
                      className="p-2 hover:bg-white/5 rounded-lg text-text-secondary hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-1">
                  {journal.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-4 flex-1">
                  {journal.content}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-text-secondary/50">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    {new Date(journal.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <span>{journal.content.split(/\s+/).length} words</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-text-secondary text-lg">No journals found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journals;
