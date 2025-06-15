// Student Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeStudentDashboard();
    initializeChatbot();
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
});

// Global state
let currentSection = 'dashboard';
let currentWeek = new Date();
let notifications = [];
let chatMessages = [];

// Initialize Student Dashboard
function initializeStudentDashboard() {
    // Load initial data
    loadDashboardData();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize filters
    initializeFilters();
    
    // Load notifications
    loadNotifications();
}

function setupEventListeners() {
    // Global search
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performGlobalSearch(this.value);
            }
        });
    }

    // Chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Room search
    const roomSearch = document.getElementById('roomSearch');
    if (roomSearch) {
        roomSearch.addEventListener('input', function() {
            filterRooms(this.value);
        });
    }

    // Filter listeners
    const buildingFilter = document.getElementById('buildingFilter');
    const floorFilter = document.getElementById('floorFilter');
    const availabilityFilter = document.getElementById('availabilityFilter');

    if (buildingFilter) buildingFilter.addEventListener('change', applyRoomFilters);
    if (floorFilter) floorFilter.addEventListener('change', applyRoomFilters);
    if (availabilityFilter) availabilityFilter.addEventListener('change', applyRoomFilters);

    // Close panels when clicking outside
    document.addEventListener('click', function(e) {
        closeOpenPanels(e);
    });
}

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation active state
    const navItems = document.querySelectorAll('.nav-item, .nav-tab');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Find and activate the clicked nav item
    const activeNavs = document.querySelectorAll(`[href="#${sectionId}"]`);
    activeNavs.forEach(nav => nav.classList.add('active'));
    
    // Update current section
    currentSection = sectionId;
    
    // Load section-specific data
    loadSectionData(sectionId);
    
    // Close mobile menu if open
    closeMobileMenu();
}

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'announcements':
            loadAnnouncements();
            break;
        case 'schedule':
            loadSchedule();
            break;
        case 'rooms':
            loadRooms();
            break;
    }
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (window.innerWidth <= 768) {
        mobileNav.style.display = 'none';
    }
}

// Dashboard Functions
function loadDashboardData() {
    console.log('Loading dashboard data...');
    updateCurrentTime();
    highlightCurrentClass();
}

function updateCurrentTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Update welcome message based on time
    const welcomeText = document.querySelector('.welcome-text h1');
    if (welcomeText) {
        let greeting = 'Good morning';
        if (currentHour >= 12 && currentHour < 18) {
            greeting = 'Good afternoon';
        } else if (currentHour >= 18) {
            greeting = 'Good evening';
        }
        welcomeText.textContent = `${greeting}, Jericho! 👋`;
    }
    
    // Update current class indicator
    highlightCurrentClass();
}

function highlightCurrentClass() {
    const scheduleItems = document.querySelectorAll('.schedule-item');
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Convert to minutes
    
    // Define class times (in minutes from midnight)
    const classTimes = [
        { start: 8 * 60, end: 9.5 * 60, element: scheduleItems[0] },
        { start: 10 * 60, end: 11.5 * 60, element: scheduleItems[1] },
        { start: 14 * 60, end: 15.5 * 60, element: scheduleItems[2] }
    ];
    
    // Reset all classes
    scheduleItems.forEach(item => {
        item.classList.remove('current', 'upcoming');
    });
    
    // Find current and next classes
    let currentClass = null;
    let nextClass = null;
    
    for (let i = 0; i < classTimes.length; i++) {
        const classTime = classTimes[i];
        if (currentTime >= classTime.start && currentTime <= classTime.end) {
            currentClass = classTime;
            break;
        } else if (currentTime < classTime.start) {
            nextClass = classTime;
            break;
        }
    }
    
    if (currentClass && currentClass.element) {
        currentClass.element.classList.add('current');
    } else if (nextClass && nextClass.element) {
        nextClass.element.classList.add('upcoming');
    }
}

// Quick Actions
function findRoom() {
    showSection('rooms');
    const roomSearch = document.getElementById('roomSearch');
    if (roomSearch) {
        roomSearch.focus();
    }
}

function checkSchedule() {
    showSection('schedule');
}

function viewGrades() {
    alert('Grades viewer would open here. This would typically redirect to a grades management system.');
}

function contactSupport() {
    toggleChatbot();
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.value = 'I need help with...';
        chatInput.focus();
    }
}

// Announcements Functions
function loadAnnouncements() {
    console.log('Loading announcements...');
}

function toggleOrganizationsFilter() {
    const filterPanel = document.getElementById('organizationsFilter');
    
    if (filterPanel.style.display === 'block') {
        // Hide the panel with animation
        filterPanel.classList.add('closing');
        setTimeout(() => {
            filterPanel.style.display = 'none';
            filterPanel.classList.remove('closing');
        }, 280);
    } else {
        // Show the panel
        filterPanel.style.display = 'block';
    }
    
    // Update active state of the Organizations filter button
    const filterTabs = document.querySelectorAll('.filter-tab');
    const orgTab = Array.from(filterTabs).find(tab => tab.innerText.includes('Organizations'));
    
    if (filterPanel.style.display === 'block') {
        filterTabs.forEach(tab => tab.classList.remove('active'));
        orgTab.classList.add('active');
    }
}

// Update filterAnnouncements to handle organization filtering
function filterAnnouncements(category) {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    // Don't add active class if toggling organizations filter
    if (category !== 'orgFilter') {
        filterTabs.forEach(tab => tab.classList.remove('active'));
        
        // Find the button that was clicked
        if (event && event.target) {
            // If it's the organizations filter button, don't add active class here
            if (!event.target.innerText.includes('Organizations')) {
                event.target.classList.add('active');
            }
        } else {
            // Find the appropriate tab if event.target is not available
            const tabToActivate = Array.from(filterTabs).find(tab => {
                if (category === 'all' && tab.innerText.trim() === 'All') return true;
                if (category === 'important' && tab.innerText.trim() === 'Important') return true;
                if (category === 'academic' && tab.innerText.trim() === 'Academic') return true;
                if (category === 'general' && tab.innerText.trim() === 'General') return true;
                return false;
            });
            if (tabToActivate) tabToActivate.classList.add('active');
        }
    }
    
    const announcementCards = document.querySelectorAll('.announcement-card');
    
    // Handle organization filter panel visibility
    const orgFilterPanel = document.getElementById('organizationsFilter');
    
    // If selecting a non-organization filter, hide the organization panel
    if (category !== 'orgFilter' && !['csg', 'bits', 'bms', 'cc', 'chts', 'cyle', 'csc', 'edge', 'sikolohiya', 'yopa', 'sinagtala', 'flare', 'honor'].includes(category)) {
        if (orgFilterPanel.style.display === 'block') {
            orgFilterPanel.classList.add('closing');
            setTimeout(() => {
                orgFilterPanel.style.display = 'none';
                orgFilterPanel.classList.remove('closing');
            }, 280);
        }
    }
    
    if (category === 'all') {
        announcementCards.forEach(card => card.style.display = 'block');
    } else {
        announcementCards.forEach(card => {
            if (card.classList.contains(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

function toggleView(viewType) {
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.view-btn').classList.add('active');
    
    const container = document.getElementById('announcementsContainer');
    if (viewType === 'grid') {
        container.classList.add('grid-view');
    } else {
        container.classList.remove('grid-view');
    }
}

function toggleBookmark(button) {
    button.classList.toggle('bookmarked');
    const icon = button.querySelector('i');
    
    if (button.classList.contains('bookmarked')) {
        icon.className = 'fas fa-bookmark';
        showNotification('Announcement bookmarked', 'success');
    } else {
        icon.className = 'far fa-bookmark';
        showNotification('Bookmark removed', 'info');
    }
}

function readMore(button) {
    const card = button.closest('.announcement-card');
    const title = card.querySelector('h3').textContent;
    alert(`Full announcement for "${title}" would be displayed in a modal or new page.`);
}

function shareAnnouncement(button) {
    const card = button.closest('.announcement-card');
    const title = card.querySelector('h3').textContent;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Check out this announcement from UNISYNC',
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(`${title} - ${window.location.href}`).then(() => {
            showNotification('Link copied to clipboard', 'success');
        });
    }
}

// Schedule Functions
function loadSchedule() {
    console.log('Loading schedule...');
    updateScheduleHeader();
}

function changeWeek(direction) {
    currentWeek.setDate(currentWeek.getDate() + (direction * 7));
    updateScheduleHeader();
    loadScheduleForWeek();
}

function updateScheduleHeader() {
    const weekStart = new Date(currentWeek);
    weekStart.setDate(currentWeek.getDate() - currentWeek.getDay() + 1); // Monday
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Sunday
    
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const startStr = weekStart.toLocaleDateString('en-US', options);
    const endStr = weekEnd.toLocaleDateString('en-US', options);
    
    const currentWeekElement = document.querySelector('.current-week');
    if (currentWeekElement) {
        currentWeekElement.textContent = `${startStr} - ${endStr}`;
    }
}

function loadScheduleForWeek() {
    // This would typically fetch data for the selected week
    console.log('Loading schedule for week:', currentWeek);
}

function exportSchedule() {
    alert('Schedule export functionality would be implemented here. Options: PDF, ICS, etc.');
}

// Room Functions
function loadRooms() {
    console.log('Loading rooms...');
}

function filterRooms(searchTerm) {
    const roomCards = document.querySelectorAll('.room-card');
    
    roomCards.forEach(card => {
        const roomName = card.querySelector('h3').textContent.toLowerCase();
        const roomLocation = card.querySelector('.room-info p').textContent.toLowerCase();
        
        if (roomName.includes(searchTerm.toLowerCase()) || 
            roomLocation.includes(searchTerm.toLowerCase())) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function applyRoomFilters() {
    const building = document.getElementById('buildingFilter').value;
    const floor = document.getElementById('floorFilter').value;
    const availability = document.getElementById('availabilityFilter').value;
    
    const roomCards = document.querySelectorAll('.room-card');
    
    roomCards.forEach(card => {
        let showCard = true;
        
        // Building filter
        if (building) {
            const roomLocation = card.querySelector('.room-info p').textContent.toLowerCase();
            if (!roomLocation.includes(building.toLowerCase())) {
                showCard = false;
            }
        }
        
        // Floor filter
        if (floor) {
            const roomName = card.querySelector('h3').textContent;
            const roomNumber = roomName.match(/\d+/);
            if (roomNumber) {
                const roomFloor = Math.floor(parseInt(roomNumber[0]) / 100);
                if (roomFloor !== parseInt(floor)) {
                    showCard = false;
                }
            }
        }
        
        // Availability filter
        if (availability) {
            const statusElement = card.querySelector('.room-status');
            const isAvailable = statusElement.classList.contains('available');
            const isOccupied = statusElement.classList.contains('occupied');
            
            if (availability === 'available' && !isAvailable) {
                showCard = false;
            } else if (availability === 'occupied' && !isOccupied) {
                showCard = false;
            }
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
}

function getDirections(roomNumber) {
    const directions = {
        '401': 'Main Building, 4th Floor. Take the main elevator to the 4th floor, turn right from the elevator, and Room 401 is the second door on your left.',
        '402': 'Main Building, 4th Floor. Take the main elevator to the 4th floor, turn right from the elevator, and Room 402 is the third door on your left.',
        'IT301': 'IT Building, 3rd Floor. Enter through the IT Building main entrance, take the stairs or elevator to the 3rd floor, turn left, and Room IT301 is at the end of the hallway.',
        'IT302': 'IT Building, 3rd Floor. Enter through the IT Building main entrance, take the stairs or elevator to the 3rd floor, turn right, and Room IT302 is the first door on your right.'
    };
    
    const direction = directions[roomNumber] || `Directions to Room ${roomNumber} would be provided here.`;
    alert(direction);
}

function viewRoomSchedule(roomNumber) {
    alert(`Room ${roomNumber} schedule viewer would open here showing the daily schedule for this room.`);
}

// Chatbot Functions
function initializeChatbot() {
    loadChatHistory();
    
    // Set up event listeners for the chatbot
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
                e.preventDefault(); // Prevent default form submission behavior
            }
        });
    }
    
    // Handle window resize for responsive chatbot
    window.addEventListener('resize', function() {
        const chatbot = document.getElementById('chatbot');
        if (chatbot && chatbot.classList.contains('open')) {
            const messagesContainer = document.getElementById('chatMessages');
            if (messagesContainer) {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }
        }
    });
    
    // Handle orientation change on mobile devices
    window.addEventListener('orientationchange', function() {
        const chatbot = document.getElementById('chatbot');
        if (chatbot && chatbot.classList.contains('open')) {
            setTimeout(() => {
                const messagesContainer = document.getElementById('chatMessages');
                if (messagesContainer) {
                    messagesContainer.scrollTop = messagesContainer.scrollHeight;
                }
            }, 300); // Delay to allow orientation change to complete
        }
    });
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('open');
    
    if (chatbot.classList.contains('open')) {
        const chatInput = document.getElementById('chatInput');
        const messagesContainer = document.getElementById('chatMessages');
        
        if (messagesContainer) {
            // Scroll to the bottom of messages
            setTimeout(() => {
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 100);
        }
        
        if (chatInput) {
            // Focus the input field with a delay to allow animation to complete
            setTimeout(() => chatInput.focus(), 300);
        }
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (!input.value.trim()) return;
    
    // Add user message
    const userMessage = createChatMessage(input.value, 'user');
    messagesContainer.appendChild(userMessage);
    
    // Store message
    const userInput = input.value;
    chatMessages.push({ type: 'user', content: userInput, timestamp: new Date() });
    
    // Clear input and refocus
    input.value = '';
    input.focus();
    
    // Scroll to bottom immediately after user message
    smoothScrollToBottom(messagesContainer);
    
    // Hide suggestions after first message
    const suggestions = document.querySelector('.quick-suggestions');
    if (suggestions && chatMessages.filter(m => m.type === 'user').length === 1) {
        suggestions.style.display = 'none';
    }
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message bot-message typing-indicator';
    typingIndicator.innerHTML = '<div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-content">Typing...</div>';
    messagesContainer.appendChild(typingIndicator);
    
    // Scroll to show typing indicator
    smoothScrollToBottom(messagesContainer);
    
    // Simulate AI response
    setTimeout(() => {
        // Remove typing indicator
        messagesContainer.removeChild(typingIndicator);
        
        // Add bot response
        const response = generateAIResponse(userInput);
        const botMessage = createChatMessage(response, 'bot');
        messagesContainer.appendChild(botMessage);
        
        chatMessages.push({ type: 'bot', content: response, timestamp: new Date() });
        
        // Ensure we scroll to bottom after bot responds
        smoothScrollToBottom(messagesContainer);
    }, 1000);
}

// Helper function to scroll chat smoothly to bottom
function smoothScrollToBottom(element) {
    if (!element) return;
    
    setTimeout(() => {
        element.scrollTop = element.scrollHeight;
    }, 50);
}

function sendSuggestion(text) {
    const input = document.getElementById('chatInput');
    input.value = text;
    sendMessage();
}

function createChatMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(messageContent);
    
    return messageDiv;
}

function generateAIResponse(userInput) {
    const responses = {
        'hello': 'Hello John! How can I help you today? I can assist with finding rooms, checking schedules, or answering questions about campus.',
        'room 401': 'Room 401 is located in the Main Building on the 4th floor. It\'s currently available and equipped with a projector, WiFi, and air conditioning. Would you like directions?',
        'where is': 'I can help you find any room on campus! Just tell me the room number or building name.',
        'next class': 'Your next class is Data Structures at 10:00 AM in Room 403, Main Building. It\'s with Prof. Ana Reyes.',
        'schedule': 'You have 3 classes today: Database Systems (8:00-9:30 AM), Data Structures (10:00-11:30 AM), and Programming Lab (2:00-4:00 PM).',
        'available room': 'Currently available rooms include Room 401 (Main Building) and Room IT301 (IT Building). Both have projectors and WiFi.',
        'library': 'The library is located in the Library Building and is currently open until 10:00 PM during exam week.',
        'exam': 'Final examinations start on December 18, 2024. You can check your specific exam schedule in the announcements section.',
        'help': 'I can help you with: finding rooms and directions, checking your class schedule, viewing announcements, finding available study spaces, and general campus information. What would you like to know?',
        'default': 'I\'m here to help! I can assist with room locations, schedules, announcements, and campus information. What would you like to know?'
    };
    
    const input = userInput.toLowerCase();
    for (let key in responses) {
        if (input.includes(key)) {
            return responses[key];
        }
    }
    return responses['default'];
}

function loadChatHistory() {
    // Load chat history from localStorage if available
    const savedMessages = localStorage.getItem('unisync_chat_history');
    if (savedMessages) {
        chatMessages = JSON.parse(savedMessages);
        // Render saved messages
        const messagesContainer = document.getElementById('chatMessages');
        chatMessages.forEach(msg => {
            if (msg.type !== 'bot' || msg.content !== 'Hi John! I\'m your AI assistant...') {
                const messageElement = createChatMessage(msg.content, msg.type);
                messagesContainer.appendChild(messageElement);
            }
        });
    }
}

// Notification Functions
function loadNotifications() {
    notifications = [
        {
            id: 1,
            title: 'Final Exam Schedule Released',
            content: 'Check your examination schedule for December 18-22',
            time: '2 hours ago',
            read: false,
            type: 'important'
        },
        {
            id: 2,
            title: 'Database Systems Project Due',
            content: 'Submit your final project by December 20, 2024',
            time: '1 day ago',
            read: false,
            type: 'academic'
        },
        {
            id: 3,
            title: 'Library Hours Extended',
            content: 'Library will be open until 10:00 PM during exam week',
            time: '2 days ago',
            read: true,
            type: 'general'
        }
    ];
    updateNotificationCount();
}

function toggleNotifications() {
    const panel = document.getElementById('notificationPanel');
    panel.classList.toggle('open');
}

function toggleUserMenu() {
    const menu = document.getElementById('userMenu');
    menu.classList.toggle('open');
}

function updateNotificationCount() {
    const unreadCount = notifications.filter(n => !n.read).length;
    const countElement = document.querySelector('.notification-count');
    if (countElement) {
        countElement.textContent = unreadCount;
        countElement.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

function dismissNotification(button) {
    const notificationItem = button.closest('.notification-item');
    const notificationId = parseInt(notificationItem.dataset.id);
    
    // Mark as read
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
    }
    
    // Remove from UI
    notificationItem.remove();
    updateNotificationCount();
    
    showNotification('Notification dismissed', 'info');
}

function clearAllNotifications() {
    const notificationList = document.querySelector('.notification-list');
    notificationList.innerHTML = '';
    
    notifications.forEach(n => n.read = true);
    updateNotificationCount();
    
    showNotification('All notifications cleared', 'success');
}

// Search Functions
function performGlobalSearch(query) {
    if (!query.trim()) return;
    
    // Simple search implementation
    if (query.toLowerCase().includes('room')) {
        showSection('rooms');
        const roomSearch = document.getElementById('roomSearch');
        if (roomSearch) {
            roomSearch.value = query;
            filterRooms(query);
        }
    } else if (query.toLowerCase().includes('schedule') || query.toLowerCase().includes('class')) {
        showSection('schedule');
    } else if (query.toLowerCase().includes('announcement')) {
        showSection('announcements');
    } else {
        // Send to AI chatbot
        toggleChatbot();
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.value = query;
            setTimeout(() => sendMessage(), 100);
        }
    }
}

// Utility Functions
function initializeFilters() {
    // Set default values
    const dateFilter = document.getElementById('scheduleDate');
    if (dateFilter) {
        dateFilter.valueAsDate = new Date();
    }
}

function closeOpenPanels(event) {
    const notificationPanel = document.getElementById('notificationPanel');
    const userMenu = document.getElementById('userMenu');
    const notifications = document.querySelector('.notifications');
    const userProfile = document.querySelector('.user-profile');
    
    // Close notification panel if clicking outside
    if (notificationPanel && notificationPanel.classList.contains('open')) {
        if (!notificationPanel.contains(event.target) && !notifications.contains(event.target)) {
            notificationPanel.classList.remove('open');
        }
    }
    
    // Close user menu if clicking outside
    if (userMenu && userMenu.classList.contains('open')) {
        if (!userMenu.contains(event.target) && !userProfile.contains(event.target)) {
            userMenu.classList.remove('open');
        }
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    notification.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add toast styles if not already added
    if (!document.getElementById('toastStyles')) {
        const styles = `
            <style id="toastStyles">
                .toast-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: var(--border-radius);
                    color: var(--white);
                    z-index: 2001;
                    min-width: 300px;
                    box-shadow: var(--shadow-hover);
                    animation: slideInToast 0.3s ease;
                }
                
                .toast-notification.success {
                    background: #28a745;
                }
                
                .toast-notification.error {
                    background: #dc3545;
                }
                
                .toast-notification.info {
                    background: #007bff;
                }
                
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                @keyframes slideInToast {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOutToast {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutToast 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Auto-save chat history
setInterval(() => {
    if (chatMessages.length > 0) {
        localStorage.setItem('unisync_chat_history', JSON.stringify(chatMessages));
    }
}, 30000); // Save every 30 seconds

// Auto-refresh dashboard every 5 minutes
setInterval(() => {
    if (currentSection === 'dashboard') {
        loadDashboardData();
    }
}, 300000);

// Handle window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const mobileNav = document.getElementById('mobileNav');
        mobileNav.style.display = 'none';
    }
});

// Export functions for global access
window.studentDashboard = {
    showSection,
    toggleChatbot,
    sendMessage,
    findRoom,
    checkSchedule,
    viewGrades,
    contactSupport,
    filterAnnouncements,
    toggleView,
    changeWeek,
    exportSchedule,
    getDirections,
    viewRoomSchedule
};
