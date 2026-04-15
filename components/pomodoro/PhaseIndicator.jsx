'use client';  


export default function PhaseIndicator({ phase }) {

  // Objeto que contiene la configuración para cada fase del pomodoro
  const phases = {
    focus: {           // Fase de enfoque/trabajo
      label: 'Tiempo de enfoque',  
      color: 'bg-amber-500',       
      textColor: 'text-amber-700', 
      bgColor: 'bg-amber-100',    
      icon: '🎯'                 
    },
    break: {           // Fase de descanso corto
      label: 'Descanso breve',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      icon: '🧘'
    },
    longBreak: {       // Fase de descanso largo
      label: 'Descanso largo',
      color: 'bg-sky-500',
      textColor: 'text-sky-700',
      bgColor: 'bg-sky-100',
      icon: '🌿'
    }
  };

  // Selecciona la configuración correspondiente según la phase recibida
  // Ejemplo: si phase = 'focus', currentPhase = phases.focus
  const currentPhase = phases[phase];

  return (
  
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full 
                    ${currentPhase.bgColor} ${currentPhase.textColor}`}>
      {/* Icono/emoji de la fase */}
      <span className="text-lg">{currentPhase.icon}</span>
      
      {/* Texto descriptivo de la fase */}
      <span className="text-sm font-medium">{currentPhase.label}</span>
      
      {/* Círculo animado que late (pulse) indicando que la fase está activa */}
      <span className={`w-2 h-2 rounded-full ${currentPhase.color} animate-pulse`} />
    </div>
  );
}