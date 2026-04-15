'use client';


import { useEffect, useState } from 'react';
import ProgressCircle from './ProgressCircle';




export default function Timer({ initialMinutes, isActive, onComplete }) {

    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(0);
    const [progress, setProgress] = useState(100);

    // useEffect se ejecuta cuando cambian las dependencias ([isActive, minutes, seconds, initialMinutes])
    useEffect(() => {

        let interval;


        if (isActive) {
            interval = setInterval(() => {

                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else {
                    if (minutes > 0) {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    } else {
                    
                        if (onComplete) {
                            onComplete();  
                        }
                    }
                }



                const totalSeconds = initialMinutes * 60;
                const currentSeconds = minutes * 60 + seconds;
                const newProgress = (currentSeconds / totalSeconds) * 100;

                setProgress(newProgress);
            }, 1000); // 1000ms = 1 segundo
        }

        // Función de limpieza: se ejecuta cuando el componente se desmonta o antes de ejecutar el efecto nuevamente
        return () => clearInterval(interval);
        // Dependencias: el efecto se re-ejecuta si alguna de estas variables cambia
    }, [isActive, minutes, seconds, initialMinutes, onComplete]);


    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');


    return (

        <div className="relative w-64 h-64">

            <ProgressCircle progress={progress} />


            <div className="absolute inset-0 flex flex-col items-center  justify-center">

                <span className="text-5xl font-light text-amber-900 ">
                    {formattedMinutes}:{formattedSeconds}
                </span>

                <span className="text-sm text-amber-600 mt-2">
                    {minutes === 0 && seconds === 0 ? '¡Descansa!' : 'Enfocado'}
                </span>
            </div>
        </div>
    );
}