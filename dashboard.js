// Dashboard Module
const Dashboard = {
    load() {
        const sites = Storage.get('sites');
        
        // 통계 계산
        const stats = this.calculateStats(sites);
        
        // 통계 업데이트
        document.getElementById('totalSites').textContent = sites.length;
        document.getElementById('safeSites').textContent = stats.safe;
        document.getElementById('cautionSites').textContent = stats.caution;
        document.getElementById('criticalSites').textContent = stats.critical;
        
        // 평균 공정률
        const avgProgress = sites.length > 0
            ? Math.round(sites.reduce((sum, s) => sum + (s.actualProgress || 0), 0) / sites.length)
            : 0;
        
        document.getElementById('avgProgress').textContent = avgProgress + '%';
        this.drawChart('progressChart', avgProgress);
        
        // 현장 목록 렌더링
        this.renderSiteList(sites);
    },

    calculateStats(sites) {
        const stats = { safe: 0, caution: 0, warning: 0, critical: 0 };
        
        sites.forEach(site => {
            const status = Helpers.calculateStatus(
                site.plannedProgress || 0,
                site.actualProgress || 0
            );
            
            if (status === 'safe') stats.safe++;
            else if (status === 'caution') stats.caution++;
            else if (status === 'warning') stats.warning++;
            else if (status === 'critical') stats.critical++;
        });
        
        return stats;
    },

    drawChart(containerId, percent) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const r = 70;
        const c = 2 * Math.PI * r;
        const offset = c - (percent / 100 * c);
        const color = '#667eea';

        container.innerHTML = `
            <svg width="200" height="200" style="transform: rotate(-90deg);">
                <circle cx="100" cy="100" r="${r}" 
                    fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="15" />
                <circle cx="100" cy="100" r="${r}" 
                    fill="none" stroke="${color}" stroke-width="15"
                    stroke-dasharray="${c}" stroke-dashoffset="${offset}"
                    stroke-linecap="round" />
            </svg>
        `;
    },

    renderSiteList(sites) {
        const container = document.getElementById('dashSiteList');
        if (!container) return;

        if (sites.length === 0) {
            container.innerHTML = '<div class="text-center text-muted">등록된 현장이 없습니다</div>';
            return;
        }

        container.innerHTML = sites.map(site => {
            const status = Helpers.calculateStatus(
                site.plannedProgress || 0,
                site.actualProgress || 0
            );
            const statusText = Helpers.getStatusText(status);
            const ratio = site.plannedProgress > 0
                ? Math.round((site.actualProgress / site.plannedProgress) * 100)
                : 100;

            return `
                <div class="site-card">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div style="flex: 1;">
                            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">
                                ${site.name}
                            </h3>
                            <p class="text-muted" style="margin-bottom: 12px;">
                                ${site.startDate} ~ ${site.endDate}
                            </p>
                            <p style="margin-bottom: 8px;">
                                계획: ${site.plannedProgress}% | 실제: ${site.actualProgress}%
                            </p>
                            ${site.importantNotes ? `
                                <p class="text-muted" style="font-size: 0.875rem; margin-top: 8px;">
                                    ${site.importantNotes}
                                </p>
                            ` : ''}
                        </div>
                        <span class="badge badge-${status}">${ratio}%</span>
                    </div>
                </div>
            `;
        }).join('');
    }
};

// Export
window.Dashboard = Dashboard;
