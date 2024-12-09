import { initializeNavigation } from './navigation.js';
import { initializeTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeFinancials();
});

function initializeFinancials() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            // Add your tab content switching logic here
        });
    });

    // Modal Functions
    window.openNewTransactionModal = function() {
        document.getElementById('newTransactionModal').style.display = 'block';
    }

    window.closeNewTransactionModal = function() {
        document.getElementById('newTransactionModal').style.display = 'none';
    }

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput?.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Add your search logic here
        console.log(`Searching for: ${searchTerm}`);
    });

    // Fee editing
    const editButtons = document.querySelectorAll('.btn-link');
    editButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const feeItem = this.closest('.fee-item');
            const grade = feeItem.querySelector('.grade').textContent;
            const amount = feeItem.querySelector('.amount').textContent;
            // Add your fee editing logic here
            console.log(`Editing fee for ${grade}: ${amount}`);
        });
    });
}
