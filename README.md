# Zeus Attendance Tracker

P## Project Description

**Zeus Attendance Tracker** is a dynamic web-based attendance management application designed to replace inefficient manual sign-in systems commonly used in workplaces, daycare centers, classrooms, events, and other organizations.

Traditional attendance methods such as paper sign-in sheets are often:
- Prone to **human error**
- Easy to **misplace or lose**
- Difficult to **manage as organizations grow**
- Time-consuming for supervisors to review and track

Zeus solves this problem by providing a clean, responsive digital attendance system that allows users to quickly check in and check out while securely storing records in a cloud-based database.

### Key Features
- **Digital Check-In / Check-Out System** for fast attendance logging
- **Real-Time Verified Timestamping** using the WorldTime API
- **Automatic Fallback Time Verification** through TimeAPI and server-local time if external services fail
- **Cloud Database Storage** powered by Supabase
- **Live Attendance Dashboard** with searchable attendance records
- **Attendance Analytics Visualization** using Chart.js
- **Instant User Feedback** confirming successful attendance actions
- **Responsive Web Design** for desktop and mobile accessibility

### Technology Stack
**Frontend**
- React
- React Router
- CSS
- Chart.js / React-ChartJS-2

**Backend**
- Node.js
- Express (development server)
- Vercel Serverless API Routes

**Database**
- Supabase (PostgreSQL)

**External APIs**
- WorldTime API
- TimeAPI.io (fallback provider)

The application uses real-time external timestamp verification to ensure attendance entries remain accurate and cannot be manipulated by changing a user's local device time.

Supervisors and managers can monitor attendance activity through centralized digital records, making the system more efficient, reliable, and scalable than traditional paper-based tracking.

Zeus was built with scalability in mind, allowing future expansion such as:
- User authentication
- Role-based access control
- Attendance export functionality
- Advanced analytics and reporting
- Employee/student profile management

---
## Target Browsers

Zeus Attendance Tracker is designed to function across modern desktop and mobile browsers, including:

### Desktop Browsers
- **Google Chrome** (Latest Version)
- **Microsoft Edge** (Latest Version)
- **Safari** (Latest Version)

### Mobile Browsers
- **iOS Safari**
- **Android Chrome**

**Recommended Browsers:**  
For the best performance and compatibility, **Google Chrome** or **Microsoft Edge** is recommended.
