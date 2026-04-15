'use client';

export default function MascotaSVG({ especie, nivel, animo, className = '' }) {
  
  // Determinar tamaño según nivel (más nivel = más grande)
  // Ejemplo: nivel 1 = 130px, nivel 10 = 220px
  const size = 120 + (nivel * 10);
  
  // Función que devuelve los ojos según el ánimo de la mascota
  const getEyes = () => {
    switch(animo) {
      case 'feliz':
        return (
          <>
            {/* Ojos normales (círculos) */}
            <circle cx="85" cy="85" r="8" fill="#2D1B0E" />
            <circle cx="155" cy="85" r="8" fill="#2D1B0E" />
            {/* Cejas felices (curvadas hacia arriba como sonrisa invertida) */}
            <path d="M75 70 Q 90 60, 105 70" stroke="#2D1B0E" strokeWidth="4" fill="none" />
            <path d="M135 70 Q 150 60, 165 70" stroke="#2D1B0E" strokeWidth="4" fill="none" />
          </>
        );
      
      case 'tranquilo':
        return (
          <>
            {/* Ojos ligeramente más pequeños */}
            <circle cx="85" cy="90" r="7" fill="#2D1B0E" />
            <circle cx="155" cy="90" r="7" fill="#2D1B0E" />
            {/* Cejas rectas (sin emoción fuerte) */}
            <path d="M75 75 Q 90 75, 105 75" stroke="#2D1B0E" strokeWidth="3" fill="none" />
            <path d="M135 75 Q 150 75, 165 75" stroke="#2D1B0E" strokeWidth="3" fill="none" />
          </>
        );
      
      case 'cansado':
        return (
          <>
            {/* Ojos medio cerrados (elipses horizontales) */}
            <ellipse cx="85" cy="95" rx="7" ry="4" fill="#2D1B0E" />
            <ellipse cx="155" cy="95" rx="7" ry="4" fill="#2D1B0E" />
            {/* Párpados caídos */}
            <path d="M75 90 Q 85 85, 95 90" stroke="#2D1B0E" strokeWidth="2" fill="none" />
            <path d="M145 90 Q 155 85, 165 90" stroke="#2D1B0E" strokeWidth="2" fill="none" />
          </>
        );
      
      case 'sobrecargado':
        return (
          <>
            {/* Ojos abiertos (alerta) */}
            <circle cx="85" cy="85" r="8" fill="#2D1B0E" />
            <circle cx="155" cy="85" r="8" fill="#2D1B0E" />
            {/* Espirales en los ojos (mareado/abrumado) */}
            <path d="M80 80 L90 90 M90 80 L80 90" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M150 80 L160 90 M160 80 L150 90" stroke="#FFFFFF" strokeWidth="2" />
          </>
        );
      
      default:  // Si no hay ánimo válido, muestra feliz por defecto
        return (
          <>
            <circle cx="85" cy="85" r="8" fill="#2D1B0E" />
            <circle cx="155" cy="85" r="8" fill="#2D1B0E" />
          </>
        );
    }
  };

  // Función que dibuja el SVG según la especie de la mascota
  const renderSVG = () => {
    switch(especie) {
      case 'nutria':
        return (
          <svg width={size} height={size} viewBox="0 0 240 240" className={className}>
            {/* Cuerpo principal (óvalo marrón) */}
            <ellipse cx="120" cy="130" rx="70" ry="60" fill="#8B5A2B" />
            {/* Panza (más clara) */}
            <ellipse cx="120" cy="140" rx="50" ry="40" fill="#C19A6B" />
            {/* Cabeza (círculo marrón) */}
            <circle cx="120" cy="80" r="50" fill="#8B5A2B" />
            {/* Mejillas (más claras, semi-transparentes) */}
            <circle cx="95" cy="90" r="12" fill="#C19A6B" opacity="0.5" />
            <circle cx="145" cy="90" r="12" fill="#C19A6B" opacity="0.5" />
            {/* Hocico */}
            <ellipse cx="120" cy="100" rx="15" ry="10" fill="#C19A6B" />
            {/* Nariz (círculo oscuro) */}
            <circle cx="120" cy="100" r="5" fill="#2D1B0E" />
            {/* Orejas (elipses inclinadas) */}
            <ellipse cx="90" cy="50" rx="15" ry="20" fill="#6B4226" transform="rotate(-20 90 50)" />
            <ellipse cx="150" cy="50" rx="15" ry="20" fill="#6B4226" transform="rotate(20 150 50)" />
            {/* Ojos (dinámicos según ánimo) */}
            {getEyes()}
            {/* Bigotes */}
            <path d="M105 105 L85 115" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <path d="M105 110 L85 120" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <path d="M135 105 L155 115" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <path d="M135 110 L155 120" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      
      case 'perezoso':
        return (
          <svg width={size} height={size} viewBox="0 0 240 240" className={className}>
            {/* Cuerpo principal (marrón grisáceo) */}
            <ellipse cx="120" cy="140" rx="65" ry="55" fill="#8B7355" />
            {/* Panza (más clara) */}
            <ellipse cx="120" cy="150" rx="45" ry="35" fill="#A58B6F" />
            {/* Cabeza */}
            <circle cx="120" cy="80" r="45" fill="#8B7355" />
            {/* Manchas oscuras alrededor de los ojos (como anteojos) */}
            <ellipse cx="100" cy="85" rx="15" ry="20" fill="#5D3F2A" />
            <ellipse cx="140" cy="85" rx="15" ry="20" fill="#5D3F2A" />
            {/* Ojos (blancos con pupila pequeña) */}
            <circle cx="100" cy="85" r="6" fill="#FFFFFF" />
            <circle cx="140" cy="85" r="6" fill="#FFFFFF" />
            <circle cx="102" cy="85" r="3" fill="#2D1B0E" />
            <circle cx="142" cy="85" r="3" fill="#2D1B0E" />
            {/* Sonrisa tranquila */}
            <path d="M110 100 Q 120 110, 130 100" stroke="#2D1B0E" strokeWidth="3" fill="none" />
            {/* Garras (palos colgando) */}
            <path d="M80 140 L60 150" stroke="#5D3F2A" strokeWidth="8" strokeLinecap="round" />
            <path d="M160 140 L180 150" stroke="#5D3F2A" strokeWidth="8" strokeLinecap="round" />
          </svg>
        );
      
      default:  // Si no hay especie válida, muestra nutria por defecto
        return (
          <svg width={size} height={size} viewBox="0 0 240 240" className={className}>
            <ellipse cx="120" cy="130" rx="70" ry="60" fill="#8B5A2B" />
            <ellipse cx="120" cy="140" rx="50" ry="40" fill="#C19A6B" />
            <circle cx="120" cy="80" r="50" fill="#8B5A2B" />
            {getEyes()}
          </svg>
        );
    }
  };

  return renderSVG();
}