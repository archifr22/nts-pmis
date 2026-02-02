// Authentication Module
const Auth = {
    currentUser: null,

    init() {
        // 관리자 계정 초기화
        const users = Storage.get('users');
        if (!users.find(u => u.email === 'admin@pmis.com')) {
            users.push({
                id: 'admin-001',
                email: 'admin@pmis.com',
                password: '1234',
                name: '시스템 관리자',
                role: 'admin',
                approved: true,
                createdAt: new Date().toISOString()
            });
            Storage.set('users', users);
        }

        // 로그인 폼 이벤트
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // 로그아웃 버튼 이벤트
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // 세션 복원
        this.restoreSession();
    },

    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        const users = Storage.get('users');
        const user = users.find(u => 
            u.email === email && 
            u.password === password && 
            u.approved
        );

        if (!user) {
            Helpers.showMessage('loginMessage', '이메일 또는 비밀번호가 올바르지 않습니다.', 'error');
            return;
        }

        this.currentUser = user;
        Storage.set('currentUser', user);
        this.showApp();
    },

    logout() {
        if (confirm('로그아웃 하시겠습니까?')) {
            this.currentUser = null;
            Storage.remove('currentUser');
            Helpers.hide('appScreen');
            Helpers.show('loginScreen');
            
            // 폼 리셋
            document.getElementById('loginForm').reset();
        }
    },

    showApp() {
        Helpers.hide('loginScreen');
        Helpers.show('appScreen');

        // 사용자 정보 표시
        const userInfo = document.getElementById('userInfo');
        if (userInfo && this.currentUser) {
            const roles = {
                'admin': '관리자',
                'manager': '책임자',
                'worker': '실무자'
            };
            userInfo.innerHTML = `
                <span class="badge role-${this.currentUser.role}">
                    ${roles[this.currentUser.role]}
                </span>
                ${this.currentUser.name}
            `;
        }

        // 대시보드 로드
        if (window.Dashboard) {
            Dashboard.load();
        }
    },

    restoreSession() {
        const saved = Storage.getObject('currentUser');
        if (saved && saved.id) {
            const users = Storage.get('users');
            const user = users.find(u => u.id === saved.id && u.approved);
            if (user) {
                this.currentUser = user;
                this.showApp();
            }
        }
    }
};

// Export
window.Auth = Auth;
