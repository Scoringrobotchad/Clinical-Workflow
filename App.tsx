
import React, { useState, useEffect } from 'react';
import { CareProvider, useCare } from './store/CareContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './views/Dashboard';
import { Patients } from './views/Patients';
import { Login } from './views/Login';
import { ActionModal } from './components/ActionModal';
import { PatientModal } from './components/PatientModal';
import { PatientDetailSheet } from './components/PatientDetailSheet';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, UserPlus, ClipboardList } from 'lucide-react';
import TubesCursor from './components/ui/TubesCursor';

const ViewContainer: React.FC = () => {
  const { state } = useCare();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

  // Persistence for auth (optional for demo)
  useEffect(() => {
    const auth = localStorage.getItem('careflow_auth');
    if (auth === 'true') setIsAuthenticated(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('careflow_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('careflow_auth');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (state.activeView) {
      case 'dashboard':
        return <Dashboard onSelectPatient={setSelectedPatientId} />;
      case 'patients':
        return <Patients onSelectPatient={setSelectedPatientId} />;
      case 'departments':
        return (
          <div className="flex items-center justify-center h-[60vh]">
            <p className="text-slate-900 font-black bg-white/60 px-8 py-4 rounded-[2rem] border border-white shadow-xl">Department Analytics view coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center space-y-4">
              <p className="text-slate-900 font-black bg-white/60 px-8 py-4 rounded-[2rem] border border-white shadow-xl mb-4">Settings view coming soon...</p>
              <button 
                onClick={handleLogout}
                className="px-6 py-2 bg-rose-500 text-white font-bold rounded-xl shadow-lg hover:bg-rose-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard onSelectPatient={setSelectedPatientId} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Dashboard Background */}
      <TubesCursor />
      
      <Sidebar />
      <div className="flex flex-col relative z-10">
        <Header />
        <main className="px-6 py-4 sm:ml-20 md:ml-72 transition-all">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* FAB with Menu */}
      <div className="fixed bottom-24 right-8 sm:bottom-12 sm:right-12 z-[60] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isFabMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="flex flex-col gap-4 mb-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setIsPatientModalOpen(true); setIsFabMenuOpen(false); }}
                className="flex items-center gap-3 bg-white text-slate-900 font-black px-6 py-4 rounded-[2rem] shadow-2xl border border-slate-100 whitespace-nowrap"
              >
                <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center"><UserPlus size={18} /></div>
                Register New Patient
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, x: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setIsActionModalOpen(true); setIsFabMenuOpen(false); }}
                className="flex items-center gap-3 bg-white text-slate-900 font-black px-6 py-4 rounded-[2rem] shadow-2xl border border-slate-100 whitespace-nowrap"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center"><ClipboardList size={18} /></div>
                Log Clinical Action
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
          className="w-16 h-16 bg-teal-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-teal-600/50 border-4 border-white backdrop-blur-md relative z-10"
        >
          <motion.div animate={{ rotate: isFabMenuOpen ? 45 : 0 }}>
            <Plus size={32} strokeWidth={3} />
          </motion.div>
        </motion.button>
      </div>

      <ActionModal isOpen={isActionModalOpen} onClose={() => setIsActionModalOpen(false)} />
      <PatientModal isOpen={isPatientModalOpen} onClose={() => setIsPatientModalOpen(false)} />
      <PatientDetailSheet patientId={selectedPatientId} onClose={() => setSelectedPatientId(null)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <CareProvider>
      <ViewContainer />
    </CareProvider>
  );
};

export default App;
