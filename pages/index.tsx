"use client";

import { useState } from "react";
import Calendar from "../components/calendar/Calendar";
import EventModal from "../components/event/EventModal";
import MiniCalendar from "../components/sidebar/MiniCalendar";

export default function Home() {
  const [calendarInstance, setCalendarInstance] = useState<any>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [monthTitle, setMonthTitle] = useState("");

  const refreshTitle = () => {
    if (calendarInstance) {
      setMonthTitle(calendarInstance.view.title);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f7f8fc" }}>

      {/* LEFT SIDEBAR */}
      <aside
        style={{
          width: "260px",
          background: "white",
          padding: "20px",
          borderRight: "1px solid #e5e7eb",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "20px",
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          📅 Calendar
        </div>

        <button
          onClick={() => setOpenCreateModal(true)}
          style={{
            width: "100%",
            padding: "12px",
            background: "#1a73e8",
            color: "white",
            borderRadius: "25px",
            border: "none",
            fontWeight: "bold",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          + Create
        </button>

        <MiniCalendar calendarInstance={calendarInstance} />

        <div style={{ marginTop: "30px", fontWeight: 600, fontSize: "14px" }}>
          My Calendars
        </div>

        <div style={{ marginTop: "10px", fontSize: "14px" }}>
          <label><input type="checkbox" defaultChecked /> Personal</label><br />
          <label><input type="checkbox" defaultChecked /> Birthdays</label><br />
          <label><input type="checkbox" defaultChecked /> Tasks</label>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, padding: "10px 30px" }}>

        {/* TOP BAR */}
        <div
          style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button style={navButton} onClick={() => { calendarInstance?.today(); refreshTitle(); }}>Today</button>
            <button style={arrowButton} onClick={() => { calendarInstance?.prev(); refreshTitle(); }}>←</button>
            <button style={arrowButton} onClick={() => { calendarInstance?.next(); refreshTitle(); }}>→</button>

            <h1 style={{ marginLeft: 10, fontSize: 28, fontWeight: 600 }}>
              {monthTitle || "Loading..."}
            </h1>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button style={navButton} onClick={() => { calendarInstance?.changeView("dayGridMonth"); refreshTitle(); }}>Month</button>
            <button style={navButton} onClick={() => { calendarInstance?.changeView("timeGridWeek"); refreshTitle(); }}>Week</button>
            <button style={navButton} onClick={() => { calendarInstance?.changeView("timeGridDay"); refreshTitle(); }}>Day</button>
            <button style={navButton} onClick={() => { calendarInstance?.changeView("listWeek"); refreshTitle(); }}>Schedule</button>
          </div>
        </div>

        <Calendar
          onReady={(cal) => {
            setCalendarInstance(cal);
            setMonthTitle(cal.view.title);
          }}
        />

        {/* CREATE MODAL */}
        <EventModal
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          eventData={{
            title: "",
            start: new Date().toISOString().slice(0, 16),
            end: new Date().toISOString().slice(0, 16),
            color: "#1a73e8",
          }}
          onSave={(data) => {
            calendarInstance?.addEvent({
              id: String(Date.now()),
              title: data.title,
              start: data.start,
              end: data.end,
              backgroundColor: data.color,
              borderColor: data.color,
            });
            setOpenCreateModal(false);
          }}
          onDelete={() => {}}
        />
      </main>
    </div>
  );
}

const navButton = {
  padding: "8px 14px",
  background: "#e8f0fe",
  borderRadius: 6,
  border: "1px solid #d2e3fc",
  color: "#1a73e8",
  cursor: "pointer",
  fontWeight: 500,
};

const arrowButton = {
  padding: "8px 12px",
  background: "#f1f3f4",
  borderRadius: 6,
  border: "1px solid #dadce0",
  color: "#1a73e8",
  cursor: "pointer",
  fontWeight: 500,
};
