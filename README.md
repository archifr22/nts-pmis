# 이미지 에셋 가이드

## 📁 포함된 이미지

### 1. favicon.svg
- **용도**: 브라우저 탭 아이콘
- **크기**: 32x32px
- **형식**: SVG

### 2. logo.svg
- **용도**: 로그인 화면 로고, 헤더 로고
- **크기**: 200x200px
- **형식**: SVG

### 3. placeholder.svg
- **용도**: 사진 업로드 전 기본 이미지
- **크기**: 800x600px
- **형식**: SVG

## 🎨 커스터마이징

### favicon 변경
```html
<!-- index.html에 추가 -->
<link rel="icon" type="image/svg+xml" href="assets/images/favicon.svg">
```

### 로고 추가
```html
<!-- 로그인 화면에 로고 추가 -->
<div class="logo-section">
    <img src="assets/images/logo.svg" alt="PMIS 로고" style="width: 120px; margin-bottom: 20px;">
    <h1 class="logo-title">🏗️ PMIS</h1>
</div>
```

## 📷 사진 업로드 기능

현재 시스템은 **자동 이미지 리사이징**을 지원합니다:

- **최대 너비**: 800px
- **압축 품질**: JPEG 0.7
- **저장 방식**: Base64 → LocalStorage

### 용량 최적화
원본 2-5MB 사진 → 50-100KB로 자동 압축

## 🖼️ 추가 이미지 가이드

### 권장 이미지 형식
- **로고/아이콘**: SVG (확장 가능)
- **사진**: JPEG (파일 크기 작음)
- **투명 배경**: PNG

### 파일명 규칙
```
logo-company.svg          # 회사 로고
icon-dashboard.svg        # 대시보드 아이콘
photo-site-001.jpg        # 현장 사진
```

### 이미지 추가 방법

1. **assets/images/** 폴더에 이미지 추가
2. HTML/CSS에서 참조:
```html
<img src="assets/images/your-image.jpg" alt="설명">
```
```css
background-image: url('../assets/images/your-image.jpg');
```

## 🎯 성능 최적화 팁

### 1. SVG 사용 (아이콘, 로고)
✅ 확장 가능  
✅ 파일 크기 작음  
✅ CSS로 색상 변경 가능

### 2. 이미지 최적화 도구
- [TinyPNG](https://tinypng.com/) - PNG/JPEG 압축
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG 최적화
- [Squoosh](https://squoosh.app/) - 이미지 압축

### 3. Lazy Loading
```html
<img src="image.jpg" loading="lazy" alt="설명">
```

## 📱 반응형 이미지

```html
<!-- srcset으로 해상도별 이미지 제공 -->
<img 
  src="assets/images/logo.svg" 
  srcset="assets/images/logo.svg 1x,
          assets/images/logo@2x.svg 2x"
  alt="로고">
```

## 🎨 다크모드 이미지

CSS 필터로 이미지를 다크모드에 맞게 조정:
```css
@media (prefers-color-scheme: dark) {
  img {
    filter: brightness(0.8) contrast(1.2);
  }
}
```

## 🔍 SEO 최적화

항상 `alt` 속성 추가:
```html
<img src="assets/images/logo.svg" alt="PMIS 건설사업관리시스템 로고">
```

---

이미지 관련 문제가 있으면 Issues에 등록해주세요!
