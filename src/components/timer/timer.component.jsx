import React, { useState, useEffect } from "react";

function Timer({ gameStarted, gameOver }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!gameStarted) {
      setSeconds(0);
      return;
    }
    else if(gameOver)
    {
      setSeconds(0);
    return;
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  return <span>{seconds} segundos</span>;
}

export default Timer;
