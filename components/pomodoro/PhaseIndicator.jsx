'use client';  


export default function PhaseIndicator({ phase }) {

  const phases = {
    focus: {           
      label: 'Tiempo de enfoque',  
      color: 'bg-amber-500',       
      textColor: 'text-amber-700', 
      bgColor: 'bg-amber-100',    
      icon: '🎯'                 
    },
    break: {          
      label: 'Descanso breve',
      color: 'bg-emerald-500',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-100',
      icon: '🧘'
    },
    longBreak: {       
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
      
      <span className="text-lg">{currentPhase.icon}</span>
      
      <span className="text-sm font-medium">{currentPhase.label}</span>
      
      
      <span className={`w-2 h-2 rounded-full ${currentPhase.color} animate-pulse`} />
    </div>
  );
}