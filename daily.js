// Daily Report Module
const Daily = {
    init() {
        const addBtn = document.getElementById('addDailyBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.openModal());
        }
    },

    load() {
        const dailyList = Storage.get('daily');
        const container = document.getElementById('dailyList');
        if (!container) return;

        if (dailyList.length === 0) {
            container.innerHTML = '<div class="text-center text-muted">작성된 일보가 없습니다</div>';
            return;
        }

        // 날짜 순 정렬 (최신순)
        const sorted = dailyList.sort((a, b) => new Date(b.date) - new Date(a.date));

        container.innerHTML = sorted.map(daily => `
            <div class="site-card">
                <div style="margin-bottom: 12px;">
                    <strong style="font-size: 1.1rem;">${daily.date}</strong>
                    <span class="badge badge-safe" style="margin-left: 12px;">
                        투입: ${daily.labor}명
                    </span>
                </div>
                <p style="line-height: 1.6;">${daily.work}</p>
            </div>
        `).join('');
    },

    openModal() {
        const today = new Date().toISOString().split('T')[0];

        const content = `
            <form id="dailyForm">
                <div class="form-group">
                    <label>작성일 *</label>
                    <input type="date" id="dailyDate" value="${today}" required>
                </div>
                <div class="form-group">
                    <label>작업 내용 *</label>
                    <textarea id="dailyWork" required></textarea>
                </div>
                <div class="form-group">
                    <label>투입 인력 (명)</label>
                    <input type="number" id="dailyLabor" value="0" min="0">
                </div>
            </form>
        `;

        Modal.createModal('dailyModal', '작업일보 작성', content);
        Modal.open('dailyModal');

        setTimeout(() => {
            const form = document.getElementById('dailyForm');
            if (form) {
                form.addEventListener('submit', (e) => this.save(e));
            }
        }, 100);
    },

    save(e) {
        e.preventDefault();

        const dailyList = Storage.get('daily');

        const daily = {
            id: 'daily-' + Date.now(),
            date: document.getElementById('dailyDate').value,
            work: document.getElementById('dailyWork').value,
            labor: parseInt(document.getElementById('dailyLabor').value) || 0,
            createdAt: new Date().toISOString()
        };

        dailyList.push(daily);
        Storage.set('daily', dailyList);

        Modal.close('dailyModal');
        this.load();

        alert('작업일보가 저장되었습니다!');
    }
};

// Export
window.Daily = Daily;
