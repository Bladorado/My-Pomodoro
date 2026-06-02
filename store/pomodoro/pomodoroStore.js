'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePomodoroStore = create(
  persist(
    (set) => ({
      isActive: false,
      phase: 'focus',
      minutes: 25,
      resetKey: 0,

      iniciar: () => set({ isActive: true }),
      pausar: () => set({ isActive: false }),
      
      resetear: () => set((state) => ({
        isActive: false,
        resetKey: state.resetKey + 1,  // ✅ Incrementa
        phase: 'focus',
        minutes: 25
      })),
      
      cambiarFase: (nuevaFase, nuevosMinutos) => {
        console.log("🔄 cambiarFase llamada con:", nuevaFase, nuevosMinutos);
        set((state) => {
          console.log("📊 Estado anterior - resetKey:", state.resetKey);
          const nuevoEstado = {
            phase: nuevaFase,
            minutes: nuevosMinutos,
            resetKey: state.resetKey + 1,
            isActive: false
          };
          console.log("📊 Nuevo estado - resetKey:", nuevoEstado.resetKey);
          return nuevoEstado;
        });
      }
    }),
    {
      name: 'pomodoro-estado'
    }
  )
);