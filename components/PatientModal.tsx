
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, Save } from 'lucide-react';
import { useCare } from '../store/CareContext';
import { Patient, TriageLevel, PatientStatus } from '../types';

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientModal: React.FC<PatientModalProps> = ({ isOpen, onClose }) => {
  const { dispatch } = useCare();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    room: '',
    triage: 'Stable' as TriageLevel,
    status: 'Pending' as PatientStatus,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      age: parseInt(formData.age) || 0,
      room: formData.room,
      triage_level: formData.triage,
      status: formData.status,
      admittedAt: Date.now(),
    };

    dispatch({ type: 'ADD_PATIENT', payload: newPatient });
    onClose();
    setFormData({ name: '', age: '', room: '', triage: 'Stable', status: 'Pending' });
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
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white/90 backdrop-blur-3xl border border-white rounded-[2.5rem] shadow-2xl p-8"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400">
              <X size={20} />
            </button>

            <header className="mb-8">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-teal-500/30">
                <UserPlus size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Add New Patient</h2>
              <p className="text-slate-600">Register a new entry into the clinical system.</p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase ml-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="Patient Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Age</label>
                  <input
                    required
                    type="number"
                    placeholder="Age"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Room</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 302B"
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Triage Level</label>
                  <select
                    value={formData.triage}
                    onChange={(e) => setFormData({ ...formData, triage: e.target.value as TriageLevel })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none text-slate-900"
                  >
                    <option value="Critical">Critical</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Stable">Stable</option>
                    <option value="Observing">Observing</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Initial Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PatientStatus })}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none text-slate-900"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 mt-4"
              >
                <Save size={18} />
                Register Patient
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
