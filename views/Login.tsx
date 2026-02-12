
import React from 'react';
import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { InteractiveHoverButton } from '../components/ui/InteractiveHoverButton';
import PixelatedImage from '../components/ui/PixelatedImage';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background with Pixelated Effect */}
      <div className="absolute inset-0 z-0">
        <PixelatedImage 
          src="https://images.unsplash.com/photo-1631217816660-ad483a916172?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full opacity-60"
          grid={40}
          strength={1.5}
          relaxation={0.92}
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <GlassCard className="p-10 bg-white/10 backdrop-blur-3xl border-white/20 shadow-2xl flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-500 flex items-center justify-center text-white mb-6 shadow-lg shadow-teal-500/40">
            <Stethoscope size={32} />
          </div>
          
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">CareFlow</h1>
          <p className="text-teal-200/60 font-medium mb-8">Next-Generation Clinical Workflow</p>
          
          <div className="w-full space-y-4">
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest ml-1">Staff ID</label>
              <input 
                type="text" 
                placeholder="Enter clinical ID"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-teal-500/40 focus:bg-white/10 transition-all font-medium"
              />
            </div>
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-black text-teal-400 uppercase tracking-widest ml-1">Secure Passkey</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:ring-2 focus:ring-teal-500/40 focus:bg-white/10 transition-all font-medium"
              />
            </div>
            
            <div className="pt-4 flex flex-col items-center">
              <InteractiveHoverButton 
                text="Authenticate" 
                onClick={onLogin}
                className="w-full bg-teal-500/80 text-white border-none py-4"
              />
              <button className="mt-6 text-sm font-bold text-teal-400/60 hover:text-teal-400 transition-colors">
                Forgot access credentials?
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>
      
      <div className="fixed bottom-8 text-center w-full z-10">
        <p className="text-[10px] font-black text-teal-500/30 uppercase tracking-[0.2em]">
          Secured by careflow neural-vault v3.1
        </p>
      </div>
    </div>
  );
};
