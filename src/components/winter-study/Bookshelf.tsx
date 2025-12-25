interface BookshelfProps {
  onBookClick: () => void;
  onStrawberryBookClick: () => void;
}

// 书本颜色
const BOOK_COLORS = [
  'bg-primary',
  'bg-secondary', 
  'bg-muted',
  'bg-accent', // 草莓红色书
  'bg-flame',
  'bg-sound-book',
  'bg-sound-rain',
  'bg-sound-noise',
  'bg-primary',
  'bg-secondary',
  'bg-muted',
  'bg-flame',
];

interface BookProps {
  color: string;
  isStrawberry?: boolean;
  onClick: () => void;
}

function Book({ color, isStrawberry, onClick }: BookProps) {
  return (
    <div
      onClick={onClick}
      className={`${color} w-8 h-24 xl:w-10 xl:h-32 rounded-sm cursor-pointer transition-all hover:scale-105 hover:-translate-y-2 shadow-md relative group`}
      title={isStrawberry ? '草莓书 - 点击查看祝福' : '点击查看名言'}
    >
      {/* 书脊装饰线 */}
      <div className="absolute inset-y-2 left-1 w-0.5 bg-white/30" />
      <div className="absolute inset-y-2 right-1 w-0.5 bg-black/20" />
      
      {/* 草莓标记 */}
      {isStrawberry && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">
          🍓
        </div>
      )}
    </div>
  );
}

export default function Bookshelf({ onBookClick, onStrawberryBookClick }: BookshelfProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* 3层书架 */}
      {[0, 1, 2].map((shelfIndex) => (
        <div key={shelfIndex} className="relative">
          {/* 书架板 */}
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-primary rounded shadow-lg" />
          
          {/* 书本 */}
          <div className="flex gap-2 pb-3">
            {BOOK_COLORS.slice(shelfIndex * 4, (shelfIndex + 1) * 4).map((color, bookIndex) => {
              const globalIndex = shelfIndex * 4 + bookIndex;
              const isStrawberry = globalIndex === 3; // 第4本书是草莓书
              
              return (
                <Book
                  key={globalIndex}
                  color={color}
                  isStrawberry={isStrawberry}
                  onClick={isStrawberry ? onStrawberryBookClick : onBookClick}
                />
              );
            })}
          </div>
        </div>
      ))}
      
      {/* 书架底座 */}
      <div className="h-4 bg-secondary rounded shadow-xl" />
    </div>
  );
}
