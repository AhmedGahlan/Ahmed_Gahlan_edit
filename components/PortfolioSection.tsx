
import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import ProjectModal from './ProjectModal';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PortfolioSectionProps {
  projects: Project[];
  lang: string;
  t: any;
  isDark: boolean;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ projects, lang, t, isDark }) => {
  const [filter, setFilter] = useState<string>('الكل');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['الكل', ...Object.values(ProjectCategory)];
  const filteredProjects = filter === 'الكل' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className={`py-40 px-6 relative overflow-hidden ${isDark ? 'bg-[#020617]' : 'bg-[#f1f5f9]'}`}>
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] blur-[150px] rounded-full transition-colors duration-1000 ${isDark ? 'bg-indigo-600/10' : 'bg-indigo-500/5'}`}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
          <div>
            <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter" dangerouslySetInnerHTML={{ __html: t.portfolio_title }}></h2>
            <p className={`max-w-xl text-lg font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{t.portfolio_desc}</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-2xl text-sm font-black transition-all duration-500 border ${
                  filter === cat 
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/30 scale-105' 
                  : `${isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-500'} hover:border-indigo-500/50 hover:text-indigo-500`
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedProject(project)}
              className={`group cursor-pointer relative overflow-hidden rounded-[3.5rem] glass p-4 transition-all duration-500 hover:-translate-y-4 shadow-xl hover:shadow-3xl ${isDark ? 'hover:shadow-indigo-500/20' : 'hover:shadow-indigo-500/10'}`}
            >
              <div className="aspect-[4/5] overflow-hidden rounded-[2.8rem] relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-950/90' : 'from-slate-900/70'} via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity`}></div>
                
                <div className="absolute top-8 left-8 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-6 group-hover:translate-x-0 duration-500">
                  <div className="w-14 h-14 bg-white/15 backdrop-blur-2xl rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
                    <ArrowUpRight className="text-white" size={28} />
                  </div>
                </div>

                <div className="absolute bottom-10 right-10 left-10">
                  <span className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em] mb-3 block">{project.category}</span>
                  <h3 className="text-3xl font-black text-white leading-tight tracking-tight">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
          isDark={isDark}
        />
      )}
    </section>
  );
};

export default PortfolioSection;
