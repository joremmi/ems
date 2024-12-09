// Theme toggle functionality
const themeToggle = document.createElement('button');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    updateThemeAssets(newTheme);
});

function updateThemeIcon(theme) {
    themeToggle.innerHTML = theme === 'light' 
        ? '<i class="fas fa-moon"></i>' 
        : '<i class="fas fa-sun"></i>';
}

// Add this to ensure assets are updated when theme changes
function updateThemeAssets(theme) {
    const logo = document.getElementById('logo');
    const mainContent = document.querySelector('.main-content');
    
    if (theme === 'light') {
        logo.src = '../assets/images/ems-logo-light.png';
        mainContent.style.backgroundImage = 'url(../assets/pattern/pattern-light.svg)';
    } else {
        logo.src = '../assets/images/ems-logo.png';
        mainContent.style.backgroundImage = 'url(../assets/pattern/pattern.svg)';
    }
}

// Sidebar menu functionality
const menuItems = [
    { icon: 'fas fa-chart-line', text: 'Dashboard', link: './home.html' },
    { icon: 'fas fa-user-graduate', text: 'Student Records', link: './student-records.html' },
    { icon: 'fas fa-book', text: 'Library Management', link: './library-management.html' },
    { icon: 'fas fa-chalkboard-teacher', text: 'Teacher Resources', link: './teacher-resources.html' },
    { icon: 'fas fa-comments', text: 'Parent Communication', link: './parent-communication.html' },
    { icon: 'fas fa-money-bill-wave', text: 'Financial Operations', link: './financial-operations.html' },
    { icon: 'fas fa-envelope', text: 'Contact Us', link: './contact-us.html' }
];

const sidebarMenu = document.querySelector('.sidebar-menu');
sidebarMenu.innerHTML = menuItems.map(item => `
    <li>
        <a href="${item.link}" ${window.location.href.includes(item.link) ? 'class="active"' : ''}>
            <i class="${item.icon}"></i>
            <span>${item.text}</span>
        </a>
    </li>
`).join('');

// Quick actions functionality
const quickActions = {
    'Add Student': {
        icon: 'fas fa-user-plus',
        action: () => {
            window.location.href = './students/add.html';
        }
    },
    'Add Book': {
        icon: 'fas fa-book-medical',
        action: () => {
            window.location.href = './library/add.html';
        }
    },
    'Send Notice': {
        icon: 'fas fa-bell',
        action: () => {
            window.location.href = './notices/create.html';
        }
    },
    'Generate Report': {
        icon: 'fas fa-file-alt',
        action: () => {
            window.location.href = './reports/generate.html';
        }
    }
};

// Update quick action buttons with icons and click handlers
document.querySelectorAll('.quick-action-btn').forEach(btn => {
    const actionName = btn.textContent;
    const action = quickActions[actionName];
    if (action) {
        btn.innerHTML = `<i class="${action.icon}"></i> ${actionName}`;
        btn.addEventListener('click', action.action);
    }
});

// Search functionality
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = e.target.value.trim();
        if (searchTerm) {
            // Implement your search logic here
            console.log('Searching for:', searchTerm);
            // Example: window.location.href = `./search.html?q=${encodeURIComponent(searchTerm)}`;
        }
    }
});

// Also update assets on initial load
updateThemeAssets(savedTheme);
