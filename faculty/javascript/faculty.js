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
    console.log('Showing section:', sectionId);
    
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Find and activate the corresponding nav link
    const targetNavLink = document.querySelector(`[onclick*="${sectionId}"]`);
    if (targetNavLink) {
        targetNavLink.classList.add('active');
    }
    
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
    console.log('Showing announcement tab:', tabId);
    
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Show selected tab content
    const targetTab = document.getElementById(tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // Update tab button active state
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Find and activate the corresponding tab button
    const targetButton = document.querySelector(`[onclick*="${tabId}"]`);
    if (targetButton) {
        targetButton.classList.add('active');
    }
}

function openAnnouncementModal() {
    console.log("Opening announcement modal - function called successfully");
    
    try {
        // Remove any existing modal first
        const existingModal = document.getElementById('announcementModal');
        if (existingModal) {
            existingModal.remove();
            console.log("Removed existing modal");
        }
        
        // Create modal HTML
        const modalHTML = `
        <div class="modal-overlay" id="announcementModal">
            <div class="modal-content announcement-modal">
                <div class="modal-header">
                    <div class="modal-title-section">
                        <i class="fas fa-bullhorn modal-icon"></i>
                        <h3>Create New Announcement</h3>
                    </div>
                    <button class="modal-close" onclick="closeAnnouncementModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="announcementForm">
                        <div class="form-group">
                            <label for="announcementTitle">
                                <i class="fas fa-heading"></i>
                                Announcement Title *
                            </label>
                            <input type="text" id="announcementTitle" placeholder="Enter announcement title..." required>
                        </div>
                        
                        <div class="form-group">
                            <label for="announcementContent">
                                <i class="fas fa-edit"></i>
                                Content *
                            </label>
                            <textarea id="announcementContent" rows="8" placeholder="Write your announcement content here..." required></textarea>
                            <div class="form-hint">
                                <i class="fas fa-info-circle"></i>
                                Supports markdown formatting for better readability
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="announcementClass">
                                    <i class="fas fa-users"></i>
                                    Target Audience
                                </label>
                                <select id="announcementClass">
                                    <option value="all">All Classes (156 students)</option>
                                    <option value="bscs3a">BSCS 3A (35 students)</option>
                                    <option value="bscs4a">BSCS 4A (28 students)</option>
                                    <option value="bsit3b">BSIT 3B (32 students)</option>
                                    <option value="bscs1b">BSCS 1B (38 students)</option>
                                    <option value="bscs2a">BSCS 2A (31 students)</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="announcementPriority">
                                    <i class="fas fa-flag"></i>
                                    Priority Level
                                </label>
                                <select id="announcementPriority">
                                    <option value="normal">Normal</option>
                                    <option value="important">Important</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="announcementType">
                                    <i class="fas fa-tag"></i>
                                    Announcement Type
                                </label>
                                <select id="announcementType">
                                    <option value="general">General</option>
                                    <option value="exam">Exam/Test</option>
                                    <option value="assignment">Assignment</option>
                                    <option value="event">Event</option>
                                    <option value="schedule">Schedule Change</option>
                                    <option value="reminder">Reminder</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="announcementVisibility">
                                    <i class="fas fa-eye"></i>
                                    Visibility
                                </label>
                                <select id="announcementVisibility">
                                    <option value="public">Public</option>
                                    <option value="class">Class Only</option>
                                    <option value="department">Department Only</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="announcementTags">
                                <i class="fas fa-tags"></i>
                                Tags (Optional)
                            </label>
                            <input type="text" id="announcementTags" placeholder="e.g., final exam, group project, deadline">
                            <div class="form-hint">
                                <i class="fas fa-lightbulb"></i>
                                Use tags to help students find related announcements easily
                            </div>
                        </div>
                        
                        <div class="form-group checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="sendNotification" checked>
                                <span class="checkmark"></span>
                                <div class="checkbox-content">
                                    <i class="fas fa-bell"></i>
                                    Send push notification to students
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="saveDraft()">
                        <i class="fas fa-save"></i>
                        Save as Draft
                    </button>
                    <button class="btn-primary" onclick="publishAnnouncement()">
                        <i class="fas fa-paper-plane"></i>
                        Publish Announcement
                    </button>
                </div>
            </div>
        </div>
    `;
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add event listener to close modal when clicking outside
        const modal = document.getElementById('announcementModal');
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    closeAnnouncementModal();
                }
            });
        }
        
        console.log("Modal HTML added to page and events set up");
        console.log("Modal opened successfully");
        
    } catch (error) {
        console.error("Error opening announcement modal:", error);
        alert("Error opening modal: " + error.message);
    }
}

function closeAnnouncementModal() {
    const modal = document.getElementById('announcementModal');
    if (modal) {
        modal.remove();
    }
}

function saveDraft() {
    console.log("Saving draft");
    
    try {
        const title = document.getElementById('announcementTitle').value;
        const content = document.getElementById('announcementContent').value;
        const targetClass = document.getElementById('announcementClass').value;
        const priority = document.getElementById('announcementPriority').value;
        const type = document.getElementById('announcementType').value;
        const visibility = document.getElementById('announcementVisibility').value;
        const tags = document.getElementById('announcementTags').value;
        
        if (!title || !content) {
            showNotification('Please fill in the title and content fields.', 'error');
            return;
        }
        
        // Create draft object
        const draft = {
            id: Date.now(),
            title,
            content,
            targetClass,
            priority,
            type,
            visibility,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            author: 'Prof. Jericho Delos Reyes',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            views: 0,
            status: 'draft'
        };
        
        // Get existing announcements or initialize empty array
        let announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
        
        // Add new draft
        announcements.unshift(draft);
        
        // Save to localStorage
        localStorage.setItem('facultyAnnouncements', JSON.stringify(announcements));
        
        showNotification('Draft saved successfully!', 'success');
        closeAnnouncementModal();
        
        // Refresh announcements if on announcements tab
        if (document.getElementById('announcements').classList.contains('active')) {
            loadAnnouncements();
        }
        
        // Update dashboard counters
        updateDashboardCounters();
        
    } catch (error) {
        console.error("Error saving draft:", error);
        showNotification('Error saving draft. Please try again.', 'error');
    }
}

function publishAnnouncement() {
    console.log("Publishing announcement");
    
    try {
        const title = document.getElementById('announcementTitle').value;
        const content = document.getElementById('announcementContent').value;
        const targetClass = document.getElementById('announcementClass').value;
        const priority = document.getElementById('announcementPriority').value;
        const type = document.getElementById('announcementType').value;
        const visibility = document.getElementById('announcementVisibility').value;
        const tags = document.getElementById('announcementTags').value;
        const sendNotification = document.getElementById('sendNotification').checked;
        
        console.log("Form values:", { 
            title, 
            content, 
            targetClass, 
            priority, 
            type, 
            visibility, 
            tags, 
            sendNotification 
        });
        
        if (!title || !content) {
            console.log("Title or content missing");
            showNotification('Please fill in the title and content fields.', 'error');
            return;
        }
        
        // Create announcement object
        const announcement = {
            id: Date.now(),
            title,
            content,
            targetClass,
            priority,
            type,
            visibility,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            author: 'Prof. Jericho Delos Reyes',
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            views: 0,
            status: 'published'
        };
        
        // Get existing announcements or initialize empty array
        let announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
        
        // Add new announcement
        announcements.unshift(announcement);
        
        // Save to localStorage
        localStorage.setItem('facultyAnnouncements', JSON.stringify(announcements));
        
        // Show success message
        const studentCount = getStudentCount(targetClass);
        const notificationText = sendNotification ? ` Push notifications sent to ${studentCount} students.` : '';
        showNotification(`Announcement published successfully!${notificationText}`, 'success');
        
        // Close modal
        closeAnnouncementModal();
        
        // Refresh announcements if on announcements tab
        if (document.getElementById('announcements').classList.contains('active')) {
            loadAnnouncements();
        }
        
        // Update dashboard counters
        updateDashboardCounters();
        
        console.log("Announcement published successfully!");
        
    } catch (error) {
        console.error("Error in publishAnnouncement:", error);
        showNotification('Error publishing announcement. Please try again.', 'error');
    }
    
    // Create announcement object
    const announcement = {
        id: Date.now(),
        title,
        content,
        targetClass,
        priority,
        type,
        visibility,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        author: 'Prof. Jericho Delos Reyes',
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        views: 0,
        status: 'published'
    };
    
    // Get existing announcements or initialize empty array
    let announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
    
    // Add new announcement
    announcements.unshift(announcement);
    
    // Save to localStorage
    localStorage.setItem('facultyAnnouncements', JSON.stringify(announcements));
    
    // Show success message
    const studentCount = getStudentCount(targetClass);
    const notificationText = sendNotification ? ` Push notifications sent to ${studentCount} students.` : '';
    showNotification(`Announcement published successfully!${notificationText}`, 'success');
    
    // Close modal
    closeAnnouncementModal();
    
    // Refresh announcements if on announcements tab
    if (document.getElementById('announcements').classList.contains('active')) {
        loadAnnouncements();
    }
    
    // Update dashboard counters
    updateDashboardCounters();
}

function getStudentCount(targetClass) {
    const counts = {
        'all': 156,
        'bscs3a': 35,
        'bscs4a': 28,
        'bsit3b': 32,
        'bscs1b': 38,
        'bscs2a': 31
    };
    return counts[targetClass] || 0;
}

function loadAnnouncements() {
    const announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
    const postedContainer = document.querySelector('#posted .announcements-list');
    const draftsContainer = document.querySelector('#drafts .announcements-list');
    
    if (!postedContainer) return;
    
    // Filter published announcements
    const publishedAnnouncements = announcements.filter(a => a.status === 'published');
    const draftAnnouncements = announcements.filter(a => a.status === 'draft');
    
    // Update tab counts
    const postedTab = document.querySelector('.tab-btn[onclick*="posted"]');
    const draftsTab = document.querySelector('.tab-btn[onclick*="drafts"]');
    
    if (postedTab) postedTab.textContent = `My Announcements (${publishedAnnouncements.length})`;
    if (draftsTab) draftsTab.textContent = `Drafts (${draftAnnouncements.length})`;
    
    // Render published announcements
    if (publishedAnnouncements.length === 0) {
        postedContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-bullhorn"></i>
                <h3>No announcements yet</h3>
                <p>Create your first announcement to engage with your students</p>
                <button class="btn-primary" onclick="openAnnouncementModal()">
                    <i class="fas fa-plus"></i> Create Announcement
                </button>
            </div>
        `;
    } else {
        postedContainer.innerHTML = publishedAnnouncements.map(announcement => `
            <div class="announcement-item" data-id="${announcement.id}">
                <div class="announcement-header">
                    <div class="announcement-title-section">
                        <h3>${announcement.title}</h3>
                        <div class="announcement-badges">
                            <span class="priority-badge ${announcement.priority}">${announcement.priority}</span>
                            <span class="type-badge">${announcement.type}</span>
                        </div>
                    </div>
                    <div class="announcement-meta">
                        <span class="date">
                            <i class="fas fa-calendar"></i>
                            ${announcement.date} at ${announcement.time}
                        </span>
                        <span class="visibility ${announcement.visibility}">
                            <i class="fas fa-${announcement.visibility === 'public' ? 'globe' : announcement.visibility === 'class' ? 'users' : 'building'}"></i>
                            ${announcement.visibility}
                        </span>
                    </div>
                </div>
                <p class="announcement-preview">${announcement.content.substring(0, 200)}${announcement.content.length > 200 ? '...' : ''}</p>
                ${announcement.tags.length > 0 ? `
                    <div class="announcement-tags">
                        ${announcement.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="announcement-stats">
                    <span><i class="fas fa-eye"></i> ${announcement.views || 0} views</span>
                    <span><i class="fas fa-users"></i> ${getClassDisplayName(announcement.targetClass)}</span>
                    <span><i class="fas fa-bell"></i> ${getStudentCount(announcement.targetClass)} students notified</span>
                </div>
                <div class="announcement-actions">
                    <button class="btn-icon edit" title="Edit" onclick="editAnnouncement(${announcement.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon view" title="View Details" onclick="viewAnnouncement(${announcement.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon share" title="Share" onclick="shareAnnouncement(${announcement.id})">
                        <i class="fas fa-share"></i>
                    </button>
                    <button class="btn-icon delete" title="Delete" onclick="deleteAnnouncement(${announcement.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    // Render draft announcements
    if (draftsContainer) {
        if (draftAnnouncements.length === 0) {
            draftsContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-file-alt"></i>
                    <h3>No drafts</h3>
                    <p>All your draft announcements will appear here</p>
                </div>
            `;
        } else {
            draftsContainer.innerHTML = draftAnnouncements.map(announcement => `
                <div class="announcement-item draft" data-id="${announcement.id}">
                    <div class="announcement-header">
                        <h3>${announcement.title}</h3>
                        <div class="announcement-meta">
                            <span class="date">Draft • ${announcement.date}</span>
                            <span class="visibility draft-status">Not Published</span>
                        </div>
                    </div>
                    <p class="announcement-preview">${announcement.content.substring(0, 200)}${announcement.content.length > 200 ? '...' : ''}</p>
                    <div class="announcement-actions">
                        <button class="btn-small primary" onclick="editAnnouncement(${announcement.id})">Continue Editing</button>
                        <button class="btn-small secondary" onclick="publishDraft(${announcement.id})">Publish</button>
                        <button class="btn-icon delete" title="Delete" onclick="deleteAnnouncement(${announcement.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function getClassDisplayName(targetClass) {
    const names = {
        'all': 'All Classes',
        'bscs3a': 'BSCS 3A',
        'bscs4a': 'BSCS 4A',
        'bsit3b': 'BSIT 3B',
        'bscs1b': 'BSCS 1B',
        'bscs2a': 'BSCS 2A'
    };
    return names[targetClass] || targetClass;
}

function editAnnouncement(id) {
    const announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
    const announcement = announcements.find(a => a.id === id);
    
    if (!announcement) return;
    
    // Open modal with existing data
    openAnnouncementModal();
    
    // Wait for modal to render, then populate fields
    setTimeout(() => {
        document.getElementById('announcementTitle').value = announcement.title;
        document.getElementById('announcementContent').value = announcement.content;
        document.getElementById('announcementClass').value = announcement.targetClass;
        document.getElementById('announcementPriority').value = announcement.priority || 'normal';
        document.getElementById('announcementType').value = announcement.type || 'general';
        document.getElementById('announcementVisibility').value = announcement.visibility;
        document.getElementById('announcementTags').value = announcement.tags.join(', ');
        
        // Store the ID for updating
        document.getElementById('announcementForm').dataset.editId = id;
        
        // Change modal title
        document.querySelector('.modal-title-section h3').textContent = 'Edit Announcement';
    }, 100);
}

function viewAnnouncement(id) {
    const announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
    const announcement = announcements.find(a => a.id === id);
    
    if (!announcement) return;
    
    // Increment view count
    announcement.views = (announcement.views || 0) + 1;
    localStorage.setItem('facultyAnnouncements', JSON.stringify(announcements));
    
    // Show detailed view modal
    const viewModal = `
        <div class="modal-overlay" id="viewAnnouncementModal">
            <div class="modal-content announcement-view">
                <div class="modal-header">
                    <div class="modal-title-section">
                        <i class="fas fa-eye modal-icon"></i>
                        <h3>View Announcement</h3>
                    </div>
                    <button class="modal-close" onclick="document.getElementById('viewAnnouncementModal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="announcement-detail">
                        <div class="announcement-header-detail">
                            <h2>${announcement.title}</h2>
                            <div class="announcement-badges">
                                <span class="priority-badge ${announcement.priority}">${announcement.priority}</span>
                                <span class="type-badge">${announcement.type}</span>
                            </div>
                        </div>
                        <div class="announcement-meta-detail">
                            <div class="meta-item">
                                <i class="fas fa-calendar"></i>
                                <span>Published: ${announcement.date} at ${announcement.time}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-users"></i>
                                <span>Audience: ${getClassDisplayName(announcement.targetClass)} (${getStudentCount(announcement.targetClass)} students)</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-eye"></i>
                                <span>Views: ${announcement.views}</span>
                            </div>
                        </div>
                        <div class="announcement-content-detail">
                            <p>${announcement.content.replace(/\n/g, '<br>')}</p>
                        </div>
                        ${announcement.tags.length > 0 ? `
                            <div class="announcement-tags">
                                ${announcement.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="editAnnouncement(${announcement.id}); document.getElementById('viewAnnouncementModal').remove();">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-primary" onclick="document.getElementById('viewAnnouncementModal').remove()">
                        <i class="fas fa-check"></i> Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', viewModal);
    loadAnnouncements(); // Refresh to show updated view count
}

function shareAnnouncement(id) {
    const announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
    const announcement = announcements.find(a => a.id === id);
    
    if (!announcement) return;
    
    // Create shareable link (in a real app, this would be a proper URL)
    const shareText = `${announcement.title}\n\n${announcement.content}\n\n- Prof. ${announcement.author}`;
    
    if (navigator.share) {
        navigator.share({
            title: announcement.title,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Announcement copied to clipboard!', 'success');
        });
    }
}

function deleteAnnouncement(id) {
    if (!confirm('Are you sure you want to delete this announcement? This action cannot be undone.')) {
        return;
    }
    
    let announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
    announcements = announcements.filter(a => a.id !== id);
    localStorage.setItem('facultyAnnouncements', JSON.stringify(announcements));
    
    showNotification('Announcement deleted successfully!', 'success');
    loadAnnouncements();
    updateDashboardCounters();
}

function publishDraft(id) {
    let announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
    const announcement = announcements.find(a => a.id === id);
    
    if (!announcement) return;
    
    announcement.status = 'published';
    announcement.date = new Date().toLocaleDateString();
    announcement.time = new Date().toLocaleTimeString();
    
    localStorage.setItem('facultyAnnouncements', JSON.stringify(announcements));
    
    showNotification('Draft published successfully!', 'success');
    loadAnnouncements();
    updateDashboardCounters();
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
    const modalHTML = `
        <div class="modal-overlay" id="studentListModal">
            <div class="modal-content student-list-modal">
                <div class="modal-header">
                    <div class="modal-title-section">
                        <i class="fas fa-users modal-icon"></i>
                        <h3>Student Lists</h3>
                    </div>
                    <button class="modal-close" onclick="closeStudentListModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="student-filters">
                        <div class="filter-tabs">
                            <button class="filter-tab active" onclick="showStudentTab('all')" data-tab="all">
                                All Students (156)
                            </button>
                            <button class="filter-tab" onclick="showStudentTab('bscs3a')" data-tab="bscs3a">
                                BSCS 3A (35)
                            </button>
                            <button class="filter-tab" onclick="showStudentTab('bscs4a')" data-tab="bscs4a">
                                BSCS 4A (28)
                            </button>
                            <button class="filter-tab" onclick="showStudentTab('bsit3b')" data-tab="bsit3b">
                                BSIT 3B (32)
                            </button>
                            <button class="filter-tab" onclick="showStudentTab('bscs1b')" data-tab="bscs1b">
                                BSCS 1B (38)
                            </button>
                            <button class="filter-tab" onclick="showStudentTab('bscs2a')" data-tab="bscs2a">
                                BSCS 2A (31)
                            </button>
                        </div>
                        
                        <div class="search-and-actions">
                            <div class="search-bar">
                                <i class="fas fa-search"></i>
                                <input type="text" id="studentSearch" placeholder="Search students by name or student number..." onkeyup="filterStudents()">
                            </div>
                            <div class="list-actions">
                                <button class="btn-small secondary" onclick="exportStudentList()">
                                    <i class="fas fa-download"></i>
                                    Export
                                </button>
                                <button class="btn-small primary" onclick="sendClassMessage()">
                                    <i class="fas fa-envelope"></i>
                                    Message Class
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div id="studentListContent" class="student-list-content">
                        <!-- Student list will be populated here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalStyles();
    
    // Load initial student list
    showStudentTab('all');
}

function closeStudentListModal() {
    const modal = document.getElementById('studentListModal');
    if (modal) modal.remove();
}

function getStudentData() {
    return {
        'bscs3a': [
            { id: '2021-001', name: 'John Michael Santos', email: 'john.santos@cvsu.edu.ph', status: 'Active', gpa: 3.2 },
            { id: '2021-002', name: 'Maria Elena Cruz', email: 'maria.cruz@cvsu.edu.ph', status: 'Active', gpa: 3.8 },
            { id: '2021-003', name: 'Carlos Antonio Reyes', email: 'carlos.reyes@cvsu.edu.ph', status: 'Active', gpa: 3.5 },
            { id: '2021-004', name: 'Ana Sofia Garcia', email: 'ana.garcia@cvsu.edu.ph', status: 'Active', gpa: 3.7 },
            { id: '2021-005', name: 'Miguel Alejandro Torres', email: 'miguel.torres@cvsu.edu.ph', status: 'Active', gpa: 3.1 },
            { id: '2021-006', name: 'Isabella Victoria Morales', email: 'isabella.morales@cvsu.edu.ph', status: 'Active', gpa: 3.9 },
            { id: '2021-007', name: 'Fernando Luis Martinez', email: 'fernando.martinez@cvsu.edu.ph', status: 'Active', gpa: 3.4 },
            { id: '2021-008', name: 'Carmen Rosa Hernandez', email: 'carmen.hernandez@cvsu.edu.ph', status: 'Active', gpa: 3.6 }
        ],
        'bscs4a': [
            { id: '2020-001', name: 'Roberto Diego Valdez', email: 'roberto.valdez@cvsu.edu.ph', status: 'Active', gpa: 3.3 },
            { id: '2020-002', name: 'Patricia Carmen Lopez', email: 'patricia.lopez@cvsu.edu.ph', status: 'Active', gpa: 3.7 },
            { id: '2020-003', name: 'Eduardo Jose Perez', email: 'eduardo.perez@cvsu.edu.ph', status: 'Active', gpa: 3.5 },
            { id: '2020-004', name: 'Alejandra Lucia Ramirez', email: 'alejandra.ramirez@cvsu.edu.ph', status: 'Active', gpa: 3.8 },
            { id: '2020-005', name: 'Francisco David Moreno', email: 'francisco.moreno@cvsu.edu.ph', status: 'Active', gpa: 3.2 },
            { id: '2020-006', name: 'Valentina Isabel Jimenez', email: 'valentina.jimenez@cvsu.edu.ph', status: 'Active', gpa: 3.9 }
        ],
        'bsit3b': [
            { id: '2021-101', name: 'Daniel Alexander Cruz', email: 'daniel.cruz@cvsu.edu.ph', status: 'Active', gpa: 3.4 },
            { id: '2021-102', name: 'Sophia Gabriela Rivera', email: 'sophia.rivera@cvsu.edu.ph', status: 'Active', gpa: 3.6 },
            { id: '2021-103', name: 'Adrian Nicolas Flores', email: 'adrian.flores@cvsu.edu.ph', status: 'Active', gpa: 3.3 },
            { id: '2021-104', name: 'Camila Esperanza Gutierrez', email: 'camila.gutierrez@cvsu.edu.ph', status: 'Active', gpa: 3.7 },
            { id: '2021-105', name: 'Gabriel Andres Vargas', email: 'gabriel.vargas@cvsu.edu.ph', status: 'Active', gpa: 3.5 },
            { id: '2021-106', name: 'Luna Beatriz Castillo', email: 'luna.castillo@cvsu.edu.ph', status: 'Active', gpa: 3.8 }
        ],
        'bscs1b': [
            { id: '2023-001', name: 'Sebastian Mateo Aguilar', email: 'sebastian.aguilar@cvsu.edu.ph', status: 'Active', gpa: 3.1 },
            { id: '2023-002', name: 'Natalia Valentina Mendez', email: 'natalia.mendez@cvsu.edu.ph', status: 'Active', gpa: 3.6 },
            { id: '2023-003', name: 'Emilio Rafael Herrera', email: 'emilio.herrera@cvsu.edu.ph', status: 'Active', gpa: 3.4 },
            { id: '2023-004', name: 'Ariana Cristina Delgado', email: 'ariana.delgado@cvsu.edu.ph', status: 'Active', gpa: 3.7 },
            { id: '2023-005', name: 'Leonardo Antonio Vega', email: 'leonardo.vega@cvsu.edu.ph', status: 'Active', gpa: 3.2 },
            { id: '2023-006', name: 'Zoe Fernanda Romero', email: 'zoe.romero@cvsu.edu.ph', status: 'Active', gpa: 3.5 }
        ],
        'bscs2a': [
            { id: '2022-001', name: 'Matias Eduardo Ortega', email: 'matias.ortega@cvsu.edu.ph', status: 'Active', gpa: 3.3 },
            { id: '2022-002', name: 'Elena Victoria Ruiz', email: 'elena.ruiz@cvsu.edu.ph', status: 'Active', gpa: 3.8 },
            { id: '2022-003', name: 'Diego Fernando Silva', email: 'diego.silva@cvsu.edu.ph', status: 'Active', gpa: 3.4 },
            { id: '2022-004', name: 'Julia Esperanza Castro', email: 'julia.castro@cvsu.edu.ph', status: 'Active', gpa: 3.6 },
            { id: '2022-005', name: 'Andres Felipe Rojas', email: 'andres.rojas@cvsu.edu.ph', status: 'Active', gpa: 3.7 },
            { id: '2022-006', name: 'Mia Alejandra Soto', email: 'mia.soto@cvsu.edu.ph', status: 'Active', gpa: 3.9 }
        ]
    };
}

function showStudentTab(classCode) {
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-tab="${classCode}"]`).classList.add('active');
    
    const studentData = getStudentData();
    let students = [];
    
    if (classCode === 'all') {
        // Combine all students
        Object.keys(studentData).forEach(key => {
            students = students.concat(studentData[key].map(student => ({
                ...student,
                class: key.toUpperCase()
            })));
        });
    } else {
        students = studentData[classCode] || [];
        students = students.map(student => ({ ...student, class: classCode.toUpperCase() }));
    }
    
    displayStudentList(students, classCode);
}

function displayStudentList(students, classCode) {
    const container = document.getElementById('studentListContent');
    
    if (!container) return;
    
    if (students.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-users"></i>
                <h3>No students found</h3>
                <p>No students match your current filter criteria</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="student-stats">
            <div class="stat-item">
                <i class="fas fa-users"></i>
                <span>Total: ${students.length} students</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-chart-line"></i>
                <span>Avg GPA: ${(students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(2)}</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-check-circle"></i>
                <span>Active: ${students.filter(s => s.status === 'Active').length}</span>
            </div>
        </div>
        
        <div class="student-table-container">
            <table class="student-table">
                <thead>
                    <tr>
                        <th>Student Number</th>
                        <th>Full Name</th>
                        ${classCode === 'all' ? '<th>Class</th>' : ''}
                        <th>Email</th>
                        <th>GPA</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${students.map(student => `
                        <tr class="student-row" data-student-id="${student.id}">
                            <td class="student-id">${student.id}</td>
                            <td class="student-name">
                                <div class="name-container">
                                    <div class="avatar-placeholder">
                                        ${student.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                    </div>
                                    <span>${student.name}</span>
                                </div>
                            </td>
                            ${classCode === 'all' ? `<td class="student-class"><span class="class-badge">${student.class}</span></td>` : ''}
                            <td class="student-email">
                                <a href="mailto:${student.email}" class="email-link">
                                    <i class="fas fa-envelope"></i>
                                    ${student.email}
                                </a>
                            </td>
                            <td class="student-gpa">
                                <span class="gpa-badge ${getGPAClass(student.gpa)}">${student.gpa}</span>
                            </td>
                            <td class="student-status">
                                <span class="status-badge ${student.status.toLowerCase()}">${student.status}</span>
                            </td>
                            <td class="student-actions">
                                <button class="btn-icon" title="View Profile" onclick="viewStudentProfile('${student.id}')">
                                    <i class="fas fa-user"></i>
                                </button>
                                <button class="btn-icon" title="Send Message" onclick="messageStudent('${student.id}')">
                                    <i class="fas fa-envelope"></i>
                                </button>
                                <button class="btn-icon" title="View Grades" onclick="viewStudentGrades('${student.id}')">
                                    <i class="fas fa-chart-bar"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function getGPAClass(gpa) {
    if (gpa >= 3.7) return 'excellent';
    if (gpa >= 3.3) return 'good';
    if (gpa >= 3.0) return 'satisfactory';
    return 'needs-improvement';
}

function filterStudents() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const rows = document.querySelectorAll('.student-row');
    
    rows.forEach(row => {
        const studentId = row.querySelector('.student-id').textContent.toLowerCase();
        const studentName = row.querySelector('.student-name span').textContent.toLowerCase();
        const studentEmail = row.querySelector('.student-email .email-link').textContent.toLowerCase();
        
        const matches = studentId.includes(searchTerm) || 
                       studentName.includes(searchTerm) || 
                       studentEmail.includes(searchTerm);
        
        row.style.display = matches ? '' : 'none';
    });
    
    // Update visible count
    const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
    const totalStat = document.querySelector('.stat-item span');
    if (totalStat && searchTerm) {
        totalStat.textContent = `Showing: ${visibleRows.length} of ${rows.length} students`;
    }
}

function viewStudentProfile(studentId) {
    showNotification(`Opening profile for student ${studentId}...`, 'info');
    // In a real application, this would open a detailed student profile
}

function messageStudent(studentId) {
    showNotification(`Opening message composer for student ${studentId}...`, 'info');
    // In a real application, this would open a message composer
}

function viewStudentGrades(studentId) {
    showNotification(`Loading grades for student ${studentId}...`, 'info');
    // In a real application, this would show the student's grade history
}

function exportStudentList() {
    const activeTab = document.querySelector('.filter-tab.active').dataset.tab;
    showNotification(`Exporting student list for ${activeTab === 'all' ? 'all classes' : activeTab.toUpperCase()}...`, 'success');
    // In a real application, this would generate and download a CSV/Excel file
}

function sendClassMessage() {
    const activeTab = document.querySelector('.filter-tab.active').dataset.tab;
    const className = activeTab === 'all' ? 'all classes' : activeTab.toUpperCase();
    
    const messageModal = `
        <div class="modal-overlay" id="classMessageModal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title-section">
                        <i class="fas fa-envelope modal-icon"></i>
                        <h3>Send Message to ${className}</h3>
                    </div>
                    <button class="modal-close" onclick="document.getElementById('classMessageModal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="messageSubject">Subject</label>
                            <input type="text" id="messageSubject" placeholder="Enter message subject...">
                        </div>
                        <div class="form-group">
                            <label for="messageContent">Message</label>
                            <textarea id="messageContent" rows="6" placeholder="Type your message here..."></textarea>
                        </div>
                        <div class="form-group checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" checked>
                                <span class="checkmark"></span>
                                <span>Send copy to my email</span>
                            </label>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="document.getElementById('classMessageModal').remove()">Cancel</button>
                    <button class="btn-primary" onclick="sendMessage('${activeTab}')">
                        <i class="fas fa-paper-plane"></i>
                        Send Message
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', messageModal);
}

function sendMessage(classCode) {
    const subject = document.getElementById('messageSubject').value;
    const content = document.getElementById('messageContent').value;
    
    if (!subject || !content) {
        showNotification('Please fill in both subject and message content.', 'error');
        return;
    }
    
    const studentCount = getStudentCount(classCode);
    showNotification(`Message sent successfully to ${studentCount} students!`, 'success');
    
    document.getElementById('classMessageModal').remove();
}

function requestRoom(preselectedRoomId = null) {
    const modalHTML = `
        <div class="modal-overlay" id="roomRequestModal">
            <div class="modal-content room-request-modal">
                <div class="modal-header">
                    <div class="modal-title-section">
                        <i class="fas fa-calendar-plus modal-icon"></i>
                        <h3>Request Room Reservation</h3>
                    </div>
                    <button class="modal-close" onclick="closeRoomRequestModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="roomRequestForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="requestBuilding">
                                    <i class="fas fa-building"></i>
                                    Building *
                                </label>
                                <select id="requestBuilding" required onchange="updateRequestRooms()">
                                    <option value="">Select Building</option>
                                    <option value="main">Main Building</option>
                                    <option value="engineering">Engineering Building</option>
                                    <option value="science">Science Building</option>
                                    <option value="it">IT Building</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="requestRoom">
                                    <i class="fas fa-door-open"></i>
                                    Room *
                                </label>
                                <select id="requestRoom" required>
                                    <option value="">Select Room</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="requestDate">
                                    <i class="fas fa-calendar"></i>
                                    Date *
                                </label>
                                <input type="date" id="requestDate" required min="${new Date().toISOString().split('T')[0]}">
                            </div>
                            <div class="form-group">
                                <label for="requestType">
                                    <i class="fas fa-tag"></i>
                                    Request Type *
                                </label>
                                <select id="requestType" required>
                                    <option value="">Select Type</option>
                                    <option value="class">Regular Class</option>
                                    <option value="makeup">Make-up Class</option>
                                    <option value="exam">Examination</option>
                                    <option value="consultation">Student Consultation</option>
                                    <option value="meeting">Faculty Meeting</option>
                                    <option value="event">Special Event</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="requestStartTime">
                                    <i class="fas fa-clock"></i>
                                    Start Time *
                                </label>
                                <select id="requestStartTime" required onchange="updateEndTimeOptions()">
                                    <option value="">Select Start Time</option>
                                    <option value="07:00">7:00 AM</option>
                                    <option value="08:30">8:30 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:30">11:30 AM</option>
                                    <option value="13:00">1:00 PM</option>
                                    <option value="14:30">2:30 PM</option>
                                    <option value="16:00">4:00 PM</option>
                                    <option value="17:30">5:30 PM</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="requestEndTime">
                                    <i class="fas fa-clock"></i>
                                    End Time *
                                </label>
                                <select id="requestEndTime" required>
                                    <option value="">Select End Time</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="requestPurpose">
                                <i class="fas fa-info-circle"></i>
                                Purpose/Subject *
                            </label>
                            <input type="text" id="requestPurpose" placeholder="e.g., Database Systems Lecture, Final Examination" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="requestStudents">
                                <i class="fas fa-users"></i>
                                Expected Number of Students
                            </label>
                            <input type="number" id="requestStudents" placeholder="e.g., 35" min="1" max="100">
                        </div>
                        
                        <div class="form-group">
                            <label>
                                <i class="fas fa-tools"></i>
                                Required Equipment
                            </label>
                            <div class="equipment-checkboxes">
                                <label class="checkbox-label">
                                    <input type="checkbox" value="projector">
                                    <span class="checkmark"></span>
                                    <span>Projector</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="computer">
                                    <span class="checkmark"></span>
                                    <span>Computer Access</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="whiteboard">
                                    <span class="checkmark"></span>
                                    <span>Whiteboard</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="ac">
                                    <span class="checkmark"></span>
                                    <span>Air Conditioning</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="audio">
                                    <span class="checkmark"></span>
                                    <span>Audio System</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="lab">
                                    <span class="checkmark"></span>
                                    <span>Lab Equipment</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="requestNotes">
                                <i class="fas fa-sticky-note"></i>
                                Additional Notes
                            </label>
                            <textarea id="requestNotes" rows="3" placeholder="Any special requirements or notes for the room reservation..."></textarea>
                        </div>
                        
                        <div class="form-group checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="requestRecurring">
                                <span class="checkmark"></span>
                                <div class="checkbox-content">
                                    <i class="fas fa-repeat"></i>
                                    This is a recurring reservation
                                </div>
                            </label>
                        </div>
                        
                        <div id="recurringOptions" class="recurring-options" style="display: none;">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="recurringFrequency">Frequency</label>
                                    <select id="recurringFrequency">
                                        <option value="weekly">Weekly</option>
                                        <option value="biweekly">Bi-weekly</option>
                                        <option value="monthly">Monthly</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="recurringEnd">End Date</label>
                                    <input type="date" id="recurringEnd">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeRoomRequestModal()">
                        <i class="fas fa-times"></i>
                        Cancel
                    </button>
                    <button class="btn-primary" onclick="submitRoomRequest()">
                        <i class="fas fa-paper-plane"></i>
                        Submit Request
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalStyles();
    
    // Set default date to today
    document.getElementById('requestDate').value = new Date().toISOString().split('T')[0];
    
    // Handle preselected room
    if (preselectedRoomId) {
        const rooms = getRoomData();
        const room = rooms.find(r => r.id === preselectedRoomId);
        if (room) {
            document.getElementById('requestBuilding').value = room.building;
            updateRequestRooms();
            setTimeout(() => {
                document.getElementById('requestRoom').value = preselectedRoomId;
            }, 100);
        }
    }
    
    // Add event listener for recurring checkbox
    document.getElementById('requestRecurring').addEventListener('change', function() {
        const recurringOptions = document.getElementById('recurringOptions');
        recurringOptions.style.display = this.checked ? 'block' : 'none';
    });
}

function closeRoomRequestModal() {
    const modal = document.getElementById('roomRequestModal');
    if (modal) modal.remove();
}

function updateRequestRooms() {
    const building = document.getElementById('requestBuilding').value;
    const roomSelect = document.getElementById('requestRoom');
    
    roomSelect.innerHTML = '<option value="">Select Room</option>';
    
    if (!building) return;
    
    const rooms = getRoomData().filter(room => room.building === building);
    
    rooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.id;
        option.textContent = `${room.name} (${room.capacity} seats)`;
        roomSelect.appendChild(option);
    });
}

function updateEndTimeOptions() {
    const startTime = document.getElementById('requestStartTime').value;
    const endTimeSelect = document.getElementById('requestEndTime');
    
    endTimeSelect.innerHTML = '<option value="">Select End Time</option>';
    
    if (!startTime) return;
    
    const timeSlots = [
        { value: '08:30', label: '8:30 AM' },
        { value: '10:00', label: '10:00 AM' },
        { value: '11:30', label: '11:30 AM' },
        { value: '13:00', label: '1:00 PM' },
        { value: '14:30', label: '2:30 PM' },
        { value: '16:00', label: '4:00 PM' },
        { value: '17:30', label: '5:30 PM' },
        { value: '19:00', label: '7:00 PM' }
    ];
    
    const startHour = parseInt(startTime.split(':')[0]);
    const validEndTimes = timeSlots.filter(slot => {
        const endHour = parseInt(slot.value.split(':')[0]);
        return endHour > startHour;
    });
    
    validEndTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time.value;
        option.textContent = time.label;
        endTimeSelect.appendChild(option);
    });
}

function submitRoomRequest() {
    const form = document.getElementById('roomRequestForm');
    const formData = new FormData(form);
    
    // Validate required fields
    const requiredFields = ['requestBuilding', 'requestRoom', 'requestDate', 'requestType', 'requestStartTime', 'requestEndTime', 'requestPurpose'];
    const missingFields = requiredFields.filter(field => !document.getElementById(field).value);
    
    if (missingFields.length > 0) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Get form values
    const building = document.getElementById('requestBuilding').value;
    const roomId = document.getElementById('requestRoom').value;
    const date = document.getElementById('requestDate').value;
    const type = document.getElementById('requestType').value;
    const startTime = document.getElementById('requestStartTime').value;
    const endTime = document.getElementById('requestEndTime').value;
    const purpose = document.getElementById('requestPurpose').value;
    const students = document.getElementById('requestStudents').value;
    const notes = document.getElementById('requestNotes').value;
    const isRecurring = document.getElementById('requestRecurring').checked;
    
    // Get selected equipment
    const equipment = Array.from(document.querySelectorAll('.equipment-checkboxes input:checked'))
        .map(cb => cb.value);
    
    // Get room details
    const rooms = getRoomData();
    const room = rooms.find(r => r.id === roomId);
    
    // Create request object
    const request = {
        id: Date.now(),
        building,
        roomId,
        roomName: room?.name || 'Unknown Room',
        date,
        type,
        startTime,
        endTime,
        purpose,
        students: students || 'Not specified',
        equipment,
        notes,
        isRecurring,
        status: 'pending',
        submittedDate: new Date().toLocaleDateString(),
        submittedTime: new Date().toLocaleTimeString(),
        faculty: 'Prof. Jericho Delos Reyes'
    };
    
    // Handle recurring requests
    if (isRecurring) {
        const frequency = document.getElementById('recurringFrequency').value;
        const endDate = document.getElementById('recurringEnd').value;
        request.recurring = { frequency, endDate };
    }
    
    // Save request
    let requests = JSON.parse(localStorage.getItem('roomRequests') || '[]');
    requests.unshift(request);
    localStorage.setItem('roomRequests', JSON.stringify(requests));
    
    // Show success message
    const recurringText = isRecurring ? ' (recurring)' : '';
    showNotification(`Room request submitted successfully${recurringText}! You will be notified once it's reviewed.`, 'success');
    
    closeRoomRequestModal();
    
    // Update dashboard if needed
    updateDashboardCounters();
}

function checkRoomAvailability() {
    const modalHTML = `
        <div class="modal-overlay" id="roomAvailabilityModal">
            <div class="modal-content room-availability-modal">
                <div class="modal-header">
                    <div class="modal-title-section">
                        <i class="fas fa-search modal-icon"></i>
                        <h3>Check Room Availability</h3>
                    </div>
                    <button class="modal-close" onclick="closeRoomAvailabilityModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="search-filters">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="availabilityBuilding">
                                    <i class="fas fa-building"></i>
                                    Building
                                </label>
                                <select id="availabilityBuilding" onchange="updateAvailabilityRooms()">
                                    <option value="">All Buildings</option>
                                    <option value="main">Main Building</option>
                                    <option value="engineering">Engineering Building</option>
                                    <option value="science">Science Building</option>
                                    <option value="it">IT Building</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="availabilityDate">
                                    <i class="fas fa-calendar"></i>
                                    Date
                                </label>
                                <input type="date" id="availabilityDate" value="${new Date().toISOString().split('T')[0]}">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="availabilityTime">
                                    <i class="fas fa-clock"></i>
                                    Time Slot
                                </label>
                                <select id="availabilityTime">
                                    <option value="">All Time Slots</option>
                                    <option value="07:00-08:30">7:00 - 8:30 AM</option>
                                    <option value="08:30-10:00">8:30 - 10:00 AM</option>
                                    <option value="10:00-11:30">10:00 - 11:30 AM</option>
                                    <option value="11:30-13:00">11:30 - 1:00 PM</option>
                                    <option value="14:00-15:30">2:00 - 3:30 PM</option>
                                    <option value="15:30-17:00">3:30 - 5:00 PM</option>
                                    <option value="17:00-18:30">5:00 - 6:30 PM</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="availabilityCapacity">
                                    <i class="fas fa-users"></i>
                                    Minimum Capacity
                                </label>
                                <select id="availabilityCapacity">
                                    <option value="">Any Capacity</option>
                                    <option value="20">20+ students</option>
                                    <option value="30">30+ students</option>
                                    <option value="40">40+ students</option>
                                    <option value="50">50+ students</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>
                                <i class="fas fa-tools"></i>
                                Required Equipment
                            </label>
                            <div class="equipment-checkboxes">
                                <label class="checkbox-label">
                                    <input type="checkbox" value="projector">
                                    <span class="checkmark"></span>
                                    <span>Projector</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="computer">
                                    <span class="checkmark"></span>
                                    <span>Computer Lab</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="whiteboard">
                                    <span class="checkmark"></span>
                                    <span>Whiteboard</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="ac">
                                    <span class="checkmark"></span>
                                    <span>Air Conditioning</span>
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" value="audio">
                                    <span class="checkmark"></span>
                                    <span>Audio System</span>
                                </label>
                            </div>
                        </div>
                        <button class="btn-primary search-btn" onclick="searchAvailableRooms()">
                            <i class="fas fa-search"></i>
                            Search Available Rooms
                        </button>
                    </div>
                    
                    <div id="availabilityResults" class="availability-results">
                        <!-- Results will be populated here -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalStyles();
    
    // Load initial results
    searchAvailableRooms();
}

function closeRoomAvailabilityModal() {
    const modal = document.getElementById('roomAvailabilityModal');
    if (modal) modal.remove();
}

function updateAvailabilityRooms() {
    // This function can be used to filter rooms by building if needed
    searchAvailableRooms();
}

function searchAvailableRooms() {
    const building = document.getElementById('availabilityBuilding')?.value;
    const date = document.getElementById('availabilityDate')?.value;
    const timeSlot = document.getElementById('availabilityTime')?.value;
    const minCapacity = document.getElementById('availabilityCapacity')?.value;
    const requiredEquipment = Array.from(document.querySelectorAll('.equipment-checkboxes input:checked')).map(cb => cb.value);
    
    const rooms = getRoomData();
    let filteredRooms = rooms;
    
    // Apply filters
    if (building) {
        filteredRooms = filteredRooms.filter(room => room.building === building);
    }
    
    if (minCapacity) {
        filteredRooms = filteredRooms.filter(room => room.capacity >= parseInt(minCapacity));
    }
    
    if (requiredEquipment.length > 0) {
        filteredRooms = filteredRooms.filter(room => 
            requiredEquipment.every(eq => room.equipment.some(roomEq => roomEq.toLowerCase().includes(eq)))
        );
    }
    
    // Get availability for each room
    const availabilityResults = filteredRooms.map(room => ({
        ...room,
        availability: getRoomAvailability(room.id, date, timeSlot)
    }));
    
    displayAvailabilityResults(availabilityResults, timeSlot);
}

function getRoomData() {
    return [
        {
            id: 'main-401',
            name: 'Room 401',
            building: 'main',
            buildingName: 'Main Building',
            floor: 4,
            capacity: 40,
            equipment: ['Projector', 'Whiteboard', 'Air Conditioning'],
            description: 'Standard classroom with modern facilities'
        },
        {
            id: 'main-402',
            name: 'Room 402',
            building: 'main',
            buildingName: 'Main Building',
            floor: 4,
            capacity: 35,
            equipment: ['Projector', 'Whiteboard'],
            description: 'Regular classroom for lectures'
        },
        {
            id: 'it-301',
            name: 'IT Lab 301',
            building: 'it',
            buildingName: 'IT Building',
            floor: 3,
            capacity: 30,
            equipment: ['Computers', 'Projector', 'Air Conditioning', 'Audio System'],
            description: 'Computer laboratory with 30 workstations'
        },
        {
            id: 'it-302',
            name: 'IT Lab 302',
            building: 'it',
            buildingName: 'IT Building',
            floor: 3,
            capacity: 25,
            equipment: ['Computers', 'Projector', 'Whiteboard'],
            description: 'Computer laboratory with 25 workstations'
        },
        {
            id: 'science-201',
            name: 'Science Lab 201',
            building: 'science',
            buildingName: 'Science Building',
            floor: 2,
            capacity: 30,
            equipment: ['Projector', 'Lab Equipment', 'Air Conditioning'],
            description: 'Science laboratory with research facilities'
        },
        {
            id: 'eng-101',
            name: 'Engineering Room 101',
            building: 'engineering',
            buildingName: 'Engineering Building',
            floor: 1,
            capacity: 50,
            equipment: ['Projector', 'Whiteboard', 'Audio System', 'Air Conditioning'],
            description: 'Large lecture hall for engineering courses'
        }
    ];
}

function getRoomAvailability(roomId, date, timeSlot) {
    // Mock availability data - in a real app, this would come from a database
    const schedules = {
        'main-401': {
            '07:00-08:30': { occupied: true, class: 'Mathematics', instructor: 'Prof. Reyes' },
            '08:30-10:00': { occupied: true, class: 'Database Systems', instructor: 'Prof. Delos Reyes (You)' },
            '10:00-11:30': { occupied: false },
            '11:30-13:00': { occupied: true, class: 'Data Structures', instructor: 'Prof. Santos' },
            '14:00-15:30': { occupied: true, class: 'Web Development', instructor: 'Prof. Delos Reyes (You)' },
            '15:30-17:00': { occupied: false },
            '17:00-18:30': { occupied: false }
        },
        'main-402': {
            '07:00-08:30': { occupied: false },
            '08:30-10:00': { occupied: false },
            '10:00-11:30': { occupied: true, class: 'Software Engineering', instructor: 'Prof. Delos Reyes (You)' },
            '11:30-13:00': { occupied: false },
            '14:00-15:30': { occupied: true, class: 'Algorithms', instructor: 'Prof. Garcia' },
            '15:30-17:00': { occupied: false },
            '17:00-18:30': { occupied: false }
        },
        'it-301': {
            '07:00-08:30': { occupied: true, class: 'Programming Lab', instructor: 'Prof. Martinez' },
            '08:30-10:00': { occupied: false },
            '10:00-11:30': { occupied: false },
            '11:30-13:00': { occupied: true, class: 'Database Lab', instructor: 'Prof. Cruz' },
            '14:00-15:30': { occupied: false },
            '15:30-17:00': { occupied: true, class: 'Computer Programming', instructor: 'Prof. Delos Reyes (You)' },
            '17:00-18:30': { occupied: false }
        }
    };
    
    const timeSlots = [
        '07:00-08:30', '08:30-10:00', '10:00-11:30', 
        '11:30-13:00', '14:00-15:30', '15:30-17:00', '17:00-18:30'
    ];
    
    if (timeSlot) {
        return schedules[roomId]?.[timeSlot] || { occupied: false };
    }
    
    // Return all time slots
    const result = {};
    timeSlots.forEach(slot => {
        result[slot] = schedules[roomId]?.[slot] || { occupied: false };
    });
    
    return result;
}

function displayAvailabilityResults(rooms, specificTimeSlot) {
    const resultsContainer = document.getElementById('availabilityResults');
    
    if (!resultsContainer) return;
    
    if (rooms.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No rooms found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = `
        <div class="results-header">
            <h4>
                <i class="fas fa-list"></i>
                Found ${rooms.length} room${rooms.length !== 1 ? 's' : ''} matching your criteria
            </h4>
        </div>
        <div class="rooms-grid">
            ${rooms.map(room => `
                <div class="room-card">
                    <div class="room-header">
                        <div class="room-title">
                            <h5>${room.name}</h5>
                            <span class="building-badge">${room.buildingName}</span>
                        </div>
                        <div class="room-capacity">
                            <i class="fas fa-users"></i>
                            <span>${room.capacity} seats</span>
                        </div>
                    </div>
                    
                    <div class="room-details">
                        <p class="room-description">${room.description}</p>
                        <div class="room-equipment">
                            <strong>Equipment:</strong>
                            <div class="equipment-tags">
                                ${room.equipment.map(eq => `<span class="equipment-tag">${eq}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <div class="room-availability">
                        <h6>Today's Availability:</h6>
                        <div class="time-slots">
                            ${specificTimeSlot ? 
                                `<div class="time-slot ${room.availability.occupied ? 'occupied' : 'available'}">
                                    <span class="time">${specificTimeSlot.replace('-', ' - ')}</span>
                                    <span class="status">${room.availability.occupied ? 'Occupied' : 'Available'}</span>
                                    ${room.availability.occupied ? `<small>${room.availability.class} - ${room.availability.instructor}</small>` : ''}
                                </div>` 
                                : 
                                Object.entries(room.availability).map(([time, info]) => `
                                    <div class="time-slot ${info.occupied ? 'occupied' : 'available'}">
                                        <span class="time">${time.replace('-', ' - ')}</span>
                                        <span class="status">${info.occupied ? 'Occupied' : 'Available'}</span>
                                        ${info.occupied ? `<small>${info.class} - ${info.instructor}</small>` : ''}
                                    </div>
                                `).join('')
                            }
                        </div>
                    </div>
                    
                    <div class="room-actions">
                        <button class="btn-small secondary" onclick="viewRoomDetails('${room.id}')">
                            <i class="fas fa-info-circle"></i>
                            Details
                        </button>
                        <button class="btn-small primary" onclick="requestRoomFromAvailability('${room.id}')">
                            <i class="fas fa-calendar-plus"></i>
                            Request Room
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function viewRoomDetails(roomId) {
    const rooms = getRoomData();
    const room = rooms.find(r => r.id === roomId);
    
    if (!room) return;
    
    showNotification(`Room Details: ${room.name} - ${room.buildingName}, Floor ${room.floor}. Capacity: ${room.capacity} students. Equipment: ${room.equipment.join(', ')}.`, 'info');
}

function requestRoomFromAvailability(roomId) {
    closeRoomAvailabilityModal();
    requestRoom(roomId);
}

// Quick Actions are handled by the functions defined above

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
    
    // Initialize chatbot as closed by default
    const chatbot = document.getElementById('chatbot');
    if (chatbot) {
        chatbot.classList.remove('open');
    }
}

function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    
    if (chatbot) {
        chatbot.classList.toggle('open');
        console.log('Chatbot toggled:', chatbot.classList.contains('open') ? 'open' : 'closed');
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (input.value.trim() === '') return;
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-user"></i>
        </div>
        <div class="message-content">${input.value}</div>
    `;
    messagesContainer.appendChild(userMessage);
    
    // Clear input
    const userInput = input.value;
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'message bot-message';
        botMessage.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">${generateFacultyAIResponse(userInput)}</div>
        `;
        messagesContainer.appendChild(botMessage);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add function to handle suggestion buttons
function sendSuggestion(message) {
    const input = document.getElementById('chatInput');
    input.value = message;
    sendMessage();
}

// Add Enter key support for chat input
function setupChatInputListeners() {
    const chatInput = document.getElementById('chatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
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
                background: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
                backdrop-filter: blur(4px);
                animation: fadeIn 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background: var(--white);
                border-radius: 12px;
                width: 90%;
                max-width: 700px;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .announcement-modal { max-width: 800px; }
            .room-availability-modal { max-width: 1000px; }
            .room-request-modal { max-width: 700px; }
            .student-list-modal { max-width: 1200px; }
            
            .modal-header {
                padding: 24px 30px;
                border-bottom: 1px solid var(--medium-gray);
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: linear-gradient(135deg, var(--cvsu-green) 0%, #228B22 100%);
                color: var(--white);
                border-radius: 12px 12px 0 0;
            }
            
            .modal-title-section {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .modal-icon {
                font-size: 1.5rem;
                opacity: 0.9;
            }
            
            .modal-header h3 {
                color: var(--white);
                font-size: 1.6rem;
                font-weight: 600;
                margin: 0;
            }
            
            .modal-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                font-size: 1.2rem;
                color: var(--white);
                cursor: pointer;
                padding: 8px;
                border-radius: 6px;
                transition: var(--transition);
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
            }
            
            .modal-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .form-group {
                margin-bottom: 24px;
            }
            
            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            
            .form-group label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
                color: var(--text-dark);
                margin-bottom: 8px;
                font-size: 0.95rem;
            }
            
            .form-group label i {
                color: var(--cvsu-green);
                width: 16px;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid var(--medium-gray);
                border-radius: 8px;
                font-size: 0.95rem;
                transition: var(--transition);
                box-sizing: border-box;
                font-family: 'Inter', sans-serif;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--cvsu-green);
                box-shadow: 0 0 0 3px rgba(0, 100, 0, 0.1);
                transform: translateY(-1px);
            }
            
            .form-group textarea {
                resize: vertical;
                line-height: 1.6;
                min-height: 120px;
            }
            
            .form-hint {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 0.85rem;
                color: var(--dark-gray);
                margin-top: 6px;
                font-style: italic;
            }
            
            .form-hint i {
                color: var(--cvsu-green);
                opacity: 0.7;
            }
            
            .checkbox-group {
                margin: 20px 0;
            }
            
            .checkbox-label {
                display: flex;
                align-items: center;
                gap: 12px;
                cursor: pointer;
                padding: 12px 16px;
                border: 2px solid var(--light-gray);
                border-radius: 8px;
                transition: var(--transition);
                background: var(--white);
            }
            
            .checkbox-label:hover {
                border-color: var(--cvsu-green);
                background: rgba(0, 100, 0, 0.02);
            }
            
            .checkbox-label input[type="checkbox"] {
                width: auto;
                margin: 0;
                transform: scale(1.2);
            }
            
            .checkbox-content {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 500;
            }
            
            .equipment-checkboxes {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 12px;
                margin-top: 12px;
            }
            
            .equipment-checkboxes .checkbox-label {
                padding: 10px 14px;
                font-size: 0.9rem;
            }
            
            .modal-footer {
                padding: 20px 30px;
                border-top: 1px solid var(--medium-gray);
                display: flex;
                gap: 15px;
                justify-content: flex-end;
                background: var(--light-gray);
                border-radius: 0 0 12px 12px;
            }
            
            .search-btn {
                width: 100%;
                margin-top: 20px;
                padding: 14px;
                font-weight: 600;
            }
            
            /* Room Availability Styles */
            .search-filters {
                background: var(--light-gray);
                padding: 24px;
                border-radius: 8px;
                margin-bottom: 24px;
            }
            
            .availability-results {
                margin-top: 24px;
            }
            
            .results-header h4 {
                color: var(--text-dark);
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .rooms-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 20px;
            }
            
            .room-card {
                border: 2px solid var(--medium-gray);
                border-radius: 8px;
                padding: 20px;
                background: var(--white);
                transition: var(--transition);
            }
            
            .room-card:hover {
                border-color: var(--cvsu-green);
                box-shadow: 0 4px 12px rgba(0, 100, 0, 0.1);
                transform: translateY(-2px);
            }
            
            .room-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 12px;
            }
            
            .room-title h5 {
                margin: 0 0 4px 0;
                color: var(--text-dark);
                font-size: 1.1rem;
            }
            
            .building-badge {
                background: var(--cvsu-green);
                color: var(--white);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
            }
            
            .room-capacity {
                display: flex;
                align-items: center;
                gap: 4px;
                color: var(--dark-gray);
                font-size: 0.9rem;
            }
            
            .room-details {
                margin: 16px 0;
            }
            
            .room-description {
                color: var(--dark-gray);
                font-size: 0.9rem;
                margin-bottom: 12px;
            }
            
            .equipment-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
                margin-top: 6px;
            }
            
            .equipment-tag {
                background: var(--light-gray);
                color: var(--text-dark);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8rem;
            }
            
            .room-availability h6 {
                margin: 16px 0 8px 0;
                color: var(--text-dark);
            }
            
            .time-slots {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            
            .time-slot {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 0.85rem;
            }
            
            .time-slot.available {
                background: rgba(40, 167, 69, 0.1);
                border-left: 4px solid #28a745;
            }
            
            .time-slot.occupied {
                background: rgba(220, 53, 69, 0.1);
                border-left: 4px solid #dc3545;
            }
            
            .time-slot .status {
                font-weight: 600;
            }
            
            .time-slot small {
                color: var(--dark-gray);
                font-size: 0.75rem;
            }
            
            .room-actions {
                display: flex;
                gap: 8px;
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid var(--light-gray);
            }
            
            /* Recurring Options */
            .recurring-options {
                background: var(--light-gray);
                padding: 20px;
                border-radius: 8px;
                margin-top: 16px;
                border-left: 4px solid var(--cvsu-green);
            }
            
            /* Student List Styles */
            .student-filters {
                margin-bottom: 24px;
            }
            
            .filter-tabs {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-bottom: 16px;
                border-bottom: 2px solid var(--light-gray);
                padding-bottom: 16px;
            }
            
            .filter-tab {
                padding: 8px 16px;
                border: 2px solid var(--medium-gray);
                background: var(--white);
                color: var(--text-dark);
                border-radius: 20px;
                cursor: pointer;
                transition: var(--transition);
                font-size: 0.9rem;
                font-weight: 500;
            }
            
            .filter-tab.active {
                background: var(--cvsu-green);
                color: var(--white);
                border-color: var(--cvsu-green);
            }
            
            .filter-tab:hover:not(.active) {
                border-color: var(--cvsu-green);
                background: rgba(0, 100, 0, 0.05);
            }
            
            .search-and-actions {
                display: flex;
                gap: 16px;
                align-items: center;
                flex-wrap: wrap;
            }
            
            .search-bar {
                flex: 1;
                position: relative;
                min-width: 300px;
            }
            
            .search-bar i {
                position: absolute;
                left: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--dark-gray);
            }
            
            .search-bar input {
                width: 100%;
                padding: 12px 12px 12px 40px;
                border: 2px solid var(--medium-gray);
                border-radius: 8px;
                font-size: 0.9rem;
            }
            
            .list-actions {
                display: flex;
                gap: 8px;
            }
            
            .student-stats {
                display: flex;
                gap: 24px;
                margin-bottom: 20px;
                padding: 16px;
                background: var(--light-gray);
                border-radius: 8px;
            }
            
            .stat-item {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--text-dark);
                font-weight: 500;
            }
            
            .stat-item i {
                color: var(--cvsu-green);
            }
            
            .student-table-container {
                overflow-x: auto;
            }
            
            .student-table {
                width: 100%;
                border-collapse: collapse;
                background: var(--white);
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            
            .student-table th {
                background: var(--cvsu-green);
                color: var(--white);
                padding: 16px 12px;
                text-align: left;
                font-weight: 600;
                font-size: 0.9rem;
            }
            
            .student-table td {
                padding: 12px;
                border-bottom: 1px solid var(--light-gray);
                vertical-align: middle;
            }
            
            .student-table tr:hover {
                background: rgba(0, 100, 0, 0.02);
            }
            
            .name-container {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .avatar-placeholder {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: var(--cvsu-green);
                color: var(--white);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 600;
                font-size: 0.8rem;
            }
            
            .class-badge {
                background: var(--light-gray);
                color: var(--text-dark);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .email-link {
                color: var(--cvsu-green);
                text-decoration: none;
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 0.9rem;
            }
            
            .email-link:hover {
                text-decoration: underline;
            }
            
            .gpa-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-weight: 600;
                font-size: 0.85rem;
            }
            
            .gpa-badge.excellent { background: #28a745; color: white; }
            .gpa-badge.good { background: #17a2b8; color: white; }
            .gpa-badge.satisfactory { background: #ffc107; color: #333; }
            .gpa-badge.needs-improvement { background: #dc3545; color: white; }
            
            .status-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-weight: 600;
                font-size: 0.8rem;
            }
            
            .status-badge.active {
                background: #28a745;
                color: white;
            }
            
            .student-actions {
                display: flex;
                gap: 4px;
            }
            
            .empty-state {
                text-align: center;
                padding: 40px 20px;
                color: var(--dark-gray);
            }
            
            .empty-state i {
                font-size: 3rem;
                color: var(--medium-gray);
                margin-bottom: 16px;
            }
            
            .empty-state h3 {
                margin: 0 0 8px 0;
                color: var(--text-dark);
            }
            
            /* Announcement specific styles */
            .announcement-badges {
                display: flex;
                gap: 8px;
                margin-top: 8px;
            }
            
            .priority-badge {
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: uppercase;
            }
            
            .priority-badge.normal { background: #6c757d; color: white; }
            .priority-badge.important { background: #ffc107; color: #333; }
            .priority-badge.urgent { background: #dc3545; color: white; }
            
            .type-badge {
                background: var(--light-gray);
                color: var(--text-dark);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: 600;
                text-transform: capitalize;
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
                
                .search-and-actions {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .search-bar {
                    min-width: auto;
                }
                
                .student-stats {
                    flex-direction: column;
                    gap: 12px;
                }
                
                .filter-tabs {
                    justify-content: center;
                }
                
                .rooms-grid {
                    grid-template-columns: 1fr;
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

function updateDashboardCounters() {
    // Update announcement counter
    const announcements = JSON.parse(localStorage.getItem('facultyAnnouncements') || '[]');
    const publishedCount = announcements.filter(a => a.status === 'published').length;
    
    const announcementCard = document.querySelector('.overview-card .card-content h3');
    if (announcementCard && announcementCard.textContent === 'Announcements') {
        const numberElement = announcementCard.nextElementSibling;
        if (numberElement) {
            numberElement.textContent = publishedCount;
        }
    }
    
    // Update room request counter if needed
    const requests = JSON.parse(localStorage.getItem('roomRequests') || '[]');
    const pendingRequests = requests.filter(r => r.status === 'pending').length;
    
    console.log(`Dashboard updated: ${publishedCount} announcements, ${pendingRequests} pending room requests`);
}

// Initialize some sample data on first load
function initializeSampleData() {
    // Check if we already have data
    const existingAnnouncements = localStorage.getItem('facultyAnnouncements');
    
    // For testing, clear existing data to ensure fresh sample data loads
    console.log("Initializing sample data...");
    localStorage.removeItem('facultyAnnouncements');
    
    // Always load sample data for testing including draft announcements
    const sampleAnnouncements = [
            {
                id: Date.now() - 86400000, // 1 day ago
                title: 'Database Systems Final Project Guidelines',
                content: 'The final project for Database Systems will require students to design and implement a complete database solution for a real-world scenario. The project should demonstrate your understanding of database design principles, normalization, SQL queries, and database administration.\n\nDeadline: December 20, 2024\nPresentation: December 22, 2024\n\nDetailed requirements have been uploaded to the course portal.',
                targetClass: 'bscs3a',
                priority: 'important',
                type: 'assignment',
                visibility: 'class',
                tags: ['final project', 'database', 'deadline'],
                author: 'Prof. Jericho Delos Reyes',
                date: new Date(Date.now() - 86400000).toLocaleDateString(),
                time: new Date(Date.now() - 86400000).toLocaleTimeString(),
                views: 89,
                status: 'published'
            },
            {
                id: Date.now() - 172800000, // 2 days ago
                title: 'Software Engineering Mid-term Exam Schedule',
                content: 'The mid-term examination for Software Engineering will be held on December 18, 2024, from 10:00 AM to 12:00 PM in Room 402.\n\nTopics covered:\n- Software Development Life Cycle\n- Requirements Engineering\n- System Design and Architecture\n- Testing Methodologies\n\nPlease bring your student ID and writing materials. Calculators are not allowed.',
                targetClass: 'bscs4a',
                priority: 'urgent',
                type: 'exam',
                visibility: 'class',
                tags: ['midterm', 'exam', 'schedule'],
                author: 'Prof. Jericho Delos Reyes',
                date: new Date(Date.now() - 172800000).toLocaleDateString(),
                time: new Date(Date.now() - 172800000).toLocaleTimeString(),
                views: 45,
                status: 'published'
            },
            {
                id: Date.now() - 259200000, // 3 days ago
                title: 'Web Development Lab Requirements',
                content: 'Students enrolled in Web Development are required to bring their laptops for the upcoming laboratory sessions starting next week.\n\nRequired software:\n- Visual Studio Code or any text editor\n- Node.js (latest LTS version)\n- Git\n- Chrome or Firefox browser\n\nIf you need help with installation, please see me during office hours.',
                targetClass: 'bsit3b',
                priority: 'normal',
                type: 'general',
                visibility: 'class',
                tags: ['lab', 'requirements', 'software'],
                author: 'Prof. Jericho Delos Reyes',
                date: new Date(Date.now() - 259200000).toLocaleDateString(),
                time: new Date(Date.now() - 259200000).toLocaleTimeString(),
                views: 67,
                status: 'published'
            },
            // Add sample draft announcements
            {
                id: Date.now() - 345600000, // 4 days ago
                title: 'Semester Final Exam Schedule',
                content: 'The final examinations for this semester will be conducted from December 15-22, 2024.\n\nDetailed schedule:\n- Database Systems: December 15, 8:00 AM\n- Software Engineering: December 17, 10:00 AM\n- Web Development: December 19, 2:00 PM\n\nAll exams will be held in the respective classrooms unless otherwise specified.',
                targetClass: 'all',
                priority: 'urgent',
                type: 'exam',
                visibility: 'public',
                tags: ['final exam', 'schedule', 'semester'],
                author: 'Prof. Jericho Delos Reyes',
                date: new Date(Date.now() - 345600000).toLocaleDateString(),
                time: new Date(Date.now() - 345600000).toLocaleTimeString(),
                views: 0,
                status: 'draft'
            },
            {
                id: Date.now() - 432000000, // 5 days ago
                title: 'Holiday Break Announcement',
                content: 'The university will be closed for the holiday break from December 23, 2024 to January 2, 2025.\n\nClasses will resume on January 3, 2025. Please use this time to rest and prepare for the next semester.\n\nHappy holidays to all!',
                targetClass: 'all',
                priority: 'normal',
                type: 'general',
                visibility: 'public',
                tags: ['holiday', 'break', 'semester'],
                author: 'Prof. Jericho Delos Reyes',
                date: new Date(Date.now() - 432000000).toLocaleDateString(),
                time: new Date(Date.now() - 432000000).toLocaleTimeString(),
                views: 0,
                status: 'draft'
            }        ];
        
        localStorage.setItem('facultyAnnouncements', JSON.stringify(sampleAnnouncements));
        console.log("Sample data loaded with", sampleAnnouncements.length, "announcements");
}

// Expose necessary functions to the global scope
window.openAnnouncementModal = openAnnouncementModal;
window.closeAnnouncementModal = closeAnnouncementModal;
window.saveDraft = saveDraft;
window.publishAnnouncement = publishAnnouncement;
window.editAnnouncement = editAnnouncement;
window.viewAnnouncement = viewAnnouncement;
window.shareAnnouncement = shareAnnouncement;
window.deleteAnnouncement = deleteAnnouncement;
window.publishDraft = publishDraft;
window.checkRoomAvailability = checkRoomAvailability;
window.viewStudentList = viewStudentList;
window.requestRoom = requestRoom;
window.showAnnouncementTab = showAnnouncementTab;
window.showSection = showSection;
window.toggleChatbot = toggleChatbot;
window.sendMessage = sendMessage;
window.sendSuggestion = sendSuggestion;
window.showNotification = showNotification;

// Add logging to verify functions are working
console.log("Faculty dashboard functions successfully loaded and exposed to the window object");

// Test if functions are accessible
console.log("Testing function accessibility:");
console.log("openAnnouncementModal:", typeof window.openAnnouncementModal);
console.log("showSection:", typeof window.showSection);
console.log("toggleChatbot:", typeof window.toggleChatbot);

// Call initialization when dashboard loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM Content Loaded - Starting initialization");
    
    initializeSampleData();
    initializeFacultyDashboard();
    initializeChatbot();
    setupChatInputListeners();
    updateCurrentTime();
    updateDashboardCounters();
    
    // Load announcements if on announcements tab
    if (document.getElementById('announcements')?.classList.contains('active')) {
        loadAnnouncements();
    }
    
    // Test function availability after DOM is loaded
    setTimeout(() => {
        console.log("Testing function availability after DOM load:");
        console.log("openAnnouncementModal available:", typeof window.openAnnouncementModal === 'function');
        console.log("Direct function test:");
        try {
            if (typeof openAnnouncementModal === 'function') {
                console.log("✓ openAnnouncementModal function exists locally");
            }
            if (typeof window.openAnnouncementModal === 'function') {
                console.log("✓ openAnnouncementModal function exists on window");
            }
        } catch (e) {
            console.error("Function test error:", e);
        }
    }, 1000);
    
    setInterval(updateCurrentTime, 60000); // Update every minute
});
