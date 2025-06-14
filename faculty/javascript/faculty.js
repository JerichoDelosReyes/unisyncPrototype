// Faculty Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeFacultyDashboard();
    initializeChatbot();
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
});

// Initialize Faculty Dashboard
function initializeFacultyDashboard() {
    // Load today's schedule
    loadTodaySchedule();
    
    // Initialize filters
    initializeFilters();
    
    // Set up event listeners
    setupEventListeners();
}

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.closest('.nav-link').classList.add('active');
    
    // Load section-specific data
    loadSectionData(sectionId);
}

function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'schedule':
            loadSchedule();
            break;
        case 'announcements':
            loadAnnouncements();
            break;
        case 'classes':
            loadClasses();
            break;
        default:
            break;
    }
}

// Dashboard Functions
function loadTodaySchedule() {
    // This would typically fetch data from an API
    console.log('Loading today\'s schedule...');
    
    // Update current class indicator
    updateCurrentClassIndicator();
}

function updateCurrentClassIndicator() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    // Define class times (in minutes from midnight)
    const classTimes = [
        { start: 8 * 60, end: 9.5 * 60, name: 'Database Systems' },
        { start: 10 * 60, end: 11.5 * 60, name: 'Software Engineering' },
        { start: 14 * 60, end: 15.5 * 60, name: 'Web Development' }
    ];
    
    // Find current class
    const currentClass = classTimes.find(time => 
        currentTimeInMinutes >= time.start && currentTimeInMinutes <= time.end
    );
    
    if (currentClass) {
        console.log(`Currently in: ${currentClass.name}`);
    }
}

function updateCurrentTime() {
    // Update any time-dependent displays
    const now = new Date();
    console.log('Current time updated:', now.toLocaleTimeString());
}

// Announcement Functions
function showAnnouncementTab(tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Update tab button active state
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function openAnnouncementModal() {
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="announcementModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Create New Announcement</h3>
                    <button class="modal-close" onclick="closeAnnouncementModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="announcementForm">
                        <div class="form-group">
                            <label for="announcementTitle">Title *</label>
                            <input type="text" id="announcementTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="announcementContent">Content *</label>
                            <textarea id="announcementContent" rows="6" required></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="announcementClass">Target Class</label>
                                <select id="announcementClass">
                                    <option value="all">All Classes</option>
                                    <option value="bscs3a">BSCS 3A</option>
                                    <option value="bscs4a">BSCS 4A</option>
                                    <option value="bsit3b">BSIT 3B</option>
                                    <option value="bscs1b">BSCS 1B</option>
                                    <option value="bscs2a">BSCS 2A</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="announcementVisibility">Visibility</label>
                                <select id="announcementVisibility">
                                    <option value="public">Public</option>
                                    <option value="class">Class Only</option>
                                    <option value="department">Department Only</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="announcementTags">Tags</label>
                            <input type="text" id="announcementTags" placeholder="e.g., exam, assignment, important">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="saveDraft()">Save as Draft</button>
                    <button class="btn-primary" onclick="publishAnnouncement()">Publish</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles
    addModalStyles();
}

function closeAnnouncementModal() {
    const modal = document.getElementById('announcementModal');
    if (modal) {
        modal.remove();
    }
}

function saveDraft() {
    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;
    
    if (!title || !content) {
        alert('Please fill in the title and content fields.');
        return;
    }
    
    // Simulate saving draft
    alert('Draft saved successfully!');
    closeAnnouncementModal();
}

function publishAnnouncement() {
    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;
    const targetClass = document.getElementById('announcementClass').value;
    const visibility = document.getElementById('announcementVisibility').value;
    const tags = document.getElementById('announcementTags').value;
    
    if (!title || !content) {
        alert('Please fill in the title and content fields.');
        return;
    }
    
    // Simulate publishing announcement
    alert('Announcement published successfully!');
    closeAnnouncementModal();
    
    // Refresh announcements list
    loadAnnouncements();
}

function loadAnnouncements() {
    console.log('Loading announcements...');
}

// Schedule Functions
function loadSchedule() {
    const building = document.getElementById('buildingSelect')?.value;
    const room = document.getElementById('roomSelect')?.value;
    const date = document.getElementById('scheduleDate')?.value;
    
    console.log('Loading schedule for:', { building, room, date });
    
    // Update room options based on building selection
    updateRoomOptions(building);
}

function updateRoomOptions(building) {
    const roomSelect = document.getElementById('roomSelect');
    if (!roomSelect) return;
    
    // Clear current options
    roomSelect.innerHTML = '<option value="">Select Room</option>';
    
    // Add rooms based on building
    const roomsByBuilding = {
        'main': ['401', '402', '403', '404', '405'],
        'engineering': ['E101', 'E102', 'E201', 'E202'],
        'science': ['S101', 'S102', 'S201', 'S202'],
        'it': ['IT301', 'IT302', 'IT401', 'IT402']
    };
    
    if (building && roomsByBuilding[building]) {
        roomsByBuilding[building].forEach(room => {
            const option = document.createElement('option');
            option.value = room.toLowerCase();
            option.textContent = `Room ${room}`;
            roomSelect.appendChild(option);
        });
    }
}

// Class Management Functions
function loadClasses() {
    console.log('Loading classes...');
}

function viewStudentList() {
    alert('Student list viewer would open here');
}

function requestRoom() {
    alert('Room request form would open here');
}

function checkRoomAvailability() {
    alert('Room availability checker would open here');
}

// Quick Actions
function openAnnouncementModal() {
    // Already defined above
}

// Filter and Search Functions
function initializeFilters() {
    const buildingSelect = document.getElementById('buildingSelect');
    const roomSelect = document.getElementById('roomSelect');
    const dateInput = document.getElementById('scheduleDate');
    
    if (buildingSelect) {
        buildingSelect.addEventListener('change', function() {
            updateRoomOptions(this.value);
            loadSchedule();
        });
    }
    
    if (roomSelect) {
        roomSelect.addEventListener('change', loadSchedule);
    }
    
    if (dateInput) {
        dateInput.addEventListener('change', loadSchedule);
    }
}

function setupEventListeners() {
    // Chat input
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

// Chatbot Functions
function initializeChatbot() {
    console.log('Chatbot initialized');
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
        botMessage.innerHTML = `<div class="message-content">${generateFacultyAIResponse(userInput)}</div>`;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateFacultyAIResponse(userInput) {
    const responses = {
        'hello': 'Hello Prof. Santos! How can I help you with your classes or campus information today?',
        'room': 'Room 401 is currently available. It\'s equipped with a projector and can accommodate 40 students. Would you like me to help you reserve it?',
        'schedule': 'Your next class is Software Engineering with BSCS 4A at 10:00 AM in Room 402. You have 3 classes scheduled for today.',
        'students': 'You have 156 students across your 5 classes: BSCS 3A (35), BSCS 4A (28), BSIT 3B (32), BSCS 1B (38), and BSCS 2A (31).',
        'announcement': 'You can create announcements from the Announcements section. You currently have 8 published announcements and 2 drafts.',
        'class': 'Your classes today: Database Systems (8:00-9:30 AM), Software Engineering (10:00-11:30 AM), and Web Development (2:00-3:30 PM).',
        'building': 'The Main Building has rooms 401-405 on the 4th floor. The IT Building has computer labs IT301, IT302, IT401, and IT402.',
        'default': 'I can help you with room schedules, student information, class management, and campus directions. What would you like to know?'
    };
    
    const input = userInput.toLowerCase();
    for (let key in responses) {
        if (input.includes(key)) {
            return responses[key];
        }
    }
    return responses['default'];
}

// Utility Functions
function addModalStyles() {
    if (document.getElementById('modalStyles')) return;
    
    const styles = `
        <style id="modalStyles">
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            }
            
            .modal-content {
                background: var(--white);
                border-radius: var(--border-radius);
                width: 90%;
                max-width: 600px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: var(--shadow-hover);
            }
            
            .modal-header {
                padding: 20px 25px;
                border-bottom: 1px solid var(--medium-gray);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .modal-header h3 {
                color: var(--cvsu-green);
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--dark-gray);
                cursor: pointer;
                padding: 5px;
                border-radius: var(--border-radius);
                transition: var(--transition);
            }
            
            .modal-close:hover {
                background: var(--light-gray);
            }
            
            .modal-body {
                padding: 25px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }
            
            .form-group label {
                display: block;
                font-weight: 500;
                color: var(--text-dark);
                margin-bottom: 5px;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 10px 15px;
                border: 1px solid var(--medium-gray);
                border-radius: var(--border-radius);
                font-size: 0.95rem;
                transition: var(--transition);
                box-sizing: border-box;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--cvsu-green);
                box-shadow: 0 0 0 3px rgba(0, 100, 0, 0.1);
            }
            
            .form-group textarea {
                resize: vertical;
                font-family: 'Inter', sans-serif;
                line-height: 1.5;
            }
            
            .modal-footer {
                padding: 20px 25px;
                border-top: 1px solid var(--medium-gray);
                display: flex;
                gap: 15px;
                justify-content: flex-end;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    width: 95%;
                    margin: 20px;
                }
                
                .form-row {
                    grid-template-columns: 1fr;
                }
                
                .modal-footer {
                    flex-direction: column;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

// Notification Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add notification styles if not already added
    if (!document.getElementById('notificationStyles')) {
        const styles = `
            <style id="notificationStyles">
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: var(--border-radius);
                    color: var(--white);
                    z-index: 2001;
                    min-width: 300px;
                    box-shadow: var(--shadow-hover);
                    animation: slideIn 0.3s ease;
                }
                
                .notification.success {
                    background: #28a745;
                }
                
                .notification.error {
                    background: #dc3545;
                }
                
                .notification.info {
                    background: #007bff;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                
                @keyframes slideOut {
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
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Auto-refresh functions
setInterval(function() {
    // Refresh dashboard data every 5 minutes
    if (document.getElementById('dashboard').classList.contains('active')) {
        loadTodaySchedule();
    }
}, 300000);

// Export functions for global access
window.facultyDashboard = {
    showSection,
    openAnnouncementModal,
    loadSchedule,
    viewStudentList,
    requestRoom,
    checkRoomAvailability,
    toggleChat,
    sendMessage
};
