'use client';


export default function ProgressCircle({ progress }) {

    const radius = 90;

    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        // Contenedor con tamaño fijo para el SVG
        <div className="relative w-64 h-64 ">
          {/* SVG que contiene los círculos
              transform -rotate-90: rota el SVG 90 grados para que el progreso empiece desde arriba
              (por defecto en SVG los círculos empiezan desde la derecha) */}
          <svg className="w-full h-full transform -rotate-90 ">
            
            {/* Círculo de fondo (estático) */}
            <circle
              // Centro del círculo en coordenadas SVG (128,128 porque el contenedor es 256x256)
              cx="128"
              cy="128"
              // Radio del círculo
              r={radius}
              // Color del trazo (ámbar muy claro)
              stroke="#fef3c7"
              // Grosor del trazo en píxeles
              strokeWidth="8"
              // Sin relleno (solo el contorno)
              fill="none"
            />
            
            {/* Círculo de progreso (dinámico) */}
            <circle
              // Mismas coordenadas que el círculo de fondo
              cx="128"
              cy="128"
              r={radius}
              // Color del trazo (ámbar más oscuro para el progreso)
              stroke="#f59e0b"
              strokeWidth="8"
              fill="none"
              // Hace que los extremos del trazo sean redondeados
              strokeLinecap="round"
              // strokeDasharray: define el patrón de guiones y espacios
              // Al poner la circunferencia completa, creamos un guión de ese largo
              strokeDasharray={circumference}
              // strokeDashoffset: desplaza el inicio del guión
              // Esto crea el efecto de "llenado" del círculo
              strokeDashoffset={strokeDashoffset}
              // Transición suave cuando cambia el progreso
              className="transition-all duration-300 ease-in-out"
            />
          </svg>
        </div>
      );
    }
