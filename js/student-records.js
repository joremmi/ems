import { initializeNavigation } from './navigation.js';
import { initializeTheme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeNavigation();
    initializeFilters();
});

function initializeFilters() {
    const gradeFilter = document.querySelector('select[class="filter-select"]:nth-of-type(1)');
    const sectionFilter = document.querySelector('select[class="filter-select"]:nth-of-type(2)');
    const statusFilter = document.querySelector('select[class="filter-select"]:nth-of-type(3)');
    const searchInput = document.querySelector('.search-input');

    // Add event listeners
    gradeFilter.addEventListener('change', applyFilters);
    sectionFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
}

function applyFilters() {
    const gradeFilter = document.querySelector('select[class="filter-select"]:nth-of-type(1)').value;
    const sectionFilter = document.querySelector('select[class="filter-select"]:nth-of-type(2)').value;
    const statusFilter = document.querySelector('select[class="filter-select"]:nth-of-type(3)').value;
    const searchTerm = document.querySelector('.search-input').value.toLowerCase();

    const rows = document.querySelectorAll('.data-table tbody tr');

    rows.forEach(row => {
        const grade = row.children[2].textContent; // Grade column
        const section = row.children[3].textContent; // Section column
        const status = row.querySelector('.status-badge').textContent;
        const searchableText = [
            row.children[0].textContent, // ID
            row.children[1].textContent, // Name
            row.children[4].textContent  // Contact
        ].join(' ').toLowerCase();

        const matchesGrade = !gradeFilter || grade === gradeFilter;
        const matchesSection = !sectionFilter || section === sectionFilter;
        const matchesStatus = !statusFilter || status === statusFilter;
        const matchesSearch = !searchTerm || searchableText.includes(searchTerm);

        const shouldShow = matchesGrade && matchesSection && matchesStatus && matchesSearch;
        row.style.display = shouldShow ? '' : 'none';
    });

    updatePagination();
}

function updatePagination() {
    const visibleRows = document.querySelectorAll('.data-table tbody tr:not([style*="display: none"])');
    const totalPages = Math.ceil(visibleRows.length / 10); // 10 items per page
    const paginationContainer = document.querySelector('.pagination');
    
    // Clear existing pagination buttons except first/last
    const buttons = paginationContainer.querySelectorAll('button:not(:first-child):not(:last-child)');
    buttons.forEach(button => button.remove());

    // Add new pagination buttons
    const prevButton = paginationContainer.firstElementChild;
    const nextButton = paginationContainer.lastElementChild;

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = 'pagination-btn';
        button.textContent = i;
        if (i === 1) button.classList.add('active');
        button.addEventListener('click', () => changePage(i));
        paginationContainer.insertBefore(button, nextButton);
    }

    // Update prev/next button states
    prevButton.disabled = totalPages === 0 || currentPage === 1;
    nextButton.disabled = totalPages === 0 || currentPage === totalPages;
}

let currentPage = 1;
const rowsPerPage = 10;

function changePage(page) {
    currentPage = page;
    const visibleRows = document.querySelectorAll('.data-table tbody tr:not([style*="display: none"])');
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    visibleRows.forEach((row, index) => {
        row.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
    });

    // Update active button state
    document.querySelectorAll('.pagination-btn').forEach(button => {
        button.classList.toggle('active', parseInt(button.textContent) === page);
    });
}

// Modal Functions
function openAddStudentModal() {
    document.getElementById('addStudentModal').style.display = 'block';
}

function closeAddStudentModal() {
    document.getElementById('addStudentModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addStudentModal');
    if (event.target === modal) {
        closeAddStudentModal();
    }
}

// Make functions globally available
window.openAddStudentModal = openAddStudentModal;
window.closeAddStudentModal = closeAddStudentModal;

// Form submission
document.getElementById('addStudentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your form submission logic here
    closeAddStudentModal();
});