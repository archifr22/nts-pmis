// Safety Module
const Safety = {
    init() {
        const addBtn = document.getElementById('addRiskBtn');
        if (addBtn) {
            addBtn.addEventListener('click', () => this.openModal());
        }
    },

    load() {
        const riskList = Storage.get('risks');
        const container = document.getElementById('riskList');
        if (!container) return;

        if (riskList.length === 0) {
            container.innerHTML = '<div class="text-center text-muted">위험성평가가 없습니다</div>';
            return;
        }

        container.innerHTML = riskList.map(risk => {
            const score = risk.frequency * risk.severity;
            let level = '하';
            let levelClass = 'badge-safe';

            if (score >= 12) {
                level = '상';
                levelClass = 'badge-critical';
            } else if (score >= 8) {
                level = '중';
                levelClass = 'badge-warning';
            }

            return `
                <div class="site-card">
                    <div style="margin-bottom: 12px;">
                        <strong style="font-size: 1.1rem;">${risk.work}</strong>
                        <span class="badge ${levelClass}" style="margin-left: 12px;">
                            ${level} (${score}점)
                        </span>
                    </div>
                    <p class="text-muted" style="margin-bottom: 8px;">
                        위험 유형: ${risk.type} | 빈도: ${risk.frequency} | 강도: ${risk.severity}
                    </p>
                    <p style="line-height: 1.6;">
                        <strong>감소대책:</strong> ${risk.measures}
                    </p>
                </div>
            `;
        }).join('');
    },

    openModal() {
        const content = `
            <form id="riskForm">
                <div class="form-group">
                    <label>작업명 *</label>
                    <input type="text" id="riskWork" required>
                </div>
                <div class="form-group">
                    <label>위험 유형 *</label>
                    <select id="riskType" required>
                        <option value="">선택하세요</option>
                        <option value="추락">추락</option>
                        <option value="낙하">낙하</option>
                        <option value="협착">협착</option>
                        <option value="감전">감전</option>
                        <option value="전도">전도</option>
                        <option value="화재">화재</option>
                        <option value="붕괴">붕괴</option>
                    </select>
                </div>
                <div class="grid-2">
                    <div class="form-group">
                        <label>빈도 (1-4) *</label>
                        <input type="number" id="riskFreq" min="1" max="4" required>
                    </div>
                    <div class="form-group">
                        <label>강도 (1-4) *</label>
                        <input type="number" id="riskSeverity" min="1" max="4" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>감소대책 *</label>
                    <textarea id="riskMeasures" required></textarea>
                </div>
                <div id="riskScorePreview" class="text-center" style="padding: 16px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-top: 16px;">
                    <div class="text-muted">위험도 점수</div>
                    <div id="riskScoreValue" style="font-size: 2rem; font-weight: 700; margin-top: 8px;">-</div>
                </div>
            </form>
        `;

        Modal.createModal('riskModal', '위험성평가', content);
        Modal.open('riskModal');

        setTimeout(() => {
            const form = document.getElementById('riskForm');
            if (form) {
                form.addEventListener('submit', (e) => this.save(e));
            }

            // 위험도 실시간 계산
            const freqInput = document.getElementById('riskFreq');
            const severityInput = document.getElementById('riskSeverity');
            
            if (freqInput && severityInput) {
                const updateScore = () => {
                    const freq = parseInt(freqInput.value) || 0;
                    const severity = parseInt(severityInput.value) || 0;
                    const score = freq * severity;
                    
                    const scoreEl = document.getElementById('riskScoreValue');
                    if (scoreEl && score > 0) {
                        scoreEl.textContent = score;
                        
                        let color = '#4ade80';
                        if (score >= 12) color = '#f87171';
                        else if (score >= 8) color = '#fbbf24';
                        
                        scoreEl.style.color = color;
                    }
                };

                freqInput.addEventListener('input', updateScore);
                severityInput.addEventListener('input', updateScore);
            }
        }, 100);
    },

    save(e) {
        e.preventDefault();

        const riskList = Storage.get('risks');

        const risk = {
            id: 'risk-' + Date.now(),
            work: document.getElementById('riskWork').value,
            type: document.getElementById('riskType').value,
            frequency: parseInt(document.getElementById('riskFreq').value),
            severity: parseInt(document.getElementById('riskSeverity').value),
            measures: document.getElementById('riskMeasures').value,
            createdAt: new Date().toISOString()
        };

        riskList.push(risk);
        Storage.set('risks', riskList);

        Modal.close('riskModal');
        this.load();

        alert('위험성평가가 저장되었습니다!');
    }
};

// Export
window.Safety = Safety;
