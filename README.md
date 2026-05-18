# Zeus Attendance Tracker

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

## Developer Manual

## Developer Audience
This documentation is intended for future developers who may maintain or expand **Zeus Attendance Tracker**. It assumes familiarity with JavaScript, React, Node.js, REST APIs, and database concepts, but no prior knowledge of this specific application.

---
## Installation & Setup
### Clone the Repository

```bash
git clone [YOUR GITHUB REPOSITORY LINK]
cd zeus-attendance-tracker

---

## Installing Dependencies
npm install

## Required Environment Variables

SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DEV_API_PORT=4000


##Running the Application

npm run dev

Frontend runs at: http://localhost:5173

Start the Backend:

node dev-api.js

Backend runs at: http://localhost:4000


##Testing

Manual testing should verify:

- Successful Check In functionality
- Successful Check Out functionality
- Dashboard attendance records loading correctly
- Search filtering on the dashboard
- Verified clock synchronization
- API fallback behavior if external time services fail
- Error handling for invalid or empty name submissions

API Endpoints
GET /api/time

Returns the current verified timestamp.

Purpose:

Retrieves trusted time from the WorldTime API
Falls back to TimeAPI.io if unavailable
Falls back to server local time if both services fail
GET /api/attendance

Retrieves attendance records from Supabase.


##Future Development Roadmap

Planned improvements include:

- User authentication
- Role-based admin access
- Attendance export functionality
- Attendance editing and deletion
- Date filtering for records

##Known Bugs / Limitations

Current limitations include:

- No authentication system implemented yet
- Login page is currently a placeholder
- Users can submit attendance under any entered name
- No attendance editing or deletion functionality


## Deployment

Zeus Attendance Tracker is deployed using Vercel.

Deployment requirements:

- Active Supabase database
- Environment variables configured in Vercel
- Proper API route deployment
