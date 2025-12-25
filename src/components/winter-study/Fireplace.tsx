interface FireplaceProps {
  isIgnited: boolean;
}

// 火焰组件
function Flame({ delay }: { delay: number }) {
  return (
    <div
      className="absolute bottom-0 w-8 h-12 xl:w-12 xl:h-16 bg-gradient-to-t from-flame via-gold to-transparent rounded-full animate-flame blur-sm"
      style={{
        left: `${20 + Math.random() * 60}%`,
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function Fireplace({ isIgnited }: FireplaceProps) {
  return (
    <div className="relative w-64 h-48 xl:w-80 xl:h-64">
      {/* 壁炉结构 */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary to-primary rounded-t-lg shadow-2xl">
        {/* 壁炉内部 */}
        <div className="absolute bottom-0 left-4 right-4 h-32 xl:h-40 bg-gradient-to-t from-black/80 to-black/40 rounded-t-lg overflow-hidden">
          {/* 火焰动画 */}
          {isIgnited && (
            <div className="relative w-full h-full animate-ignite">
              <Flame delay={0} />
              <Flame delay={0.3} />
              <Flame delay={0.6} />
              <Flame delay={0.9} />
              <Flame delay={1.2} />
              
              {/* 火光效果 */}
              <div className="absolute inset-0 bg-gradient-radial from-flame/30 via-gold/20 to-transparent animate-pulse" />
            </div>
          )}
          
          {/* 木柴 */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-16 h-3 bg-primary rounded-full shadow-lg" />
            <div className="w-12 h-3 bg-primary rounded-full shadow-lg -translate-y-1" />
          </div>
        </div>

        {/* 壁炉边框装饰 */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-primary rounded-t-lg" />
        <div className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-black/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-black/20 to-transparent" />
      </div>

      {/* 火光照射效果 */}
      {isIgnited && (
        <div className="absolute -inset-8 bg-gradient-radial from-flame/10 via-gold/5 to-transparent animate-pulse pointer-events-none" />
      )}
    </div>
  );
}
