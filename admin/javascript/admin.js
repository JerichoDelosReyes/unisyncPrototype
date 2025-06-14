// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeChatbot();
});

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update sidebar active state
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => item.classList.remove('active'));
    event.target.closest('li').classList.add('active');
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard Overview',
        'users': 'User Management',
        'announcements': 'Announcements',
        'schedule': 'Room Schedule',
        'reports': 'Reports & Analytics',
        'settings': 'System Settings'
    };
    document.getElementById('page-title').textContent = titles[sectionId];
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}

// Chart Initialization
function initializeCharts() {
    // Usage Chart
    const usageCtx = document.getElementById('usageChart');
    if (usageCtx) {
        new Chart(usageCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Active Users',
                    data: [1200, 1350, 1400, 1300, 1500, 1600, 1700, 1800, 1750, 1900, 2000, 2100],
                    borderColor: '#006400',
                    backgroundColor: 'rgba(0, 100, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#E9ECEF'
                        }
                    },
                    x: {
                        grid: {
                            color: '#E9ECEF'
                        }
                    }
                }
            }
        });
    }

    // User Stats Chart
    const userStatsCtx = document.getElementById('userStatsChart');
    if (userStatsCtx) {
        new Chart(userStatsCtx, {
            type: 'doughnut',
            data: {
                labels: ['Students', 'Faculty', 'Admin'],
                datasets: [{
                    data: [2456, 312, 79],
                    backgroundColor: ['#006400', '#228B22', '#32CD32'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // Room Utilization Chart
    const roomUtilizationCtx = document.getElementById('roomUtilizationChart');
    if (roomUtilizationCtx) {
        new Chart(roomUtilizationCtx, {
            type: 'bar',
            data: {
                labels: ['Main Bldg', 'Engineering', 'Science', 'IT Building', 'Library'],
                datasets: [{
                    label: 'Utilization %',
                    data: [85, 92, 78, 88, 65],
                    backgroundColor: '#006400',
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: '#E9ECEF'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// User Management Functions
function openUserModal() {
    alert('User creation modal would open here');
}

function editUser(userId) {
    alert(`Edit user ${userId} modal would open here`);
}

function deleteUser(userId) {
    if (confirm(`Are you sure you want to delete user ${userId}?`)) {
        alert(`User ${userId} deleted successfully`);
    }
}

// Announcement Functions
function openAnnouncementModal() {
    alert('Announcement creation modal would open here');
}

// Schedule Functions
function openScheduleModal() {
    alert('Schedule creation modal would open here');
}

// Report Functions
function exportReport(format) {
    alert(`Exporting report as ${format.toUpperCase()}...`);
}

// Chatbot Functions
function initializeChatbot() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.getElementById('chatToggle');
    
    chatbot.classList.toggle('collapsed');
    
    if (chatbot.classList.contains('collapsed')) {
        toggle.className = 'fas fa-chevron-down';
    } else {
        toggle.className = 'fas fa-chevron-up';
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (input.value.trim() === '') return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `<div class="message-content">${input.value}</div>`;
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    const userInput = input.value;
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `<div class="message-content">${generateAIResponse(userInput)}</div>`;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(userInput) {
    const responses = {
        'hello': 'Hello! How can I assist you with the admin dashboard today?',
        'users': 'You currently have 2,847 total users: 2,456 students, 312 faculty members, and 79 admin users.',
        'room': 'Room 401 is located in the Main Building, 4th floor. It\'s currently scheduled for Database Systems class.',
        'schedule': 'Today\'s schedule shows high utilization across all buildings. The Engineering Building has the highest usage at 92%.',
        'reports': 'You can generate reports in PDF or Excel format from the Reports section. Current analytics show positive growth trends.',
        'default': 'I can help you with user management, room scheduling, announcements, and system reports. What would you like to know?'
    };
    
    const input = userInput.toLowerCase();
    for (let key in responses) {
        if (input.includes(key)) {
            return responses[key];
        }
    }
    return responses['default'];
}

// Filters and Search Functions
document.addEventListener('DOMContentLoaded', function() {
    // User filters
    const roleFilter = document.getElementById('roleFilter');
    const statusFilter = document.getElementById('statusFilter');
    const userSearch = document.getElementById('userSearch');
    
    if (roleFilter) roleFilter.addEventListener('change', filterUsers);
    if (statusFilter) statusFilter.addEventListener('change', filterUsers);
    if (userSearch) userSearch.addEventListener('input', filterUsers);
    
    // Schedule filters
    const buildingFilter = document.getElementById('buildingFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    if (buildingFilter) buildingFilter.addEventListener('change', filterSchedule);
    if (dateFilter) dateFilter.addEventListener('change', filterSchedule);
});

function filterUsers() {
    // Implementation for filtering users table
    console.log('Filtering users...');
}

function filterSchedule() {
    // Implementation for filtering schedule
    console.log('Filtering schedule...');
}

// Notification Functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Dark Mode Toggle (Optional Feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Initialize dark mode from localStorage
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Mobile Menu Handling
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
});

// Auto-refresh data every 30 seconds
setInterval(function() {
    // Refresh dashboard data
    refreshDashboardData();
}, 30000);

function refreshDashboardData() {
    // Implementation for refreshing dashboard data
    console.log('Refreshing dashboard data...');
}
