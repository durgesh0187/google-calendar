# 📅 Google Calendar Clone — Fullstack Assignment

A high-fidelity **Google Calendar Clone** built with **Next.js**, **FullCalendar**, and **Node.js API Routes**, featuring event creation, editing, deletion, drag-resize, and a Google-like sidebar + mini calendar.

This project demonstrates strong **frontend engineering**, **UI/UX replication**, and **backend integration** with persistent event storage.

---

## 🚀 Features

### 🎯 Calendar Features  
- Month / Week / Day / Schedule views  
- Create event  
- Edit event  
- Delete event  
- Drag to move events  
- Resize to change start/end  
- Event color categories  
- Smooth Google Calendar UI interactions  
- Click on date → Create event  
- Click event → Edit modal  
- Drag event → Save automatically  

### 🎯 Sidebar + Mini Calendar  
- Left navigation sidebar  
- "+ Create" button  
- Mini calendar (syncs with main view)  
- Jump to date  
- My Calendars checkboxes  

### 🎯 Backend Features  
- Full CRUD REST API  
- Persistent event storage using Prisma + SQLite  
- Auto-updates FullCalendar after CRUD  
- Clean database schema  

---

## 🧰 Tech Stack

### **Frontend**
- **Next.js 14 (App Router disabled for compatibility)**
- **React 19**
- **FullCalendar 6 (CDN global build)**
- **Custom CSS / Inline styles**

### **Backend**
- **Next.js API Routes (`pages/api`)**
- **Prisma ORM**
- **SQLite DB (local persistent storage)**

### **Why these technologies?**

| Tech | Reason |
|------|--------|
| Next.js | Fastest way to build full-stack React apps with API routes |
| FullCalendar | Google Calendar–level UI interactions |
| Prisma ORM | Simple schema, easy CRUD, type-safety |
| SQLite | Perfect for assignments, no server setup needed |
| CDN FullCalendar | Avoids React compatibility issues |

---

## 📁 Folder Structure

```bash
gc-clone/
 ├── components/
 │    ├── calendar/
 │    │     └── Calendar.tsx        # FullCalendar setup + modal integration
 │    ├── event/
 │    │     └── EventModal.tsx      # Modal for create/edit/delete events
 │    └── sidebar/
 │          └── MiniCalendar.tsx    # Google-style mini calendar (synced)
 │
 ├── pages/
 │    ├── index.tsx                 # Main UI layout
 │    └── api/
 │         └── events/
 │              ├── index.ts        # GET / POST (list + create)
 │              └── [id].ts         # PUT / DELETE (update + remove)
 │
 ├── prisma/
 │    ├── schema.prisma             # Database schema
 │    └── dev.db                    # SQLite persistent DB
 │
 ├── styles/
 │    └── globals.css               # Global styles
 │
 ├── public/
 ├── README.md
 ├── package.json
 └── next.config.js


⚙️ Installation & Running Locally
1️⃣ Clone
git clone https://github.com/YOUR-USERNAME/gc-clone.git
cd gc-clone

2️⃣ Install
npm install

3️⃣ Prisma Setup
npx prisma generate
npx prisma migrate dev --name init

4️⃣ Start Server
npm run dev

Open:
👉 http://localhost:3000

🗄️ Database Model
prisma/schema.prisma

model Event {
  id        String   @id @default(cuid())
  title     String
  start     String
  end       String
  color     String?
  createdAt DateTime @default(now())
}


📡 API Documentation (REST)
GET /api/events

Fetch all events.

GET http://localhost:3000/api/events


Response example:

[
  {
    "id": "clx123",
    "title": "Meeting",
    "start": "2025-01-20T10:00",
    "end": "2025-01-20T11:00",
    "color": "#1a73e8"
  }
]

POST /api/events
Create a new event.
POST http://localhost:3000/api/events

Body:

{
  "title": "Meeting",
  "start": "2025-01-21T10:00",
  "end": "2025-01-21T11:00",
  "color": "#34a853"
}

PUT /api/events/:id

Update an event.

PUT http://localhost:3000/api/events/123
DELETE /api/events/:id
Delete an event.
DELETE http://localhost:3000/api/events/123

🎨 UI / UX Behaviors
✔ Month Title auto-updates
✔ Mini Calendar updates when main month changes
✔ Click day → open event modal
✔ Click event → edit modal
✔ Smooth Google-style sidebar
✔ FullCalendar global bundle avoids build errors
✔ Local timezone–accurate datetime pickers

🧠 Business Logic & Edge Cases
✔ Overlapping event handling
FullCalendar automatically stacks events.
✔ Drag + Resize Updates
Backend is called to persist changes.
✔ Title required
Modal blocks saving empty title.
✔ Invalid date
Start date always defaults if end date missing.
✔ Timezone fixes
Custom helper ensures datetime-local = FullCalendar format.

🧩 Calendar Lifecycle Flow
User creates/edits event →
EventModal returns data →
Calendar.tsx sends POST/PUT →
API persists event →
Database writes to SQLite →
Calendar reloads events →
UI auto-updates

🚀 Deployment Steps (Vercel)
1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

2. Open https://vercel.com
 → Import Repo
3. Add environment variable:
DATABASE_URL="file:./dev.db"


👨‍💻 Author
Durgesh Kumar
Fullstack Developer — React + Next.js + Node + Prisma
