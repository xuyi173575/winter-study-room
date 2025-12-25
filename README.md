# 欢迎使用你的秒哒应用代码包
秒哒应用链接
    URL:https://www.miaoda.cn/projects/app-8ggqjue5a0w1

# 冬日书房 (Winter Study Room)

## 介绍

**冬日书房** 是一个温暖治愈的互动网页应用，专为需要专注氛围的时刻设计。

### ✨ 核心功能

- 🔥 **点燃篝火仪式** - 充满仪式感的开场体验
- 🎵 **环境音控制** - 4种可独立调节的环境音（篝火、雨声、翻书、白噪音）✅ **已配置真实音频**
- ⏱️ **专注定时器** - 番茄钟功能，帮助你保持专注
- 🎨 **互动彩蛋** - 点击书本、咖啡杯查看名言，点击螃蟹看它横着走
- 🍓 **个性化祝福** - 草莓书中藏着特别的圣诞祝福
- 💾 **偏好保存** - 自动保存你的音量设置

### 🎯 使用场景

- 修图时需要专注的背景音
- 阅读时的氛围营造
- 冥想放松
- 工作学习时的白噪音
- 助眠

### 🎨 设计特色

- 手绘插画风格，温暖文艺
- 优雅的衬线字体（Cormorant Garamond、Crimson Pro）
- 米白色到奶油色的温暖配色
- 精心设计的动画效果（雪花、火焰、蒸汽）

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式方案**: Tailwind CSS + shadcn/ui
- **状态管理**: React Hooks
- **音频处理**: Web Audio API
- **数据持久化**: localStorage

## 目录结构

```
├── src
│   ├── pages
│   │   └── WinterStudyRoom.tsx      # 主页面
│   ├── components
│   │   └── winter-study             # 场景组件
│   │       ├── Window.tsx           # 窗户（雪花动画）
│   │       ├── Bookshelf.tsx        # 书架（名言彩蛋）
│   │       ├── Fireplace.tsx        # 壁炉（火焰动画）
│   │       ├── CoffeeCup.tsx        # 咖啡杯（蒸汽动画）
│   │       ├── Crab.tsx             # 螃蟹（走动动画）
│   │       └── ControlPanel.tsx     # 控制面板
│   ├── hooks
│   │   └── useAudioManager.ts       # 音频管理Hook
│   ├── index.css                    # 全局样式和动画
│   └── routes.tsx                   # 路由配置
└── public                           # 静态资源
```

## 本地开发

### 环境要求

```bash
Node.js ≥ 20
npm ≥ 10
```

### 安装步骤

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 在浏览器中打开
# 访问 http://localhost:5173
```

### 构建生产版本

```bash
npm run build
```

## 使用指南

### 基本操作

1. **点燃篝火** - 点击中央的"点燃篝火"按钮开始体验
2. **调节音量** - 使用底部控制面板的滑块调节各个音效的音量
3. **设置定时器** - 在控制面板右侧设置专注时长（1-180分钟）
4. **探索彩蛋** - 点击场景中的各个元素发现惊喜

### 互动元素

- 📚 **书本** - 点击显示随机名言
- 🍓 **草莓书**（第4本红色书）- 点击查看圣诞祝福
- 🪟 **窗户** - 点击增加雨声音量20%
- ☕ **咖啡杯** - 点击显示随机名言
- 🦀 **螃蟹** - 点击看它横着走

### 音频文件配置

✅ **已配置真实音频资源！** 应用现在使用来自 Pixabay 的免费音频（CC0授权）：

- 🔥 篝火声 - 柴火燃烧的噼啪声
- 🌧️ 雨声 - 温和的雨声
- 📖 翻书声 - 纸张翻动的声音
- 🌊 白噪音 - 温和的海浪声

**音频来源**: Pixabay Audio Library (CC0 / Public Domain)  
**详细说明**: 查看 [AUDIO_RESOURCES.md](./AUDIO_RESOURCES.md)

如需使用自定义音频文件：

1. 准备4个音频文件（MP3格式）
2. 将音频文件放置在 `public/audio/` 目录
3. 修改 `src/hooks/useAudioManager.ts` 中的 `AUDIO_URLS` 配置

详细步骤请参考 [AUDIO_RESOURCES.md](./AUDIO_RESOURCES.md)

## 部署

### 静态网站部署

构建后的文件在 `dist` 目录，可以部署到任何静态网站托管服务：

- Vercel
- Netlify
- GitHub Pages
- 云服务器

### 部署命令

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

## 浏览器兼容性

- Chrome/Edge ≥ 90
- Firefox ≥ 88
- Safari ≥ 14

## 许可证

© 2025 冬日书房

---

**献给所有需要温暖和专注的时刻** ❄️🔥📚
