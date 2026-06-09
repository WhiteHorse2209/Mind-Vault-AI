import React from 'react';
import { Settings as SettingsIcon, Bell, Eye, Lock, Moon, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';

const SettingItem = ({ icon: Icon, title, desc, action }) => (
  <div className="flex items-center justify-between p-6 glass-card hover:border-primary/20 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-text-secondary">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm text-text-secondary">{desc}</p>
      </div>
    </div>
    {action}
  </div>
);

const Toggle = ({ active, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`w-12 h-6 rounded-full p-1 transition-colors ${active ? 'bg-primary' : 'bg-white/10'}`}
  >
    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${active ? 'translate-x-6' : 'translate-x-0'}`} />
  </button>
);

const Settings = () => {
  const { settings, toggleSetting, setAccentColor } = useSettings();

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <header>
        <h1 className="text-4xl font-bold mb-2">Settings</h1>
        <p className="text-text-secondary">Personalize your experience and manage application preferences.</p>
      </header>

      <div className="space-y-6">
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Palette size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Appearance</h2>
          </div>
          <div className="grid gap-4">
            <SettingItem 
              icon={Moon} 
              title="Dark Mode" 
              desc="Switch between light and dark themes" 
              action={<Toggle active={settings.darkMode} onToggle={() => toggleSetting('darkMode')} />}
            />
            <SettingItem 
              icon={Palette} 
              title="Accent Color" 
              desc="Customize the primary color of the application" 
              action={<div className="flex gap-2">
                <button 
                  onClick={() => setAccentColor('blue')}
                  className={`w-6 h-6 rounded-full bg-blue-500 ${settings.accentColor === 'blue' ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}`} 
                />
                <button 
                  onClick={() => setAccentColor('purple')}
                  className={`w-6 h-6 rounded-full bg-purple-500 ${settings.accentColor === 'purple' ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}`} 
                />
                <button 
                  onClick={() => setAccentColor('emerald')}
                  className={`w-6 h-6 rounded-full bg-emerald-500 ${settings.accentColor === 'emerald' ? 'ring-2 ring-white ring-offset-2 ring-offset-background' : ''}`} 
                />
              </div>}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Bell size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Notifications</h2>
          </div>
          <div className="grid gap-4">
            <SettingItem 
              icon={Bell} 
              title="Journal Reminders" 
              desc="Get notified when it's time to write your daily entry" 
              action={<Toggle active={settings.journalReminders} onToggle={() => toggleSetting('journalReminders')} />}
            />
            <SettingItem 
              icon={SettingsIcon} 
              title="AI Insight Alerts" 
              desc="Receive notifications for new AI-powered reflections" 
              action={<Toggle active={settings.aiAlerts} onToggle={() => toggleSetting('aiAlerts')} />}
            />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-text-secondary mb-2">
            <Eye size={18} />
            <h2 className="text-sm font-bold uppercase tracking-widest">Privacy</h2>
          </div>
          <div className="grid gap-4">
            <SettingItem 
              icon={Lock} 
              title="Biometric Lock" 
              desc="Require authentication to open the application" 
              action={<Toggle active={settings.biometricLock} onToggle={() => toggleSetting('biometricLock')} />}
            />
            <SettingItem 
              icon={Eye} 
              title="Privacy Mode" 
              desc="Blur journal previews on the dashboard" 
              action={<Toggle active={settings.privacyMode} onToggle={() => toggleSetting('privacyMode')} />}
            />
          </div>
        </section>
      </div>

      <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-red-400">Danger Zone</h3>
          <p className="text-sm text-text-secondary">Permanently delete your account and all journal entries</p>
        </div>
        <button 
          onClick={() => alert('Account deletion is restricted in Beta.')}
          className="px-6 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 font-bold hover:bg-red-500 hover:text-white transition-all"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
