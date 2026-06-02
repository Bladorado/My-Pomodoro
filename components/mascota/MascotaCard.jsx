'use client';

import { useState, useEffect } from 'react';

import MascotaSVG from './MascotaSVG';
import EnergyBar from './EnergyBar';
import MoodMessage from './MoodMessage';
import LevelBadge from './LevelBadge';

import { useMascotaStore } from '@/store/mascota/mascotaStore';

export default function MascotaCard({ mascota, stats }) { 

    const [isHovered, setIsHovered] = useState(false);
    const [pomodorosHoy, setPomodorosHoy] = useState(stats?.pomodorosHoy || 0);
    const [rachaDias, setRachaDias] = useState(stats?.rachaDias || 0);
    const [logrosCount, setLogrosCount] = useState(stats?.logros?.length || 0);

    const { cambiarEspecie } = useMascotaStore();

    // Efecto para actualizar en tiempo real cuando cambian las estadísticas
    useEffect(() => {
        if (stats) {
            setPomodorosHoy(stats.pomodorosHoy);
            setRachaDias(stats.rachaDias);
            setLogrosCount(stats.logros?.length || 0);
        }
    }, [stats]);

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 
                    border border-amber-950 hover:border-amber-300 
                    transition-all duration-300">

            <div className="flex items-center justify-between mb-4 border">
                <div>
                    <h2 className="text-xl font-medium text-amber-900">
                        {mascota.nombre}
                    </h2>
                    <p className="text-sm text-amber-600 capitalize">
                        {mascota.especie} · Nivel {mascota.nivel}
                    </p>
                </div>

                <button
                    onClick={() => cambiarEspecie(mascota.especie === 'nutria' ? 'perezoso' : 'nutria')}
                    className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-lg"
                >
                    🔄 {mascota.especie === 'nutria' ? '🦦' : '🦥'}
                </button>

                <LevelBadge
                    level={mascota.nivel}
                    experience={mascota.experiencia}
                    maxExperience={mascota.experienciaMaxima}
                    showProgress={true}
                    size="md"
                    variant="default"
                />
            </div>

            {/* Visualización principal de la mascota */}
            <div
                className="relative flex justify-center my-6 cursor-pointer border"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => console.log('Interacción con mascota')}
            >
                <div className={`transform transition-transform duration-300 
                        ${isHovered ? 'scale-105' : 'scale-100'}`}>
                    <MascotaSVG
                        especie={mascota.especie}
                        nivel={mascota.nivel}
                        animo={mascota.animo}
                        className="w-48 h-48"
                    />
                </div>

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
            <div className="space-y-2 mb-4 border">
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
            <div className="space-y-2 border">
                <div className="flex justify-between text-sm">
                    <span className="text-amber-700">Crecimiento</span>
                    <span className="text-amber-900 font-medium">
                        {mascota.experiencia}/{mascota.experienciaMaxima} XP
                    </span>
                </div>
                <div className="h-2 bg-amber-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${(mascota.experiencia / mascota.experienciaMaxima) * 100}%` }}
                    />
                </div>
            </div>

            {/* Footer con estadísticas EN TIEMPO REAL */}
            <div className="mt-6 pt-4 border-t border-amber-200 
                      grid grid-cols-3 gap-2 text-center text-sm">
                
                {/* Pomodoros completados hoy */}
                <div className="hover:bg-amber-50 rounded-lg p-1 transition-colors cursor-help"
                     title="¡Cada pomodoro cuenta! Sigue así">
                    <p className="text-amber-900 font-medium text-lg">
                        {pomodorosHoy}  
                    </p>
                    <p className="text-amber-600 text-xs">Pomodoros hoy</p>
                    {pomodorosHoy >= 4 && (
                        <span className="text-[10px] text-green-500">🔥 ¡Buena racha!</span>
                    )}
                </div>
                
                {/* Racha de días consecutivos */}
                <div className="hover:bg-amber-50 rounded-lg p-1 transition-colors cursor-help"
                     title="Días seguidos completando al menos 1 pomodoro">
                    <p className="text-amber-900 font-medium text-lg">
                        {rachaDias}  {/* ← DINÁMICO */}
                    </p>
                    <p className="text-amber-600 text-xs">Días seguidos</p>
                    {rachaDias >= 7 && (
                        <span className="text-[10px] text-amber-500">⭐ ¡Semana perfecta!</span>
                    )}
                </div>
                
                {/* Logros desbloqueados  ← DINÁMICO Falta hacer*/}

                <div className="hover:bg-amber-50 rounded-lg p-1 transition-colors cursor-help"
                     title="Logros desbloqueados">
                    <p className="text-amber-900 font-medium text-lg">
                        {logrosCount} 
                    </p>
                    <p className="text-amber-600 text-xs">Logros</p>
                    {logrosCount > 0 && (
                        <span className="text-[10px] text-amber-500">🏆 Desbloqueados</span>
                    )}   
                </div>
                
            </div>
        </div>
    );
}