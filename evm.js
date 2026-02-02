// EVM Module
const EVM = {
    load() {
        const wbsList = Storage.get('wbs');
        
        // BAC 계산 (총 예산)
        const bac = wbsList.reduce((sum, w) => sum + (w.budget || 0), 0);
        
        // 평균 진행률
        const avgProgress = wbsList.length > 0
            ? wbsList.reduce((sum, w) => sum + (w.progress || 0), 0) / wbsList.length
            : 0;

        // PV (계획 공사비) - 가정: 계획 50%
        const plannedPercent = 50;
        const pv = bac * (plannedPercent / 100);

        // EV (달성 공사비)
        const ev = bac * (avgProgress / 100);

        // AC (실투입비) - 가정: EV의 105%
        const ac = ev * 1.05;

        // SPI (공정 수행 지수)
        const spi = pv > 0 ? ev / pv : 0;

        // CPI (원가 수행 지수)
        const cpi = ac > 0 ? ev / ac : 0;

        // UI 업데이트
        document.getElementById('evmBAC').textContent = (bac / 100).toFixed(1) + '억';
        document.getElementById('evmPV').textContent = (pv / 100).toFixed(1) + '억';
        document.getElementById('evmEV').textContent = (ev / 100).toFixed(1) + '억';
        document.getElementById('evmSPI').textContent = spi.toFixed(2);

        // SPI 색상 변경
        const spiEl = document.getElementById('evmSPI');
        if (spiEl) {
            if (spi >= 1.0) {
                spiEl.style.color = '#4ade80';
            } else if (spi >= 0.9) {
                spiEl.style.color = '#fbbf24';
            } else {
                spiEl.style.color = '#f87171';
            }
        }
    },

    // EVM 계산 유틸리티
    calculate(bac, plannedPercent, actualPercent, actualCost) {
        const pv = bac * (plannedPercent / 100);
        const ev = bac * (actualPercent / 100);
        const ac = actualCost;

        // 편차
        const sv = ev - pv; // 공정 편차
        const cv = ev - ac; // 원가 편차

        // 지수
        const spi = pv > 0 ? ev / pv : 0;
        const cpi = ac > 0 ? ev / ac : 0;

        // 예측
        const eac = cpi > 0 ? ac + (bac - ev) / cpi : bac;
        const vac = bac - eac;
        const tcpi = (bac - ev) > 0 && (bac - ac) > 0 
            ? (bac - ev) / (bac - ac) 
            : 0;

        return {
            pv, ev, ac,
            sv, cv,
            spi, cpi,
            eac, vac, tcpi
        };
    }
};

// Export
window.EVM = EVM;
