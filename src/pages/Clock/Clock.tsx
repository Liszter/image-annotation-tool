import { useState, useEffect, useRef } from "react";

import "./Clock.css";

export default function Clock() {
  const [count, setCount] = useState(15*60);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && count > 0) {
      intervalRef.current = setInterval(() => {
        setCount((item) => item - 1);
        // 定时操作
      }, 1000);
    } else {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, count]);

  const formatTime = (time: number) => (time < 10 ? `0${time}` : time);
  const seconds = formatTime(count % 60);
  const minutes = formatTime(Math.floor((count / 60) % 60));

  const startCountdown = () => {
    setIsRunning(true);
  };

  // 暂停
  const pauseCountdown = () => {
    setIsRunning(false);
  };
  // 停止
  const stopCountdown = () => {
    setIsRunning(false);
    setCount(15 * 60);
  };

  const resumeCountdown = () => {
    setIsRunning(true);
  };

  return (
    <div className="clock-page-container " >
      <div>
      <div className={`clock-monitor ${count === 0?'shake':''}`}>
        <span className="clock__hour">{minutes}</span>
        <span className="clock__gap">:</span>
        <span className="clock__minutes">{seconds}</span>
      </div>

      <div className="tool-bar">
        <button onClick={stopCountdown}>停止</button>
        <button onClick={pauseCountdown}>暂停</button>

        <button onClick={startCountdown}>开始</button>
        <button onClick={resumeCountdown}>继续</button>
      </div>

      </div>



    </div>
  );
}
