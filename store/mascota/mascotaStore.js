'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const estadoInicial = {
  nombre: 'Manu',
  especie: 'nutria',
  nivel: 3,
  experiencia: 45,
  experienciaMaxima: 100,
  energia: 67,
  animo: 'feliz',
  mensaje: '¡Qué bien trabajamos juntos! ✨'
};


// const mensajesPorAnimo = {
//   feliz: [
//     '¡Qué bien trabajamos juntos! ✨',
//     'Me encanta verte enfocado 🎯',
//     '¿Descansamos un poco cuando quieras? 🌱',
//     'Este ritmo me gusta 💫',
//     '¡Somos un gran equipo! ⭐'
//   ],
//   tranquilo: [
//     'Todo va bien, sin prisas 🍃',
//     'Respira profundo... 🌬️',
//     'Disfruta el proceso 🌸',
//     'La calma es parte del enfoque 🕊️'
//   ],
//   cansado: [
//     'Creo que necesito una siesta... 😴',
//     'Mi energía está baja... 🪫',
//     'Un descansito no vendría mal ☕',
//     'Descansar también es crecer 🌙'
//   ],
//   sobrecargado: [
//     '¡Uff! Vamos muy rápido... ⚡',
//     'Necesito un respiro 🥺',
//     'Bajemos un cambio 🚥'
//   ]
// };

// Determinar ánimo según energía
const getAnimoPorEnergia = (energia) => {
  if (energia >= 70) return 'feliz';
  if (energia >= 40) return 'tranquilo';
  if (energia >= 20) return 'cansado';
  return 'sobrecargado';
};

// Obtener mensaje aleatorio
// const getMensajeAleatorio = (animo) => {
//   const mensajes = mensajesPorAnimo[animo] || mensajesPorAnimo.feliz;
//   return mensajes[Math.floor(Math.random() * mensajes.length)];
// };

// Crear el store con persistencia automática
export const useMascotaStore = create(
  persist(
    (set, get) => ({
      
    
      ...estadoInicial,

 

      // Completar un pomodoro (enfoque)
      completarPomodoro: () => {
        const { energia, experiencia, nivel, experienciaMaxima, animo } = get();
        
        // Calcular nuevos valores
        let nuevaEnergia = Math.max(0, energia - 5);
        let nuevaExperiencia = experiencia + 10;
        let nuevoNivel = nivel;
        let mensajeEspecial = '¡Pomodoro completado! 🎉';
        
        // Verificar si sube de nivel
        if (nuevaExperiencia >= experienciaMaxima) {
          nuevoNivel = nivel + 1;
          nuevaExperiencia = 0;
          mensajeEspecial = `🎉 ¡SUBÍ DE NIVEL! Ahora soy nivel ${nuevoNivel} 👑 🎉`;
        }
        
        // Determinar nuevo ánimo
        const nuevoAnimo = getAnimoPorEnergia(nuevaEnergia);
        
        // Actualizar estado
        set({
          energia: nuevaEnergia,
          experiencia: nuevaExperiencia,
          nivel: nuevoNivel,
          animo: nuevoAnimo,
          mensaje: mensajeEspecial
        });
      },

      // Completar un descanso
      completarDescanso: () => {
        const { energia, experiencia } = get();
        
        let nuevaEnergia = Math.min(100, energia + 10);
        let nuevaExperiencia = experiencia + 5;
        let mensaje = 'Descanso completado, ¡volvamos al enfoque! 🌟';
        
        set({
          energia: nuevaEnergia,
          experiencia: nuevaExperiencia,
          animo: getAnimoPorEnergia(nuevaEnergia),
          mensaje: mensaje
        });
      },

      // Al iniciar el timer
      alIniciarTimer: () => {
        const { animo } = get();
        const mensajesInicio = {
          feliz: '¡Vamos allá! 🚀',
          tranquilo: 'Empezamos, sin prisas 🍃',
          cansado: 'Voy a darlo todo, pero descansaremos después 💪',
          sobrecargado: 'Un pomodoro más, luego pausa larga 🧘'
        };
        
        set({
          mensaje: mensajesInicio[animo] || '¡Manos a la obra! ✨'
        });
      },

      // Al pausar el timer
      alPausarTimer: () => {
        const mensajesPausa = [
          '¿Descansamos un momento? ☕',
          '¡Buen trabajo! Tomémonos un respiro 🧘',
          'Pausa activada. Respira profundo 🌬️',
          'Te espero cuando quieras seguir 💚'
        ];
        
        set({
          mensaje: mensajesPausa[Math.floor(Math.random() * mensajesPausa.length)],
          animo: 'tranquilo'
        });
      },

      // Al reiniciar todo
      reiniciarProgreso: () => {
        set({
          ...estadoInicial,
          mensaje: '¡Empezamos de nuevo! 🌱'
        });
      },

      // Cambiar mensaje manualmente
      cambiarMensaje: (mensajePersonalizado) => {
        set({ mensaje: mensajePersonalizado });
      },

      // Cambiar especie
      cambiarEspecie: (nuevaEspecie) => {
        set({ especie: nuevaEspecie });
      }
    }),
    {
      name: 'pomodoro-mascota',  
      getStorage: () => localStorage
    }
  )
);




