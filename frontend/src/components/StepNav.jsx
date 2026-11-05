import React from 'react';
const labels = { inicio: 'Início', categoria: 'Categorias', quiz: 'Quiz', resultado: 'Resultado' };
export default function StepNav({ screen }) {
  return <nav className="nav-steps" aria-label="Etapas do quiz">{Object.entries(labels).map(([key,label]) => <span key={key} className={screen === key ? 'active' : ''} aria-current={screen === key ? 'step' : undefined}>{label}</span>)}</nav>;
}
