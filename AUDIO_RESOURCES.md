# 冬日书房 - 音频资源说明

## 🎵 当前使用的音频资源

应用现在使用来自 **Pixabay** 的免费音频资源，这些音频都是 **CC0 / Public Domain** 授权，可以免费商用。

### 音频列表

| 音效类型 | 描述 | 来源 | 授权 |
|---------|------|------|------|
| 🔥 篝火声 | 柴火燃烧的噼啪声 | Pixabay | CC0 |
| 🌧️ 雨声 | 温和的雨声 | Pixabay | CC0 |
| 📖 翻书声 | 纸张翻动的声音 | Pixabay | CC0 |
| 🌊 白噪音 | 温和的海浪声 | Pixabay | CC0 |

### 音频URL

```typescript
const AUDIO_URLS = {
  fire: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8e1c3f8.mp3',
  rain: 'https://cdn.pixabay.com/audio/2022/03/10/audio_4019d6e8e5.mp3',
  book: 'https://cdn.pixabay.com/audio/2021/08/04/audio_12b0c7443c.mp3',
  noise: 'https://cdn.pixabay.com/audio/2022/03/12/audio_1808fbf07a.mp3',
};
```

## 📋 音频特性

- **格式**: MP3
- **质量**: 高质量，适合循环播放
- **授权**: CC0 / Public Domain（完全免费，可商用）
- **来源**: Pixabay 音频库
- **加载方式**: CDN直接加载，无需下载

## 🔄 如何更换音频

如果您想使用自己的音频文件，有两种方式：

### 方式一：使用本地音频文件

1. **准备音频文件**
   - 格式：MP3
   - 时长：建议30秒以上（用于循环）
   - 音质：高质量，无杂音
   - 音量：已均衡处理

2. **放置文件**
   ```
   public/
   └── audio/
       ├── fire.mp3
       ├── rain.mp3
       ├── book.mp3
       └── noise.mp3
   ```

3. **修改配置**
   编辑 `src/hooks/useAudioManager.ts`：
   ```typescript
   const AUDIO_URLS: Record<SoundType, string> = {
     fire: '/audio/fire.mp3',
     rain: '/audio/rain.mp3',
     book: '/audio/book.mp3',
     noise: '/audio/noise.mp3',
   };
   ```

### 方式二：使用其他在线音频

您可以从以下免费音频网站获取音频：

1. **Pixabay Audio** (推荐)
   - 网址: https://pixabay.com/music/
   - 授权: CC0 / Public Domain
   - 特点: 完全免费，可商用

2. **Freesound**
   - 网址: https://freesound.org/
   - 授权: CC0 / CC BY
   - 特点: 海量音效库

3. **Mixkit**
   - 网址: https://mixkit.co/free-sound-effects/
   - 授权: Mixkit License（免费商用）
   - 特点: 高质量音效

4. **ZapSplat**
   - 网址: https://www.zapsplat.com/
   - 授权: 免费（需注册）
   - 特点: 专业音效库

## 🎯 推荐音频搜索关键词

在音频网站搜索时，可以使用以下关键词：

- **篝火声**: "campfire", "fire crackling", "fireplace", "bonfire"
- **雨声**: "rain", "rainfall", "gentle rain", "rain ambience"
- **翻书声**: "page turn", "book pages", "paper rustle", "flipping pages"
- **白噪音**: "white noise", "ocean waves", "ambient noise", "nature sounds"

## ⚠️ 注意事项

### 音频格式要求
- 推荐格式：MP3（兼容性最好）
- 备选格式：OGG, WAV
- 避免格式：FLAC（文件太大）

### 音频质量要求
- 比特率：128kbps 以上
- 采样率：44.1kHz 或 48kHz
- 声道：单声道或立体声
- 文件大小：建议 < 2MB

### 循环播放优化
- 确保音频首尾无缝衔接
- 避免突然的开始或结束
- 音量保持一致

### 浏览器兼容性
- 所有现代浏览器都支持 MP3
- 移动端浏览器可能有自动播放限制
- 需要用户交互后才能播放（已在代码中处理）

## 🔧 技术实现

### 音频加载
```typescript
// 创建音频元素
const audio = new Audio(AUDIO_URLS[sound]);
audio.loop = true;  // 循环播放
audio.volume = volumes[sound] / 100;  // 设置音量
```

### 音频控制
```typescript
// 播放
audio.play().catch(error => {
  console.error('播放失败:', error);
});

// 暂停
audio.pause();
audio.currentTime = 0;  // 重置到开始

// 音量控制
audio.volume = volume / 100;  // 0-1 之间
```

### 错误处理
应用已实现完善的错误处理：
- 音频加载失败会在控制台显示错误
- 不会影响其他音效的播放
- 用户可以继续使用其他功能

## 📊 性能优化

### 当前优化措施
1. **延迟加载**: 只在需要时加载音频
2. **循环播放**: 避免重复加载
3. **音量控制**: 实时调节，无需重新加载
4. **内存管理**: 组件卸载时清理音频资源

### 未来优化建议
1. **预加载**: 在用户点击"点燃篝火"时预加载音频
2. **缓存**: 使用 Service Worker 缓存音频文件
3. **压缩**: 使用更高效的音频编码
4. **CDN**: 使用 CDN 加速音频加载

## 🎁 音频授权说明

### Pixabay License (CC0)
- ✅ 免费使用
- ✅ 商业用途
- ✅ 无需署名
- ✅ 可以修改
- ❌ 不能转售音频本身

### 使用建议
虽然 CC0 授权不要求署名，但建议在应用的"关于"页面中感谢音频来源：

```
音频资源来自 Pixabay
https://pixabay.com/
```

## 📞 技术支持

### 常见问题

**Q: 为什么听不到声音？**
A: 
1. 检查浏览器是否允许自动播放
2. 确保音量滑块不是0%
3. 检查设备音量是否打开
4. 尝试点击"点燃篝火"后再调节音量

**Q: 音频加载很慢？**
A: 
1. 检查网络连接
2. 考虑使用本地音频文件
3. 使用更小的音频文件

**Q: 音频循环有间隙？**
A: 
1. 确保音频文件首尾无缝
2. 使用专业音频编辑软件处理
3. 选择专门为循环设计的音频

**Q: 移动端无法自动播放？**
A: 
这是浏览器的安全限制，需要用户交互后才能播放。应用已经处理了这个问题，用户点击"点燃篝火"后即可播放。

## 🔗 相关资源

- [Pixabay Audio](https://pixabay.com/music/)
- [Freesound](https://freesound.org/)
- [MDN Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [HTML5 Audio Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)

---

**更新日期**: 2025年12月24日

**音频状态**: ✅ 已配置真实音频资源，可立即使用

---

*"让温暖的声音陪伴每一个专注的时刻"* 🎵
