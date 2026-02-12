
import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useCare } from '../store/CareContext';

export const Header: React.FC = () => {
  const { state } = useCare();
  
  return (
    <header className="sticky top-0 z-40 px-6 pt-6 pb-2 sm:ml-20 md:ml-72 transition-all">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl h-16 flex items-center justify-between px-6 shadow-lg shadow-teal-500/5">
        <div className="flex items-center gap-3 w-full max-w-md">
          <Search className="text-slate-400" size={18} strokeWidth={2} />
          <input 
            type="text" 
            placeholder="Search patients, actions or records..." 
            className="bg-transparent border-none focus:ring-0 w-full text-sm text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2.5 rounded-2xl bg-white/60 hover:bg-white text-slate-600 shadow-sm border border-white/50 transition-all relative">
            <Bell size={20} strokeWidth={1.5} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <div className="h-8 w-px bg-slate-200/50 mx-1 hidden sm:block"></div>
          
          <button className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/60 hover:bg-white text-slate-700 shadow-sm border border-white/50 transition-all">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white shadow-inner">
              <User size={18} strokeWidth={2} />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-bold leading-none">{state.userName}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Chief of Staff</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
