// Admin Mobile Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileDashboard();
});

function initializeMobileDashboard() {
    setupBottomNavigation();
    setupNotificationPanel();
    setupChatbot();
    setupQuickActions();
    loadDashboardData();
    setupSystemMonitoring();
}

// Bottom Navigation Handler
function setupBottomNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            navTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Handle tab-specific actions
            const tabType = this.getAttribute('data-tab');
            handleTabSwitch(tabType);
        });
    });
}

function handleTabSwitch(tabType) {
    // Hide all content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show relevant content based on tab
    switch(tabType) {
        case 'dashboard':
            showDashboardContent();
            break;
        case 'users':
            showUsersContent();
            break;
        case 'reports':
            showReportsContent();
            break;
        case 'settings':
            showSettingsContent();
            break;
        case 'system':
            showSystemContent();
            break;
    }
}

function showDashboardContent() {
    document.getElementById('dashboard-content').style.display = 'block';
    loadQuickStats();
}

function showUsersContent() {
    // Show user management interface
    console.log('Switching to Users tab');
}

function showReportsContent() {
    // Show reports interface
    console.log('Switching to Reports tab');
}

function showSettingsContent() {
    // Show settings interface
    console.log('Switching to Settings tab');
}

function showSystemContent() {
    // Show system monitoring interface
    console.log('Switching to System tab');
}

// Notification Panel
function setupNotificationPanel() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationPanel = document.querySelector('.notification-panel');
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.3);
        z-index: 150;
        display: none;
    `;
    document.body.appendChild(overlay);
    
    notificationBtn.addEventListener('click', function() {
        notificationPanel.classList.toggle('active');
        overlay.style.display = notificationPanel.classList.contains('active') ? 'block' : 'none';
    });
    
    overlay.addEventListener('click', function() {
        notificationPanel.classList.remove('active');
        overlay.style.display = 'none';
    });
    
    loadNotifications();
}

function loadNotifications() {
    const notificationList = document.querySelector('.notification-list');
    const notifications = [
        {
            id: 1,
            icon: '🚨',
            title: 'System Alert',
            message: 'Server maintenance scheduled for tonight at 2 AM',
            time: '5 minutes ago',
            unread: true
        },
        {
            id: 2,
            icon: '👥',
            title: 'New User Registration',
            message: '15 new students registered today',
            time: '1 hour ago',
            unread: true
        },
        {
            id: 3,
            icon: '📊',
            title: 'Weekly Report Ready',
            message: 'System usage report for this week is available',
            time: '2 hours ago',
            unread: false
        },
        {
            id: 4,
            icon: '🔧',
            title: 'System Update',
            message: 'UNISYNC v2.1.0 deployed successfully',
            time: '1 day ago',
            unread: false
        },
        {
            id: 5,
            icon: '⚠️',
            title: 'Storage Warning',
            message: 'Database storage is 85% full',
            time: '2 days ago',
            unread: false
        }
    ];
    
    notificationList.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.unread ? 'unread' : ''}" data-id="${notification.id}">
            <div class="notification-icon">${notification.icon}</div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers for notifications
    document.querySelectorAll('.notification-item').forEach(item => {
        item.addEventListener('click', function() {
            const notificationId = this.getAttribute('data-id');
            handleNotificationClick(notificationId);
            this.classList.remove('unread');
        });
    });
    
    // Update notification badge
    const unreadCount = notifications.filter(n => n.unread).length;
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

function handleNotificationClick(notificationId) {
    console.log('Notification clicked:', notificationId);
    // Handle specific notification actions
}

// Chatbot Functionality
function setupChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSend = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');
    
    chatbotToggle.addEventListener('click', function() {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            initializeChatbot();
        }
    });
    
    chatbotSend.addEventListener('click', function() {
        sendMessage();
    });
    
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const response = generateBotResponse(message);
                addMessage(response, 'bot');
            }, 1000);
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function generateBotResponse(userMessage) {
        const responses = {
            'hello': 'Hi! I\'m your UNISYNC assistant. How can I help you manage the system today?',
            'users': 'I can help you with user management. You currently have 1,247 active users. Would you like to see recent registrations or user statistics?',
            'system': 'System status: All services are running normally. Database: 85% capacity. Server uptime: 99.9%. Any specific system metrics you\'d like to check?',
            'reports': 'I can generate various reports for you. Popular options: User Activity Report, System Usage Report, Performance Analytics. Which would you prefer?',
            'help': 'I can assist with: User Management, System Monitoring, Reports Generation, Security Alerts, and General Admin Tasks. What do you need help with?',
            'default': 'I understand you\'re asking about admin tasks. Could you be more specific? I can help with users, system status, reports, or other administrative functions.'
        };
        
        const lowerMessage = userMessage.toLowerCase();
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        return responses.default;
    }
}

function initializeChatbot() {
    const chatbotMessages = document.querySelector('.chatbot-messages');
    if (chatbotMessages.children.length === 0) {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'message bot';
        welcomeMessage.textContent = 'Welcome to UNISYNC Admin Assistant! I can help you with user management, system monitoring, and reports. How can I assist you today?';
        chatbotMessages.appendChild(welcomeMessage);
    }
}

// Quick Actions
function setupQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
        });
    });
}

function handleQuickAction(action) {
    switch(action) {
        case 'add-user':
            showAddUserModal();
            break;
        case 'system-health':
            showSystemHealthModal();
            break;
        case 'backup':
            initiateBackup();
            break;
        case 'reports':
            showReportsModal();
            break;
        case 'logs':
            showSystemLogs();
            break;
        case 'settings':
            showSettingsModal();
            break;
        default:
            console.log('Quick action:', action);
    }
}

function showAddUserModal() {
    alert('Add User functionality would open here');
}

function showSystemHealthModal() {
    alert('System Health Dashboard would open here');
}

function initiateBackup() {
    if (confirm('Start system backup now? This may take several minutes.')) {
        showToast('Backup initiated successfully', 'success');
        // Simulate backup progress
        setTimeout(() => {
            showToast('System backup completed', 'success');
        }, 3000);
    }
}

function showReportsModal() {
    alert('Reports Generator would open here');
}

function showSystemLogs() {
    alert('System Logs viewer would open here');
}

function showSettingsModal() {
    alert('System Settings would open here');
}

// Dashboard Data Loading
function loadDashboardData() {
    loadQuickStats();
    loadRecentActivity();
    loadSystemStatus();
}

function loadQuickStats() {
    // Simulate API call with realistic admin data
    const stats = {
        totalUsers: 1247,
        activeUsers: 1156,
        systemUptime: '99.9%',
        storageUsed: '85%'
    };
    
    // Update stat cards with animation
    updateStatCard('total-users', stats.totalUsers);
    updateStatCard('active-users', stats.activeUsers);
    updateStatCard('system-uptime', stats.systemUptime);
    updateStatCard('storage-used', stats.storageUsed);
}

function updateStatCard(cardId, value) {
    const card = document.getElementById(cardId);
    if (card) {
        const numberElement = card.querySelector('.stat-number');
        if (numberElement) {
            // Animate number counting
            animateNumber(numberElement, value);
        }
    }
}

function animateNumber(element, finalValue) {
    const isPercentage = typeof finalValue === 'string' && finalValue.includes('%');
    const isUptime = typeof finalValue === 'string' && finalValue.includes('.');
    
    if (isPercentage || isUptime) {
        element.textContent = finalValue;
        return;
    }
    
    const duration = 1000;
    const startValue = 0;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(startValue + (finalValue - startValue) * progress);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function loadRecentActivity() {
    const activities = [
        {
            icon: '👤',
            title: 'New user registered',
            time: '2 minutes ago'
        },
        {
            icon: '🔧',
            title: 'System configuration updated',
            time: '15 minutes ago'
        },
        {
            icon: '📊',
            title: 'Daily report generated',
            time: '1 hour ago'
        },
        {
            icon: '🔒',
            title: 'Security scan completed',
            time: '2 hours ago'
        },
        {
            icon: '💾',
            title: 'Database backup created',
            time: '4 hours ago'
        }
    ];
    
    const activityContainer = document.querySelector('.activity-list');
    if (activityContainer) {
        activityContainer.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">${activity.icon}</div>
                <div class="activity-details">
                    <div class="activity-title">${activity.title}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }
}

function loadSystemStatus() {
    const statusItems = [
        { label: 'Web Server', status: 'online' },
        { label: 'Database', status: 'online' },
        { label: 'File Storage', status: 'warning' },
        { label: 'Email Service', status: 'online' },
        { label: 'Backup System', status: 'online' }
    ];
    
    const statusContainer = document.querySelector('.status-list');
    if (statusContainer) {
        statusContainer.innerHTML = statusItems.map(item => `
            <div class="status-item">
                <span class="status-label">${item.label}</span>
                <span class="status-indicator status-${item.status}">
                    ${item.status}
                </span>
            </div>
        `).join('');
    }
}

// System Monitoring
function setupSystemMonitoring() {
    // Real-time updates every 30 seconds
    setInterval(() => {
        updateSystemMetrics();
    }, 30000);
}

function updateSystemMetrics() {
    // Simulate real-time system updates
    const newActiveUsers = 1156 + Math.floor(Math.random() * 20) - 10;
    updateStatCard('active-users', newActiveUsers);
    
    // Update activity feed with new items occasionally
    if (Math.random() < 0.3) {
        addNewActivity();
    }
}

function addNewActivity() {
    const newActivities = [
        { icon: '👤', title: 'User login detected', time: 'Just now' },
        { icon: '📝', title: 'New announcement posted', time: 'Just now' },
        { icon: '🏠', title: 'Room booking created', time: 'Just now' },
        { icon: '📧', title: 'Email notification sent', time: 'Just now' }
    ];
    
    const randomActivity = newActivities[Math.floor(Math.random() * newActivities.length)];
    const activityContainer = document.querySelector('.activity-list');
    
    if (activityContainer) {
        const newItem = document.createElement('div');
        newItem.className = 'activity-item';
        newItem.innerHTML = `
            <div class="activity-icon">${randomActivity.icon}</div>
            <div class="activity-details">
                <div class="activity-title">${randomActivity.title}</div>
                <div class="activity-time">${randomActivity.time}</div>
            </div>
        `;
        newItem.style.background = '#f0fff4';
        
        activityContainer.insertBefore(newItem, activityContainer.firstChild);
        
        // Remove highlight after 3 seconds
        setTimeout(() => {
            newItem.style.background = '';
        }, 3000);
        
        // Keep only latest 5 activities
        if (activityContainer.children.length > 5) {
            activityContainer.removeChild(activityContainer.lastChild);
        }
    }
}

// Utility Functions
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        z-index: 1000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
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
