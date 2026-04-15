
'use client';

export default function LevelBadge({
    level,
    experience = 0,
    maxExperience = 100,
    showProgress = true,
    size = 'md',
    variant = 'default'
}) {

    // Calcular porcentaje de experiencia (cuánto falta para subir de nivel)
    const expPercentage = (experience / maxExperience) * 100;

    // Determinar el color del gradiente según el nivel
    const getLevelColor = () => {
        if (level >= 20) return 'from-purple-500 to-pink-500';   
        if (level >= 15) return 'from-blue-500 to-purple-500';   
        if (level >= 10) return 'from-green-500 to-emerald-500'; 
        if (level >= 5) return 'from-yellow-500 to-orange-500';  
        return 'from-amber-500 to-amber-600';                     
    };

    // Determinar el icono según el nivel (emoji)
    const getLevelIcon = () => {
        if (level >= 20) return '👑';   // Corona - maestro
        if (level >= 15) return '⭐';    // Estrella - experto
        if (level >= 10) return '🌟';    // Estrella brillante - avanzado
        if (level >= 5) return '✨';      // Chispa - intermedio
        return '🌱';                      // Planta - principiante
    };

    // Definir tamaños para cada opción (sm, md, lg)
    const sizes = {
        sm: {   // Tamaño pequeño
            badge: 'px-2 py-0.5 text-xs',
            icon: 'text-sm',
            number: 'text-xs',
            progress: 'h-1'
        },
        md: {   // Tamaño mediano (por defecto)
            badge: 'px-3 py-1 text-sm',
            icon: 'text-base',
            number: 'text-sm',
            progress: 'h-1.5'
        },
        lg: {   // Tamaño grande
            badge: 'px-4 py-2 text-base',
            icon: 'text-lg',
            number: 'text-base',
            progress: 'h-2'
        }
    };

    // Definir las diferentes variantes del badge
    const variants = {
        // Variante por defecto: badge circular con tooltip
        default: (
            <div className={`relative inline-flex items-center gap-2 
                      bg-gradient-to-r ${getLevelColor()} 
                      text-white rounded-full ${sizes[size].badge}
                      shadow-lg hover:shadow-xl transition-shadow
                      group border`}>
                {/* Icono de nivel */}
                <span className={sizes[size].icon} role="img" aria-label="level-icon">
                    {getLevelIcon()}
                </span>

                {/* Número de nivel */}
                <span className={`font-bold ${sizes[size].number}`}>
                    Nv. {level}
                </span>

                {/* Tooltip que aparece al hacer hover con información de experiencia */}
                {showProgress && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2
                        hidden group-hover:block bg-gray-900 text-white text-xs 
                        rounded-lg py-1 px-2 whitespace-nowrap z-10">
                        {experience} / {maxExperience} XP
                        {/* Triángulo que apunta hacia abajo */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                          border-4 border-transparent border-t-gray-900"></div>
                    </div>
                )}
            </div>
        ),

        // Variante minimalista: solo texto
        minimal: (
            <div className={`inline-flex items-center gap-1
                      bg-amber-100 text-amber-700 rounded-full ${sizes[size].badge}`}>
                <span>Nv.{level}</span>
            </div>
        ),

        // Variante detallada: badge + barra de progreso
        detailed: (
            <div className="space-y-2">
                {/* Badge principal */}
                <div className={`inline-flex items-center gap-2 
                        bg-gradient-to-r ${getLevelColor()} 
                        text-white rounded-lg ${sizes[size].badge}
                        shadow-lg`}>
                    <span className={sizes[size].icon}>{getLevelIcon()}</span>
                    <span className={`font-bold ${sizes[size].number}`}>Nivel {level}</span>
                </div>

                {/* Barra de experiencia detallada */}
                {showProgress && (
                    <div className="space-y-1">
                        {/* Texto con experiencia actual y máxima */}
                        <div className="flex justify-between text-xs text-amber-600">
                            <span>Experiencia</span>
                            <span className="font-medium">{experience}/{maxExperience} XP</span>
                        </div>
                        {/* Barra de progreso visual */}
                        <div className={`${sizes[size].progress} bg-amber-100 rounded-full overflow-hidden`}>
                            <div
                                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 
                          rounded-full transition-all duration-500"
                                style={{ width: `${expPercentage}%` }}
                            />
                        </div>

                        {/* Texto informativo: cuánto falta para el siguiente nivel */}
                        <p className="text-xs text-amber-400 italic">
                            {maxExperience - experience} XP para el nivel {level + 1}
                        </p>
                    </div>
                )}
            </div>
        )
    };

    // Retorna la variante seleccionada
    return variants[variant];
}