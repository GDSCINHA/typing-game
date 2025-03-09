"use client";

import { useState, useEffect } from "react";

export function Countdown({ onComplete }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-8xl font-bold mb-4 text-[#eeeeee] animate-pulse font-neo">
        {count === 0 ? "시작!" : count}
      </div>
      <p className="text-muted-foreground text-xl">
        {count === 0 ? "코딩을 시작하세요!" : "준비하세요..."}
      </p>
    </div>
  );
}