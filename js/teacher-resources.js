import { initializeNavigation } from './navigation.js';
import { initializeTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeResources();
});

function initializeResources() {
    // Modal Functions
    window.openUploadModal = function() {
        document.getElementById('uploadModal').style.display = 'block';
    }

    window.closeUploadModal = function() {
        document.getElementById('uploadModal').style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('uploadModal');
        if (event.target === modal) {
            closeUploadModal();
        }
    }

    // Form submission
    document.getElementById('uploadForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        closeUploadModal();
    });

    // Resource card click handlers
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.closest('.resource-card').querySelector('h3').textContent;
            // Add your view all logic here
            console.log(`Viewing all ${category}`);
        });
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput?.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        // Add your search logic here
        console.log(`Searching for: ${searchTerm}`);
    });
}
