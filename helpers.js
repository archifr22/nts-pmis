// Helper Utilities
const Helpers = {
    // DOM 조작
    hide(id) {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    },

    show(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hidden');
    },

    showMessage(elementId, message, type = 'success') {
        const el = document.getElementById(elementId);
        if (el) {
            el.textContent = message;
            el.className = `message message-${type}`;
            setTimeout(() => {
                el.textContent = '';
                el.className = 'message';
            }, 5000);
        }
    },

    // 날짜 포맷
    formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('ko-KR');
    },

    // 숫자 포맷 (천단위 콤마)
    formatNumber(num) {
        return num.toLocaleString('ko-KR');
    },

    // 이미지 리사이징
    resizeImage(file, maxWidth = 800, quality = 0.7) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                const img = new Image();
                
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    resolve(canvas.toDataURL('image/jpeg', quality));
                };

                img.onerror = reject;
                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    // 공정 상태 계산
    calculateStatus(planned, actual) {
        if (planned === 0) return 'safe';
        const ratio = (actual / planned) * 100;
        if (ratio >= 100) return 'safe';
        if (ratio >= 95) return 'caution';
        if (ratio >= 90) return 'warning';
        return 'critical';
    },

    // 상태 텍스트
    getStatusText(status) {
        const texts = {
            safe: '안전',
            caution: '주의',
            warning: '경고',
            critical: '심각'
        };
        return texts[status] || '알 수 없음';
    },

    // 현재 사용자 가져오기
    getCurrentUser() {
        return Storage.getObject('currentUser');
    },

    // 탭 전환
    switchTab(tabName) {
        // 모든 탭 비활성화
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // 모든 컨텐츠 숨김
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // 선택된 탭 활성화
        const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // 선택된 컨텐츠 표시
        const contentId = `content${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`;
        const content = document.getElementById(contentId);
        if (content) {
            content.classList.add('active');
        }
    }
};

// Export
window.Helpers = Helpers;
