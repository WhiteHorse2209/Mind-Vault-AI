import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { ArrowLeft, Save, Loader2, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const EditJournal = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await api.get(`/journal/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        alert('Failed to fetch journal');
        navigate('/journals');
      } finally {
        setLoading(false);
      }
    };
    fetchJournal();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setSaving(true);
    try {
      await api.put(`/journal/${id}`, { title, content });
      navigate('/journals');
    } catch (error) {
      alert('Failed to update journal');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.delete(`/journal/${id}`);
        navigate('/journals');
      } catch (error) {
        alert('Failed to delete journal');
      }
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-primary">Loading entry...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <Link to="/journals" className="inline-flex items-center gap-2 text-text-secondary hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </Link>
        <div className="flex gap-4">
          <button 
            onClick={handleDelete}
            className="p-3 text-text-secondary hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all"
          >
            <Trash2 size={20} />
          </button>
          <button 
            onClick={handleUpdate}
            disabled={saving || !title || !content}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save Changes
          </button>
        </div>
      </header>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 lg:p-12 space-y-8"
      >
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Journal Title"
          className="w-full bg-transparent text-4xl lg:text-5xl font-bold focus:outline-none placeholder:text-text-secondary/20"
        />

        <div className="flex items-center gap-4 py-4 border-y border-white/5 text-sm text-text-secondary">
          <span>Editing Entry</span>
          <span>•</span>
          <span>{content.length} characters</span>
          <span>•</span>
          <span>{content.split(/\s+/).filter(Boolean).length} words</span>
        </div>

        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your thoughts..."
          className="w-full h-[500px] bg-transparent text-xl leading-relaxed focus:outline-none placeholder:text-text-secondary/20 resize-none"
        />
      </motion.div>
    </div>
  );
};

export default EditJournal;
