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
                labels: ['Students', 'Faculty', 'Staff'],
                datasets: [{
                    label: 'User Distribution',
                    data: [2456, 312, 79], // Example data
                    backgroundColor: [
                        'rgba(0, 128, 0, 0.7)', // Darker Green
                        'rgba(50, 205, 50, 0.7)', // Lime Green
                        'rgba(144, 238, 144, 0.7)' // Light Green
                    ],
                    borderColor: [
                        'rgba(0, 128, 0, 1)',
                        'rgba(50, 205, 50, 1)',
                        'rgba(144, 238, 144, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
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
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotInput = document.getElementById('chatbotInput');
    const sendChatbotMessageBtn = document.getElementById('sendChatbotMessage');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (!chatbotContainer || !chatbotInput || !sendChatbotMessageBtn || !chatbotMessages) {
        console.error('Chatbot elements not found');
        return;
    }

    sendChatbotMessageBtn.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const messageText = chatbotInput.value.trim();
        if (messageText === '') return;

        appendMessage(messageText, 'user-message');
        chatbotInput.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getBotResponse(messageText);
            appendMessage(botResponse, 'bot-message');
        }, 1000);
    }

    function appendMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
    }

    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();
        if (userMessage.includes('hello') || userMessage.includes('hi')) {
            return "Hello there! How can I help you manage the UNISYNC system today?";
        } else if (userMessage.includes('users')) {
            return "You can manage users in the 'Manage Users' section. Would you like me to navigate you there?";
        } else if (userMessage.includes('announcements')) {
            return "To create or view announcements, please go to the 'Announcements' section.";
        } else if (userMessage.includes('schedule')) {
            return "Room schedules can be viewed and managed under 'Room Schedule'.";
        } else if (userMessage.includes('thank you') || userMessage.includes('thanks')) {
            return "You're welcome! Is there anything else I can assist with?";
        } else {
            return "I'm still learning. Can you please rephrase or ask something else? You can ask about users, announcements, or schedules.";
        }
    }
}

function toggleChatbot() {
    const chatbotContainer = document.getElementById('chatbotContainer');
    if (chatbotContainer) {
        chatbotContainer.classList.toggle('open');
    }
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
