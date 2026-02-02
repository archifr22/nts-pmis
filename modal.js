// Modal Component
const Modal = {
    // 모달 HTML 생성
    createModal(id, title, content, footerButtons = []) {
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" onclick="Modal.close('${id}')">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${footerButtons.length > 0 ? `
                    <div class="modal-footer">
                        ${footerButtons.map(btn => `
                            <button class="btn ${btn.class}" onclick="${btn.onClick}">
                                ${btn.text}
                            </button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
        
        const modalEl = document.getElementById(id);
        if (modalEl) {
            modalEl.innerHTML = modalHTML;
        }
    },

    // 모달 열기
    open(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    // 모달 닫기
    close(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    // 확인 대화상자
    confirm(message, onConfirm) {
        if (window.confirm(message)) {
            onConfirm();
        }
    }
};

// Export
window.Modal = Modal;
