import { useState, useEffect, useRef } from 'react';

export type SoundType = 'fire' | 'rain' | 'book' | 'noise';

export interface AudioManager {
  volumes: Record<SoundType, number>;
  isMuted: boolean;
  isLoading: Record<SoundType, boolean>;
  setVolume: (sound: SoundType, volume: number) => void;
  setVolumes: (volumes: Partial<Record<SoundType, number>>) => void;
  increaseVolume: (sound: SoundType, amount: number) => void;
  toggleMute: () => void;
  playSound: (sound: SoundType) => void;
  stopSound: (sound: SoundType) => void;
  stopAll: () => void;
}

// 音频文件URL - 使用免费的音频资源
// 来源：Pixabay（CC0 / Public Domain - 完全免费，可商用）
const AUDIO_URLS: Record<SoundType, string> = {
  // 篝火声 - 温暖的柴火燃烧噼啪声（11分54秒，非常适合循环）
  fire: 'https://cdn.pixabay.com/audio/2024/03/05/audio_53b9c84cd7.mp3',
  // 雨声 - 温和的雨滴声（适合专注和放松）
  rain: 'https://cdn.pixabay.com/audio/2022/05/13/audio_257112ce97.mp3',
  // 翻书声 - 纸张翻动的声音
  book: 'https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3',
  // 白噪音 - 温和的海浪/环境声（适合专注工作）
  noise: 'https://cdn.pixabay.com/audio/2022/03/12/audio_1808fbf07a.mp3',
};

// 淡入淡出时间（毫秒）
const FADE_DURATION = 1500;

export function useAudioManager(): AudioManager {
  const [volumes, setVolumes] = useState<Record<SoundType, number>>({
    fire: 70,
    rain: 30,
    book: 20,
    noise: 40,
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState<Record<SoundType, boolean>>({
    fire: false,
    rain: false,
    book: false,
    noise: false,
  });
  
  // 音频元素引用
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    fire: null,
    rain: null,
    book: null,
    noise: null,
  });

  // 淡入淡出动画引用
  const fadeIntervals = useRef<Record<SoundType, NodeJS.Timeout | null>>({
    fire: null,
    rain: null,
    book: null,
    noise: null,
  });

  // 初始化音频元素
  useEffect(() => {
    const sounds: SoundType[] = ['fire', 'rain', 'book', 'noise'];
    
    sounds.forEach((sound) => {
      const audio = new Audio();
      audio.loop = true;
      audio.volume = 0; // 初始音量为0，用于淡入效果
      audio.preload = 'none'; // 不预加载，等用户交互后再加载
      
      // 监听加载状态
      audio.addEventListener('loadstart', () => {
        setIsLoading(prev => ({ ...prev, [sound]: true }));
      });
      
      audio.addEventListener('canplaythrough', () => {
        setIsLoading(prev => ({ ...prev, [sound]: false }));
      });
      
      audio.addEventListener('error', (e) => {
        console.error(`加载${sound}音效失败:`, e);
        setIsLoading(prev => ({ ...prev, [sound]: false }));
      });
      
      audio.src = AUDIO_URLS[sound];
      audioRefs.current[sound] = audio;
    });

    // 清理函数
    return () => {
      sounds.forEach((sound) => {
        const audio = audioRefs.current[sound];
        if (audio) {
          audio.pause();
          audio.src = '';
        }
        // 清理淡入淡出定时器
        if (fadeIntervals.current[sound]) {
          clearInterval(fadeIntervals.current[sound]!);
        }
      });
    };
  }, []);

  // 淡入效果
  const fadeIn = (sound: SoundType, targetVolume: number) => {
    const audio = audioRefs.current[sound];
    if (!audio) return;

    // 清除之前的淡入淡出
    if (fadeIntervals.current[sound]) {
      clearInterval(fadeIntervals.current[sound]!);
    }

    const steps = 50; // 50步完成淡入
    const volumeStep = targetVolume / steps;
    const timeStep = FADE_DURATION / steps;
    let currentStep = 0;

    fadeIntervals.current[sound] = setInterval(() => {
      currentStep++;
      const newVolume = Math.min(volumeStep * currentStep, targetVolume);
      audio.volume = newVolume / 100;

      if (currentStep >= steps) {
        if (fadeIntervals.current[sound]) {
          clearInterval(fadeIntervals.current[sound]!);
          fadeIntervals.current[sound] = null;
        }
      }
    }, timeStep);
  };

  // 淡出效果
  const fadeOut = (sound: SoundType, callback?: () => void) => {
    const audio = audioRefs.current[sound];
    if (!audio) return;

    // 清除之前的淡入淡出
    if (fadeIntervals.current[sound]) {
      clearInterval(fadeIntervals.current[sound]!);
    }

    const steps = 50;
    const currentVolume = audio.volume * 100;
    const volumeStep = currentVolume / steps;
    const timeStep = FADE_DURATION / steps;
    let currentStep = 0;

    fadeIntervals.current[sound] = setInterval(() => {
      currentStep++;
      const newVolume = Math.max(currentVolume - volumeStep * currentStep, 0);
      audio.volume = newVolume / 100;

      if (currentStep >= steps) {
        if (fadeIntervals.current[sound]) {
          clearInterval(fadeIntervals.current[sound]!);
          fadeIntervals.current[sound] = null;
        }
        if (callback) callback();
      }
    }, timeStep);
  };

  // 更新音量（实时，不使用淡入淡出）
  useEffect(() => {
    Object.entries(volumes).forEach(([sound, volume]) => {
      const audio = audioRefs.current[sound as SoundType];
      if (audio && !audio.paused) {
        // 如果正在播放，才更新音量
        audio.volume = isMuted ? 0 : volume / 100;
      }
    });
  }, [volumes, isMuted]);

  // 设置单个音量
  const setVolume = (sound: SoundType, volume: number) => {
    const clampedVolume = Math.max(0, Math.min(100, volume));
    setVolumes((prev) => ({ ...prev, [sound]: clampedVolume }));
    
    const audio = audioRefs.current[sound];
    if (!audio) return;

    // 如果音量大于0，自动播放（带淡入）
    if (clampedVolume > 0 && audio.paused) {
      playSound(sound);
    } 
    // 如果音量为0，停止播放（带淡出）
    else if (clampedVolume === 0 && !audio.paused) {
      stopSound(sound);
    }
    // 如果正在播放，直接更新音量
    else if (!audio.paused) {
      audio.volume = isMuted ? 0 : clampedVolume / 100;
    }
  };

  // 批量设置音量
  const setVolumesMultiple = (newVolumes: Partial<Record<SoundType, number>>) => {
    setVolumes((prev) => ({ ...prev, ...newVolumes }));
  };

  // 增加音量
  const increaseVolume = (sound: SoundType, amount: number) => {
    setVolume(sound, volumes[sound] + amount);
  };

  // 切换静音
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  // 播放音效（带淡入）
  const playSound = (sound: SoundType) => {
    const audio = audioRefs.current[sound];
    if (!audio) return;

    if (audio.paused) {
      // 先加载音频
      if (audio.readyState < 2) {
        audio.load();
      }

      audio.play()
        .then(() => {
          // 播放成功，开始淡入
          const targetVolume = isMuted ? 0 : volumes[sound];
          fadeIn(sound, targetVolume);
        })
        .catch((error) => {
          console.error(`播放${sound}音效失败:`, error);
          // 如果是因为用户未交互导致的错误，可以提示用户
          if (error.name === 'NotAllowedError') {
            console.log('浏览器阻止了自动播放，需要用户交互后播放');
          }
        });
    }
  };

  // 停止音效（带淡出）
  const stopSound = (sound: SoundType) => {
    const audio = audioRefs.current[sound];
    if (!audio || audio.paused) return;

    fadeOut(sound, () => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  // 停止所有音效
  const stopAll = () => {
    Object.keys(audioRefs.current).forEach((sound) => {
      stopSound(sound as SoundType);
    });
  };

  return {
    volumes,
    isMuted,
    isLoading,
    setVolume,
    setVolumes: setVolumesMultiple,
    increaseVolume,
    toggleMute,
    playSound,
    stopSound,
    stopAll,
  };
}
