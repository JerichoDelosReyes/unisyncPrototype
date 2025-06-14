// UNISYNC Faculty Mobile JavaScript

// Global state
let activeTab = 'dashboard';
let notifications = [
    {
        id: 1,
        title: 'New Assignment Submission',
        message: 'Juan Dela Cruz submitted Lab Report #3 for CS 123',
        time: '5 minutes ago',
        type: 'assignment',
        unread: true,
        icon: 'fas fa-user-check'
    },
    {
        id: 2,
        title: 'Class Starting Soon',
        message: 'CS 456 - Software Engineering starts in 30 minutes',
        time: '1 hour ago',
        type: 'reminder',
        unread: false,
        icon: 'fas fa-calendar-check'
    }
];

let announcements = [
    {
        id: 1,
        title: 'Midterm Exam Schedule Update',
        content: 'The midterm examination for CS 123 has been rescheduled to March 25, 2024, at 10:00 AM in Room 401.',
        targetClass: 'CS123',
        priority: 'important',
        status: 'published',
        views: 142,
        timestamp: '2 hours ago'
    },
    {
        id: 2,
        title: 'Lab Assignment #4 Guidelines',
        content: 'Detailed instructions for the upcoming data structures lab assignment focusing on tree implementations...',
        targetClass: 'CS123',
        priority: 'normal',
        status: 'draft',
        views: 0,
        timestamp: '1 day ago'
    }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    updateNotificationBadge();
    startTimeUpdates();
});

function initializeApp() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize current time display
    updateCurrentTime();
    
    // Simulate real-time updates
    simulateRealTimeUpdates();
    
    // Load initial data
    loadDashboardData();
}

function setupEventListeners() {
    // Chat input event listener
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function(e) {
            toggleDarkMode(e.target.checked);
        });
    }
    
    // Form submissions
    const announcementForm = document.querySelector('.announcement-form');
    if (announcementForm) {
        announcementForm.addEventListener('submit', function(e) {
            e.preventDefault();
            publishAnnouncement();
        });
    }
}

// Tab Navigation
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Activate corresponding nav item
    const selectedNavItem = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (selectedNavItem) {
        selectedNavItem.classList.add('active');
    }
    
    activeTab = tabName;
    
    // Trigger tab-specific actions
    switch(tabName) {
        case 'classes':
            loadClassData();
            break;
        case 'announcements':
            loadAnnouncementData();
            break;
        case 'schedule':
            loadScheduleData();
            break;
    }
}

// Dashboard Functions
function loadDashboardData() {
    console.log('Loading dashboard data...');
    // In a real app, this would fetch data from the server
}

function takeAttendance() {
    showToast('Opening attendance for current class...');
    
    // Simulate attendance taking
    setTimeout(() => {
        alert('Attendance Module\n\nCS 123 - Data Structures\n10:00 AM - 12:00 PM\n\nStudents Present: 32/35\n\nAbsent:\n- Maria Garcia\n- John Smith\n- Ana Rodriguez');
    }, 1000);
}

function createAnnouncement() {
    const modal = document.getElementById('announcement-modal');
    modal.classList.add('open');
    
    // Focus on title input
    setTimeout(() => {
        const titleInput = document.getElementById('announcement-title');
        if (titleInput) titleInput.focus();
    }, 300);
}

function viewGrades() {
    showToast('Loading grade book...');
    
    setTimeout(() => {
        alert('Grade Book Summary\n\nCS 123 - Data Structures:\nAverage: B+ (3.3)\nA: 8 students\nB: 15 students\nC: 10 students\nD: 2 students\n\nCS 456 - Software Engineering:\nAverage: A- (3.7)\nA: 12 students\nB: 10 students\nC: 5 students\nD: 1 student');
    }, 1000);
}

function findRoom() {
    showToast('Searching for available rooms...');
    
    setTimeout(() => {
        alert('Available Rooms Now:\n\n✓ Room 203 - Mathematics Building\n✓ Room 305 - Science Building\n✓ Room 405 - Engineering Building\n✓ Room 101 - Liberal Arts Building\n\nTap a room to reserve or get directions.');
    }, 1000);
}

// Classes Tab Functions
function loadClassData() {
    console.log('Loading class data...');
}

function manageClass(classCode) {
    showToast(`Loading management tools for ${classCode}...`);
    
    setTimeout(() => {
        alert(`${classCode} Management\n\nOptions:\n• Take Attendance\n• Post Announcement\n• Grade Assignments\n• View Analytics\n• Manage Students\n• Upload Materials`);
    }, 1000);
}

function viewStudents(classCode) {
    showToast(`Loading student list for ${classCode}...`);
    
    setTimeout(() => {
        alert(`${classCode} Students\n\n1. Juan Dela Cruz - 2021-00001\n2. Maria Santos - 2021-00002\n3. Jose Rizal - 2021-00003\n4. Anna Garcia - 2021-00004\n5. Pedro Penduko - 2021-00005\n\n...and 30 more students`);
    }, 1000);
}

// Announcements Functions
function loadAnnouncementData() {
    console.log('Loading announcement data...');
}

function filterAnnouncements(filter) {
    // Remove active class from all filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked filter
    event.target.classList.add('active');
    
    // Filter logic would go here
    console.log(`Filtering announcements by: ${filter}`);
    showToast(`Showing ${filter} announcements`);
}

function editAnnouncement(id) {
    const announcement = announcements.find(a => a.id === id);
    if (announcement) {
        // Populate form with existing data
        document.getElementById('announcement-title').value = announcement.title;
        document.getElementById('announcement-content').value = announcement.content;
        document.getElementById('target-class').value = announcement.targetClass;
        document.getElementById('announcement-priority').value = announcement.priority;
        
        // Open modal
        const modal = document.getElementById('announcement-modal');
        modal.classList.add('open');
        
        showToast('Editing announcement...');
    }
}

function publishAnnouncement(id = null) {
    const title = document.getElementById('announcement-title').value;
    const content = document.getElementById('announcement-content').value;
    const targetClass = document.getElementById('target-class').value;
    const priority = document.getElementById('announcement-priority').value;
    
    if (!title || !content) {
        showToast('Please fill in all required fields');
        return;
    }
    
    if (id) {
        // Update existing announcement
        const announcement = announcements.find(a => a.id === id);
        if (announcement) {
            announcement.status = 'published';
            showToast('Announcement published successfully!');
        }
    } else {
        // Create new announcement
        const newAnnouncement = {
            id: Date.now(),
            title,
            content,
            targetClass,
            priority,
            status: 'published',
            views: 0,
            timestamp: 'Just now'
        };
        announcements.unshift(newAnnouncement);
        showToast('Announcement published successfully!');
    }
    
    // Close modal and reset form
    closeModal('announcement-modal');
    document.querySelector('.announcement-form').reset();
}

function saveDraft() {
    const title = document.getElementById('announcement-title').value;
    const content = document.getElementById('announcement-content').value;
    const targetClass = document.getElementById('target-class').value;
    const priority = document.getElementById('announcement-priority').value;
    
    if (!title) {
        showToast('Please enter a title');
        return;
    }
    
    const draftAnnouncement = {
        id: Date.now(),
        title,
        content,
        targetClass,
        priority,
        status: 'draft',
        views: 0,
        timestamp: 'Just now'
    };
    
    announcements.unshift(draftAnnouncement);
    showToast('Draft saved successfully!');
    
    // Close modal and reset form
    closeModal('announcement-modal');
    document.querySelector('.announcement-form').reset();
}

function viewAnalytics(id) {
    const announcement = announcements.find(a => a.id === id);
    if (announcement) {
        showToast('Loading analytics...');
        
        setTimeout(() => {
            alert(`Announcement Analytics\n\n"${announcement.title}"\n\nViews: ${announcement.views}\nClicks: ${Math.floor(announcement.views * 0.7)}\nShares: ${Math.floor(announcement.views * 0.1)}\nRead Rate: ${Math.floor(Math.random() * 30 + 70)}%\n\nTop Viewing Times:\n• 10:00 AM - 12:00 PM\n• 2:00 PM - 4:00 PM`);
        }, 1000);
    }
}

function deleteAnnouncement(id) {
    if (confirm('Are you sure you want to delete this announcement?')) {
        const index = announcements.findIndex(a => a.id === id);
        if (index > -1) {
            announcements.splice(index, 1);
            showToast('Announcement deleted');
            
            // Remove from DOM
            const announcementElement = document.querySelector(`[data-id="${id}"]`);
            if (announcementElement) {
                announcementElement.remove();
            }
        }
    }
}

// Schedule Functions
function loadScheduleData() {
    console.log('Loading schedule data...');
}

function showScheduleView(view) {
    // Remove active class from all schedule buttons
    const scheduleButtons = document.querySelectorAll('.schedule-btn');
    scheduleButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Show corresponding view
    const views = document.querySelectorAll('.schedule-view');
    views.forEach(v => v.classList.remove('active'));
    
    const selectedView = document.getElementById(`${view}-view`);
    if (selectedView) {
        selectedView.classList.add('active');
    }
    
    showToast(`Showing ${view} view`);
}

function previousDay() {
    const currentDate = document.querySelector('.current-date');
    if (currentDate) {
        showToast('Loading previous day...');
        // In a real app, this would update with actual date logic
    }
}

function nextDay() {
    const currentDate = document.querySelector('.current-date');
    if (currentDate) {
        showToast('Loading next day...');
        // In a real app, this would update with actual date logic
    }
}

// Notification Functions
function toggleNotifications() {
    const panel = document.getElementById('notification-panel');
    panel.classList.toggle('open');
    
    if (panel.classList.contains('open')) {
        // Mark notifications as read when panel is opened
        setTimeout(() => {
            markAllNotificationsRead();
        }, 1000);
    }
}

function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    const unreadCount = notifications.filter(n => n.unread).length;
    
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

function dismissNotification(button) {
    const notificationItem = button.closest('.notification-item');
    const notificationId = parseInt(notificationItem.dataset.id);
    
    // Remove from notifications array
    notifications = notifications.filter(n => n.id !== notificationId);
    
    // Animate removal
    notificationItem.style.transform = 'translateX(100%)';
    notificationItem.style.opacity = '0';
    
    setTimeout(() => {
        notificationItem.remove();
        updateNotificationBadge();
    }, 300);
}

function markAllNotificationsRead() {
    notifications.forEach(n => n.unread = false);
    updateNotificationBadge();
    
    // Remove unread styling
    const unreadItems = document.querySelectorAll('.notification-item.unread');
    unreadItems.forEach(item => {
        item.classList.remove('unread');
    });
}

// Chatbot Functions
function toggleChatbot() {
    const chatbot = document.getElementById('mobile-chatbot');
    chatbot.classList.toggle('open');
    
    if (chatbot.classList.contains('open')) {
        // Focus on input when opened
        setTimeout(() => {
            const input = document.getElementById('chat-input');
            if (input) input.focus();
        }, 300);
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        addChatMessage(message, 'user');
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = generateBotResponse(message);
            addChatMessage(response, 'bot');
        }, 1000);
    }
}

function sendQuickMessage(message) {
    addChatMessage(message, 'user');
    
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const currentTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <span class="message-time">${currentTime}</span>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <span class="message-time">${currentTime}</span>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const responses = {
        'take attendance for cs 123': 'I\'ll help you take attendance for CS 123. The class has 35 enrolled students. Would you like me to mark everyone present first, then you can adjust for absences?',
        'show class statistics': 'Here are your class statistics:\n\nCS 123: 35 students, 92% attendance, B+ average\nCS 456: 28 students, 85% attendance, A- average\n\nOverall performance is excellent!',
        'find available room': 'Available rooms right now:\n\n✓ Room 203 - Mathematics Building\n✓ Room 305 - Science Building\n✓ Room 405 - Engineering Building\n\nWould you like directions to any of these?',
        'class schedule': 'Your schedule for today:\n\n10:00 AM - CS 123 (Room 401) - Currently in progress\n2:00 PM - CS 456 (Room 502) - Starting soon\n\nAll classes are on track!',
        'student performance': 'Your students are performing well overall. CS 123 has a class average of B+, while CS 456 has an A- average. Would you like detailed analytics for any specific student?',
        'help': 'I can help you with:\n• Taking attendance\n• Creating announcements\n• Viewing class statistics\n• Finding available rooms\n• Managing assignments\n• Student performance analytics'
    };
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Find matching response
    for (const [key, response] of Object.entries(responses)) {
        if (lowerMessage.includes(key.toLowerCase())) {
            return response;
        }
    }
    
    // Default responses
    const defaultResponses = [
        'I\'m here to help with your teaching tasks! Try asking about attendance, class statistics, or room availability.',
        'How can I assist you with your classes today? I can help with attendance, announcements, grades, and more.',
        'Let me help you manage your classes more efficiently. What would you like to do?',
        'Try asking: "Take attendance for CS 123" or "Show class statistics"'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Modal Functions
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('open');
}

// Utility Functions
function toggleUserMenu() {
    showToast('User menu would open here');
}

function toggleDarkMode(enabled) {
    if (enabled) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
        showToast('Dark mode enabled');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
        showToast('Dark mode disabled');
    }
}

function showToast(message, duration = 3000) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 10000;
        max-width: 80%;
        text-align: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideUp 0.3s ease;
        white-space: pre-line;
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after duration
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, duration);
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    // Update greeting based on time
    const hour = now.getHours();
    let greeting = 'Good morning,';
    
    if (hour >= 12 && hour < 18) {
        greeting = 'Good afternoon,';
    } else if (hour >= 18) {
        greeting = 'Good evening,';
    }
    
    const greetingElement = document.querySelector('.greeting');
    if (greetingElement) {
        greetingElement.textContent = greeting;
    }
}

function startTimeUpdates() {
    // Update time every minute
    setInterval(updateCurrentTime, 60000);
    
    // Update class status every 5 minutes
    setInterval(updateClassStatus, 300000);
}

function updateClassStatus() {
    // Simulate real-time class status updates
    const now = new Date();
    const currentHour = now.getHours();
    
    // Example: Update current class status
    if (currentHour >= 10 && currentHour < 12) {
        const classCard = document.querySelector('.class-card.current .class-status span');
        if (classCard) {
            const endTime = new Date();
            endTime.setHours(12, 0, 0, 0);
            const minutesLeft = Math.floor((endTime - now) / 60000);
            
            if (minutesLeft > 0) {
                classCard.textContent = `Ends in ${minutesLeft} min`;
            }
        }
    }
}

function simulateRealTimeUpdates() {
    // Simulate receiving new notifications
    setTimeout(() => {
        addNewNotification({
            id: Date.now(),
            title: 'New Assignment Submission',
            message: 'Ana Garcia submitted Project Proposal for CS 456',
            time: 'Just now',
            type: 'assignment',
            unread: true,
            icon: 'fas fa-file-upload'
        });
    }, 45000); // After 45 seconds
    
    // Simulate class reminders
    setTimeout(() => {
        addNewNotification({
            id: Date.now() + 1,
            title: 'Class Reminder',
            message: 'CS 456 - Software Engineering starts in 15 minutes',
            time: 'Just now',
            type: 'reminder',
            unread: true,
            icon: 'fas fa-bell'
        });
    }, 90000); // After 1.5 minutes
}

function addNewNotification(notification) {
    notifications.unshift(notification);
    updateNotificationBadge();
    
    // Show toast for new notification
    showToast(`New: ${notification.title}`);
    
    // Add to notification panel if it exists
    const notificationsList = document.querySelector('.notifications-list');
    if (notificationsList) {
        const notificationElement = createNotificationElement(notification);
        notificationsList.insertBefore(notificationElement, notificationsList.firstChild);
    }
}

function createNotificationElement(notification) {
    const div = document.createElement('div');
    div.className = `notification-item ${notification.unread ? 'unread' : ''}`;
    div.dataset.id = notification.id;
    
    div.innerHTML = `
        <div class="notification-icon">
            <i class="${notification.icon}"></i>
        </div>
        <div class="notification-content">
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
            <span class="notification-time">${notification.time}</span>
        </div>
        <button class="dismiss-btn" onclick="dismissNotification(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    return div;
}

// Handle back button on mobile
window.addEventListener('popstate', function(event) {
    // Close any open panels or modals
    const openPanels = document.querySelectorAll('.notification-panel.open, .mobile-chatbot.open, .modal.open');
    openPanels.forEach(panel => {
        panel.classList.remove('open');
    });
});

// Prevent default behavior for certain touch events
document.addEventListener('touchstart', function(e) {
    // Prevent double-tap zoom on buttons
    if (e.target.matches('button, .nav-item, .action-btn')) {
        e.preventDefault();
    }
}, { passive: false });

// Handle orientation changes
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Recalculate layouts if needed
        console.log('Orientation changed');
    }, 100);
});

// Export functions for global access
window.showTab = showTab;
window.takeAttendance = takeAttendance;
window.createAnnouncement = createAnnouncement;
window.viewGrades = viewGrades;
window.findRoom = findRoom;
window.manageClass = manageClass;
window.viewStudents = viewStudents;
window.filterAnnouncements = filterAnnouncements;
window.editAnnouncement = editAnnouncement;
window.publishAnnouncement = publishAnnouncement;
window.saveDraft = saveDraft;
window.viewAnalytics = viewAnalytics;
window.deleteAnnouncement = deleteAnnouncement;
window.showScheduleView = showScheduleView;
window.previousDay = previousDay;
window.nextDay = nextDay;
window.toggleNotifications = toggleNotifications;
window.dismissNotification = dismissNotification;
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;
window.closeModal = closeModal;
window.toggleUserMenu = toggleUserMenu;
