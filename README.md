# UNISYNC - University Management System Prototype

## Overview
UNISYNC is a centralized University Management System designed for Cavite State University – Imus Campus. This prototype includes high-fidelity UI/UX mockups for web and mobile dashboards supporting Admin, Faculty, and Student roles, featuring a modern, enthusiastic landing page with smooth animations and enhanced user experience.

## Features
- **🚀 Modern Landing Page**: Enthusiastic design with smooth animations, interactive elements, and glass-morphism effects
- **Multi-Role Dashboard System**: Admin, Faculty, and Student interfaces
- **Responsive Design**: Optimized for both web and mobile devices
- **AI Virtual Assistant**: Interactive chatbot for each user role
- **Announcement Board**: Centralized communication system
- **Room Scheduling & Viewing**: Comprehensive room management
- **Real-time Notifications**: System alerts and updates
- **Clean Academic Design**: Using CvSU green (#006400) color scheme with modern gradients
- **Enhanced UX**: Smooth transitions, hover effects, and loading animations

## Project Structure
```
UNISYNC_PROTOTYPE/
├── index.html                 # Modern landing page with role selection
├── assets/
│   ├── landing/
│   │   ├── css/
│   │   │   └── styles.css     # Modern landing page styles
│   │   └── img/
│   │       ├── cvsu-logo.png  # University logo
│   │       └── favicon.ico    # Site favicon
│   └── img/
│       └── avatars/           # User avatar images
│           ├── admin-avatar.jpg
│           ├── admin-avatar2.jpg
│           ├── faculty-avatar.jpg
│           └── student-avatar.jpg
├── admin/
│   ├── dashboard.html         # Admin web dashboard
│   ├── mobile.html           # Admin mobile dashboard
│   ├── css/
│   │   ├── admin.css         # Admin web styles
│   │   └── admin-mobile.css  # Admin mobile styles
│   ├── javascript/
│   │   ├── admin.js          # Admin web functionality
│   │   └── admin-mobile.js   # Admin mobile functionality
│   └── img/                  # Admin-specific images
├── faculty/
│   ├── dashboard.html        # Faculty web dashboard
│   ├── mobile.html          # Faculty mobile dashboard
│   ├── css/
│   │   ├── faculty.css       # Faculty web styles
│   │   └── faculty-mobile.css # Faculty mobile styles
│   ├── javascript/
│   │   ├── faculty.js        # Faculty web functionality
│   │   └── faculty-mobile.js # Faculty mobile functionality
│   └── img/                  # Faculty-specific images
└── student/
    ├── dashboard.html        # Student web dashboard
    ├── mobile.html          # Student mobile dashboard
    ├── css/
    │   ├── student.css       # Student web styles
    │   └── mobile.css        # Student mobile styles
    ├── javascript/
    │   ├── student.js        # Student web functionality
    │   └── mobile.js         # Student mobile functionality
    └── img/                  # Student-specific images
```

## Design System

### Color Palette
- **Primary Green**: #006400 (CvSU Green)
- **Secondary Green**: #228b22
- **Background**: #f8fffe to #e8f5f0 (gradient)
- **Text**: #2c3e50
- **Accent**: White with gray tones

### Typography
- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Weights**: 300, 400, 500, 600, 700

### Visual Hierarchy
- Clear section divisions
- Consistent spacing and padding
- Recognizable iconography (Font Awesome 6.0)
- Smooth transitions and hover effects

## User Roles & Features

### Admin Dashboard
**Web Features:**
- System overview with real-time statistics
- User management (CRUD operations)
- System health monitoring
- Reports generation and analytics
- Announcement management
- Room allocation and scheduling
- AI assistant for administrative tasks

**Mobile Features:**
- Quick stats grid
- System status monitoring
- Quick actions panel
- Recent activity feed
- Floating chatbot
- Push notifications panel

### Faculty Dashboard
**Web Features:**
- Class schedule management
- Student enrollment tracking
- Assignment and grade management
- Room booking system
- Announcement posting
- AI assistant for academic tasks

**Mobile Features:**
- Today's schedule view
- Quick class actions
- Student roster access
- Grade entry shortcuts
- Notification system
- Mobile-optimized chatbot

### Student Dashboard
**Web Features:**
- Personal class schedule
- Grade viewing and tracking
- Room availability checker
- Announcement board
- Assignment submissions
- AI assistant for academic support

**Mobile Features:**
- Daily schedule widget
- Quick grade check
- Room finder
- Notification center
- Mobile-friendly chatbot
- QR code integration

## Technical Implementation

### Responsive Design
- Mobile-first approach
- CSS Grid and Flexbox layouts
- Media queries for different screen sizes
- Touch-friendly interface elements

### Interactive Elements
- Smooth CSS transitions
- JavaScript-powered widgets
- Real-time data simulation
- Interactive charts and graphs
- Modal dialogs and overlays

### Accessibility Features
- High contrast ratios
- Clear visual hierarchy
- Keyboard navigation support
- Screen reader friendly structure
- ARIA labels where appropriate

## Sample Data
All dashboards include realistic sample data:
- **Users**: 1,200+ students, 180+ faculty, administrative staff
- **Courses**: CSC, MIT, Engineering programs
- **Rooms**: Various classroom and laboratory spaces
- **Schedules**: Realistic class timings and room assignments
- **Announcements**: Academic and administrative notices

## Browser Compatibility
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Notes

### File Organization
- Modular CSS architecture
- Separate mobile and desktop stylesheets
- Role-specific JavaScript files
- Reusable component styles

### Performance Considerations
- Optimized CSS with minimal redundancy
- Efficient JavaScript event handling
- Lazy loading for large datasets
- Compressed font loading

### Future Enhancements
- Dark mode toggle
- Advanced analytics dashboard
- QR code generation for schedules
- Push notification integration
- Offline mode support
- Multi-language support

## Usage Instructions

### Viewing the Prototype
1. **Landing Page**: Open `index.html` for the main enthusiastic landing page with role selection
2. **Quick Navigation**: Open `mockups.html` for easy access to all dashboard mockups
3. **Individual Dashboards**: Access each role's web and mobile dashboards directly
4. **Mobile Testing**: Use browser developer tools to simulate mobile devices
5. **Responsive Testing**: Resize browser window to test responsive features

### Navigation Options
- **Main Landing**: Modern, animated landing page with About, Features, and Contact sections
- **All Mockups Page**: Quick access hub to all 6 dashboard mockups (3 roles × 2 versions each)
- **Web Dashboards**: Full-featured desktop interfaces with comprehensive functionality
- **Mobile Dashboards**: Touch-optimized mobile interfaces with tab navigation
- **Direct Links**: Each login card provides both web and mobile access buttons

### File Structure Access
- **Assets Folder**: Contains all shared resources (landing CSS, images, avatars)
- **Role Folders**: Each contains web/mobile dashboards with dedicated CSS and JavaScript
- **Organized Images**: Avatar images and logos properly organized in assets structure

## Design Mockup Labels
Each screen includes clear labels for identification:
- **Web Dashboards**: "UNISYNC [Role] Dashboard - Desktop View"
- **Mobile Dashboards**: "UNISYNC [Role] Mobile - [Device] View"
- **Individual Sections**: Clearly marked with role and feature names

## Credits
- **Design System**: Based on CvSU visual identity
- **Icons**: Font Awesome 6.0
- **Typography**: Google Fonts (Inter)
- **Development**: HTML5, CSS3, Vanilla JavaScript

## Contact
For questions about this prototype or UNISYNC development, please contact the development team.

---

*This prototype demonstrates the complete UNISYNC University Management System UI/UX design for Cavite State University – Imus Campus.*
