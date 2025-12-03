# 📅 Google Calendar Clone — Fullstack Assignment

A high-fidelity **Google Calendar Clone** built with **Next.js**, **FullCalendar**, and **Node.js API routes**, featuring event creation, editing, deletion, drag-resize, and a Google-like sidebar + mini calendar.

This project demonstrates strong **frontend engineering**, **UI/UX replication**, and **backend integration** with persistent event storage.

---

## 🚀 Features

### ✅ Calendar Features  
- Month, Week, Day, Schedule views  
- Create event (via "+ Create" or clicking date)  
- Edit event  
- Delete event  
- Drag to move events  
- Resize to change time  
- Event color categories  
- Smooth transitions  
- Google Calendar-like UI

### ✅ Sidebar + Mini Calendar  
- Left navigation sidebar  
- Mini Calendar  
- Jump to any date  
- Calendar list with checkboxes  
- Create Event button

### ✅ Backend Features  
- Full REST API  
- Create event  
- Edit event  
- Delete event  
- Fetch all events  
- Persistent storage using **Prisma + SQLite**

### 💡 Additional Enhancements  
- Month title auto-updates  
- Mini calendar syncs with main calendar  
- Uses FullCalendar via CDN to avoid heavy packages  
- Clean modular code

---

## 🧰 Tech Stack

### **Frontend**
- **Next.js 14**
- **React 19**
- **FullCalendar (via CDN — index.global.js)**
- **TailwindCSS (optional addon)**

### **Backend**
- **Next.js API Routes (pages/api)**
- **Prisma ORM**
- **SQLite** for local development storage

### **Why these choices?**

| Technology | Reason |
|-----------|--------|
| **Next.js** | Best framework for full-stack React apps, easy routing, SSR support |
| **FullCalendar** | Industry-standard calendar engine with drag-resize & multiple views |
| **Prisma ORM** | Strong type-safety, auto-migration, easy schema evolution |
| **SQLite** | Zero-config DB perfect for assignments & local development |
| **CDN FullCalendar** | Avoids React compatibility issues & reduces bundle errors |

---

## 🏗️ Architecture

/components
/calendar
/event
/sidebar
/pages
/api/events
prisma/schema.prisma
styles/


- **Component-based modular UI**
- **API routes handle CRUD**
- **Calendar UI triggers modal → sends data to backend → updates FullCalendar**

---

## 📁 Folder Structure
gc-clone/
├── components/
│ ├── calendar/Calendar.tsx
│ ├── event/EventModal.tsx
│ └── sidebar/MiniCalendar.tsx
│
├── pages/
│ ├── index.tsx ← Main UI
│ └── api/
│ └── events/
│ ├── index.ts ← GET + POST
│ └── [id].ts ← PUT + DELETE
│
├── prisma/
│ ├── schema.prisma
│ ├── dev.db ← Database
│
├── styles/
├── README.md
└── package.json


---

## ⚙️ Installation & Running Locally

### **1️⃣ Clone the project**

```bash
git clone https://github.com/YOUR-USERNAME/gc-clone.git
cd gc-clone

2️⃣ Install dependencies
npm install

3️⃣ Generate Prisma client
npx prisma generate

4️⃣ Run database migration
npx prisma migrate dev --name init


This will create dev.db.

5️⃣ Start the dev server
npm run dev


Visit:
👉 http://localhost:3000

🗄️ Database
Event Schema (Prisma)
model Event {
  id        String   @id @default(cuid())
  title     String
  start     String
  end       String
  color     String?
  createdAt DateTime @default(now())
}

📡 API Endpoints
GET /api/events

Returns all events.

POST /api/events

Creates a new event.

Body:
{
  "title": "Meeting",
  "start": "2025-01-10T10:00",
  "end": "2025-01-10T11:00",
  "color": "#1a73e8"
}

PUT /api/events/:id

Updates an event.

DELETE /api/events/:id

Deletes an event.

🧠 Business Logic & Edge Cases
✔ Handling overlapping events

FullCalendar automatically visually stacks overlapping events.

✔ Dragging & resizing

eventDrop and eventResize update backend instantly.

✔ Invalid date handling

Modal prevents saving without title or date.

✔ Timezone conversion

Custom helper ensures FullCalendar + datetime-local inputs are consistent.

🧩 UI/UX Details

Google Calendar-style sidebar

Rounded UI components

Light background (#f7f8fc)

Mini Calendar syncs month with main view

Smooth header updates on navigation

Modal is centered with backdrop blur

🚀 Deployment
Deploy on Vercel

Push project to GitHub

Visit https://vercel.com

Import the repository

Add environment variable:

DATABASE_URL="file:./dev.db"



👨‍💻 Author
Durgesh Kumar
Fullstack Developer — React • Next.js • Node.js • Prisma • MongoDB
