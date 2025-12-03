"use client";

import { useEffect, useRef, useState } from "react";
import EventModal from "../event/EventModal";

export default function Calendar({ onReady }: { onReady?: (cal: any) => void }) {
  const elRef = useRef<any>(null);
  const calRef = useRef<any>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    if ((window as any).FullCalendar) {
      initCalendar();
      return;
    }

    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js";
    s.onload = initCalendar;
    document.body.appendChild(s);
  }, []);

  async function initCalendar() {
    if (!elRef.current || calRef.current) return;

    const FC = (window as any).FullCalendar;

    const calendar = new FC.Calendar(elRef.current, {
      initialView: "dayGridMonth",
      headerToolbar: false,
      selectable: true,
      editable: true,
      height: "80vh",

      dateClick(info: any) {
        const start = toLocal(info.date);
        setSelectedEvent({ title: "", start, end: start, color: "#1a73e8" });
        setModalOpen(true);
      },

      eventClick(info: any) {
        const ev = info.event;
        const start = toLocal(ev.start);
        const end = ev.end ? toLocal(ev.end) : start;

        setSelectedEvent({
          id: ev.id,
          title: ev.title,
          start,
          end,
          color: ev.backgroundColor || "#1a73e8",
        });

        setModalOpen(true);
      },

      eventDrop(info: any) {
        saveEventToServer(info.event);
      },

      eventResize(info: any) {
        saveEventToServer(info.event);
      },

      datesSet(info: any) {
        window.dispatchEvent(
          new CustomEvent("calendar-month-change", {
            detail: { currentDate: info.view.currentStart },
          })
        );
      },

      events: [],
    });

    calRef.current = calendar;
    calendar.render();
    onReady?.(calendar);

    await loadEvents();
  }

  function toLocal(date: Date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 16);
  }

  async function loadEvents() {
    const res = await fetch("/api/events");
    const list = await res.json();
    const cal = calRef.current;

    cal.getEvents().forEach((ev: any) => ev.remove());

    list.forEach((e: any) => {
      cal.addEvent({
        id: e.id,
        title: e.title,
        start: e.start,
        end: e.end,
        backgroundColor: e.color,
        borderColor: e.color,
      });
    });
  }

  async function saveEventToServer(ev: any) {
    await fetch(`/api/events/${ev.id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        title: ev.title,
        start: ev.start?.toISOString(),
        end: ev.end?.toISOString(),
        color: ev.backgroundColor,
      }),
    });
  }

  async function handleSave(eData: any) {
    const cal = calRef.current;

    // Update existing
    if (eData.id) {
      const res = await fetch(`/api/events/${eData.id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(eData),
      });

      const updated = await res.json();
      const ev = cal.getEventById(updated.id);

      if (ev) {
        ev.setProp("title", updated.title);
        ev.setProp("backgroundColor", updated.color);
        ev.setProp("borderColor", updated.color);
        ev.setDates(updated.start, updated.end);
      }
      return;
    }

    // Create new
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(eData),
    });

    const created = await res.json();

    cal.addEvent({
      id: created.id,
      title: created.title,
      start: created.start,
      end: created.end,
      backgroundColor: created.color,
      borderColor: created.color,
    });
  }

  async function handleDelete(id: string) {
    await fetch(`/api/events/${id}`, { method: "DELETE" });

    const ev = calRef.current.getEventById(id);
    ev?.remove();
  }

  return (
    <>
      <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto", background: "white", padding: 10 }}>
        <div ref={elRef}></div>
      </div>

      <EventModal
        isOpen={modalOpen}
        eventData={selectedEvent}
        onSave={(e) => { handleSave(e); setModalOpen(false); }}
        onDelete={(id) => { handleDelete(id); setModalOpen(false); }}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
