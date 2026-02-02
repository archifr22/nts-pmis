# 🚀 빠른 시작 가이드

## 📦 다운로드 & 압축 해제

```bash
# 압축 해제
tar -xzf pmis-project.tar.gz
cd pmis-project
```

## 🏃 즉시 실행하기

### 방법 1: Python (권장)
```bash
python -m http.server 8000
# 또는 Python 3
python3 -m http.server 8000
```

### 방법 2: Node.js
```bash
npx serve
```

### 방법 3: VS Code Live Server
1. VS Code에서 프로젝트 폴더 열기
2. `index.html` 우클릭
3. "Open with Live Server" 클릭

## 🌐 브라우저 접속

```
http://localhost:8000
```

## 🔑 로그인

```
이메일: admin@pmis.com
비밀번호: 1234
```

## 📊 샘플 데이터 로드 (선택사항)

1. 브라우저 개발자 도구 열기 (F12)
2. Console 탭으로 이동
3. 다음 명령어 실행:

```javascript
SampleData.loadToStorage()
```

샘플 데이터 포함 내용:
- ✅ 현장 2개 (아파트, 오피스텔)
- ✅ WBS 3개 (토공사, 골조공사, 마감공사)
- ✅ 작업일보 2개
- ✅ 위험성평가 2개

## 🎯 기능 둘러보기

### 1. 대시보드
- 평균 공정률 차트 확인
- 현장 통계 보기
- 현장 목록 카드 확인

### 2. 현장관리
- **+ 현장 추가** 클릭
- 공사명, 일정 입력
- 사진 추가 (자동 리사이징)
- 저장

### 3. WBS
- **+ WBS 추가** 클릭
- WBS 코드, 작업명 입력
- 예산, 진행률 입력

### 4. 작업일보
- **+ 일보 작성** 클릭
- 작업 내용 입력
- 투입 인력 기록

### 5. EVM 분석
- 자동 계산된 지표 확인
- BAC, PV, EV, SPI 모니터링

### 6. 안전관리
- **+ 위험성평가** 클릭
- 위험 유형, 빈도/강도 입력
- 위험도 자동 계산
- 감소대책 작성

## 🛠 개발자 도구

브라우저 Console에서 사용 가능한 명령어:

```javascript
// 샘플 데이터 로드
SampleData.loadToStorage()

// 모든 데이터 삭제
SampleData.clearAll()

// 데이터 조회
Storage.get('sites')      // 현장 목록
Storage.get('wbs')         // WBS 목록
Storage.get('daily')       // 작업일보 목록
Storage.get('risks')       // 위험성평가 목록

// 현재 사용자 정보
Helpers.getCurrentUser()
```

## 📱 모바일 테스트

1. 로컬 서버 실행
2. 같은 WiFi의 모바일에서 접속:
```
http://[컴퓨터-IP-주소]:8000
```

예: `http://192.168.0.10:8000`

## 🎨 간단한 커스터마이징

### 색상 변경
`css/variables.css` 파일 수정:
```css
:root {
    --color-primary: #667eea;  /* 원하는 색상 코드 */
}
```

### 로고 변경
`assets/images/logo.svg` 파일 교체

## 🐛 문제 해결

### 포트가 이미 사용 중
```bash
# 다른 포트 사용
python -m http.server 8080
```

### 페이지가 로드되지 않음
1. 브라우저 캐시 삭제 (Ctrl + F5)
2. 콘솔 에러 메시지 확인 (F12)
3. 파일 경로 확인

### 사진이 업로드되지 않음
- 브라우저 용량 제한 (LocalStorage 5-10MB)
- 저장 공간 확인: `SampleData.clearAll()`

## 📚 다음 단계

### GitHub Pages 배포
`DEPLOY.md` 파일 참조

### 기능 추가 개발
`README.md`의 "추가 기능 개발" 섹션 참조

### 커스터마이징
`assets/images/README.md` 참조

## 💡 팁

### 데이터 백업
```javascript
// Console에서 실행
const backup = {
    sites: Storage.get('sites'),
    wbs: Storage.get('wbs'),
    daily: Storage.get('daily'),
    risks: Storage.get('risks')
};
console.log(JSON.stringify(backup));
// 출력된 JSON 복사하여 저장
```

### 데이터 복원
```javascript
const backup = { /* 백업한 JSON 붙여넣기 */ };
Storage.set('sites', backup.sites);
Storage.set('wbs', backup.wbs);
Storage.set('daily', backup.daily);
Storage.set('risks', backup.risks);
```

## 🎉 완료!

이제 PMIS를 사용할 준비가 되었습니다!

문제가 있으면 Issues에 등록하거나 DEPLOY.md를 참조하세요.

---

**Happy Building! 🏗️**
