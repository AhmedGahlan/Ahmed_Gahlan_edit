
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PortfolioSection from './components/PortfolioSection';
import Dashboard from './components/Dashboard';
import SplashScreen from './components/SplashScreen';
import AdminLogin from './components/AdminLogin';
import WhatsAppButton from './components/WhatsAppButton';
import { Project, Lead, HeroContent, Service, SiteSettings } from './types';
import { INITIAL_PROJECTS } from './constants';
import { translations } from './translations';
import { 
  Mail, Phone, Music2, Facebook, Sparkles, Layers, Monitor, 
  Shield, ArrowRight, TrendingUp, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  // --- State Management ---
  const [projects, setProjects] = useState<Project[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [hero, setHero] = useState<HeroContent>({
    tagline: "الاستوديو الإبداعي الخاص بك",
    title: "نصنع <span class='gradient-text'>التميز</span> الذي تستحقه",
    description: "متخصص في صياغة التجارب البصرية التي لا تُنسى، من خلال دمج التصميم الاستراتيجي مع تقنيات المونتاج الحديثة.",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1000",
  });
  const [services, setServices] = useState<Service[]>([
    { id: '1', title: 'تصميم الإعلانات', desc: 'تصميمات بصرية تخطف الأنظار تزيد من نسبة النقر والتفاعل.', iconType: 'design' },
    { id: '2', title: 'مونتاج الفيديو', desc: 'تحويل لقطاتك العادية إلى قصة سينمائية ملهمة ومؤثرة.', iconType: 'video' },
    { id: '3', title: 'إدارة الحملات', desc: 'تحليل دقيق واستهداف ذكي لضمان أفضل وصول لجمهورك المستهدف.', iconType: 'ads' }
  ]);
  const [settings, setSettings] = useState<SiteSettings>({
    adminPassword: 'gahlan2025',
    tiktokUrl: 'https://tiktok.com/@gahlan',
    facebookUrl: 'https://facebook.com/gahlan',
    phone: '+201012345678',
    email: 'contact@gahlan.com'
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.body.className = theme === 'dark' ? 'bg-[#020617] text-slate-200' : 'bg-[#f8fafc] text-slate-900';
  }, [lang, theme]);

  useEffect(() => {
    const loadData = (key: string, setter: Function, defaultValue: any) => {
      const saved = localStorage.getItem(`gahlan_${key}`);
      if (saved) setter(JSON.parse(saved));
      else if (defaultValue) setter(defaultValue);
    };

    loadData('projects', setProjects, INITIAL_PROJECTS);
    loadData('leads', setLeads, []);
    loadData('hero', setHero, null);
    loadData('services', setServices, null);
    loadData('settings', setSettings, null);
  }, []);

  const persist = (key: string, value: any) => {
    localStorage.setItem(`gahlan_${key}`, JSON.stringify(value));
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newLead: Lead = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      service: 'طلب تواصل عام',
      message: formData.get('message') as string,
      status: 'جديد',
      date: new Date().toLocaleDateString('ar-EG')
    };
    const updated = [newLead, ...leads];
    setLeads(updated);
    persist('leads', updated);
    alert(lang === 'ar' ? 'تم استلام رسالتك بنجاح، سأتواصل معك قريباً!' : 'Message received! I will contact you soon.');
    e.currentTarget.reset();
  };

  if (loading && !isAdminMode) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-all duration-700 font-['Cairo']`}>
      <Navbar 
        isAdmin={isAdminMode} 
        onAdminClick={() => isAuthenticated ? setIsAdminMode(!isAdminMode) : setShowLogin(true)} 
        lang={lang} 
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        t={t}
        hideAdminBtn={!isAuthenticated}
      />

      <AnimatePresence mode="wait">
        {isAdminMode && isAuthenticated ? (
          <motion.div key="dashboard" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.02 }}>
            <Dashboard 
              projects={projects} 
              onAddProject={(p) => { const u = [p, ...projects]; setProjects(u); persist('projects', u); }}
              onDeleteProject={(id) => { const u = projects.filter(p => p.id !== id); setProjects(u); persist('projects', u); }}
              leads={leads}
              onDeleteLead={(id) => { const u = leads.filter(l => l.id !== id); setLeads(u); persist('leads', u); }}
              onUpdateLeadStatus={(id, status) => { const u = leads.map(l => l.id === id ? { ...l, status } : l); setLeads(u); persist('leads', u); }}
              hero={hero}
              onUpdateHero={(h) => { setHero(h); persist('hero', h); }}
              services={services}
              onUpdateServices={(s) => { setServices(s); persist('services', s); }}
              settings={settings}
              onUpdateSettings={(set) => { setSettings(set); persist('settings', set); }}
              lang={lang}
              t={t}
            />
          </motion.div>
        ) : (
          <motion.main key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className={`absolute top-[-10%] right-[-10%] w-[60%] h-[60%] blur-[120px] rounded-full transition-all duration-1000 ${isDark ? 'bg-indigo-900/10' : 'bg-indigo-500/5'}`}></div>
              <div className={`absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] blur-[120px] rounded-full transition-all duration-1000 ${isDark ? 'bg-rose-900/10' : 'bg-rose-500/5'}`}></div>
            </div>

            <div className="relative z-10">
              {/* Hero Section - Improved Line Height and Spacing */}
              <section className="pt-48 pb-32 px-6">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: lang === 'ar' ? 60 : -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-12">
                      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full glass border ${isDark ? 'border-white/10 text-indigo-400' : 'border-indigo-500/10 text-indigo-600'} text-xs font-black uppercase tracking-[0.2em] shadow-xl`}>
                        <Sparkles size={16} className="animate-pulse" /> {hero.tagline}
                      </div>
                      <h2 className="text-6xl md:text-[5.5rem] font-black leading-[1.1] tracking-tighter" dangerouslySetInnerHTML={{ __html: hero.title }}></h2>
                      <p className={`text-xl ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed max-w-xl font-medium`}>{hero.description}</p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        {services.slice(0, 2).map((s) => (
                          <div key={s.id} className={`glass p-8 rounded-[3rem] border ${isDark ? 'border-white/5' : 'border-slate-200'} transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}>
                            <div className="w-14 h-14 bg-indigo-600/10 text-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                              {s.iconType === 'design' ? <Layers size={24}/> : <Monitor size={24}/>}
                            </div>
                            <h3 className="text-xl font-black mb-4 leading-snug">{s.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{s.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.9, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1 }} className="relative group">
                      <div className={`relative glass p-4 rounded-[4.5rem] overflow-hidden shadow-4xl border ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                        <img src={hero.imageUrl} className="w-full h-[700px] md:h-[750px] object-cover rounded-[4rem] transition-transform duration-[2s] group-hover:scale-105" alt="Ahmed Gahlan Professional" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-transparent opacity-60"></div>
                        <div className="absolute bottom-10 right-10 left-10 p-10 glass rounded-[2.5rem] border-white/10 backdrop-blur-3xl shadow-3xl">
                          <h4 className="text-4xl font-black mb-2 text-white leading-tight">أحمد جهلان</h4>
                          <p className="text-indigo-400 font-bold tracking-widest uppercase text-xs">Creative Director & Content Architect</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              <PortfolioSection projects={projects} lang={lang} t={t} isDark={isDark} />

              <section id="contact" className="py-40 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                  <div className="space-y-12">
                    <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight" dangerouslySetInnerHTML={{ __html: t.contact_title }}></h2>
                    <p className={`text-xl font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{t.contact_desc}</p>
                    
                    <div className="space-y-6 pt-4">
                      <div className="flex items-center gap-6 p-6 glass rounded-3xl border-white/5">
                        <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-600/20"><Mail size={28}/></div>
                        <div>
                          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Email Me</p>
                          <p className="text-xl font-black truncate">{settings.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 p-6 glass rounded-3xl border-white/5">
                        <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-600/20"><Phone size={28}/></div>
                        <div>
                          <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Call or WhatsApp</p>
                          <p className="text-xl font-black" dir="ltr">{settings.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleContactSubmit} className={`glass p-12 md:p-16 rounded-[4rem] space-y-8 border ${isDark ? 'border-white/5' : 'border-slate-200'} shadow-4xl`}>
                    <div className="grid grid-cols-1 md:gap-8 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase px-4">Name</label>
                        <input name="name" required placeholder={t.contact_name} className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-[2rem] px-8 py-5 outline-none focus:border-indigo-500 transition-all font-bold`} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase px-4">Email</label>
                        <input name="email" required type="email" placeholder={t.contact_email} className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-[2rem] px-8 py-5 outline-none focus:border-indigo-500 transition-all font-bold`} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase px-4">Message Details</label>
                      <textarea name="message" required rows={4} placeholder={t.contact_msg} className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} border rounded-[2.5rem] px-8 py-5 outline-none resize-none focus:border-indigo-500 transition-all font-bold`}></textarea>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-6 rounded-[2rem] font-black text-2xl transition-all shadow-2xl flex items-center justify-center gap-4 group">
                      {t.contact_btn} <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </form>
                </div>
              </section>

              <footer className={`py-24 border-t ${isDark ? 'border-white/5' : 'border-slate-200'} text-center px-6 relative`}>
                <h3 className="text-4xl font-black mb-12 gradient-text tracking-tighter leading-none">{t.brand_name}</h3>
                <div className="flex justify-center gap-10 text-slate-500 mb-20">
                  <a href={settings.tiktokUrl} target="_blank" className="hover:text-indigo-500 transition-all hover:scale-125"><Music2 size={32} /></a>
                  <a href={settings.facebookUrl} target="_blank" className="hover:text-indigo-500 transition-all hover:scale-125"><Facebook size={32} /></a>
                  <a href={`tel:${settings.phone}`} className="hover:text-indigo-500 transition-all hover:scale-125"><Phone size={32} /></a>
                  <a href={`mailto:${settings.email}`} className="hover:text-indigo-500 transition-all hover:scale-125"><Mail size={32} /></a>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-600">Premium Digital Excellence © 2025</p>
                  <button onClick={() => setShowLogin(true)} className="text-[9px] text-slate-700 hover:text-indigo-500 transition-all flex items-center gap-1">
                    <Shield size={12}/> Secure Access
                  </button>
                </div>
              </footer>
            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {!isAdminMode && <WhatsAppButton phone={settings.phone} />}

      <AnimatePresence>
        {showLogin && (
          <AdminLogin 
            onClose={() => setShowLogin(false)} 
            onSuccess={() => { setIsAuthenticated(true); setIsAdminMode(true); setShowLogin(false); }}
            t={t}
            isDark={isDark}
            correctPassword={settings.adminPassword}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
