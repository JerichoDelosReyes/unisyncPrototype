// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the sidebar immediately on load
    initializeSidebar();
    
    // Initialize other dashboard components
    initializeCharts();
    initializeChatbot();
    setupSidebarSwipeGestures();
    
    // Add overlay click handler
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            toggleSidebar(false); // Force close on overlay click
        });
    }
});

function initializeAdminDashboard() {
    console.log('Initializing admin dashboard...');
    // Any additional initialization can go here
}

function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuToggle = document.getElementById('menuToggleBtn');
    
    console.log('Initializing sidebar...');
    
    if (!sidebar) {
        console.error('Sidebar element not found during initialization');
        return;
    }
    
    // Remove any inline onclick attributes to avoid conflicts
    if (menuToggle) {
        menuToggle.removeAttribute('onclick');
    }
    
    // Initialize based on screen size
    const isDesktop = window.innerWidth > 1024;
    
    if (isDesktop) {
        // On desktop, ensure sidebar shows by default (CSS handles this)
        // Just make sure the class is applied for state tracking
        sidebar.classList.add('open');
    } else {
        // On mobile, ensure sidebar is closed by default
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
    }
    
    // Set up menu toggle button with proper event handling
    if (menuToggle) {
        // Clean approach to remove old listeners and add new one
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu toggle clicked');
            toggleSidebar();
        });
    }
    
    // Set up window resize handler
    window.removeEventListener('resize', handleWindowResize); // Remove any existing handler
    window.addEventListener('resize', handleWindowResize);
}

function handleWindowResize() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const isDesktop = window.innerWidth > 1024;
    
    if (!sidebar) return;
    
    if (isDesktop) {
        // On desktop, ensure sidebar is visible by default
        sidebar.classList.add('open');
        
        // Always hide overlay on desktop
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Always allow scrolling on desktop
        document.body.style.overflow = '';
    } else {
        // On mobile, handle the overlay based on sidebar state
        if (sidebar.classList.contains('open')) {
            // If sidebar is open on mobile, show overlay
            if (overlay) overlay.classList.add('active');
            // Prevent body scrolling when sidebar is open
            document.body.style.overflow = 'hidden';
        } else {
            // If sidebar is closed on mobile, hide overlay
            if (overlay) overlay.classList.remove('active');
            // Allow body scrolling when sidebar is closed
            document.body.style.overflow = '';
        }
    }
}

// Navigation Functions
function showSection(sectionId) {
    // Prevent default behavior if called from an anchor
    if (event) event.preventDefault();
    
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    } else {
        console.error(`Section with ID "${sectionId}" not found`);
        return;
    }
    
    // Update sidebar active state
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => item.classList.remove('active'));
    const activeMenuItem = document.querySelector(`.sidebar-menu a[href="#${sectionId}"]`);
    if (activeMenuItem) {
        activeMenuItem.closest('li').classList.add('active');
    }
    
    // Update page title
    const titles = {
        'dashboard': 'Dashboard Overview',
        'users': 'User Management',
        'announcements': 'Announcements',
        'schedule': 'Room Schedule',
        'reports': 'Reports & Analytics',
        'settings': 'System Settings'
    };
    
    const pageTitle = document.getElementById('page-title');
    if (pageTitle && titles[sectionId]) {
        pageTitle.textContent = titles[sectionId];
    }
    
    // Close sidebar on mobile when a menu item is clicked
    if (window.innerWidth <= 1024) {
        // Small delay to allow the click event to complete first
        setTimeout(() => {
            toggleSidebar(false); // Force close
        }, 50);
    }
    
    // Scroll back to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleSidebar(forceState) {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    if (!sidebar) {
        console.error('Sidebar element not found');
        return;
    }
    
    console.log('Toggle sidebar called, forceState:', forceState);
    
    // Determine if we're opening or closing based on forceState or current state
    const shouldOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('open');
    const isDesktop = window.innerWidth > 1024;
    
    console.log('Should open:', shouldOpen, 'Is desktop:', isDesktop);
    
    if (shouldOpen) {
        // Open sidebar
        sidebar.classList.add('open');
        
        // Only add overlay and prevent scrolling on mobile
        if (!isDesktop) {
            if (overlay) {
                overlay.classList.add('active');
                // Ensure overlay is properly displayed
                overlay.style.display = 'block';
                // Force a reflow to ensure transitions work
                overlay.offsetHeight;
                // Then set opacity to 1
                overlay.style.opacity = '1';
            }
            body.style.overflow = 'hidden'; // Prevent scrolling
        }
    } else {
        // Close sidebar
        sidebar.classList.remove('open');
        
        // Hide overlay
        if (overlay) {
            overlay.classList.remove('active');
            // Animate opacity first
            overlay.style.opacity = '0';
            // Then hide after transition
            setTimeout(() => {
                if (!sidebar.classList.contains('open')) {
                    overlay.style.display = 'none';
                }
            }, 300); // Match the transition time in CSS
        }
        
        body.style.overflow = ''; // Allow scrolling
    }
    
    // Trigger window resize to ensure proper layout
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 50);
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

// Setup sidebar swipe gestures for mobile
let touchStartX = 0;
let touchMoveX = 0;

function setupSidebarSwipeGestures() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (!sidebar || !mainContent) {
        console.error('Sidebar or main content not found');
        return;
    }
    
    // Detect swipe right to open sidebar
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        touchMoveX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        const isDesktop = window.innerWidth > 1024;
        
        // Skip on desktop
        if (isDesktop) return;
        
        const swipeDistance = touchMoveX - touchStartX;
        const threshold = 100; // Minimum distance for swipe
        const edgeThreshold = 30; // Edge of screen threshold
        
        // Only process swipe if starting from near the left edge
        if (touchStartX <= edgeThreshold && swipeDistance > threshold) {
            // Right swipe from left edge - open sidebar
            toggleSidebar(true);
        } else if (sidebar.classList.contains('open') && swipeDistance < -threshold) {
            // Left swipe when sidebar is open - close sidebar
            toggleSidebar(false);
        }
        
        // Reset
        touchStartX = 0;
        touchMoveX = 0;
    }, { passive: true });
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
