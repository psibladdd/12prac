document.addEventListener('DOMContentLoaded', function() {
    initMenu();
    initThemeToggle();
    initSkillBars();
    initProjects();
    initTable();
    initContactForm();
    initStats();
    setCurrentDate();
});

function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            menuToggle.innerHTML = navList.classList.contains('active')
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

        if (localStorage.getItem('theme') === 'dark' ||
            (localStorage.getItem('theme') === null && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            themeToggle.checked = true;
        }

        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillLevels.forEach(skill => observer.observe(skill));
}

function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const shownProjectsSpan = document.getElementById('shownProjects');
    const totalProjectsSpan = document.getElementById('totalProjects');

    if (!projectsGrid || !shownProjectsSpan || !totalProjectsSpan) return;


    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        let filteredProjects = projects;

        if (filter !== 'all') {
            filteredProjects = projects.filter(project => project.category === filter);
        }

        filteredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.dataset.category = project.category;

            const iconClass = project.category === 'web' ? 'globe' :
                            project.category === 'bot' ? 'robot' : 'mobile-alt';

            projectCard.innerHTML = `
                <div class="project-image">
                    <i class="fas fa-${iconClass}"></i>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <a href="${project.url}" target="_blank" class="btn btn-small" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                </div>
            `;

            projectsGrid.appendChild(projectCard);
        });

        shownProjectsSpan.textContent = filteredProjects.length;
        totalProjectsSpan.textContent = projects.length;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            renderProjects(filter);
        });
    });

    renderProjects('all');
}

function initTable() {
    const tableBody = document.getElementById('tableBody');
    const tableSearch = document.getElementById('tableSearch');
    const addRowBtn = document.getElementById('addRowBtn');
    const highlightRecentBtn = document.getElementById('highlightRecentBtn');
    const clearHighlightBtn = document.getElementById('clearHighlightBtn');
    const tableCountSpan = document.getElementById('tableCount');

    if (!tableBody) return;

    let tableData = [
        { id: 1, name: "School 2026", category: "Телеграм-бот", technologies: "Python, python-telegram-bot, SQLite", date: "2025-10-15", status: "completed", url: "https://github.com/psibladdd/school_2026" },
        { id: 2, name: "Dobro Bot", category: "Веб-сайт", technologies: "HTML, CSS, JavaScript, Python", date: "2025-11-20", status: "completed", url: "https://github.com/psibladdd/dobro" },
        { id: 3, name: "Dobrodrug Bot", category: "Телеграм-бот", technologies: "Python, python-telegram-bot, PostgreSQL", date: "2025-12-01", status: "in-progress", url: "https://github.com/psibladdd/dobrodrug" },
        { id: 4, name: "Vozhak Python", category: "Игровой бот", technologies: "Python, aiogram, Redis", date: "2025-12-10", status: "in-progress", url: "https://github.com/psibladdd/vozhak_python" },
        { id: 5, name: "12 Практика", category: "Лендинг", technologies: "HTML, CSS, JavaScript", date: "2025-12-16", status: "in-progress", url: "https://github.com/psibladdd/12prac" },
        { id: 6, name: "Кастомный рандомайзер", category: "Лендинг", technologies: "HTML, CSS, JavaScript", date: "2024-11-22", status: "in-progress", url: "https://github.com/psibladdd/vozhak_random" },
        { id: 7, name: "3D Город", category: "THREE JS", technologies: "REACT, JavaScript, HTML", date: "2025-07-15", status: "in-progress", url: "https://github.com/psibladdd/13" }
    ];

    function renderTable(data = tableData) {
        tableBody.innerHTML = '';

        data.forEach((row, index) => {

            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${row.name}</td>
                <td>${row.category}</td>
                <td>${row.technologies}</td>
                <td>${row.date}</td>
                <td>
                    <a href="${row.url}" target="_blank" class="action-btn edit-btn" rel="noopener noreferrer">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    <button class="action-btn delete-btn" data-id="${row.id}">Удалить</button>
                </td>
            `;

            tableBody.appendChild(tableRow);
        });

        if (tableCountSpan) {
            tableCountSpan.textContent = data.length;
        }

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteRow(id);
            });
        });
    }

    function searchTable() {
        if (!tableSearch) return;
        const searchTerm = tableSearch.value.toLowerCase();
        const filteredData = tableData.filter(row =>
            row.name.toLowerCase().includes(searchTerm) ||
            row.category.toLowerCase().includes(searchTerm) ||
            row.technologies.toLowerCase().includes(searchTerm) ||
            row.date.includes(searchTerm)
        );
        renderTable(filteredData);
    }

    function deleteRow(id) {
        if (confirm('Вы уверены, что хотите удалить этот проект?')) {
            tableData = tableData.filter(row => row.id !== id);
            renderTable();
        }
    }

    const style = document.createElement('style');
    if (!document.getElementById('notification-style')) {
        style.id = 'notification-style';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    if (tableSearch) tableSearch.addEventListener('input', searchTable);

    renderTable();
}

function initContactForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');

    if (feedbackForm && formMessage) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const message = document.getElementById('message')?.value;

            if (!name || !email || !message) {
                showFormMessage('Пожалуйста, заполните все поля формы.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('Пожалуйста, введите корректный email адрес.', 'error');
                return;
            }

            showFormMessage('Сообщение отправлено! Я свяжусь с вами в ближайшее время.', 'success');
            feedbackForm.reset();

            const feedback = { name, email, message, timestamp: new Date().toISOString() };
            saveFeedback(feedback);
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showFormMessage(text, type) {
        if (!formMessage) return;
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;

        setTimeout(() => {
            formMessage.style.opacity = '0';
            setTimeout(() => {
                formMessage.className = 'form-message';
                formMessage.style.opacity = '1';
            }, 300);
        }, 5000);
    }

    function saveFeedback(feedback) {
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }
}

function initStats() {
    const completedProjects = document.getElementById('completedProjects');
    const experienceYears = document.getElementById('experienceYears');
    const happyClients = document.getElementById('happyClients');
    const updateStatsBtn = document.getElementById('updateStatsBtn');

    if (updateStatsBtn) {
        updateStatsBtn.addEventListener('click', updateStats);
    }

    function updateStats() {
        if (completedProjects) animateValue(completedProjects, 8, 12, 1000);
        if (experienceYears) animateValue(experienceYears, 3, 4, 1000);

        const notification = document.createElement('div');
        notification.textContent = 'Статистика обновлена!';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 15px 30px;
            border-radius: 12px;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
            animation: fadeInOut 3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);

        if (!document.getElementById('statsAnimationStyle')) {
            const style = document.createElement('style');
            style.id = 'statsAnimationStyle';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                    15% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    85% { opacity: 1; transform: translateX(-50%) translateY(0); }
                    100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value + (end > 10 ? '+' : '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

function setCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        };
        currentDateElement.textContent = now.toLocaleDateString('ru-RU', options);
    }
}
