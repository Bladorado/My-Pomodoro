'use client';

import { useState } from 'react';
import MascotaSVG from './MascotaSVG';
import EnergyBar from './EnergyBar';
import MoodMessage from './MoodMessage';
import LevelBadge from './LevelBadge';

export default function MascotaCard() {

    const [isHovered, setIsHovered] = useState(false);

    // Datos de ejemplo - luego vendrán de un hook/store
    const mascota = {
        nombre: 'Luna',
        especie: 'nutria',
        nivel: 3,
        experiencia: 45,
        experienciaMaxima: 100,
        energia: 67,
        animo: 'feliz',
        mensaje: '¡Qué bien trabajamos juntos!'
    };


    // const mascota = {
    //     nombre: 'Sofía',     // o 'Dormilón', 'Perezoso', etc.
    //     especie: 'perezoso', // ← Ahora mostrará el perezoso
    //     nivel: 3,
    //     experiencia: 45,
    //     experienciaMaxima: 100,
    //     energia: 67,
    //     animo: 'feliz',
    //     mensaje: '¡Qué bien trabajamos juntos!'
    //   };

    return (

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 
                    border border-amber-200 hover:border-amber-300 
                    transition-all duration-300">


            <div className="flex items-center justify-between mb-4 ">
                <div>

                    <h2 className="text-xl font-medium text-amber-900">
                        {mascota.nombre}
                    </h2>

                    <p className="text-sm text-amber-600 capitalize">
                        {mascota.especie} · Nivel {mascota.nivel}
                    </p>
                </div>
                {/* Insignia de nivel con experiencia */}
                <LevelBadge
                    level={mascota.nivel}
                    experience={mascota.experiencia}
                    maxExperience={100}
                    showProgress={true}
                    size="md"
                    variant="default"
                />
            </div>

            {/* Visualización principal de la mascota */}
            <div
                className="relative flex justify-center my-6 cursor-pointer "
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}  
                onClick={() => console.log('Interacción con mascota')} 
            >
                {/* Contenedor con animación de escala al hacer hover */}
                <div className={`transform transition-transform duration-300 
                        ${isHovered ? 'scale-105' : 'scale-100'}`}>
                   
                    <MascotaSVG
                        especie={mascota.especie}
                        nivel={mascota.nivel}
                        animo={mascota.animo}
                        className="w-48 h-48"
                    />
                </div>

                {/* Burbuja de mensaje - solo se muestra cuando el mouse está sobre la mascota */}
                {isHovered && (
                    <MoodMessage
                        mensaje={mascota.mensaje}
                        animo={mascota.animo}
                        autoChange={true}
                        interval={8000}
                    />
                )}
            </div>

            {/* Barra de energía */}
            <div className="space-y-2 mb-4">
               
                <div className="flex justify-between text-sm">
                    <span className="text-amber-700">Energía</span>
                    <span className="text-amber-900 font-medium">{mascota.energia}%</span>
                </div>
                <EnergyBar
                    energy={mascota.energia}
                    showLabel={true}
                    size="md"
                    animated={true}
                />
            </div>

            {/* Barra de experiencia */}
            <div className="space-y-2 ">
                
                <div className="flex justify-between text-sm">
                    <span className="text-amber-700">Crecimiento</span>
                    <span className="text-amber-900 font-medium">
                        {mascota.experiencia}/{mascota.experienciaMaxima} XP
                    </span>
                </div>
                {/* Barra de progreso visual */}
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
            
                    <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${(mascota.experiencia / mascota.experienciaMaxima) * 100}%` }}
                    />
                </div>
            </div>

            {/* Footer con estadísticas rápidas del usuario */}
            <div className="mt-6 pt-4 border-t border-amber-200 
                      grid grid-cols-3 gap-2 text-center text-sm">
                {/* Pomodoros completados hoy */}
                <div>
                    <p className="text-amber-900 font-medium">12</p>
                    <p className="text-amber-600 text-xs">Pomodoros hoy</p>
                </div>
                {/* Racha de días consecutivos */}
                <div>
                    <p className="text-amber-900 font-medium">5</p>
                    <p className="text-amber-600 text-xs">Días seguidos</p>
                </div>
                {/* Logros desbloqueados */}
                <div>
                    <p className="text-amber-900 font-medium">3</p>
                    <p className="text-amber-600 text-xs">Logros</p>
                </div>
            </div>
        </div>
    );
}