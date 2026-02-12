
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, User, MapPin } from 'lucide-react';
import { useCare } from '../store/CareContext';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';

interface PatientsProps {
  onSelectPatient: (id: string) => void;
}

export const Patients: React.FC<PatientsProps> = ({ onSelectPatient }) => {
  const { state } = useCare();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = state.patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.room.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Patient Directory</h2>
          <p className="text-slate-600">Managing {state.patients.length} active clinical entries.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative group flex-1 md:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name or room..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/70 border border-white rounded-2xl focus:ring-2 focus:ring-teal-500/20 outline-none shadow-sm transition-all text-slate-900 font-medium"
            />
          </div>
          <button className="p-3 bg-white/70 border border-white rounded-2xl text-slate-600 hover:text-teal-600 shadow-sm transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <GlassCard 
            key={patient.id} 
            onClick={() => onSelectPatient(patient.id)}
            className="p-6 space-y-5 bg-white/70 relative group"
          >
            <div className="flex justify-between items-start">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-teal-600 shadow-inner group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                <User size={28} />
              </div>
              <button className="p-1.5 text-slate-300 hover:text-slate-600 transition-colors">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">{patient.name}</h3>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-teal-500" /> Room {patient.room}</span>
                <span>{patient.age}y</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <Badge type={patient.triage_level} />
                <Badge type={patient.status} />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Last Update</p>
                <p className="text-xs font-bold text-slate-600">12 mins ago</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
