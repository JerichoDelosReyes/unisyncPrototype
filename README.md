# UNISYNC - University Management System Prototype

# Live Server: https://jerichodelosreyes.github.io/unisyncPrototype/

## Overview
UNISYNC is a centralized University Management System designed for Cavite State University – Imus Campus. This prototype includes high-fidelity UI/UX mockups for web and mobile dashboards supporting Admin, Faculty, and Student roles, featuring a modern, enthusiastic landing page with smooth animations and enhanced user experience.

## Features
- **Clean Landing Page**: Simple, elegant design with role selection cards
- **Multi-Role Dashboard System**: Admin, Faculty, and Student interfaces
- **Responsive Design**: Optimized for both web and mobile devices
- **AI Virtual Assistant**: Interactive chatbot for each user role
- **Announcement Board**: Centralized communication system
- **Room Scheduling & Viewing**: Comprehensive room management
- **Real-time Notifications**: System alerts and updates
- **Clean Academic Design**: Using CvSU green (#006400) color scheme with modern gradients

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
## Credits
- **Design System**: Based on CvSU visual identity
- **Icons**: Font Awesome 6.0
- **Typography**: Google Fonts (Inter)
- **Development**: HTML5, CSS3, Vanilla JavaScript
