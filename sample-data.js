// Sample Data Loader
const SampleData = {
    async load() {
        try {
            const response = await fetch('data/sample-data.json');
            const data = await response.json();
            return data.sampleData;
        } catch (error) {
            console.error('샘플 데이터 로드 실패:', error);
            return null;
        }
    },

    async loadToStorage() {
        const confirmLoad = confirm(
            '샘플 데이터를 로드하시겠습니까?\n' +
            '(기존 데이터는 유지되며 샘플 데이터가 추가됩니다)'
        );

        if (!confirmLoad) return false;

        try {
            const sampleData = await this.load();
            if (!sampleData) {
                alert('샘플 데이터 로드에 실패했습니다.');
                return false;
            }

            // 현재 데이터 가져오기
            const currentSites = Storage.get('sites');
            const currentWBS = Storage.get('wbs');
            const currentDaily = Storage.get('daily');
            const currentRisks = Storage.get('risks');

            // 중복 체크하며 추가
            const newSites = sampleData.sites.filter(
                sample => !currentSites.find(s => s.id === sample.id)
            );
            const newWBS = sampleData.wbs.filter(
                sample => !currentWBS.find(w => w.id === sample.id)
            );
            const newDaily = sampleData.daily.filter(
                sample => !currentDaily.find(d => d.id === sample.id)
            );
            const newRisks = sampleData.risks.filter(
                sample => !currentRisks.find(r => r.id === sample.id)
            );

            // 저장
            Storage.set('sites', [...currentSites, ...newSites]);
            Storage.set('wbs', [...currentWBS, ...newWBS]);
            Storage.set('daily', [...currentDaily, ...newDaily]);
            Storage.set('risks', [...currentRisks, ...newRisks]);

            alert(
                `샘플 데이터 로드 완료!\n\n` +
                `현장: ${newSites.length}개\n` +
                `WBS: ${newWBS.length}개\n` +
                `작업일보: ${newDaily.length}개\n` +
                `위험성평가: ${newRisks.length}개`
            );

            return true;
        } catch (error) {
            console.error('샘플 데이터 저장 실패:', error);
            alert('샘플 데이터 저장에 실패했습니다.');
            return false;
        }
    },

    clearAll() {
        const confirmClear = confirm(
            '모든 데이터를 삭제하시겠습니까?\n' +
            '이 작업은 되돌릴 수 없습니다!'
        );

        if (!confirmClear) return false;

        const doubleConfirm = confirm('정말로 삭제하시겠습니까?');
        if (!doubleConfirm) return false;

        try {
            Storage.set('sites', []);
            Storage.set('wbs', []);
            Storage.set('daily', []);
            Storage.set('risks', []);

            alert('모든 데이터가 삭제되었습니다.');
            return true;
        } catch (error) {
            console.error('데이터 삭제 실패:', error);
            alert('데이터 삭제에 실패했습니다.');
            return false;
        }
    }
};

// Export
window.SampleData = SampleData;

// 개발자 콘솔 명령어
console.log('%c🏗️ PMIS Developer Console', 'color: #667eea; font-size: 16px; font-weight: bold');
console.log('%cSampleData.loadToStorage() - 샘플 데이터 로드', 'color: #56ab2f');
console.log('%cSampleData.clearAll() - 모든 데이터 삭제', 'color: #eb3349');
console.log('%cStorage.get("sites") - 현장 데이터 조회', 'color: #667eea');
