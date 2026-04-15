"use client"
import { useState, useCallback } from 'react';


import Timer from "@/components/pomodoro/Timer";
import TimerControls from "@/components/pomodoro/TimerControls";
import PhaseIndicator from '@/components/pomodoro/PhaseIndicator';
import MascotaCard from '@/components/mascota/MascotaCard';



export default function HomePage() {

  const [isActive, setIsActive] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [phase, setPhase] = useState('focus');

  const handleReset = () => {
    setIsActive(false);
    setResetKey(prev => prev + 1);
    setPhase('focus');
    setMinutes(25);
  };

  const handleTimerComplete = useCallback(() => {
    if (phase === 'focus') {
      setPhase('break');
      setMinutes(5);
    } else if (phase === 'break') {
      setPhase('focus');
      setMinutes(25);
    }
    setResetKey(prev => prev + 1);
    setIsActive(false);
  }, [phase]);  // ← Solo se recrea cuando 'phase' cambia

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

              <PhaseIndicator phase="focus" />



              <div className="flex justify-center my-8 ">
                <Timer
                  key={resetKey}
                  initialMinutes={25}
                  isActive={isActive}
                  onComplete={handleTimerComplete}
                />
              </div>

            </div>

            <TimerControls
              isActive={isActive}
              onStart={() => setIsActive(true)}
              onPause={() => setIsActive(false)}
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
            <MascotaCard />
          </section>

        </div>

      </div>


    </main>
  );
}
