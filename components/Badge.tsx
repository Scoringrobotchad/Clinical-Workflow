
import React from 'react';
import { TriageLevel, PatientStatus } from '../types';

interface BadgeProps {
  type: TriageLevel | PatientStatus;
  label?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, label }) => {
  const text = label || type;
  let classes = 'px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-white ';

  switch (type) {
    case 'Critical':
      classes += 'glossy-red';
      break;
    case 'Urgent':
    case 'Transfer':
      classes += 'glossy-yellow';
      break;
    case 'Stable':
    case 'Admitted':
      classes += 'glossy-green';
      break;
    default:
      classes += 'bg-slate-400/80 backdrop-blur-sm shadow-inner';
  }

  return (
    <span className={classes}>
      {text}
    </span>
  );
};
