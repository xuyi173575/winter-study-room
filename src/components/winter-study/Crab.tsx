import { useState } from 'react';

export default function Crab() {
  const [isWalking, setIsWalking] = useState(false);

  const handleClick = () => {
    if (!isWalking) {
      setIsWalking(true);
      setTimeout(() => {
        setIsWalking(false);
      }, 4000); // 动画持续4秒
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer transition-transform hover:scale-110 ${
        isWalking ? 'animate-crab-walk' : ''
      }`}
      title="点击看螃蟹横着走"
    >
      {/* 螃蟹 emoji */}
      <div className="text-4xl xl:text-5xl">
        🦀
      </div>
    </div>
  );
}
