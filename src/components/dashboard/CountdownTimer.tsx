'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const targetDate = new Date('2026-05-23T00:00:00');

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    // Initialize with calculated time on first render
    const difference = targetDate.getTime() - new Date().getTime();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        const newTimeLeft = { days, hours, minutes, seconds };
        
        // Update state with new time
        setTimeLeft(newTimeLeft);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array since targetDate is now outside

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && 
                   timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gray-900/80 backdrop-blur-md p-8">
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-green-600/5 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

      <div className="relative text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-semibold mb-1">Exam Countdown</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
          {isExpired ? 'Target Date Reached!' : 'CCNP ENCOR 350-401'}
        </h2>
        <p className="text-sm text-gray-400 mb-8">Target Date &mdash; May 23, 2026</p>
        
        {!isExpired ? (
          <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-xl mx-auto">
            {[
              { value: formatNumber(timeLeft.days), label: 'Days' },
              { value: formatNumber(timeLeft.hours), label: 'Hours' },
              { value: formatNumber(timeLeft.minutes), label: 'Minutes' },
              { value: formatNumber(timeLeft.seconds), label: 'Seconds' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="bg-gray-800/80 rounded-xl p-3 md:p-4 border border-emerald-500/10">
                  <div className="text-3xl md:text-5xl font-extrabold text-emerald-400 tabular-nums leading-none mb-1">
                    {item.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-widest text-gray-500 font-medium">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-2xl font-bold text-emerald-400">Time&apos;s Up!</div>
            <p className="text-sm text-gray-400 mt-2">The target date has been reached</p>
          </div>
        )}
        
        {!isExpired && (
          <p className="mt-6 text-xs text-gray-500">
            {timeLeft.days > 0 && `${timeLeft.days} day${timeLeft.days !== 1 ? 's' : ''} remaining`}
            {timeLeft.days === 0 && timeLeft.hours > 0 && `${timeLeft.hours} hour${timeLeft.hours !== 1 ? 's' : ''} remaining`}
            {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes > 0 && `${timeLeft.minutes} minute${timeLeft.minutes !== 1 ? 's' : ''} remaining`}
            {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds > 0 && `${timeLeft.seconds} second${timeLeft.seconds !== 1 ? 's' : ''} remaining`}
          </p>
        )}
      </div>
    </div>
  );
}
