
import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Building2, Settings, LogOut, Stethoscope } from 'lucide-react';
import { useCare } from '../store/CareContext';
import { ViewState } from '../types';

const NavItem: React.FC<{ 
  id: ViewState; 
  icon: React.ElementType; 
  label: string; 
  active: boolean; 
  onClick: () => void 
}> = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`
      flex items-center gap-3 px-4 py-3 rounded-2xl w-full transition-all duration-300
      ${active ? 'bg-white/60 shadow-lg shadow-teal-500/10 text-teal-700' : 'text-slate-500 hover:bg-white/30'}
    `}
  >
    <Icon size={20} strokeWidth={1.5} />
    <span className="font-medium text-sm hidden md:block">{label}</span>
  </motion.button>
);

export const Sidebar: React.FC = () => {
  const { state, dispatch } = useCare();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed left-6 top-6 bottom-6 w-20 md:w-64 z-50 hidden sm:block">
        <div className="h-full bg-white/40 backdrop-blur-3xl border border-white/50 rounded-[2.5rem] flex flex-col p-4 shadow-2xl">
          <div className="flex items-center gap-3 px-4 py-6 mb-8">
            <div className="bg-teal-500 p-2 rounded-2xl shadow-lg shadow-teal-500/40">
              <Stethoscope className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold text-slate-800 hidden md:block">CareFlow</h1>
          </div>

          <nav className="flex-1 space-y-2">
            <NavItem 
              id="dashboard" 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={state.activeView === 'dashboard'} 
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'dashboard' })} 
            />
            <NavItem 
              id="patients" 
              icon={Users} 
              label="Patients" 
              active={state.activeView === 'patients'} 
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'patients' })} 
            />
            <NavItem 
              id="departments" 
              icon={Building2} 
              label="Departments" 
              active={state.activeView === 'departments'} 
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'departments' })} 
            />
          </nav>

          <div className="pt-6 border-t border-white/50 space-y-2">
            <NavItem 
              id="settings" 
              icon={Settings} 
              label="Settings" 
              active={state.activeView === 'settings'} 
              onClick={() => dispatch({ type: 'SET_VIEW', payload: 'settings' })} 
            />
            <button className="flex items-center gap-3 px-4 py-3 rounded-2xl w-full text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={20} strokeWidth={1.5} />
              <span className="font-medium text-sm hidden md:block">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <nav className="fixed bottom-4 left-4 right-4 h-16 bg-white/60 backdrop-blur-3xl border border-white/50 rounded-2xl z-50 flex items-center justify-around px-2 sm:hidden shadow-2xl">
        {[
          { id: 'dashboard', icon: LayoutDashboard },
          { id: 'patients', icon: Users },
          { id: 'departments', icon: Building2 },
          { id: 'settings', icon: Settings },
        ].map((item) => (
          <motion.button
            key={item.id}
            onClick={() => dispatch({ type: 'SET_VIEW', payload: item.id as ViewState })}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-xl ${state.activeView === item.id ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-500'}`}
          >
            <item.icon size={22} strokeWidth={1.5} />
          </motion.button>
        ))}
      </nav>
    </>
  );
};
