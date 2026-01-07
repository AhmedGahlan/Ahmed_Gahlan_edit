
import React, { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, Globe, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  onAdminClick: () => void;
  isAdmin: boolean;
  lang: 'ar' | 'en';
  setLang: (l: 'ar' | 'en') => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  t: any;
  hideAdminBtn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onAdminClick, isAdmin, lang, setLang, theme, setTheme, t, hideAdminBtn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav_home, href: '#' },
    { name: t.nav_services, href: '#services' },
    { name: t.nav_portfolio, href: '#portfolio' },
    { name: t.nav_contact, href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-indigo-500"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
          <h1 className="text-2xl font-black gradient-text tracking-tighter cursor-pointer select-none" onDoubleClick={onAdminClick}>
            {t.brand_name}
          </h1>
          
          <div className="hidden md:flex items-center gap-6 border-l border-white/10 pl-6 ml-2">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-bold text-slate-400 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="p-2 glass rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 text-xs font-black uppercase"
          >
            <Globe size={18} className="text-indigo-400" />
            <span className="hidden sm:inline">{lang === 'ar' ? 'EN' : 'AR'}</span>
          </button>

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 glass rounded-xl hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-500" />}
          </button>

          {(!hideAdminBtn || isAdmin) && (
            <button 
              onClick={onAdminClick}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-2xl text-xs font-black transition-all shadow-lg shadow-indigo-600/20"
            >
              <LayoutDashboard size={16} />
              <span className="hidden sm:inline">{isAdmin ? t.nav_site : t.nav_dashboard}</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass px-6 py-8 space-y-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="block text-2xl font-black text-slate-300 hover:text-indigo-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
