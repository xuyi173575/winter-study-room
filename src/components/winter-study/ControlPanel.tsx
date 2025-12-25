import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Volume2, VolumeX, Clock } from 'lucide-react';
import type { AudioManager } from '@/hooks/useAudioManager';

interface ControlPanelProps {
  audioManager: AudioManager;
}

const SOUND_CONFIGS = [
  { key: 'fire', label: '篝火', icon: '🔥', color: 'sound-fire' },
  { key: 'rain', label: '雨声', icon: '🌧️', color: 'sound-rain' },
  { key: 'book', label: '翻书', icon: '📖', color: 'sound-book' },
  { key: 'noise', label: '白噪音', icon: '🌊', color: 'sound-noise' },
] as const;

export default function ControlPanel({ audioManager }: ControlPanelProps) {
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  // 定时器倒计时
  useEffect(() => {
    if (!isTimerRunning || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          audioManager.stopAll();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, remainingSeconds, audioManager]);

  // 启动定时器
  const startTimer = () => {
    if (timerMinutes > 0 && timerMinutes <= 180) {
      setRemainingSeconds(timerMinutes * 60);
      setIsTimerRunning(true);
    }
  };

  // 停止定时器
  const stopTimer = () => {
    setIsTimerRunning(false);
    setRemainingSeconds(0);
  };

  // 格式化时间显示
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card/95 backdrop-blur-sm border-t border-border shadow-2xl">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* 音量控制区域 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">环境音控制</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={audioManager.toggleMute}
              >
                {audioManager.isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* 音量滑块 */}
            <div className="space-y-4">
              {SOUND_CONFIGS.map(({ key, label, icon, color }) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{icon}</span>
                      <span className="text-sm font-medium">{label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {audioManager.volumes[key]}%
                    </span>
                  </div>
                  <Slider
                    value={[audioManager.volumes[key]]}
                    onValueChange={(value) => audioManager.setVolume(key, value[0])}
                    max={100}
                    step={1}
                    className={`[&_[role=slider]]:bg-${color}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 定时器区域 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" />
              <h3 className="text-lg font-semibold">专注定时器</h3>
            </div>

            {!isTimerRunning ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    设置时长（分钟）
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={180}
                    value={timerMinutes}
                    onChange={(e) => setTimerMinutes(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">
                    范围：1-180分钟
                  </p>
                </div>
                <Button
                  onClick={startTimer}
                  className="w-full"
                  disabled={timerMinutes < 1 || timerMinutes > 180}
                >
                  开始专注
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {formatTime(remainingSeconds)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    剩余时间
                  </p>
                </div>
                <Button
                  onClick={stopTimer}
                  variant="outline"
                  className="w-full"
                >
                  停止定时器
                </Button>
              </div>
            )}

            {/* 快捷时间按钮 */}
            {!isTimerRunning && (
              <div className="grid grid-cols-4 gap-2">
                {[15, 25, 45, 60].map((mins) => (
                  <Button
                    key={mins}
                    variant="outline"
                    size="sm"
                    onClick={() => setTimerMinutes(mins)}
                    className="text-xs"
                  >
                    {mins}分
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
