'use client';


export default function TimerControls({ 
  isActive,      
  onStart,    
  onPause,     
  onReset        
}) {
  return (
    
    <div className="flex justify-center gap-4">
      
      {/* Renderizado condicional: si NO está activo, mostramos botón Iniciar */}

      {!isActive ? (
        <button
          onClick={onStart}  
          className="px-6 py-3 bg-amber-500 text-white rounded-xl 
                   hover:bg-amber-600 transition-colors"
        >
          Iniciar
        </button>
      ) : (
        
        <button
          onClick={onPause}  
          className="px-6 py-3 bg-amber-200 text-amber-800 rounded-xl 
                   hover:bg-amber-300 transition-colors"
        >
          Pausar
        </button>
      )}
      
     
      <button
        onClick={onReset}  
        className="px-6 py-3 border-2 bg-white/80 border-amber-300 text-amber-700 
                 rounded-xl hover:bg-amber-50 transition-colors"
      >
        Reiniciar
      </button>
    </div>
  );
}