import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Window from '@/components/winter-study/Window';
import Bookshelf from '@/components/winter-study/Bookshelf';
import Fireplace from '@/components/winter-study/Fireplace';
import CoffeeCup from '@/components/winter-study/CoffeeCup';
import Crab from '@/components/winter-study/Crab';
import ControlPanel from '@/components/winter-study/ControlPanel';
import { useAudioManager } from '@/hooks/useAudioManager';

// 名言库
const QUOTES = [
  '摄影是瞬间的艺术，而生活是持续的修行。',
  '光影之间，藏着这世界最温柔的秘密。',
  '每一张照片都是时间的挽留。',
  '冬天的意义，是为了让温暖更珍贵。',
  '螃蟹横着走，是因为它知道，有些路需要换个方向。',
  '草莓之所以甜，是因为它愿意把最好的留到最后。',
];

// 圣诞祝福
const CHRISTMAS_MESSAGE = `亲爱的朋友，

愿你的镜头永远捕捉到光，
愿你的书架永远装满故事，
愿这个冬天的每一天，
都像篝火旁一样温暖。

圣诞快乐！

愿我们的友谊像这火焰一样，越燃越旺`;

export default function WinterStudyRoom() {
  const [isIgnited, setIsIgnited] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(false);
  const [quoteDialog, setQuoteDialog] = useState<string | null>(null);
  const [showChristmasMessage, setShowChristmasMessage] = useState(false);
  
  const audioManager = useAudioManager();

  // 从localStorage加载用户偏好
  useEffect(() => {
    const savedPreferences = localStorage.getItem('winter-study-preferences');
    if (savedPreferences) {
      const prefs = JSON.parse(savedPreferences);
      audioManager.setVolumes(prefs.volumes || {});
      if (prefs.isIgnited) {
        setIsIgnited(true);
        setShowControlPanel(true);
      }
    }
  }, []);

  // 保存用户偏好
  useEffect(() => {
    if (isIgnited) {
      localStorage.setItem('winter-study-preferences', JSON.stringify({
        isIgnited,
        volumes: audioManager.volumes,
      }));
    }
  }, [isIgnited, audioManager.volumes]);

  // 点燃篝火
  const handleIgnite = () => {
    setIsIgnited(true);
    audioManager.playSound('fire');
    
    // 3秒后显示控制面板
    setTimeout(() => {
      setShowControlPanel(true);
    }, 3000);
  };

  // 显示随机名言
  const showRandomQuote = () => {
    const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuoteDialog(randomQuote);
  };

  // 窗户点击 - 雨声增大
  const handleWindowClick = () => {
    audioManager.increaseVolume('rain', 20);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-background-cream overflow-hidden relative">
      {/* 主标题 */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <h1 className="text-5xl xl:text-6xl font-bold text-primary mb-2">
          冬日书房
        </h1>
        <p className="text-lg xl:text-xl text-muted-foreground">
          你的专属避风港
        </p>
      </div>

      {/* 场景容器 */}
      <div className="relative w-full h-screen flex items-center justify-center">
        {/* 窗户 - 右上角 */}
        <div className="absolute top-20 right-10 xl:right-20">
          <Window onClick={handleWindowClick} />
        </div>

        {/* 书架 - 左侧 */}
        <div className="absolute left-10 xl:left-20 top-1/2 -translate-y-1/2">
          <Bookshelf 
            onBookClick={showRandomQuote}
            onStrawberryBookClick={() => setShowChristmasMessage(true)}
          />
        </div>

        {/* 壁炉 - 中央下方 */}
        <div className="absolute bottom-32 xl:bottom-40 left-1/2 -translate-x-1/2">
          <Fireplace isIgnited={isIgnited} />
        </div>

        {/* 咖啡杯 - 右下 */}
        <div className="absolute bottom-32 right-20 xl:right-32">
          <CoffeeCup onClick={showRandomQuote} />
        </div>

        {/* 螃蟹 - 右下角 */}
        <div className="absolute bottom-20 right-10">
          <Crab />
        </div>

        {/* 点燃篝火按钮 */}
        {!isIgnited && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-fade-in">
            <Button
              size="lg"
              onClick={handleIgnite}
              className="bg-flame hover:bg-flame/90 text-flame-foreground text-xl px-8 py-6 shadow-lg"
            >
              🔥 点燃篝火
            </Button>
            <p className="text-sm text-muted-foreground">
              点击书本探索故事 · 点燃篝火开始旅程
            </p>
          </div>
        )}

        {/* 控制面板 */}
        {showControlPanel && (
          <div className="absolute bottom-0 left-0 right-0 animate-fade-in">
            <ControlPanel audioManager={audioManager} />
          </div>
        )}
      </div>

      {/* 名言对话框 */}
      <Dialog open={!!quoteDialog} onOpenChange={() => setQuoteDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">✨</DialogTitle>
          </DialogHeader>
          <p className="text-lg text-center leading-relaxed py-4">
            {quoteDialog}
          </p>
        </DialogContent>
      </Dialog>

      {/* 圣诞祝福对话框 */}
      <Dialog open={showChristmasMessage} onOpenChange={setShowChristmasMessage}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center text-accent">
              🍓 圣诞祝福
            </DialogTitle>
          </DialogHeader>
          <div className="whitespace-pre-line text-center leading-relaxed py-4">
            {CHRISTMAS_MESSAGE}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
