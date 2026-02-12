
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, Department } from '../types';
import { careReducer, Action } from './reducer';

const INITIAL_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Radiology', staffCount: 12, pending: 4, inProgress: 2, completed: 45 },
  { id: '2', name: 'Emergency Room', staffCount: 24, pending: 15, inProgress: 8, completed: 120 },
  { id: '3', name: 'Pharmacy', staffCount: 8, pending: 32, inProgress: 12, completed: 210 },
  { id: '4', name: 'Internal Medicine', staffCount: 18, pending: 8, inProgress: 5, completed: 88 },
  { id: '5', name: 'Cardiology', staffCount: 10, pending: 3, inProgress: 4, completed: 34 },
];

const initialState: AppState = {
  patients: [
    // Added missing admittedAt property to mock patient data to satisfy the Patient interface
    { id: 'p1', name: 'Elena Gilbert', age: 24, triage_level: 'Critical', status: 'Admitted', room: '204A', admittedAt: Date.now() - 7200000 },
    { id: 'p2', name: 'Damon Salvatore', age: 31, triage_level: 'Stable', status: 'Pending', room: '102B', admittedAt: Date.now() - 18000000 },
    { id: 'p3', name: 'Bonnie Bennett', age: 22, triage_level: 'Urgent', status: 'Admitted', room: '305C', admittedAt: Date.now() - 3600000 },
    { id: 'p4', name: 'Alaric Saltzman', age: 45, triage_level: 'Observing', status: 'Transfer', room: '401', admittedAt: Date.now() - 28800000 },
  ],
  actions: [],
  departments: INITIAL_DEPARTMENTS,
  activeView: 'dashboard',
  userName: 'Sarah Chen',
};

interface CareContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const CareContext = createContext<CareContextType | undefined>(undefined);

export const CareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(careReducer, initialState);

  // Persistence
  useEffect(() => {
    const saved = localStorage.getItem('careflow_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch (e) {
        console.error('Failed to load state', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('careflow_state', JSON.stringify(state));
  }, [state]);

  return (
    <CareContext.Provider value={{ state, dispatch }}>
      {children}
    </CareContext.Provider>
  );
};

export const useCare = () => {
  const context = useContext(CareContext);
  if (!context) throw new Error('useCare must be used within CareProvider');
  return context;
};
