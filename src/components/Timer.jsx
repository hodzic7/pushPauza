import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Play, Pause, RotateCcw, Clock, Coffee, Zap } from 'lucide-react';
import '../style/Timer.css';

export default function Timer() {
  const { t, i18n } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(0);
  const [initialTime, setInitialTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const startTimer = (minutes) => {
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setInitialTime(seconds);
    setRunning(true);
    setSelectedDuration(minutes);
  };

  const toggleTimer = () => {
    setRunning(!running);
  };

  const resetTimer = () => {
    setRunning(false);
    setTimeLeft(0);
    setInitialTime(0);
    setSelectedDuration(null);
  };

  useEffect(() => {
    if (!running || timeLeft <= 0) {
      if (timeLeft === 0 && initialTime > 0) {
        setRunning(false);
      }
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running, timeLeft, initialTime]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    if (initialTime === 0) return 0;
    return ((initialTime - timeLeft) / initialTime) * 100;
  };

  const timerOptions = [
    { minutes: 30, icon: Coffee, color: 'amber', label: t('start30') },
    { minutes: 45, icon: Clock, color: 'blue', label: t('start45') },
    { minutes: 60, icon: Zap, color: 'purple', label: t('start60') }
  ];

  return (
    <div className="timer-container">
      <div className="timer-wrapper">
        {/* Header */}
        <div className="timer-header">
          <div className="app-icon">
            <Clock size={24} />
          </div>
          <h1 className="app-title">{t('title')}</h1>
        </div>

        {/* Timer Display */}
        <div className="timer-display">
          <div className="progress-ring">
            <svg className="progress-svg" viewBox="0 0 100 100">
              <circle
                className="progress-bg"
                cx="50"
                cy="50"
                r="45"
              />
              <circle
                className="progress-bar"
                cx="50"
                cy="50"
                r="45"
                style={{
                  strokeDasharray: `${2 * Math.PI * 45}`,
                  strokeDashoffset: `${2 * Math.PI * 45 * (1 - getProgress() / 100)}`
                }}
              />
            </svg>
            
            <div className="timer-text">
              <div className="time-display">
                {formatTime(timeLeft)}
              </div>
              {timeLeft === 0 && initialTime > 0 && (
                <div className="time-up-message">
                  {t('timeUp')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timer Controls */}
        {timeLeft === 0 ? (
          <div className="timer-options">
            {timerOptions.map(({ minutes, icon: Icon, color, label }) => (
              <button
                key={minutes}
                onClick={() => startTimer(minutes)}
                className={`timer-option ${color}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="timer-controls">
            <button
              onClick={toggleTimer}
              className={`control-btn ${running ? 'pause' : 'play'}`}
            >
              {running ? <Pause size={20} /> : <Play size={20} />}
              {running ? t('pause') : t('resume')}
            </button>
            
            <button
              onClick={resetTimer}
              className="control-btn reset"
            >
              <RotateCcw size={20} />
              {t('reset')}
            </button>
          </div>
        )}

        {/* Language Selector */}
        <div className="language-selector">
          <span className="language-label">{t('lang')}:</span>
          <div className="language-buttons">
            {[
              { code: 'en', label: 'EN' },
              { code: 'bs', label: 'BS' }
            ].map(({ code, label }) => (
              <button
                key={code}
                onClick={() => i18n.changeLanguage(code)}
                className={`lang-btn ${i18n.language === code ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}