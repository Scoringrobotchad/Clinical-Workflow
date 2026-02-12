
export type TriageLevel = 'Critical' | 'Urgent' | 'Stable' | 'Observing';
export type PatientStatus = 'Admitted' | 'Discharged' | 'Pending' | 'Transfer';
export type ActionType = 'Radiology' | 'ER' | 'Pharmacy' | 'Medicine' | 'Cardiology' | 'Notes';

export interface Patient {
  id: string;
  name: string;
  age: number;
  triage_level: TriageLevel;
  status: PatientStatus;
  room: string;
  admittedAt: number;
}

export interface WorkflowAction {
  id: string;
  patientId: string;
  department: string;
  title: string;
  type: ActionType;
  status: 'Pending' | 'In Progress' | 'Completed';
  timestamp: number;
  details: string;
  assignedBy: string;
}

export interface Department {
  id: string;
  name: string;
  staffCount: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export type ViewState = 'dashboard' | 'patients' | 'departments' | 'settings';

export interface AppState {
  patients: Patient[];
  actions: WorkflowAction[];
  departments: Department[];
  activeView: ViewState;
  userName: string;
}
