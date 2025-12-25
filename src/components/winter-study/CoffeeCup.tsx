interface CoffeeCupProps {
  onClick: () => void;
}

// 蒸汽组件
function Steam({ delay }: { delay: number }) {
  return (
    <div
      className="absolute bottom-full left-1/2 -translate-x-1/2 w-2 h-4 bg-muted/60 rounded-full animate-steam blur-sm"
      style={{
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export default function CoffeeCup({ onClick }: CoffeeCupProps) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer group transition-transform hover:scale-110"
      title="点击查看名言"
    >
      {/* 蒸汽动画 */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-full h-8">
        <Steam delay={0} />
        <Steam delay={0.8} />
        <Steam delay={1.6} />
      </div>

      {/* 咖啡杯 */}
      <div className="relative w-16 h-20 xl:w-20 xl:h-24">
        {/* 杯身 */}
        <div className="absolute bottom-0 w-full h-16 xl:h-20 bg-gradient-to-b from-card to-muted rounded-b-2xl shadow-lg">
          {/* 咖啡液面 */}
          <div className="absolute top-2 left-2 right-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full" />
        </div>

        {/* 杯口 */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-muted rounded-t-lg shadow-inner" />

        {/* 杯把手 */}
        <div className="absolute right-0 top-4 w-4 h-6 xl:w-5 xl:h-8 border-2 border-muted rounded-r-full" />
      </div>

      {/* 悬停提示 */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          点击查看名言
        </span>
      </div>
    </div>
  );
}
