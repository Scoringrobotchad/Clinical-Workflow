
import { AppState, Patient, WorkflowAction } from '../types';

export type Action =
  | { type: 'SET_VIEW'; payload: AppState['activeView'] }
  | { type: 'ADD_ACTION'; payload: WorkflowAction }
  | { type: 'UPDATE_ACTION'; payload: WorkflowAction }
  | { type: 'ADD_PATIENT'; payload: Patient }
  | { type: 'UPDATE_PATIENT'; payload: Patient }
  | { type: 'DELETE_PATIENT'; payload: string }
  | { type: 'LOAD_STATE'; payload: AppState };

export const careReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_VIEW':
      return { ...state, activeView: action.payload };
    case 'ADD_ACTION':
      return { ...state, actions: [action.payload, ...state.actions] };
    case 'UPDATE_ACTION':
      return {
        ...state,
        actions: state.actions.map(a => a.id === action.payload.id ? action.payload : a)
      };
    case 'ADD_PATIENT':
      return { ...state, patients: [action.payload, ...state.patients] };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: state.patients.map(p => p.id === action.payload.id ? action.payload : p)
      };
    case 'DELETE_PATIENT':
      return {
        ...state,
        patients: state.patients.filter(p => p.id !== action.payload)
      };
    case 'LOAD_STATE':
      return { ...action.payload };
    default:
      return state;
  }
};
