// Move all theme-related code to theme.js
export const initializeTheme = () => {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(themeToggle);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateThemeAssets(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        updateThemeAssets(newTheme);
    });
};

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'light' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
        // Add ARIA label for accessibility
        themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
    }
}

function updateThemeAssets(theme) {
    const { images, patterns } = window.CONFIG.ASSETS;
    const logo = document.getElementById('logo');
    const mainContent = document.querySelector('.main-content');
    
    if (logo) {
        logo.src = theme === 'light' ? images.logoLight : images.logoDark;
    }
    
    if (mainContent) {
        mainContent.style.backgroundImage = `url(${theme === 'light' ? patterns.light : patterns.dark})`;
    }
} 