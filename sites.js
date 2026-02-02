// Sites Module
const Sites = {
    currentPhotos: [],

    init() {
        const addBtn = document.getElementById('addSiteBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.openModal());
        }
    },

    load() {
        const sites = Storage.get('sites');
        const container = document.getElementById('sitesList');
        if (!container) return;

        if (sites.length === 0) {
            container.innerHTML = '<div class="glass-dark section-content text-center text-muted">등록된 현장이 없습니다</div>';
            return;
        }

        container.innerHTML = sites.map(site => Dashboard.renderSiteList([site])).join('');
    },

    openModal() {
        this.currentPhotos = [];

        const content = `
            <form id="siteForm">
                <div class="form-section">
                    <div class="form-section-title">📋 기본 정보</div>
                    <div class="form-group">
                        <label>공사명 *</label>
                        <input type="text" id="siteName" required>
                    </div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>시작일 *</label>
                            <input type="date" id="siteStartDate" required>
                        </div>
                        <div class="form-group">
                            <label>종료일 *</label>
                            <input type="date" id="siteEndDate" required>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <div class="form-section-title">📊 공정률</div>
                    <div class="grid-2">
                        <div class="form-group">
                            <label>계획 공정률 (%)</label>
                            <input type="number" id="plannedProgress" min="0" max="100" value="0">
                        </div>
                        <div class="form-group">
                            <label>실제 공정률 (%)</label>
                            <input type="number" id="actualProgress" min="0" max="100" value="0">
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <div class="form-section-title">📝 관리 항목</div>
                    <div class="form-group">
                        <label>중요 보고사항</label>
                        <textarea id="importantNotes"></textarea>
                    </div>
                </div>

                <div class="form-section">
                    <div class="form-section-title">📷 사진</div>
                    <button type="button" class="btn btn-success" onclick="Sites.addPhoto()">
                        + 사진 추가
                    </button>
                    <div id="photoContainer" class="photo-grid"></div>
                </div>
            </form>
        `;

        Modal.createModal('siteModal', '현장 등록', content);
        Modal.open('siteModal');

        // 폼 제출 이벤트
        setTimeout(() => {
            const form = document.getElementById('siteForm');
            if (form) {
                form.addEventListener('submit', (e) => this.save(e));
            }
        }, 100);
    },

    async addPhoto() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const resized = await Helpers.resizeImage(file);
                    this.currentPhotos.push({ data: resized });
                    this.renderPhotos();
                } catch (error) {
                    alert('이미지 처리 중 오류가 발생했습니다.');
                }
            }
        };

        input.click();
    },

    renderPhotos() {
        const container = document.getElementById('photoContainer');
        if (!container) return;

        container.innerHTML = this.currentPhotos.map((photo, idx) => `
            <div class="photo-item">
                <img src="${photo.data}" alt="현장사진">
                <button type="button" class="photo-delete" onclick="Sites.deletePhoto(${idx})">
                    &times;
                </button>
            </div>
        `).join('');
    },

    deletePhoto(idx) {
        this.currentPhotos.splice(idx, 1);
        this.renderPhotos();
    },

    save(e) {
        e.preventDefault();

        const sites = Storage.get('sites');
        const user = Auth.currentUser;

        const site = {
            id: 'site-' + Date.now(),
            name: document.getElementById('siteName').value,
            startDate: document.getElementById('siteStartDate').value,
            endDate: document.getElementById('siteEndDate').value,
            plannedProgress: parseInt(document.getElementById('plannedProgress').value) || 0,
            actualProgress: parseInt(document.getElementById('actualProgress').value) || 0,
            importantNotes: document.getElementById('importantNotes').value,
            photos: this.currentPhotos,
            ownerId: user.id,
            createdAt: new Date().toISOString()
        };

        sites.push(site);
        Storage.set('sites', sites);

        Modal.close('siteModal');
        this.load();
        Dashboard.load();
        
        alert('현장이 저장되었습니다!');
    }
};

// Export
window.Sites = Sites;
