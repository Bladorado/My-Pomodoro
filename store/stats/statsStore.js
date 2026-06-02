// store/stats/statsStore.js
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStatsStore = create(
  persist(
    (set, get) => ({
      
      pomodorosHoy: 0,
      rachaDias: 0,
      logros: [],
      ultimoPomodoroFecha: null,
      pomodorosTotales: 0,
      
      // Inicializar o cargar fecha actual
      iniciarDia: () => {
        const hoy = new Date().toDateString();
        const { ultimoPomodoroFecha } = get();
        
        if (ultimoPomodoroFecha !== hoy) {
          // Es un nuevo día
          set({ 
            pomodorosHoy: 0,
            ultimoPomodoroFecha: hoy
          });
        }
      },
      
      // Registrar un pomodoro completado
      registrarPomodoro: () => {
        const hoy = new Date().toDateString();
        const { pomodorosHoy, rachaDias, ultimoPomodoroFecha, pomodorosTotales } = get();
        
        let nuevaRacha = rachaDias;
        
        // Verificar racha (días consecutivos)
        if (ultimoPomodoroFecha === hoy) {
          // Ya hizo pomodoros hoy, no cambia la racha
          nuevaRacha = rachaDias;
        } else {
          // Verificar si el último pomodoro fue ayer
          const ayer = new Date();
          ayer.setDate(ayer.getDate() - 1);
          const fechaAyer = ayer.toDateString();
          
          if (ultimoPomodoroFecha === fechaAyer) {
            // Racha continua
            nuevaRacha = rachaDias + 1;
          } else {
            // Racha rota
            nuevaRacha = 1;
          }
        }
        


        // ------------------------------------------------------------
        // Verificar logros
        const nuevosLogros = [...get().logros];
        const nuevosPomodorosTotales = pomodorosTotales + 1;
        
        // Logros por cantidad de pomodoros
        if (nuevosPomodorosTotales === 10 && !nuevosLogros.includes('primeros10')) {
          nuevosLogros.push('primeros10');
        }
        if (nuevosPomodorosTotales === 50 && !nuevosLogros.includes('experto')) {
          nuevosLogros.push('experto');
        }
        if (nuevosPomodorosTotales === 100 && !nuevosLogros.includes('maestro')) {
          nuevosLogros.push('maestro');
        }
        
        // Logro por racha
        if (nuevaRacha === 7 && !nuevosLogros.includes('semanaPerfecta')) {
          nuevosLogros.push('semanaPerfecta');
        }
        
        set({
          pomodorosHoy: pomodorosHoy + 1,
          rachaDias: nuevaRacha,
          ultimoPomodoroFecha: hoy,
          pomodorosTotales: nuevosPomodorosTotales,
          logros: nuevosLogros
        });
      },
      
      // Registrar un descanso (opcional, para estadísticas)
      registrarDescanso: () => {
        // Podrías tener lógica para descansos si quieres
      },
      
      // Obtener número de logros
      getLogrosCount: () => {
        return get().logros.length;
      },
      
      // Resetear estadísticas (para pruebas)
      resetearEstadisticas: () => {
        set({
          pomodorosHoy: 0,
          rachaDias: 0,
          logros: [],
          ultimoPomodoroFecha: null,
          pomodorosTotales: 0
        });
      }
    }),
    {
      name: 'pomodoro-estadisticas'
    }
  )
);