
import React, { useState } from 'react';
import { Lock, X, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminLoginProps {
  onClose: () => void;
  onSuccess: () => void;
  t: any;
  isDark: boolean;
  correctPassword?: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose, onSuccess, t, isDark, correctPassword = 'gahlan2025' }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-6 ${isDark ? 'bg-slate-950/95' : 'bg-slate-900/80'} backdrop-blur-xl`}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`glass w-full max-w-md p-12 rounded-[4rem] relative border ${isDark ? 'border-white/10' : 'border-white/20'} shadow-4xl`}>
        <button onClick={onClose} className="absolute top-8 left-8 p-3 hover:bg-rose-500 text-white rounded-full transition-all group"><X size={24} /></button>
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-indigo-600/20 rounded-[2rem] flex items-center justify-center mx-auto mb-8"><ShieldCheck size={40} className="text-indigo-400" /></div>
          <h2 className="text-4xl font-black">{t.admin_login}</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase px-3">{t.admin_pass}</label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500" size={20} />
              <input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-[2rem] pl-16 pr-8 py-5 outline-none ${error ? 'border-rose-500' : 'focus:border-indigo-500'}`} placeholder="••••••••" />
            </div>
            {error && <p className="text-[10px] text-rose-500 font-black px-4 uppercase tracking-widest">{t.admin_error}</p>}
          </div>
          <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-[2rem] font-black text-xl transition-all shadow-2xl">
            {t.admin_btn}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
