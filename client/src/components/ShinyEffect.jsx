import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ShinyEffect = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Check if today is Christmas and if the effect has already been shown
    const today = new Date();
    const isChristmas = today.getMonth() === 11 && today.getDate() === 25;

    if (isChristmas) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Stop confetti after 5 seconds
    }
  }, []);

  return (
    <>
      {showConfetti && <Confetti />}
    </>
  );
};

export default ShinyEffect;
