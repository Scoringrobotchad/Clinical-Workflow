
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Users, Activity, ChevronRight, MapPin } from 'lucide-react';
import { useCare } from '../store/CareContext';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';
import { InteractiveHoverButton } from '../components/ui/InteractiveHoverButton';

const ProgressRing: React.FC<{ progress: number }> = ({ progress }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="rgba(20, 184, 166, 0.1)"
          strokeWidth="8"
          fill="transparent"
        />
        <motion.circle
          cx="64"
          cy="64"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-teal-600"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-black text-slate-900">{progress}%</span>
        <span className="text-[10px] uppercase font-black text-slate-500 tracking-tighter">Shift</span>
      </div>
    </div>
  );
};

export const Dashboard: React.FC<{ onSelectPatient: (id: string) => void }> = ({ onSelectPatient }) => {
  const { state } = useCare();
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-8 pb-20">
      {/* Hero Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="relative lg:col-span-2 p-8 flex flex-col md:flex-row justify-between items-center bg-white/60 border-white shadow-2xl overflow-hidden" hoverEffect={false}>
          <div className="relative z-10 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-teal-50 text-teal-700 text-xs font-black border border-teal-100 uppercase tracking-wide">
              <Clock size={14} />
              {currentTime} • Emergency Mode Active
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Good Morning, <br />
              <span className="text-teal-600">
                Dr. {state.userName.split(' ')[0]}
              </span>
            </h2>
            <p className="text-slate-700 font-semibold max-w-sm leading-relaxed">
              Welcome back to your clinical control center. System is currently synchronized.
            </p>
            <div className="pt-2">
              <InteractiveHoverButton text="Clinical Portal" />
            </div>
          </div>
          <div className="relative z-10 mt-8 md:mt-0">
            <ProgressRing progress={64} />
          </div>
        </GlassCard>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <GlassCard className="p-5 flex items-center gap-4 bg-white/70 border-white">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/30">
              <Users size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 leading-none mb-1">{state.patients.length}</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Active Patients</p>
            </div>
          </GlassCard>
          <GlassCard className="p-5 flex items-center gap-4 bg-white/70 border-white">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
              <TrendingUp size={24} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 leading-none mb-1">4.2m</p>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">Avg Response</p>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2 uppercase tracking-tight">
              Clinical Queue
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border-2 border-white"></span>
            </h3>
          </div>
          
          <div className="space-y-3">
            {state.patients.slice(0, 4).map((patient) => (
              <GlassCard 
                key={patient.id} 
                onClick={() => onSelectPatient(patient.id)}
                className="p-4 flex items-center justify-between group bg-white/90 border-white shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-inner bg-slate-100 text-slate-900 border border-slate-200">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{patient.name}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                      <MapPin size={10} className="text-teal-600" />
                      Room {patient.room} • {patient.age}y
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge type={patient.triage_level} />
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 group-hover:border-teal-100 transition-all duration-300">
                    <ChevronRight size={16} />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="xl:col-span-5 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">System Metrics</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {state.departments.slice(0, 4).map(dept => (
              <GlassCard key={dept.id} className="p-5 space-y-4 bg-white/90 border-white shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-slate-900 leading-tight text-sm uppercase">{dept.name}</h4>
                    <p className="text-[10px] text-teal-600 font-black uppercase tracking-widest">{dept.staffCount} Online</p>
                  </div>
                  <Activity size={16} className="text-slate-400" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-2xl font-black text-slate-900 leading-none">{dept.pending}</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Queue</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                    <span className="text-xs font-black text-teal-700">+{dept.completed}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
