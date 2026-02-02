# 건설사업관리시스템 (PMIS)

WBS 기반 EVM 통합 건설 프로젝트 관리 플랫폼

## 🎯 주요 기능

### 1. 현장관리
- 현장 등록 및 관리
- 사진 업로드 (자동 리사이징)
- 계획/실제 공정률 추적
- 공정 지연 상태 자동 판정

### 2. WBS (작업분류체계)
- 계층적 작업 구조 관리
- 예산 및 진행률 추적
- 공종별 상세 관리

### 3. 작업일보
- 일일 작업 내용 기록
- 투입 인력 관리
- 날짜별 이력 조회

### 4. EVM 분석
- BAC, PV, EV 자동 계산
- SPI, CPI 성과 지수
- 실시간 프로젝트 상태 모니터링

### 5. 안전관리
- 위험성평가 (빈도 × 강도)
- 위험도 자동 등급 판정
- 감소대책 관리

## 🚀 시작하기

### 로그인 정보
```
이메일: admin@pmis.com
비밀번호: 1234
```

### 로컬 실행
```bash
# 프로젝트 디렉토리에서
python -m http.server 8000
# 또는
npx serve
```

브라우저에서 `http://localhost:8000` 접속

## 📁 프로젝트 구조

```
pmis-project/
├── index.html              # 메인 HTML
├── css/
│   ├── reset.css          # CSS 리셋
│   ├── variables.css      # CSS 변수
│   ├── components.css     # 컴포넌트 스타일
│   ├── layout.css         # 레이아웃
│   └── modal.css          # 모달 스타일
├── js/
│   ├── utils/
│   │   ├── storage.js     # 로컬스토리지 관리
│   │   └── helpers.js     # 유틸리티 함수
│   ├── components/
│   │   └── modal.js       # 모달 컴포넌트
│   ├── modules/
│   │   ├── auth.js        # 인증
│   │   ├── dashboard.js   # 대시보드
│   │   ├── sites.js       # 현장관리
│   │   ├── wbs.js         # WBS
│   │   ├── daily.js       # 작업일보
│   │   ├── evm.js         # EVM 분석
│   │   └── safety.js      # 안전관리
│   └── app.js             # 메인 앱
└── assets/
    └── images/            # 이미지 리소스
```

## 🛠 기술 스택

- **Frontend**: Vanilla JavaScript (ES6+)
- **Storage**: LocalStorage API
- **Styling**: CSS3 (Grid, Flexbox, CSS Variables)
- **Architecture**: 모듈화 설계

## 📊 데이터 구조

### 현장 (Sites)
```javascript
{
  id, name, startDate, endDate,
  plannedProgress, actualProgress,
  importantNotes, photos,
  ownerId, createdAt
}
```

### WBS
```javascript
{
  id, code, name,
  budget, progress,
  createdAt
}
```

### 작업일보 (Daily)
```javascript
{
  id, date, work, labor,
  createdAt
}
```

### 위험성평가 (Risk)
```javascript
{
  id, work, type,
  frequency, severity,
  measures, createdAt
}
```

## 🎨 디자인 특징

- **Glass Morphism**: 반투명 유리 효과
- **Dark Theme**: 다크 그라데이션 배경
- **Responsive**: 모바일/태블릿/데스크탑 대응
- **Animations**: 부드러운 페이드 인/아웃

## 📱 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 라이선스

MIT License

## 👤 개발자

PMIS Development Team

---

**GitHub Pages**: [프로젝트 URL]
