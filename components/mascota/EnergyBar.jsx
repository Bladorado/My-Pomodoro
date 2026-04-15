'use client';

export default function EnergyBar({ 
  energy, 
  showLabel = true, 
  size = 'md',
  animated = true 
}) {
  
  // Asegurar que energy esté entre 0 y 100 (no puede ser menos de 0 ni más de 100)
  const validEnergy = Math.min(100, Math.max(0, energy));
  
  // Determinar el color de la barra según el nivel de energía
  const getEnergyColor = () => {
    if (validEnergy >= 70) return 'bg-green-400';   // Verde - mucha energía
    if (validEnergy >= 40) return 'bg-yellow-400';  // Amarillo - energía media
    if (validEnergy >= 20) return 'bg-orange-400';  // Naranja - poca energía
    return 'bg-red-400';                             // Rojo - energía crítica
  };

  // Determinar mensaje descriptivo según la energía
  const getEnergyMessage = () => {
    if (validEnergy >= 80) return '¡Lleno de energía!';
    if (validEnergy >= 60) return 'Con ganas de trabajar';
    if (validEnergy >= 40) return 'Podemos seguir';
    if (validEnergy >= 20) return 'Necesita descanso';
    return 'Muy cansado...';
  };

  // Determinar icono según el nivel de energía
  const getEnergyIcon = () => {
    if (validEnergy >= 80) return '⚡';   // Rayo - energía máxima
    if (validEnergy >= 60) return '✨';   // Estrella - energía alta
    if (validEnergy >= 40) return '🌱';   // Planta - energía normal
    if (validEnergy >= 20) return '💧';   // Gota - energía baja
    return '🛌';                           // Cama - energía crítica
  };

  // Definir alturas de la barra según el tamaño
  const sizes = {
    sm: 'h-1.5',   // tamaño pequeño: 6px de alto
    md: 'h-2.5',   // tamaño mediano: 10px de alto
    lg: 'h-4'      // tamaño grande: 16px de alto
  };

  return (
    <div className="space-y-1.5">
      {/* Label con información (se muestra solo si showLabel es true) */}
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-amber-700">Energía</span>
            <span className="text-lg" role="img" aria-label="energy-icon">
              {getEnergyIcon()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-900 font-medium">{validEnergy}%</span>
            <span className="text-xs text-amber-500 italic hidden sm:inline">
              {getEnergyMessage()}
            </span>
          </div>
        </div>
      )}

      {/* Contenedor de la barra con grupo para hover */}
      <div className="relative group">
        {/* Barra de fondo (vacía) */}
        <div className={`w-full bg-amber-100 rounded-full overflow-hidden
                        ${sizes[size]} shadow-inner`}>
          
          {/* Barra de progreso (se llena según la energía) */}
          <div 
            className={`h-full rounded-full ${getEnergyColor()} 
                       ${animated ? 'transition-all duration-700 ease-out' : ''}
                       relative overflow-hidden`}
            style={{ width: `${validEnergy}%` }}
          >
            {/* Efecto de brillo que se mueve (solo si hay energía y animated es true) */}
            {validEnergy > 0 && animated && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            animate-shimmer" 
                   style={{ transform: 'skewX(-20deg) translateX(-100%)' }} />
            )}
          </div>
        </div>

        {/* Marcadores de energía (0%, 25%, 50%, 75%, 100%) */}
        <div className="absolute -bottom-4 left-0 right-0 flex justify-between text-[10px] text-amber-400 px-1">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>

        {/* Tooltip que aparece al hacer hover con mensaje detallado */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 
                      hidden group-hover:block bg-amber-900 text-white text-xs 
                      rounded-lg py-2 px-3 whitespace-nowrap z-10">
          <p className="font-medium">{getEnergyMessage()}</p>
          <p className="text-amber-300 text-[10px] mt-0.5">
            {validEnergy >= 50 ? 'Equilibrio saludable' : 'Considera descansar'}
          </p>
          {/* Triángulo que apunta hacia la barra */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
                        rotate-45 w-2 h-2 bg-amber-900"></div>
        </div>
      </div>

      {/* Mini widgets de estado (solo para tamaño lg) */}
      {size === 'lg' && (
        <div className="flex items-center justify-between mt-4 text-xs">
          {/* Leyenda de colores */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-amber-600">Óptimo</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-amber-600">Medio</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span className="text-amber-600">Bajo</span>
            </div>
          </div>

          {/* Sugerencia rápida según nivel de energía */}
          <div className="text-amber-500 italic text-[10px]">
            {validEnergy < 30 ? '💤 Hora de descansar' : 
             validEnergy < 60 ? '🌱 Ritmo sostenible' : 
             '⚡ Buen momento para enfocarse'}
          </div>
        </div>
      )}
    </div>
  );
}