
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Clock, ChevronRight, FileText, CheckCircle2 } from 'lucide-react';
import { useCare } from '../store/CareContext';
import { Patient, WorkflowAction } from '../types';
import { Badge } from './Badge';
import { GlassCard } from './GlassCard';

interface PatientDetailSheetProps {
  patientId: string | null;
  onClose: () => void;
}

export const PatientDetailSheet: React.FC<PatientDetailSheetProps> = ({ patientId, onClose }) => {
  const { state } = useCare();
  const patient = state.patients.find(p => p.id === patientId);
  const actions = state.actions.filter(a => a.patientId === patientId).sort((a, b) => b.timestamp - a.timestamp);

  if (!patientId) return null;

  return (
    <AnimatePresence>
      {patient && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[120] bg-white/95 backdrop-blur-3xl shadow-[-20px_0px_60px_rgba(0,0,0,0.1)] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">{patient.name}</h2>
                    <p className="text-slate-500 font-medium">Room {patient.room} • {patient.age} years old</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
                  <X size={20} />
                </button>
              </div>

              <div className="flex gap-2 mb-8">
                <Badge type={patient.triage_level} />
                <Badge type={patient.status} />
              </div>

              {/* Workflow Analysis Section */}
              <section className="mb-10">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Clinical Workflow Analysis</h3>
                <GlassCard className="p-5 space-y-4 bg-white/50" hoverEffect={false}>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-bold">Current Phase</span>
                    <span className="text-teal-600 font-bold px-2 py-0.5 bg-teal-50 rounded-lg text-xs">Diagnostics Phase</span>
                  </div>
                  <div className="relative pt-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-2 uppercase">
                      <span>Triage</span>
                      <span>Diagnostics</span>
                      <span>Treatment</span>
                      <span>Recovery</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-teal-500 w-[25%]" />
                      <div className="h-full bg-teal-400 w-[20%] animate-pulse" />
                      <div className="h-full bg-slate-200 w-[55%]" />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Patient has completed initial triage. Currently awaiting <strong>{actions.filter(a => a.status !== 'Completed').length}</strong> diagnostic results from {patient.status === 'Pending' ? 'ED' : 'Radiology'}.
                  </p>
                </GlassCard>
              </section>

              {/* Diagnostic Timeline */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Diagnostic Timeline</h3>
                  <Activity size={16} className="text-slate-400" />
                </div>

                <div className="space-y-6 relative">
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-slate-100" />
                  
                  {actions.length === 0 ? (
                    <div className="pl-12 py-8 text-center text-slate-400 text-sm italic">
                      No actions logged for this patient yet.
                    </div>
                  ) : (
                    actions.map((action, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={action.id} 
                        className="relative pl-12"
                      >
                        <div className={`absolute left-2.5 top-1 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm z-10 
                          ${action.status === 'Completed' ? 'bg-teal-500' : 'bg-amber-400 animate-pulse'}`} 
                        />
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-bold text-slate-900">{action.title}</span>
                            <span className="text-[10px] font-medium text-slate-400">
                              {new Date(action.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-teal-600 uppercase tracking-tighter">{action.type}</span>
                          <p className="text-xs text-slate-500 mt-1">{action.details}</p>
                          {action.status === 'Completed' && (
                            <div className="flex items-center gap-1 mt-2 text-[10px] font-bold text-emerald-600 uppercase">
                              <CheckCircle2 size={12} /> Results Validated
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </section>

              <div className="mt-12 pt-8 border-t border-slate-100">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-2xl border-2 border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  Download Full EMR Report
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
