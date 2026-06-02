"use client";

import { useState, useEffect } from 'react';  
import Timer from "@/components/pomodoro/Timer";
import TimerControls from "@/components/pomodoro/TimerControls";
import PhaseIndicator from '@/components/pomodoro/PhaseIndicator';
import MascotaCard from '@/components/mascota/MascotaCard';

import { useMascotaStore } from '@/store/mascota/mascotaStore';
import { usePomodoroStore } from '@/store/pomodoro/pomodoroStore';
import { useStatsStore } from '@/store/stats/statsStore'; 



export default function HomePage() {
 
  const { isActive, phase, minutes, resetKey, iniciar, pausar, resetear, cambiarFase } = usePomodoroStore()
  
  const { completarPomodoro, completarDescanso, alIniciarTimer, alPausarTimer, reiniciarProgreso } = useMascotaStore()
  const { iniciarDia, registrarPomodoro, registrarDescanso } = useStatsStore();  

  const mascota = useMascotaStore(); 
   const stats = useStatsStore(); 

  // Inicializar el día al cargar la página
  useEffect(() => {
    iniciarDia();
  }, [iniciarDia]);

  const handleTimerComplete = () => {
 
    if (phase === 'focus') {
      console.log("➡️ FOCUS → BREAK");
      completarPomodoro();
      registrarPomodoro();        
      cambiarFase('break', 5);
    } else {
      console.log("➡️ BREAK → FOCUS");
      completarDescanso();
      registrarDescanso();  
      cambiarFase('focus', 25);
    }
    
    // ← Espera un momento y verifica
    setTimeout(() => {
      console.log("📊 resetKey después de cambiar:", resetKey);
    }, 100);
  };

  const handleStart = () => {
    iniciar();
    alIniciarTimer();
  };

  const handlePause = () => {
    pausar();
    alPausarTimer();
  };

  const handleReset = () => {
    resetear();
    reiniciarProgreso();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">


      <header className="border-b border-amber-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-light text-amber-900">Pomodoro <span className="font-medium text-amber-600">Consciente</span></h1>
          <nav className="flex gap-6">
            <a href="/" className="text-amber-700 hover:text-amber-900">Inicio</a>
            <a href="/dashboard" className="text-amber-700 hover:text-amber-900">Mi Progreso</a>
            <a href="/configuracion" className="text-amber-700 hover:text-amber-900" >Compañero</a>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 py-8 ">
        <div className="bg-white/50 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start p-4">

          {/* Columna izquierda: Pomodoro */}
          <section className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-amber-200">

              <PhaseIndicator phase={phase} />



              <div className="flex justify-center my-8 ">
                <Timer
                  key={resetKey}
                  initialMinutes={minutes}
                  isActive={isActive}
                  onComplete={handleTimerComplete}
                />
              </div>

            </div>

            <TimerControls
              isActive={isActive}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
            />

            {/* Notas rápidas */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow p-6 border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Intención para este pomodoro</h3>
              <input
                type="text"
                placeholder="Ej: Quiero notar cómo reacciono a las distraciones..."
                className="w-full p-3 bg-amber-50/50 rounded-xl border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-amber-400 text-amber-800" />
            </div>
          </section>

          {/* Columna derecha: Mascota */}
          <section className="lg:sticky lg:top-8 ">
            <MascotaCard mascota={mascota} stats={stats} />  
          </section>

        </div>

      </div>


    </main>
  );
}