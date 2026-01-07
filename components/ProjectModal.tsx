
import React from 'react';
import { X, ExternalLink, Cpu, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  isDark: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, isDark }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-md overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={`glass w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[4rem] relative shadow-4xl border ${isDark ? 'border-white/10' : 'border-white/20'}`}
      >
        <button 
          onClick={onClose}
          className="absolute top-8 left-8 p-3 bg-white/10 hover:bg-rose-500 text-white rounded-full transition-all z-20 shadow-xl"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
          <div className="p-10 md:p-20 space-y-12 order-2 lg:order-1">
            <div>
              <span className="text-indigo-400 font-black text-xs tracking-[0.4em] uppercase">{project.category}</span>
              <h2 className={`text-5xl font-black mt-4 mb-8 leading-[1.1] tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{project.title}</h2>
              <div className="flex flex-wrap gap-3">
                {project.tools.map(tool => (
                  <span key={tool} className={`flex items-center gap-2 px-5 py-2.5 ${isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'} border rounded-2xl text-xs font-black uppercase tracking-wider`}>
                    <Cpu size={14} className="text-indigo-500" />
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className={`p-8 rounded-3xl border-r-8 border-indigo-600 ${isDark ? 'bg-white/5' : 'bg-slate-50'} shadow-xl`}>
                <h4 className="font-black text-lg mb-4 flex items-center gap-3">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></span>
                  التحدي
                </h4>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-base leading-relaxed font-medium`}>{project.challenge || "تحليل وفهم احتياجات البراند لخلق تأثير بصري مستدام."}</p>
              </div>

              <div className={`p-8 rounded-3xl border-r-8 border-purple-600 ${isDark ? 'bg-white/5' : 'bg-slate-50'} shadow-xl`}>
                <h4 className="font-black text-lg mb-4 flex items-center gap-3">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>
                  الحل الإبداعي
                </h4>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-base leading-relaxed font-medium`}>{project.solution || "دمج أحدث تقنيات التصميم والمونتاج لتقديم قصة بصرية تخاطب الجمهور مباشرة."}</p>
              </div>

              <div className={`p-8 rounded-3xl border-r-8 border-emerald-600 ${isDark ? 'bg-white/5' : 'bg-slate-50'} shadow-xl`}>
                <h4 className="font-black text-lg mb-4 flex items-center gap-3 text-emerald-500">
                  <CheckCircle2 size={24} />
                  النتائج المحققة
                </h4>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-600'} text-base leading-relaxed font-medium`}>{project.results || "تحقيق أرقام قياسية في الوصول والتفاعل وتجاوز توقعات العميل بنسبة 100%."}</p>
              </div>
            </div>
          </div>

          <div className={`${isDark ? 'bg-slate-900' : 'bg-slate-200'} relative overflow-hidden order-1 lg:order-2`}>
            <div className="h-full w-full">
              <img 
                src={project.imageUrl} 
                className="w-full h-full object-cover scale-105" 
                alt={project.title} 
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-950/80' : 'from-slate-900/40'} via-transparent to-transparent`}></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectModal;
