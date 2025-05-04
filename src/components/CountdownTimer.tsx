import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialTime }: { initialTime: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [timeLeft]);

  return (
    <div>
      <h1>The Game will start in {timeLeft}</h1>
    </div>
  );
};

export default CountdownTimer;
