// WBS Module
const WBS = {
    init() {
        const addBtn = document.getElementById('addWBSBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.openModal());
        }
    },

    load() {
        const wbsList = Storage.get('wbs');
        const container = document.getElementById('wbsList');
        if (!container) return;

        if (wbsList.length === 0) {
            container.innerHTML = '<div class="text-center text-muted">등록된 WBS가 없습니다</div>';
            return;
        }

        container.innerHTML = wbsList.map(wbs => `
            <div class="site-card">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="font-size: 1.1rem;">${wbs.code}</strong>
                        <span style="margin-left: 12px;">${wbs.name}</span>
                        <div class="text-muted" style="margin-top: 8px; font-size: 0.875rem;">
                            예산: ${Helpers.formatNumber(wbs.budget)}백만원 | 진행률: ${wbs.progress}%
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    openModal() {
        const content = `
            <form id="wbsForm">
                <div class="form-group">
                    <label>WBS 코드 *</label>
                    <input type="text" id="wbsCode" required placeholder="예: 1.1.1">
                </div>
                <div class="form-group">
                    <label>작업명 *</label>
                    <input type="text" id="wbsName" required>
                </div>
                <div class="grid-2">
                    <div class="form-group">
                        <label>예산 (백만원)</label>
                        <input type="number" id="wbsBudget" value="0" min="0">
                    </div>
                    <div class="form-group">
                        <label>진행률 (%)</label>
                        <input type="number" id="wbsProgress" value="0" min="0" max="100">
                    </div>
                </div>
            </form>
        `;

        Modal.createModal('wbsModal', 'WBS 추가', content);
        Modal.open('wbsModal');

        setTimeout(() => {
            const form = document.getElementById('wbsForm');
            if (form) {
                form.addEventListener('submit', (e) => this.save(e));
            }
        }, 100);
    },

    save(e) {
        e.preventDefault();

        const wbsList = Storage.get('wbs');

        const wbs = {
            id: 'wbs-' + Date.now(),
            code: document.getElementById('wbsCode').value,
            name: document.getElementById('wbsName').value,
            budget: parseInt(document.getElementById('wbsBudget').value) || 0,
            progress: parseInt(document.getElementById('wbsProgress').value) || 0,
            createdAt: new Date().toISOString()
        };

        wbsList.push(wbs);
        Storage.set('wbs', wbsList);

        Modal.close('wbsModal');
        this.load();
        
        // EVM 업데이트
        if (window.EVM) {
            EVM.load();
        }

        alert('WBS가 저장되었습니다!');
    }
};

// Export
window.WBS = WBS;
