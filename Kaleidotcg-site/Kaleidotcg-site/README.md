# Kaleido TCG 卡店官网

这是一个现代化的TCG卡店官网，包含首页、活动安排、相册和联系方式等页面。

## 功能特点

- 🎨 现代化、响应式设计
- 📱 移动端友好
- 🖼️ 图片预览功能
- ⚡ 平滑滚动和动画效果
- 🎯 易于维护和更新

## 文件结构

```
Kaleido-tcg-site/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript功能
├── images/             # 图片文件夹（需要创建）
│   ├── gallery-1.jpg
│   ├── gallery-2.jpg
│   └── ...
└── README.md           # 说明文档
```

## 使用方法

### 1. 替换Logo
在 `index.html` 中找到 `.logo-placeholder` 部分，您可以：
- 替换为实际的logo图片
- 或保持当前的文字logo样式

### 2. 更新店铺信息
在 `index.html` 的 `#contact` 部分更新：
- 店铺地址
- 联系电话
- 邮箱地址
- 社交媒体账号
- 营业时间

### 3. 添加店铺照片
1. 创建 `images` 文件夹
2. 将照片命名为 `gallery-1.jpg`, `gallery-2.jpg` 等
3. 放入 `images` 文件夹即可自动显示

或者直接在 `index.html` 中修改图片路径：
```html
<img src="images/your-photo.jpg" alt="描述">
```

### 4. 更新活动安排
在 `index.html` 的 `#events` 部分修改每周活动信息。

## 本地运行

直接在浏览器中打开 `index.html` 文件即可。

## 自定义样式

所有样式都在 `styles.css` 中，主要颜色变量在文件顶部：
- `--primary-color`: 主色调
- `--secondary-color`: 次要颜色
- `--accent`: 强调色

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 注意事项

- 确保所有图片路径正确
- 如果图片不存在，会显示占位符
- 建议图片尺寸为 1200x900px 或类似比例以获得最佳效果

