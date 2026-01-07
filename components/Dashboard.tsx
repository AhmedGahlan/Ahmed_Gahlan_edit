
import React, { useState, useRef } from 'react';
import { 
  Layout, Briefcase, Users, BrainCircuit, Zap, Settings, Trash2, Plus, 
  DollarSign, MessageSquare, CheckCheck, TrendingUp, Image as ImageIcon,
  Type, Link as LinkIcon, ShieldAlert, Save, Palette, Video, Upload, X, Globe,
  Phone as PhoneIcon, Music2, Facebook, Mail, Layers, Monitor, BarChart3
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, CartesianGrid, Tooltip } from 'recharts';
import { Project, Lead, HeroContent, Service, SiteSettings, LeadStatus, ProjectCategory } from '../types';
import { generateCreativeBrief, generateAdHooks, generateVideoScript } from '../services/geminiService';

interface DashboardProps {
  projects: Project[];
  onAddProject: (p: Project) => void;
  onDeleteProject: (id: string) => void;
  leads: Lead[];
  onDeleteLead: (id: string) => void;
  onUpdateLeadStatus: (id: string, status: LeadStatus) => void;
  hero: HeroContent;
  onUpdateHero: (h: HeroContent) => void;
  services: Service[];
  onUpdateServices: (s: Service[]) => void;
  settings: SiteSettings;
  onUpdateSettings: (s: SiteSettings) => void;
  lang: string;
  t: any;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  projects, onAddProject, onDeleteProject, 
  leads, onDeleteLead, onUpdateLeadStatus,
  hero, onUpdateHero,
  services, onUpdateServices,
  settings, onUpdateSettings,
  lang, t 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'leads' | 'site' | 'ai'>('overview');
  const [localHero, setLocalHero] = useState(hero);
  const [localSettings, setLocalSettings] = useState(settings);
  const [localServices, setLocalServices] = useState(services);
  
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: ProjectCategory.SOCIAL_DESIGN,
    tools: [],
    imageUrl: '',
    description: '',
    status: 'مكتمل'
  });

  const [aiInput, setAiInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectFileRef = useRef<HTMLInputElement>(null);

  const handleAiAction = async (action: string) => {
    if (!aiInput.trim()) {
      alert('يرجى إدخال وصف أو فكرة أولاً');
      return;
    }
    setAiLoading(true);
    setAiOutput('');
    try {
      let result = '';
      if (action === 'script') {
        result = await generateVideoScript(aiInput, 'Social Media') || '';
      } else if (action === 'hooks') {
        result = await generateAdHooks(aiInput) || '';
      } else if (action === 'brief') {
        result = await generateCreativeBrief(aiInput) || '';
      }
      setAiOutput(result);
    } catch (error) {
      console.error("AI Action Error:", error);
      setAiOutput("حدث خطأ أثناء التوليد، يرجى المحاولة مرة أخرى.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'hero' | 'project') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'hero') {
          setLocalHero({ ...localHero, imageUrl: base64String });
        } else {
          setNewProject({ ...newProject, imageUrl: base64String });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSite = () => {
    onUpdateHero(localHero);
    onUpdateSettings(localSettings);
    onUpdateServices(localServices);
    alert('تم حفظ كافة التعديلات بنجاح ونشرها على الموقع!');
  };

  const handleAddProjectSubmit = () => {
    if (!newProject.title || !newProject.imageUrl) {
      alert('يرجى إكمال بيانات المشروع الأساسية (العنوان والصورة)');
      return;
    }
    const projectToAdd: Project = {
      id: Date.now().toString(),
      title: newProject.title!,
      category: newProject.category as ProjectCategory,
      imageUrl: newProject.imageUrl!,
      tools: newProject.tools || ['Photoshop'],
      status: newProject.status as any || 'مكتمل',
      description: newProject.description || ''
    };
    onAddProject(projectToAdd);
    setIsAddingProject(false);
    setNewProject({ title: '', category: ProjectCategory.SOCIAL_DESIGN, tools: [], imageUrl: '', description: '', status: 'مكتمل' });
  };

  const updateServiceField = (id: string, field: keyof Service, value: string) => {
    const updated = localServices.map(s => s.id === id ? { ...s, [field]: value } : s);
    setLocalServices(updated);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-6 overflow-x-hidden">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-8 h-auto lg:h-[calc(100vh-140px)]">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-80 glass rounded-[2.5rem] p-8 flex flex-col border-white/5 shadow-2xl shrink-0">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <span className="text-xl font-black text-white">AG</span>
            </div>
            <div>
              <h2 className="text-xl font-black leading-none">{t.brand_name}</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Master Control</p>
            </div>
          </div>
          
          <nav className="space-y-2 flex-1">
            {[
              { id: 'overview', label: 'الرئيسية', icon: Layout },
              { id: 'projects', label: 'إدارة الأعمال', icon: Briefcase },
              { id: 'leads', label: 'رسائل العملاء', icon: Users },
              { id: 'site', label: 'تعديل الموقع', icon: Settings },
              { id: 'ai', label: 'مساعد الذكاء', icon: BrainCircuit },
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-slate-400 hover:bg-white/5'}`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pr-0 lg:pr-2 custom-scrollbar space-y-8">
          
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'إجمالي الأعمال', value: projects.length, icon: Briefcase, color: 'text-indigo-400' },
                  { label: 'طلبات التواصل', value: leads.length, icon: MessageSquare, color: 'text-emerald-400' },
                  { label: 'أحدث الرسائل', value: leads.filter(l => l.status === 'جديد').length, icon: Zap, color: 'text-rose-400' },
                  { label: 'الخدمات النشطة', value: services.length, icon: Globe, color: 'text-purple-400' },
                ].map((s) => (
                  <div key={s.label} className="glass p-8 rounded-[2.5rem] border-white/5">
                    <s.icon className={`${s.color} mb-4`} size={24} />
                    <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">{s.label}</p>
                    <p className="text-4xl font-black">{s.value}</p>
                  </div>
                ))}
               </div>
               
               <div className="glass p-10 rounded-[3rem] border-white/5">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3"><TrendingUp size={20} className="text-indigo-400"/> إحصائيات التفاعل</h3>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[{n:'Sat',v:10},{n:'Sun',v:25},{n:'Mon',v:15},{n:'Tue',v:45},{n:'Wed',v:30},{n:'Thu',v:60},{n:'Fri',v:40}]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="n" stroke="#475569" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '15px' }} />
                      <Area type="monotone" dataKey="v" stroke="#6366f1" fill="url(#colorPv)" strokeWidth={3} />
                      <defs>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
               </div>
            </div>
          )}

          {activeTab === 'site' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Hero Editor */}
                <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
                  <h3 className="text-2xl font-black flex items-center gap-3"><Palette className="text-indigo-400" /> الواجهة الرئيسية</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase px-2">العنوان الترحيبي</label>
                      <input value={localHero.tagline} onChange={e => setLocalHero({...localHero, tagline: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase px-2">العنوان الرئيسي</label>
                      <input value={localHero.title} onChange={e => setLocalHero({...localHero, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase px-2">صورة الواجهة</label>
                      <div className="flex gap-4">
                        <input value={localHero.imageUrl} onChange={e => setLocalHero({...localHero, imageUrl: e.target.value})} placeholder="رابط الصورة..." className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 text-xs" />
                        <button onClick={() => fileInputRef.current?.click()} className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-500 transition-all">
                          <Upload size={20} />
                        </button>
                        <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e, 'hero')} className="hidden" accept="image/*" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings Editor */}
                <div className="glass p-10 rounded-[3rem] border-white/5 space-y-8">
                  <h3 className="text-2xl font-black flex items-center gap-3"><ShieldAlert className="text-rose-400" /> إعدادات التواصل</h3>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase px-2">رابط تيك توك</label>
                        <div className="relative">
                           <Music2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18}/>
                           <input value={localSettings.tiktokUrl} onChange={e => setLocalSettings({...localSettings, tiktokUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-indigo-500 font-bold" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase px-2">رابط فيسبوك</label>
                        <div className="relative">
                           <Facebook className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18}/>
                           <input value={localSettings.facebookUrl} onChange={e => setLocalSettings({...localSettings, facebookUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-indigo-500 font-bold" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase px-2">رقم الواتساب</label>
                        <div className="relative">
                          <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" size={18}/>
                          <input value={localSettings.phone} onChange={e => setLocalSettings({...localSettings, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-emerald-500 font-bold" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase px-2">البريد الإلكتروني</label>
                        <div className="relative">
                           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" size={18}/>
                           <input value={localSettings.email} onChange={e => setLocalSettings({...localSettings, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-indigo-500 font-bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={handleSaveSite} className="w-full bg-indigo-600 hover:bg-indigo-500 py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-3 transition-all mt-4 shadow-xl shadow-indigo-600/20">
                    <Save size={24} /> حفظ التغييرات
                  </button>
                </div>
              </div>

              {/* Advanced Services Editor */}
              <div className="glass p-10 rounded-[3rem] border-white/5">
                <h3 className="text-2xl font-black mb-10 flex items-center gap-3"><Video className="text-purple-400" /> تعديل تفاصيل الخدمات</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {localServices.map((s) => (
                    <div key={s.id} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-6 group transition-all hover:border-indigo-500/30">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block px-2">اسم الخدمة</label>
                        <input 
                          value={s.title} 
                          onChange={e => updateServiceField(s.id, 'title', e.target.value)} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-black text-lg outline-none focus:border-indigo-500 transition-all leading-relaxed" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block px-2">الوصف التفصيلي</label>
                        <textarea 
                          value={s.desc} 
                          onChange={e => updateServiceField(s.id, 'desc', e.target.value)} 
                          rows={4} 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-400 outline-none resize-none focus:border-indigo-500 transition-all leading-loose" 
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block px-2">اختيار الأيقونة</label>
                        <div className="grid grid-cols-3 gap-2">
                           {[
                             { type: 'design', icon: Layers, label: 'تصميم' },
                             { type: 'video', icon: Monitor, label: 'مونتاج' },
                             { type: 'ads', icon: BarChart3, label: 'إعلانات' }
                           ].map(iconOpt => (
                             <button 
                               key={iconOpt.type}
                               onClick={() => updateServiceField(s.id, 'iconType', iconOpt.type as any)}
                               className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${s.iconType === iconOpt.type ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'}`}
                             >
                               <iconOpt.icon size={18} />
                               <span className="text-[8px] font-bold">{iconOpt.label}</span>
                             </button>
                           ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-8 animate-in slide-in-from-bottom-4">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black tracking-tighter">معرض الأعمال</h3>
                <button onClick={() => setIsAddingProject(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all">
                  <Plus size={20} /> إضافة عمل
                </button>
              </div>

              {isAddingProject && (
                <div className="glass p-10 rounded-[3rem] border-indigo-500/30 bg-indigo-500/5 space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-black text-indigo-400">مشروع جديد</h4>
                    <button onClick={() => setIsAddingProject(false)}><X /></button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <input placeholder="عنوان المشروع..." value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 font-bold" />
                      <select value={newProject.category} onChange={e => setNewProject({...newProject, category: e.target.value as any})} className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white font-bold">
                        {Object.values(ProjectCategory).map(cat => <option key={cat} value={cat} className="bg-[#020617]">{cat}</option>)}
                      </select>
                      <input placeholder="الأدوات المستخدمة..." value={newProject.tools?.join(', ')} onChange={e => setNewProject({...newProject, tools: e.target.value.split(', ')})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex gap-4">
                          <input placeholder="رابط الصورة..." value={newProject.imageUrl} onChange={e => setNewProject({...newProject, imageUrl: e.target.value})} className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none font-bold" />
                          <button onClick={() => projectFileRef.current?.click()} className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-500 transition-all"><Upload size={20}/></button>
                          <input type="file" ref={projectFileRef} className="hidden" onChange={(e) => handleFileUpload(e, 'project')} />
                       </div>
                       <textarea placeholder="وصف المشروع..." value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none resize-none font-bold" />
                    </div>
                  </div>
                  <button onClick={handleAddProjectSubmit} className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-600/20">تأكيد الإضافة</button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(p => (
                  <div key={p.id} className="glass rounded-[2.5rem] overflow-hidden group relative border-white/5 transition-all hover:-translate-y-2">
                    <img src={p.imageUrl} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105" alt="" />
                    <div className="p-8">
                      <h4 className="font-black text-lg truncate mb-1 leading-tight">{p.title}</h4>
                      <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">{p.category}</p>
                    </div>
                    <button onClick={() => { if(confirm('هل أنت متأكد من حذف هذا العمل؟')) onDeleteProject(p.id) }} className="absolute top-4 left-4 p-3 bg-rose-500/80 text-white rounded-2xl opacity-0 group-hover:opacity-100 transition-all hover:bg-rose-600 shadow-xl">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="glass rounded-[3rem] overflow-hidden border-white/5 animate-in slide-in-from-bottom-4">
               <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <h3 className="text-2xl font-black">رسائل العملاء</h3>
                  <span className="bg-indigo-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">{leads.length} رسالة</span>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-right">
                    <thead className="bg-white/5 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-white/5">
                       <tr><th className="p-8">صاحب الطلب</th><th className="p-8">محتوى الرسالة</th><th className="p-8">التاريخ</th><th className="p-8">الحالة</th><th className="p-8">إدارة</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {leads.map(l => (
                          <tr key={l.id} className="hover:bg-white/[0.02] transition-colors">
                             <td className="p-8 font-black leading-snug">{l.name}<div className="text-[10px] text-slate-500 font-medium mt-1">{l.email}</div></td>
                             <td className="p-8 text-sm text-slate-400 max-w-xs leading-relaxed">{l.message}</td>
                             <td className="p-8 text-xs font-bold text-slate-500">{l.date}</td>
                             <td className="p-8">
                                <select value={l.status} onChange={e => onUpdateLeadStatus(l.id, e.target.value as any)} className={`text-[10px] font-black px-3 py-1.5 rounded-lg border outline-none cursor-pointer transition-all ${l.status === 'جديد' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
                                   <option value="جديد" className="bg-[#020617]">جديد</option>
                                   <option value="تم التواصل" className="bg-[#020617]">تم التواصل</option>
                                   <option value="تم الاتفاق" className="bg-[#020617]">تم الاتفاق</option>
                                </select>
                             </td>
                             <td className="p-8"><button onClick={() => onDeleteLead(l.id)} className="text-slate-600 hover:text-rose-500 transition-colors p-2 hover:bg-rose-500/10 rounded-xl"><Trash2 size={20}/></button></td>
                          </tr>
                       ))}
                       {leads.length === 0 && (
                         <tr><td colSpan={5} className="p-20 text-center text-slate-600 italic font-medium">لا توجد رسائل حالياً</td></tr>
                       )}
                    </tbody>
                 </table>
               </div>
            </div>
          )}

          {activeTab === 'ai' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full animate-in slide-in-from-bottom-4">
                <div className="glass p-10 rounded-[3rem] space-y-6 border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                   <h3 className="text-2xl font-black flex items-center gap-3 leading-none"><BrainCircuit className="text-indigo-400" /> مختبر الأفكار</h3>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">استخدم قوة الذكاء الاصطناعي لتوليد نصوص إعلانية أو أفكار فيديوهات فورية لمشاريعك.</p>
                   <textarea value={aiInput} onChange={e => setAiInput(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white outline-none focus:border-indigo-500 h-72 resize-none text-lg leading-relaxed shadow-inner" placeholder="صف فكرتك هنا..." />
                   <div className="grid grid-cols-3 gap-4">
                      {['script', 'hooks', 'brief'].map(action => (
                         <button key={action} onClick={() => handleAiAction(action)} disabled={aiLoading} className="bg-white/5 hover:bg-indigo-600 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50">
                            {action === 'script' ? 'سيناريو' : action === 'hooks' ? 'خطافات' : 'بريف'}
                         </button>
                      ))}
                   </div>
                </div>
                <div className="glass p-10 rounded-[3rem] border-white/5 relative bg-slate-900/40 min-h-[500px]">
                   <div className="flex justify-between items-center mb-10">
                      <h4 className="font-black text-indigo-400 flex items-center gap-2 uppercase tracking-widest text-xs leading-none">النتيجة المقترحة</h4>
                      {aiLoading && <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>}
                   </div>
                   <div className="text-slate-400 text-lg leading-[1.8] whitespace-pre-wrap custom-scrollbar overflow-y-auto max-h-[600px] px-2 font-medium">
                    {aiOutput || <div className="text-slate-600 text-center py-20 italic">اكتب فكرة وابدأ في التوليد...</div>}
                   </div>
                </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
