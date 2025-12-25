import { useEffect, useState } from 'react';

interface WindowProps {
  onClick: () => void;
}

// 雪花组件
function Snowflake({ delay, duration }: { delay: number; duration: number }) {
  return (
    <div
      className="absolute w-1 h-1 bg-white rounded-full animate-snowfall"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    />
  );
}

export default function Window({ onClick }: WindowProps) {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // 生成20个雪花
    const flakes = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div
      onClick={onClick}
      className="relative w-48 h-64 xl:w-64 xl:h-80 cursor-pointer group transition-transform hover:scale-105"
      title="点击增加雨声"
    >
      {/* 窗框 */}
      <div className="absolute inset-0 bg-primary rounded-lg shadow-xl">
        {/* 窗户玻璃 - 冬日蓝天背景 */}
        <div className="absolute inset-2 bg-gradient-to-b from-sky to-sky-light rounded overflow-hidden">
          {/* 雪花动画 */}
          {snowflakes.map((flake) => (
            <Snowflake key={flake.id} delay={flake.delay} duration={flake.duration} />
          ))}
        </div>

        {/* 十字窗框 */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* 垂直线 */}
          <div className="absolute w-2 h-full bg-primary" />
          {/* 水平线 */}
          <div className="absolute h-2 w-full bg-primary" />
        </div>
      </div>

      {/* 悬停提示 */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          点击增加雨声
        </span>
      </div>
    </div>
  );
}
