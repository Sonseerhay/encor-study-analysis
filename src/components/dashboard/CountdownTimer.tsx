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
    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl shadow-2xl p-8 text-white border border-slate-700/50">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          {isExpired ? 'Target Date Reached!' : 'Countdown to ENCORE Exam'}
        </h2>
        <p className="text-lg opacity-90 mb-6">May 23, 2026</p>
        
        {!isExpired ? (
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            <div className="text-center">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-xl border border-slate-600/50">
                <div className="text-3xl md:text-4xl font-bold text-cyan-300">
                  {formatNumber(timeLeft.days)}
                </div>
                <div className="text-sm md:text-base text-slate-300 font-medium">Days</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-xl border border-slate-600/50">
                <div className="text-3xl md:text-4xl font-bold text-cyan-300">
                  {formatNumber(timeLeft.hours)}
                </div>
                <div className="text-sm md:text-base text-slate-300 font-medium">Hours</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-xl border border-slate-600/50">
                <div className="text-3xl md:text-4xl font-bold text-cyan-300">
                  {formatNumber(timeLeft.minutes)}
                </div>
                <div className="text-sm md:text-base text-slate-300 font-medium">Minutes</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-xl border border-slate-600/50">
                <div className="text-3xl md:text-4xl font-bold text-cyan-300">
                  {formatNumber(timeLeft.seconds)}
                </div>
                <div className="text-sm md:text-base text-slate-300 font-medium">Seconds</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-2xl font-bold">Time's Up!</div>
            <p className="text-sm opacity-90 mt-2">The target date has been reached</p>
          </div>
        )}
        
        {!isExpired && (
          <div className="mt-4 text-xs opacity-75">
            {timeLeft.days > 0 && `${timeLeft.days} day${timeLeft.days !== 1 ? 's' : ''} remaining`}
            {timeLeft.days === 0 && timeLeft.hours > 0 && `${timeLeft.hours} hour${timeLeft.hours !== 1 ? 's' : ''} remaining`}
            {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes > 0 && `${timeLeft.minutes} minute${timeLeft.minutes !== 1 ? 's' : ''} remaining`}
            {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds > 0 && `${timeLeft.seconds} second${timeLeft.seconds !== 1 ? 's' : ''} remaining`}
          </div>
        )}
      </div>
    </div>
  );
}
