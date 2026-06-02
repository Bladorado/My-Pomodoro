'use client';

import { useEffect, useState } from 'react';

export default function MoodMessage({ 
  mensaje, 
  animo, 
  autoChange = false,
  interval = 5000 
}) {
  // Estado para el mensaje actual que se muestra
  const [currentMessage, setCurrentMessage] = useState(null);  
  const [isVisible, setIsVisible] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false); 

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

  const tips = {
    feliz: "Sigue así, mantén el equilibrio",
    tranquilo: "La calma es tu superpoder",
    cansado: "Escucha a tu cuerpo, descansa",
    sobrecargado: "Haz una pausa larga, te lo agradecerá"
  };

  // Inicializar mensaje SOLO UNA VEZ
  useEffect(() => {
    if (!isInitialized) {
      let mensajeInicial = mensaje;
      if (!mensajeInicial || autoChange) {
        const library = messageLibrary[animo];
        const randomIndex = Math.floor(Math.random() * library.length);
        mensajeInicial = library[randomIndex];
      }
      setCurrentMessage(mensajeInicial);
      setIsInitialized(true);
    }
  }, [mensaje, animo, autoChange, isInitialized]);

  // EFECTO PARA CAMBIO AUTOMÁTICO - PERO SIN DEPENDER DEL MENSAJE EXTERNO
  useEffect(() => {
    if (!autoChange) return;
    
    console.log("✅ Intervalo iniciado para animo:", animo);
    
    const intervalId = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        const library = messageLibrary[animo];
        if (library && library.length > 0) {
          const randomIndex = Math.floor(Math.random() * library.length);
          const nuevoMensaje = library[randomIndex];
          setCurrentMessage(nuevoMensaje);
        }
        setIsVisible(true);
      }, 300);
    }, interval);

    return () => {
      console.log("🧹 Limpiando intervalo");
      clearInterval(intervalId);
    };
  }, [animo, interval, autoChange]);  

  // Estilos según el ánimo
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

  const moodIcons = {
    feliz: '😊',
    tranquilo: '😌',
    cansado: '😴',
    sobrecargado: '😵'
  };

  if (!currentMessage) return null;

  return (
    <div className="relative group">
      <div 
        className={`
          relative ${moodStyles.bubble} border-2 rounded-2xl 
          p-4 shadow-lg max-w-xs
          transition-all duration-300 transform
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        `}
      >
        <div className={`
          absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2
          rotate-45 w-4 h-4 ${moodStyles.bubble} border-r-2 border-b-2
          ${moodStyles.bubble.split(' ')[1]}
        `} />

        <div className="flex items-start gap-3">
          <div className={`
            w-8 h-8 rounded-full ${moodStyles.accent} 
            flex items-center justify-center text-white text-lg
          `}>
            {moodIcons[animo]}
          </div>

          <div className="flex-1">
            <p className={`${moodStyles.text} text-sm font-medium leading-relaxed`}>
              {currentMessage}
            </p>
            
            <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className={`${moodStyles.tip} text-xs italic`}>
                💡 {tips[animo]}
              </p>
            </div>
          </div>
        </div>

        {autoChange && (
          <div className="absolute bottom-2 right-2">
            <div className="flex gap-0.5">
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

      <div className={`
        absolute -top-2 -right-2 w-6 h-6 rounded-full 
        ${moodStyles.accent} opacity-50 blur-sm
        animate-ping
      `} />
    </div>
  );
}