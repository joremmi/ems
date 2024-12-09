import { initializeNavigation } from './navigation.js';
import { initializeTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeLibrary();
});

function initializeLibrary() {
    // Tab Switching
    window.switchTab = function(tabId) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(tabId).classList.add('active');
        event.target.classList.add('active');
    }

    // Modal Functions
    window.openAddBookModal = function() {
        document.getElementById('addBookModal').style.display = 'block';
    }

    window.closeAddBookModal = function() {
        document.getElementById('addBookModal').style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('addBookModal');
        if (event.target === modal) {
            closeAddBookModal();
        }
    }

    // Form submission
    document.getElementById('addBookForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        closeAddBookModal();
    });
}