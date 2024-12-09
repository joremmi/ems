export const initializeNavigation = () => {
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
    const currentPath = window.location.pathname;

    if (sidebarMenu) {
        sidebarMenu.innerHTML = menuItems.map(item => {
            const isActive = currentPath.includes(item.link.replace('.html', ''));
            return `
                <li>
                    <a href="${item.link}" 
                       class="${isActive ? 'active' : ''}"
                       aria-current="${isActive ? 'page' : 'false'}">
                        <i class="${item.icon}"></i>
                        <span>${item.text}</span>
                    </a>
                </li>
            `;
        }).join('');
    }
}; 