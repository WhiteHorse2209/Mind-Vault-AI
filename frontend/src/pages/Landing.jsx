import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Brain, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, desc }) => (
  <div className="glass-card p-8 hover:border-primary/30 transition-all duration-300 group">
    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
      <Icon className="text-primary" size={24} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-text-secondary leading-relaxed">{desc}</p>
  </div>
);

const Landing = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-bold gradient-text">MindVault AI</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" className="text-text-secondary hover:text-white transition-colors font-medium">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
            Your Private Space for <br />
            <span className="gradient-text">Reflection, Growth, and Insight</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            Capture your thoughts, organize your memories, and prepare for AI-powered self-discovery in a premium, secure environment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn-primary px-10 py-4 text-lg flex items-center gap-2">
              Start Journaling <ArrowRight size={20} />
            </Link>
            <a href="#features" className="btn-secondary px-10 py-4 text-lg flex items-center justify-center">
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Hero Image Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-24 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10" />
          <div className="glass-card p-4 rounded-[2rem] border-white/20 shadow-2xl">
            <div className="bg-background-secondary rounded-2xl aspect-[16/9] flex items-center justify-center overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                alt="App Interface" 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Brain size={80} className="text-primary mb-4 opacity-50" />
                <p className="text-2xl font-bold opacity-30">MindVault Interface Placeholder</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Everything you need to grow</h2>
          <p className="text-text-secondary">Designed for the modern thinker, powered by future-ready architecture.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Shield} 
            title="Privacy First" 
            desc="Your data is yours. Secure authentication and private storage keep your thoughts protected."
          />
          <FeatureCard 
            icon={Zap} 
            title="Blazing Fast" 
            desc="Optimized performance ensures a smooth writing experience without distractions."
          />
          <FeatureCard 
            icon={Brain} 
            title="AI Ready" 
            desc="Foundation built for upcoming features like emotion detection and smart insights."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold">MindVault AI</span>
        </div>
        <p className="text-text-secondary text-sm">© 2026 MindVault AI. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-text-secondary">
          <Link to="#" className="hover:text-white">Privacy</Link>
          <Link to="#" className="hover:text-white">Terms</Link>
          <Link to="#" className="hover:text-white">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
