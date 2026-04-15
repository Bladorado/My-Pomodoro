'use client';

import { useEffect, useState } from 'react';

export default function MoodMessage({ 
  mensaje, 
  animo, 
  autoChange = false,
  interval = 5000 
}) {
  // Estado para el mensaje actual que se muestra
  const [currentMessage, setCurrentMessage] = useState(mensaje);
  // Estado para controlar la visibilidad (animación de entrada/salida)
  const [isVisible, setIsVisible] = useState(true);

  // Biblioteca de mensajes según el ánimo de la mascota
  const messageLibrary = {
    feliz: [
      "¡Qué bien trabajamos juntos! ✨",
      "Me encanta verte enfocado 🎯",
      "¿Descansamos un poco cuando quieras? 🌱",
      "Este ritmo me gusta 💫",
      "Estamos en flow 🚀",
      "Qué bonito es crecer juntos 🌿",
      "¡Somos un gran equipo! ⭐"
    ],
    tranquilo: [
      "Todo va bien, sin prisas 🍃",
      "Respira profundo... 🌬️",
      "Disfruta el proceso 🌸",
      "Vamos a nuestro ritmo 🦋",
      "La calma es parte del enfoque 🕊️",
      "Cada paso cuenta 👣"
    ],
    cansado: [
      "Creo que necesito una siesta... 😴",
      "¿Y si tomamos aire? 🌬️",
      "Mi energía está baja... 🪫",
      "Un descansito no vendría mal ☕",
      "Me estoy quedando sin pilas 🔋",
      "Descansar también es crecer 🌙"
    ],
    sobrecargado: [
      "¡Uff! Vamos muy rápido... ⚡",
      "Necesito un respiro 🥺",
      "El exceso no es bueno, amigo 🌪️",
      "Tranquilo, no hay prisa 🧘",
      "Esto es demasiado para mí 😵",
      "Bajemos un cambio 🚥"
    ]
  };

  // Consejos según el ánimo (aparecen al hacer hover)
  const tips = {
    feliz: "Sigue así, mantén el equilibrio",
    tranquilo: "La calma es tu superpoder",
    cansado: "Escucha a tu cuerpo, descansa",
    sobrecargado: "Haz una pausa larga, te lo agradecerá"
  };


  useEffect(() => {
    if (autoChange) {
      // Crea un intervalo que cambia el mensaje
      const intervalId = setInterval(() => {
 
        setIsVisible(false);
        
        // Después de 300ms, cambia el mensaje y lo muestra
        setTimeout(() => {
          const library = messageLibrary[animo];
          const randomIndex = Math.floor(Math.random() * library.length);
          setCurrentMessage(library[randomIndex]);
          setIsVisible(true);
        }, 300);
        
      }, interval); 

      // Limpia el intervalo cuando el componente se desmonta
      return () => clearInterval(intervalId);
    }
  }, [animo, autoChange, interval]); 

  // Si no hay mensaje proporcionado, seleccionar uno aleatorio de la biblioteca
  if (!currentMessage) {
    const library = messageLibrary[animo];
    const randomIndex = Math.floor(Math.random() * library.length);
    if (!mensaje) {
      setCurrentMessage(library[randomIndex]);
    }
  }

  // Estilos según el ánimo de la mascota
  const getMoodStyles = () => {
    const styles = {
      feliz: {
        bubble: 'bg-amber-100 border-amber-300',
        text: 'text-amber-800',
        tip: 'text-amber-600',
        accent: 'bg-amber-400'
      },
      tranquilo: {
        bubble: 'bg-sky-100 border-sky-300',
        text: 'text-sky-800',
        tip: 'text-sky-600',
        accent: 'bg-sky-400'
      },
      cansado: {
        bubble: 'bg-gray-100 border-gray-300',
        text: 'text-gray-800',
        tip: 'text-gray-600',
        accent: 'bg-gray-400'
      },
      sobrecargado: {
        bubble: 'bg-orange-100 border-orange-300',
        text: 'text-orange-800',
        tip: 'text-orange-600',
        accent: 'bg-orange-400'
      }
    };
    return styles[animo];
  };

  const moodStyles = getMoodStyles();

  // Iconos según el ánimo
  const moodIcons = {
    feliz: '😊',
    tranquilo: '😌',
    cansado: '😴',
    sobrecargado: '😵'
  };

  return (
    <div className="relative group">
      {/* Burbuja de mensaje principal */}
      <div 
        className={`
          relative ${moodStyles.bubble} border-2 rounded-2xl 
          p-4 shadow-lg max-w-xs
          transition-all duration-300 transform
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        {/* Punta de la burbuja (el triángulo que apunta hacia la mascota) */}
        <div className={`
          absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
          rotate-45 w-4 h-4 ${moodStyles.bubble} border-r-2 border-b-2
          ${moodStyles.bubble.split(' ')[1]}
        `} />

        {/* Contenido de la burbuja */}
        <div className="flex items-start gap-3">
          {/* Icono circular del ánimo */}
          <div className={`
            w-8 h-8 rounded-full ${moodStyles.accent} 
            flex items-center justify-center text-white text-lg
          `}>
            {moodIcons[animo]}
          </div>

          {/* Mensaje de texto */}
          <div className="flex-1">
            <p className={`${moodStyles.text} text-sm font-medium leading-relaxed`}>
              {currentMessage}
            </p>
            
            {/* Tip/consejo - solo visible al hacer hover sobre la burbuja */}
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className={`${moodStyles.tip} text-xs italic`}>
                💡 {tips[animo]}
              </p>
            </div>
          </div>
        </div>

        {/* Indicador de tiempo (cuando autoChange está activado) */}
        {autoChange && (
          <div className="absolute bottom-2 right-2">
            <div className="flex gap-0.5">
              {/* Tres puntos que laten para indicar que cambiará el mensaje */}
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 h-1 rounded-full ${moodStyles.accent} 
                            animate-pulse`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Decoración adicional - elemento flotante con efecto de ping */}
      <div className={`
        absolute -top-2 -right-2 w-6 h-6 rounded-full 
        ${moodStyles.accent} opacity-50 blur-sm
        animate-ping
      `} />
    </div>
  );
}