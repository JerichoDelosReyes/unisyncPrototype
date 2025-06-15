// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
    initializeCharts();
    initializeChatbot();
    setupSidebarSwipeGestures();
});

function initializeAdminDashboard() {
    console.log('Initializing admin dashboard...');
    
    // Initialize the sidebar and menu toggle
    initializeSidebar();
    
    // Add event listener to document to log sidebar state when clicked
    document.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            console.log('Current sidebar state:', 
                        sidebar.classList.contains('open') ? 'open' : 'closed',
                        'Classes:', sidebar.className,
                        'Style transform:', sidebar.style.transform);
        }
    });
}

function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    console.log('Initializing sidebar...');
    
    if (!sidebar) {
        console.error('Sidebar element not found during initialization');
        return;
    }
    
    // Initialize based on screen size and stored state
    const sidebarOpen = sessionStorage.getItem('sidebarOpen') === 'true';
    const isDesktop = window.innerWidth > 1024;
    
    console.log('Screen width:', window.innerWidth, 'Is desktop:', isDesktop);
    console.log('Stored sidebar state:', sidebarOpen ? 'open' : 'closed');
    
    // Default to open on desktop, respect saved state otherwise
    if ((isDesktop && sidebarOpen !== false) || (sidebarOpen === true)) {
        console.log('Opening sidebar on initialization');
        sidebar.classList.add('open');
    } else {
        console.log('Keeping sidebar closed on initialization');
        sidebar.classList.remove('open');
    }
    
    // Update overlay state
    if (overlay) {
        if (sidebar.classList.contains('open') && !isDesktop) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
    }
    
    // Set up menu toggle button - use direct approach
    const menuToggle = document.getElementById('menuToggleBtn');
    if (menuToggle) {
        console.log('Setting up menu toggle button...');
        
        // Remove existing event listeners
        menuToggle.replaceWith(menuToggle.cloneNode(true));
        
        // Get the fresh element
        const newMenuToggle = document.getElementById('menuToggleBtn');
          // Add click event using multiple approaches to ensure it works
        newMenuToggle.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle button clicked (onclick)');
            toggleSidebar();
        };
        
        // Also add an event listener as a backup
        newMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle button clicked (addEventListener)');
            toggleSidebar();
        });
        
        // Add a visible indicator to show the button is interactive
        newMenuToggle.style.position = 'relative';
        newMenuToggle.insertAdjacentHTML('beforeend', '<span style="position:absolute; top:0; right:0; background:red; color:white; font-size:8px; padding:2px 4px; border-radius:50%;">!</span>');
    } else {
        console.error('Menu toggle button not found');
    }
    
    // Set up swipe gestures for mobile
    setupSidebarSwipeGestures();
    
    // Add window resize handler
    window.addEventListener('resize', handleWindowResize);
    
    // Log current sidebar state
    console.log('Sidebar initialization complete. Current state:', 
                sidebar.classList.contains('open') ? 'open' : 'closed',
                'Classes:', sidebar.className);
}

function handleWindowResize() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    if (window.innerWidth > 1024) {
        // On larger screens, show sidebar by default
        if (!sidebar.classList.contains('open')) {
            sidebar.classList.add('open');
        }
        // Hide overlay on larger screens
        if (overlay && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
        }
    } else {
        // On smaller screens, hide sidebar by default
        if (sidebar.classList.contains('open') && sessionStorage.getItem('sidebarOpen') !== 'true') {
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        }
    }
}

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
    console.log('Toggle sidebar function called');
    
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    if (!sidebar) {
        console.error('Sidebar element not found');
        return;
    }
    
    // Force a reflow to ensure CSS transitions work properly
    void sidebar.offsetWidth;
    
    // Toggle the open class
    const wasOpen = sidebar.classList.contains('open');
    const nowOpen = !wasOpen;
    
    console.log('Sidebar state before:', wasOpen ? 'open' : 'closed');
    
    if (nowOpen) {
        sidebar.classList.add('open');
    } else {
        sidebar.classList.remove('open');
    }
    
    console.log('Sidebar state after:', sidebar.classList.contains('open') ? 'open' : 'closed');
    console.log('Sidebar classes:', sidebar.className);
    
    // Handle overlay
    if (overlay) {
        if (nowOpen) {
            overlay.classList.add('active');
        } else {
            overlay.classList.remove('active');
        }
        console.log('Overlay state:', overlay.classList.contains('active') ? 'active' : 'inactive');
    }
    
    // Handle body scroll
    if (nowOpen) {
        body.classList.add('sidebar-open');
    } else {
        body.classList.remove('sidebar-open');
    }
    
    // Store sidebar state in session storage for persistence
    sessionStorage.setItem('sidebarOpen', nowOpen);
    
    // Add a debug element to show sidebar state
    const debugInfo = document.getElementById('sidebarDebugInfo') || document.createElement('div');
    debugInfo.id = 'sidebarDebugInfo';
    debugInfo.style.position = 'fixed';
    debugInfo.style.bottom = '10px';
    debugInfo.style.left = '10px';
    debugInfo.style.background = 'rgba(0,0,0,0.7)';
    debugInfo.style.color = 'white';
    debugInfo.style.padding = '5px 10px';
    debugInfo.style.borderRadius = '5px';
    debugInfo.style.zIndex = '9999';
    debugInfo.style.fontSize = '12px';
    debugInfo.textContent = `Sidebar: ${nowOpen ? 'Open' : 'Closed'}`;
    
    if (!document.getElementById('sidebarDebugInfo')) {
        document.body.appendChild(debugInfo);
    }
    
    // Remove debug info after 3 seconds
    setTimeout(() => {
        if (debugInfo.parentNode) {
            debugInfo.parentNode.removeChild(debugInfo);
        }
    }, 3000);
}

// Chart Initialization
function initializeCharts() {
    // Usage Chart has been replaced with static statistics display
    
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

// Add support for swipe gestures to open/close sidebar
function setupSidebarSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // Minimum distance for a swipe
    
    // Detect touch start
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    // Detect touch end and determine if it was a swipe
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const sidebar = document.querySelector('.sidebar');
        const isOpen = sidebar.classList.contains('open');
        const swipeDistance = touchEndX - touchStartX;
        
        // Right swipe to open sidebar
        if (swipeDistance > minSwipeDistance && !isOpen) {
            toggleSidebar();
        }
        
        // Left swipe to close sidebar
        else if (swipeDistance < -minSwipeDistance && isOpen) {
            toggleSidebar();
        }
    }
}

// Auto-refresh data every 30 seconds
setInterval(function() {
    // Refresh dashboard data
    refreshDashboardData();
}, 30000);

function refreshDashboardData() {
    // Implementation for refreshing dashboard data
    console.log('Refreshing dashboard data...');
}
