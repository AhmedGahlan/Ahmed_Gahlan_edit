
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Check } from 'lucide-react';

interface WhatsAppButtonProps {
  phone: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phone }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  
  // تنظيف الرقم من أي رموز ليعمل الرابط بشكل صحيح
  const cleanPhone = phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  const handleConfirm = () => {
    window.open(whatsappUrl, '_blank');
    setShowConfirm(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 20, scale: 0.8, filter: 'blur(10px)' }}
            className="glass p-6 rounded-[2rem] border-white/20 shadow-4xl mb-2 max-w-[280px] text-center backdrop-blur-3xl relative overflow-hidden"
          >
            {/* Background decorative glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 blur-2xl rounded-full"></div>
            
            <p className="text-sm font-black mb-6 relative z-10 text-white">
              هل تود بدء محادثة مباشرة مع أحمد جهلان عبر واتساب؟
            </p>
            
            <div className="flex gap-3 relative z-10">
              <button 
                onClick={handleConfirm}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-white py-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Check size={14} /> نعم، تواصل
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2"
              >
                <X size={14} /> إلغاء
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* تأثير النبض الخلفي المتطور */}
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1.6, 1],
            opacity: [0.6, 0.3, 0, 0]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-emerald-500/40 rounded-full blur-xl"
        />

        {/* الزر الرئيسي بأنيميشن ممتع */}
        <motion.button
          onClick={() => setShowConfirm(!showConfirm)}
          whileHover={{ scale: 1.15, rotate: [0, -10, 10, -10, 0] }}
          whileTap={{ scale: 0.85 }}
          animate={{
            y: [0, -8, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-18 h-18 sm:w-20 sm:h-20 bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_15px_35px_rgba(37,211,102,0.4)] border-2 border-white/20 z-10"
        >
          <svg 
            viewBox="0 0 24 24" 
            className="w-10 h-10 sm:w-12 sm:h-12"
            stroke="currentColor" 
            strokeWidth="0" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
};

export default WhatsAppButton;
