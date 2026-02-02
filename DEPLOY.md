# GitHub Pages 배포 가이드

## 📦 배포 방법

### 1. GitHub 저장소 생성

1. GitHub에서 새 저장소 생성
2. 저장소 이름: `pmis` (또는 원하는 이름)
3. Public으로 설정

### 2. 프로젝트 업로드

```bash
# 프로젝트 디렉토리로 이동
cd pmis-project

# Git 초기화
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: PMIS 프로젝트"

# GitHub 저장소 연결
git remote add origin https://github.com/[사용자명]/pmis.git

# 푸시
git branch -M main
git push -u origin main
```

### 3. GitHub Pages 활성화

1. GitHub 저장소 페이지 접속
2. **Settings** 클릭
3. 왼쪽 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
5. **Save** 클릭

### 4. 배포 완료 ✅

몇 분 후 다음 URL에서 접속 가능:
```
https://[사용자명].github.io/pmis/
```

## 🔧 로컬 테스트

### Python 사용
```bash
cd pmis-project
python -m http.server 8000
```

### Node.js 사용
```bash
cd pmis-project
npx serve
```

### Live Server (VS Code)
1. Live Server 확장 설치
2. `index.html` 우클릭
3. "Open with Live Server" 클릭

## 📱 모바일 테스트

1. 로컬 서버 실행
2. 같은 WiFi 네트워크의 모바일 기기에서 접속:
```
http://[컴퓨터-IP]:8000
```

## 🎨 커스터마이징

### 색상 변경
`css/variables.css` 파일에서 색상 변수 수정:
```css
:root {
    --color-primary: #667eea;  /* 원하는 색상으로 변경 */
    --color-success: #56ab2f;
    --color-danger: #eb3349;
}
```

### 로고 추가
`index.html`의 로고 섹션 수정:
```html
<div class="logo-section">
    <img src="assets/images/logo.png" alt="로고">
    <h1 class="logo-title">🏗️ PMIS</h1>
</div>
```

## 🐛 문제 해결

### 페이지가 표시되지 않는 경우
1. GitHub Pages 설정 확인
2. 브라우저 캐시 삭제 (Ctrl+F5)
3. 몇 분 후 재시도

### JavaScript 오류
1. 브라우저 콘솔 확인 (F12)
2. 파일 경로 확인
3. CORS 문제인 경우 로컬 서버 사용

### 모바일에서 레이아웃 깨짐
1. 반응형 CSS 확인
2. 뷰포트 메타 태그 확인
3. 브라우저 호환성 확인

## 📊 성능 최적화

### 이미지 최적화
- 자동 리사이징 활성화 (800px)
- JPEG 품질 0.7로 압축

### 캐싱
브라우저 캐싱 활용을 위해 `.htaccess` 추가 (선택사항):
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

## 🔒 보안

### localStorage 주의사항
- 민감한 정보 저장 금지
- 프로덕션 환경에서는 서버 DB 사용 권장
- 비밀번호 해시화 고려

## 📈 업데이트 방법

```bash
# 파일 수정 후
git add .
git commit -m "업데이트 내용"
git push

# GitHub Pages가 자동으로 재배포 (1-2분 소요)
```

## 🎯 추가 기능 개발

### 새 모듈 추가
1. `js/modules/` 에 새 파일 생성
2. `index.html`에 스크립트 추가
3. `app.js`에서 초기화

예시:
```javascript
// js/modules/reports.js
const Reports = {
    init() {
        // 초기화 코드
    },
    load() {
        // 데이터 로드
    }
};
window.Reports = Reports;
```

## 📞 지원

문제가 발생하면 GitHub Issues에 등록해주세요.

---

**Happy Coding! 🚀**
