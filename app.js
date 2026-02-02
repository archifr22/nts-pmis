// Main App Initialization
(function() {
    'use strict';

    // 앱 초기화
    function initApp() {
        console.log('PMIS 애플리케이션 시작...');

        // 모듈 초기화
        Auth.init();
        Sites.init();
        WBS.init();
        Daily.init();
        Safety.init();

        // 탭 전환 이벤트
        setupTabNavigation();

        console.log('PMIS 애플리케이션 준비 완료');
    }

    // 탭 네비게이션 설정
    function setupTabNavigation() {
        const tabs = document.querySelectorAll('.tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                if (!tabName) return;

                // 탭 전환
                Helpers.switchTab(tabName);

                // 각 모듈 로드
                loadTabContent(tabName);
            });
        });
    }

    // 탭 컨텐츠 로드
    function loadTabContent(tabName) {
        switch(tabName) {
            case 'dashboard':
                Dashboard.load();
                break;
            case 'sites':
                Sites.load();
                break;
            case 'wbs':
                WBS.load();
                break;
            case 'daily':
                Daily.load();
                break;
            case 'evm':
                EVM.load();
                break;
            case 'safety':
                Safety.load();
                break;
        }
    }

    // DOM 로드 완료 시 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }

    // 전역 에러 핸들러
    window.addEventListener('error', function(e) {
        console.error('앱 오류:', e.error);
    });

    // 언로드 시 정리
    window.addEventListener('beforeunload', function() {
        console.log('PMIS 애플리케이션 종료');
    });

})();
