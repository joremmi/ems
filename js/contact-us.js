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

// Form submission handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        this.reset();
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Notification function
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        ${message}
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Form validation
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        validateInput(this);
    });
});

function validateInput(input) {
    if (input.required && !input.value.trim()) {
        showInputError(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && !validateEmail(input.value)) {
        showInputError(input, 'Please enter a valid email address');
        return false;
    }
    
    removeInputError(input);
    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showInputError(input, message) {
    removeInputError(input);
    input.classList.add('error');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    input.parentNode.appendChild(errorMessage);
}

function removeInputError(input) {
    input.classList.remove('error');
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Reuse the menu items and theme functionality from home.js
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