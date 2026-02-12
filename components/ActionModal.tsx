
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Activity, UserPlus, FileText } from 'lucide-react';
import { useCare } from '../store/CareContext';
import { WorkflowAction, ActionType } from '../types';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCare();
  const [formData, setFormData] = useState({
    patientId: '',
    title: '',
    type: 'ER' as ActionType,
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAction: WorkflowAction = {
      id: Math.random().toString(36).substr(2, 9),
      patientId: formData.patientId,
      department: formData.type,
      title: formData.title,
      type: formData.type,
      status: 'Pending',
      timestamp: Date.now(),
      details: formData.details,
      assignedBy: state.userName,
    };

    dispatch({ type: 'ADD_ACTION', payload: newAction });
    onClose();
    setFormData({ patientId: '', title: '', type: 'ER', details: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white/80 backdrop-blur-3xl border border-white/50 rounded-[2.5rem] shadow-2xl p-8"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X size={20} />
            </button>

            <header className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-teal-500/30">
                <Activity size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Log New Action</h2>
              <p className="text-slate-500">Coordinate workflow for hospital departments.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Patient</label>
                <div className="relative">
                  <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <select
                    required
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 bg-white/50 border border-white/50 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm appearance-none"
                  >
                    <option value="">Select a patient...</option>
                    {state.patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (Room {p.room})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Department</label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ActionType })}
                    className="w-full px-4 py-3.5 bg-white/50 border border-white/50 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                  >
                    <option value="ER">Emergency Room</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Medicine">Internal Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Action Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Chest X-Ray"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3.5 bg-white/50 border border-white/50 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Clinical Details</label>
                <textarea
                  placeholder="Notes for the clinical team..."
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/50 border border-white/50 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm resize-none"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-teal-500 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 mt-4"
              >
                <Send size={18} />
                Create Workflow
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
