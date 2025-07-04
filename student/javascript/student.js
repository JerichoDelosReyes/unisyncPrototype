// Student Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeStudentDashboard();
    initializeChatbot();
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
    
    // Initialize announcements filter to "All" by default
    setTimeout(() => {
        filterAnnouncements('all');
    }, 100);
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
    // Reset organization filter when changing sections
    const orgFilterPanel = document.getElementById('organizationsFilter');
    if (orgFilterPanel && orgFilterPanel.style.display === 'block') {
        orgFilterPanel.style.display = 'none';
        const filterTabs = document.querySelectorAll('#announcements .filter-tab');
        const orgTab = Array.from(filterTabs).find(tab => tab.innerText.includes('Organizations'));
        if (orgTab) orgTab.classList.remove('active');
        // Potentially reset to 'All' announcements or the default active tab for announcements
    }
    const promptMessage = document.getElementById('selectOrgPrompt');
    if (promptMessage) promptMessage.style.display = 'none';


    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation active state
    const navItems = document.querySelectorAll('.nav-item, .nav-tab, .side-nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Find and activate the clicked nav item
    const activeNavs = document.querySelectorAll(`[href="#${sectionId}"]`);
    activeNavs.forEach(nav => nav.classList.add('active'));
    
    // Update current section
    currentSection = sectionId;
    
    // Load section-specific data
    loadSectionData(sectionId);
    
    // Close mobile side menu if open and on mobile view
    if (window.innerWidth <= 768) {
        const sideNav = document.getElementById('mobileSideNav');
        if (sideNav && sideNav.classList.contains('open')) {
            toggleMobileSideMenu(); 
        }
    }
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
    // This function might be deprecated or repurposed if bottom bar is always visible
    // For now, let's assume it might still be used or was for the bottom bar originally.
    // If the hamburger is solely for the side menu, this function might not be needed for the bottom bar.
    // mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
    console.log("toggleMobileMenu called - likely for bottom bar, check usage");
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    if (window.innerWidth <= 768 && mobileNav.style.display === 'flex') {
        // mobileNav.style.display = 'none';
        // This function might also need review based on new side menu
    }
}

// New functions for the mobile side navigation
function toggleMobileSideMenu() {
    const sideNav = document.getElementById('mobileSideNav');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    if (sideNav.classList.contains('open')) {
        sideNav.classList.remove('open');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    } else {
        sideNav.classList.add('open');
        overlay.classList.add('active');
        body.classList.add('no-scroll');
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
    // This function now calls filterAnnouncements with a special category
    filterAnnouncements('orgFilterToggle');
}

// Update filterAnnouncements to handle organization filtering
function filterAnnouncements(category, isOrgClick = false) {
    const filterTabs = document.querySelectorAll('#announcements .filter-tab');
    const announcementCards = document.querySelectorAll('#announcementsContainer .announcement-card');
    const orgFilterPanel = document.getElementById('organizationsFilter');
    const orgFilterButton = Array.from(filterTabs).find(tab => tab.innerText.includes('Organizations'));

    // Deactivate all tabs first
    filterTabs.forEach(tab => tab.classList.remove('active'));

    if (isOrgClick) {
        // An organization was clicked from the panel
        if (orgFilterButton) orgFilterButton.classList.add('active'); // Keep "Organizations" tab active
        // Optionally, highlight the selected org item in the panel
        const orgItems = document.querySelectorAll('#organizationsFilter .org-item');
        orgItems.forEach(item => item.classList.remove('selected-org'));
        const clickedOrgItem = Array.from(orgItems).find(item => item.getAttribute('onclick').includes(`'${category}'`));
        if (clickedOrgItem) clickedOrgItem.classList.add('selected-org');

    } else if (category === 'orgFilterToggle') {
        // The main "Organizations" tab was clicked
        if (orgFilterPanel.style.display === 'block') {
            orgFilterPanel.classList.add('closing');
            setTimeout(() => {
                orgFilterPanel.style.display = 'none';
                orgFilterPanel.classList.remove('closing');
            }, 280);
            // If panel is closing, try to revert to 'all' or last active non-org filter if desired, or just remove active from org button
            const activeMainFilter = Array.from(filterTabs).find(tab => tab.classList.contains('active') && !tab.innerText.includes('Organizations'));
            if (activeMainFilter) {
                activeMainFilter.classList.add('active');
            } else {
                 // If no other main filter was active, default to 'All'
                const allTab = Array.from(filterTabs).find(tab => tab.innerText.trim() === 'All');
                if (allTab) allTab.classList.add('active');
                filterAnnouncements('all'); // Re-filter to all
                return; // Exit to avoid double filtering
            }
        } else {
            orgFilterPanel.style.display = 'block';
            if (orgFilterButton) orgFilterButton.classList.add('active');
            // When opening, don't filter yet, let user pick an org or close
            announcementCards.forEach(card => card.style.display = 'none'); // Hide all cards until an org is selected
            const promptMessage = document.getElementById('selectOrgPrompt');
            if (promptMessage) promptMessage.style.display = 'block';
            return; // Exit, wait for org selection
        }
    } else {
        // A main filter tab (All, Important, etc.) was clicked
        const clickedTab = Array.from(filterTabs).find(tab => {
            const tabText = tab.innerText.trim().toLowerCase();
            const categoryLower = category.toLowerCase();
            if (tabText === categoryLower) return true;
            if (categoryLower === 'all' && tabText === 'all') return true;
            if (categoryLower === 'important' && tabText === 'important') return true;
            if (categoryLower === 'academic' && tabText === 'academic') return true;
            if (categoryLower === 'general' && tabText === 'general') return true;
            return false;
        });
        if (clickedTab) clickedTab.classList.add('active');

        if (orgFilterPanel.style.display === 'block') {
            orgFilterPanel.classList.add('closing');
            setTimeout(() => {
                orgFilterPanel.style.display = 'none';
                orgFilterPanel.classList.remove('closing');
            }, 280);
        }
    }
    
    const promptMessage = document.getElementById('selectOrgPrompt');
    if (promptMessage) promptMessage.style.display = 'none';

    announcementCards.forEach(card => {
        if (category === 'all' && !isOrgClick && category !== 'orgFilterToggle') {
            card.style.display = 'block';
        } else {
            if (card.classList.contains(category)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
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
    const chatbotPanel = document.getElementById('chatbotPanel');
    chatbotPanel.classList.toggle('active');
    
    // Focus on input when opening
    if (chatbotPanel.classList.contains('active')) {
        setTimeout(() => {
            document.getElementById('chatbotInput').focus();
        }, 100);
    }
}

function handleChatbotEnter(event) {
    if (event.key === 'Enter') {
        sendChatbotMessage();
    }
}

function sendChatbotMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addChatbotMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addChatbotMessage(botResponse, 'bot');
    }, 1000);
}

function addChatbotMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="user-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <i class="fas fa-robot"></i>
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
    }
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Room-related queries
    if (message.includes('room') || message.includes('schedule') || message.includes('available')) {
        return "I can help you find room availability! The main building has rooms 101-105 available today. Room 401 where your Database Systems class is held is currently available. Would you like me to check specific room schedules?";
    }
    
    // Announcement queries
    if (message.includes('announcement') || message.includes('news') || message.includes('update')) {
        return "Here are the latest announcements: Final Exam Schedule has been released, Library hours are extended during exam week, and there's a Database Systems project due soon. Would you like details about any specific announcement?";
    }
    
    // Schedule queries
    if (message.includes('class') || message.includes('today') || message.includes('tomorrow')) {
        return "According to your schedule, you have Database Systems at 8:00 AM in Room 401, Data Structures at 10:00 AM in Room 403, and Programming Lab at 2:00 PM in Room IT301. Would you like more details about any of these classes?";
    }
    
    // Event queries
    if (message.includes('event') || message.includes('activity') || message.includes('organization')) {
        return "I can help you find campus events! There are several student organizations active on campus. Would you like information about specific organizations like CSC, BITS, or upcoming events?";
    }
    
    // General help
    if (message.includes('help') || message.includes('what') || message.includes('how')) {
        return "I'm here to help! I can assist you with:\n• Room schedules and availability\n• Latest announcements and updates\n• Your class schedule\n• Campus events and organizations\n• University policies and information\n\nJust ask me anything!";
    }
    
    // Default response
    return "I understand you're asking about '" + userMessage + "'. I can help you with room schedules, announcements, class information, and campus events. Could you please be more specific about what you'd like to know?";
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

    // Add a prompt message for organization selection if it doesn't exist
    const announcementsContainer = document.getElementById('announcementsContainer');
    if (announcementsContainer && !document.getElementById('selectOrgPrompt')) {
        const promptMessage = document.createElement('p');
        promptMessage.id = 'selectOrgPrompt';
        promptMessage.textContent = 'Please select an organization from the panel above to see its announcements.';
        promptMessage.style.textAlign = 'center';
        promptMessage.style.padding = '20px';
        promptMessage.style.display = 'none'; // Initially hidden
        announcementsContainer.parentNode.insertBefore(promptMessage, announcementsContainer);
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

function showUserProfile() {
    // Placeholder: Implement or link to user profile section/modal
    console.log("User profile clicked");
    alert("User Profile page/modal to be implemented.");
    // Example: showSection('profileSectionId'); 
}

function showSettings() {
    // Placeholder: Implement or link to settings section/modal
    console.log("Settings clicked");
    alert("Settings page/modal to be implemented.");
    // Example: showSection('settingsSectionId');
}
