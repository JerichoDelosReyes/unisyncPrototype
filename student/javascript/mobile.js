// UNISYNC Student Mobile JavaScript

// Global state
let activeTab = 'dashboard';
let notifications = [
    {
        id: 1,
        title: 'Final Exam Schedule',
        message: 'Your final exam schedule has been updated',
        time: '2 hours ago',
        type: 'priority',
        unread: true,
        icon: 'fas fa-exclamation-circle'
    },
    {
        id: 2,
        title: 'Class Reminder',
        message: 'MATH 101 starts in 30 minutes',
        time: '1 hour ago',
        type: 'reminder',
        unread: false,
        icon: 'fas fa-clock'
    },
    {
        id: 3,
        title: 'Library Hours Extended',
        message: 'Library will be open 24/7 during finals week',
        time: '1 day ago',
        type: 'info',
        unread: false,
        icon: 'fas fa-info-circle'
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
    
    // Check for push notification support
    checkNotificationSupport();
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
    
    // Room search event listener
    const roomSearch = document.getElementById('room-search');
    if (roomSearch) {
        roomSearch.addEventListener('input', function(e) {
            filterRooms(e.target.value);
        });
    }
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function(e) {
            toggleDarkMode(e.target.checked);
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
        case 'schedule':
            loadScheduleData();
            break;
        case 'announcements':
            loadAnnouncements();
            break;
        case 'rooms':
            loadRoomData();
            break;
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
        'where is room 401': 'Room 401 is located on the 4th floor of the Engineering Building. Take the main elevator and turn left when you exit.',
        'what\'s my next class': 'Your next class is MATH 101 - Calculus I at 1:00 PM in Room 205, Mathematics Building.',
        'show my grades': 'Your current GPA is 3.75. CS 123: A-, MATH 101: B+, ENG 101: A. Would you like more details?',
        'library hours': 'The library is open 24/7 during finals week. Regular hours: Mon-Fri 7AM-10PM, Weekends 9AM-8PM.',
        'schedule': 'Here\'s your schedule for today: CS 123 at 10:00 AM, MATH 101 at 1:00 PM, ENG 101 at 3:30 PM.',
        'help': 'I can help you with: finding rooms, checking your schedule, viewing grades, library information, and more!'
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
        'I\'m here to help! Try asking about your schedule, room locations, or grades.',
        'Let me assist you with that. Could you be more specific?',
        'I can help you find information about classes, rooms, grades, and campus services.',
        'Try asking: "Where is room 401?" or "What\'s my next class?"'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Schedule Functions
function showDay(day) {
    // Remove active class from all day buttons
    const dayButtons = document.querySelectorAll('.day-btn');
    dayButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Hide all day schedules
    const daySchedules = document.querySelectorAll('.day-schedule');
    daySchedules.forEach(schedule => schedule.classList.remove('active'));
    
    // Show selected day schedule
    const selectedSchedule = document.getElementById(`${day}-schedule`);
    if (selectedSchedule) {
        selectedSchedule.classList.add('active');
    }
}

function previousWeek() {
    // Simulate week navigation
    const weekDisplay = document.querySelector('.current-week');
    if (weekDisplay) {
        const currentText = weekDisplay.textContent;
        // In a real app, this would update with actual date logic
        showToast('Previous week loaded');
    }
}

function nextWeek() {
    // Simulate week navigation
    const weekDisplay = document.querySelector('.current-week');
    if (weekDisplay) {
        const currentText = weekDisplay.textContent;
        // In a real app, this would update with actual date logic
        showToast('Next week loaded');
    }
}

function loadScheduleData() {
    // Simulate loading schedule data
    console.log('Loading schedule data...');
}

// Announcements Functions
function filterAnnouncements(filter) {
    // Remove active class from all filter pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => pill.classList.remove('active'));
    
    // Add active class to clicked filter
    event.target.classList.add('active');
    
    // Filter logic would go here
    console.log(`Filtering announcements by: ${filter}`);
}

function toggleBookmark(button) {
    button.classList.toggle('bookmarked');
    const icon = button.querySelector('i');
    
    if (button.classList.contains('bookmarked')) {
        icon.className = 'fas fa-bookmark';
        showToast('Announcement bookmarked');
    } else {
        icon.className = 'far fa-bookmark';
        showToast('Bookmark removed');
    }
}

function expandAnnouncement(button) {
    const content = button.closest('.announcement-item').querySelector('.announcement-content p');
    
    if (content.style.webkitLineClamp === 'none') {
        content.style.webkitLineClamp = '2';
        button.textContent = 'Read More';
    } else {
        content.style.webkitLineClamp = 'none';
        button.textContent = 'Read Less';
    }
}

function loadAnnouncements() {
    // Simulate loading announcements
    console.log('Loading announcements...');
}

// Room Functions
function filterBuilding(building) {
    // Remove active class from all building buttons
    const buildingButtons = document.querySelectorAll('.building-btn');
    buildingButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Filter logic would go here
    console.log(`Filtering rooms by building: ${building}`);
}

function filterRooms(searchTerm) {
    const roomCards = document.querySelectorAll('.room-card');
    
    roomCards.forEach(card => {
        const roomInfo = card.querySelector('.room-info').textContent.toLowerCase();
        const isVisible = roomInfo.includes(searchTerm.toLowerCase());
        
        card.style.display = isVisible ? 'block' : 'none';
    });
}

function getDirections(roomNumber) {
    // Simulate getting directions
    const directions = {
        '401': 'From main entrance: Take elevator to 4th floor, turn left, room 401 is the 3rd door on your right.',
        '205': 'From main entrance: Go to Mathematics Building, 2nd floor, turn right, room 205 is at the end of the hall.',
        '301': 'From main entrance: Go to Science Building, 3rd floor, turn left, room 301 is the 5th door on your left.'
    };
    
    const direction = directions[roomNumber] || 'Directions not available for this room.';
    showToast(direction, 5000);
}

function viewRoomSchedule(roomNumber) {
    // Simulate viewing room schedule
    showToast(`Loading schedule for Room ${roomNumber}...`);
    
    // In a real app, this would open a modal or navigate to schedule view
    setTimeout(() => {
        alert(`Room ${roomNumber} Schedule:\n\n8:00 AM - 10:00 AM: Available\n10:00 AM - 12:00 PM: CS 123\n12:00 PM - 1:00 PM: Available\n1:00 PM - 2:30 PM: MATH 201\n2:30 PM - 5:00 PM: Available`);
    }, 500);
}

function loadRoomData() {
    // Simulate loading room data
    console.log('Loading room data...');
}

// QR Code Functions
function showQRCode() {
    const modal = document.getElementById('qr-modal');
    modal.classList.add('open');
    
    // In a real app, generate actual QR code here
    console.log('Showing QR code for student');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('open');
}

// More Tab Functions
function showGrades() {
    showToast('Loading grades...');
    
    // Simulate navigation to grades view
    setTimeout(() => {
        alert('Current Grades:\n\nCS 123 - Data Structures: A- (92%)\nMATH 101 - Calculus I: B+ (87%)\nENG 101 - Technical Writing: A (95%)\n\nCurrent GPA: 3.75');
    }, 500);
}

function toggleUserMenu() {
    // Simulate user menu toggle
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

// Utility Functions
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
    const currentMinute = now.getMinutes();
    
    // Example: Update "current class" status
    const currentClassCard = document.querySelector('.status-card.current-class .card-detail');
    if (currentClassCard && currentHour >= 10 && currentHour < 12) {
        const endTime = new Date();
        endTime.setHours(12, 0, 0, 0);
        const minutesLeft = Math.floor((endTime - now) / 60000);
        
        if (minutesLeft > 0) {
            currentClassCard.textContent = `Room 401 • Ends in ${minutesLeft} min`;
        }
    }
}

function simulateRealTimeUpdates() {
    // Simulate receiving new notifications
    setTimeout(() => {
        addNewNotification({
            id: Date.now(),
            title: 'Assignment Reminder',
            message: 'CS 123 Lab Report due tomorrow',
            time: 'Just now',
            type: 'reminder',
            unread: true,
            icon: 'fas fa-file-alt'
        });
    }, 30000); // After 30 seconds
    
    // Simulate class status changes
    setTimeout(() => {
        updateNextClassStatus();
    }, 60000); // After 1 minute
}

function addNewNotification(notification) {
    notifications.unshift(notification);
    updateNotificationBadge();
    
    // Show toast for new notification
    showToast(`New notification: ${notification.title}`);
    
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
        <div class="notification-icon ${notification.type === 'priority' ? 'priority' : ''}">
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

function updateNextClassStatus() {
    const nextClassCard = document.querySelector('.status-card.next-class .card-detail');
    if (nextClassCard) {
        const now = new Date();
        const nextClassTime = new Date();
        nextClassTime.setHours(13, 0, 0, 0); // 1:00 PM
        
        const minutesUntil = Math.floor((nextClassTime - now) / 60000);
        
        if (minutesUntil > 0 && minutesUntil <= 60) {
            nextClassCard.textContent = `Room 205 • In ${minutesUntil} min`;
        }
    }
}

function checkNotificationSupport() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        // Request notification permission
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }
}

// Handle back button on mobile
window.addEventListener('popstate', function(event) {
    // Close any open panels
    const openPanels = document.querySelectorAll('.notification-panel.open, .mobile-chatbot.open');
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

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Export functions for global access
window.showTab = showTab;
window.toggleNotifications = toggleNotifications;
window.dismissNotification = dismissNotification;
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;
window.sendQuickMessage = sendQuickMessage;
window.showDay = showDay;
window.previousWeek = previousWeek;
window.nextWeek = nextWeek;
window.filterAnnouncements = filterAnnouncements;
window.toggleBookmark = toggleBookmark;
window.expandAnnouncement = expandAnnouncement;
window.filterBuilding = filterBuilding;
window.getDirections = getDirections;
window.viewRoomSchedule = viewRoomSchedule;
window.showQRCode = showQRCode;
window.closeModal = closeModal;
window.showGrades = showGrades;
window.toggleUserMenu = toggleUserMenu;
