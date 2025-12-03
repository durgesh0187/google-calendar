"use client";
import React, { useEffect, useState } from "react";

type EventData = {
  id?: string;
  title: string;
  start: string;
  end: string;
  color: string;
};

export default function EventModal({
  isOpen,
  eventData,
  onClose,
  onSave,
  onDelete,
}: {
  isOpen: boolean;
  eventData: EventData | null;
  onClose: () => void;
  onSave: (data: EventData) => void;
  onDelete: (id: string) => void;
}) {

  /* ------------------------------
      INTERNAL EVENT STATE
  ------------------------------- */
  const [localData, setLocalData] = useState<EventData>({
    title: "",
    start: "",
    end: "",
    color: "#1a73e8",
  });

  /* -----------------------------------
      LOAD EXISTING EVENT INTO MODAL
  ------------------------------------ */
  useEffect(() => {
    if (eventData) {
      setLocalData({
        id: eventData.id,
        title: eventData.title || "",
        start: eventData.start || "",
        end: eventData.end || eventData.start || "",
        color: eventData.color || "#1a73e8",
      });
    } else {
      setLocalData({
        title: "",
        start: "",
        end: "",
        color: "#1a73e8",
      });
    }
  }, [eventData]);

  if (!isOpen) return null;

  /* -----------------------------------
          SAVE EVENT
  ------------------------------------ */
  const handleSave = () => {
    if (!localData.title.trim()) return alert("Title is required");

    onSave({
      id: localData.id,
      title: localData.title.trim(),
      start: localData.start,
      end: localData.end,
      color: localData.color,
    });

    onClose();
  };

  /* -----------------------------------
          DELETE EVENT
  ------------------------------------ */
  const handleDelete = () => {
    if (!localData.id) return;
    if (!confirm("Delete this event?")) return;
    onDelete(localData.id);
    onClose();
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={{ margin: 0, marginBottom: 10 }}>
          {localData.id ? "Edit event" : "Create event"}
        </h3>

        {/* TITLE */}
        <label style={label}>Title</label>
        <input
          style={input}
          value={localData.title}
          onChange={(e) =>
            setLocalData((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        {/* START DATE */}
        <label style={label}>Start</label>
        <input
          style={input}
          type="datetime-local"
          value={localData.start}
          onChange={(e) =>
            setLocalData((prev) => ({ ...prev, start: e.target.value }))
          }
        />

        {/* END DATE */}
        <label style={label}>End</label>
        <input
          style={input}
          type="datetime-local"
          value={localData.end}
          onChange={(e) =>
            setLocalData((prev) => ({ ...prev, end: e.target.value }))
          }
        />

        {/* COLOR PICKER */}
        <label style={{ marginTop: 10, display: "block" }}>Event Color:</label>
        <select
          value={localData.color}
          onChange={(e) =>
            setLocalData((prev) => ({ ...prev, color: e.target.value }))
          }
          style={{
            width: "100%",
            padding: 8,
            marginTop: 5,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        >
          <option value="#1a73e8">Personal (Blue)</option>
          <option value="#9c27b0">Birthdays (Purple)</option>
          <option value="#34a853">Tasks (Green)</option>
          <option value="#fbbc04">Reminders (Yellow)</option>
        </select>

        {/* BUTTONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 12,
          }}
        >
          <button style={btnGray} onClick={onClose}>
            Cancel
          </button>

          {localData.id && (
            <button style={btnDelete} onClick={handleDelete}>
              Delete
            </button>
          )}

          <button style={btnPrimary} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------------
      STYLES
------------------------------------ */

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modal: React.CSSProperties = {
  width: 420,
  background: "#fff",
  borderRadius: 10,
  padding: 18,
  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: 8,
  marginTop: 6,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #d1d5db",
};

const label: React.CSSProperties = {
  fontSize: 13,
  color: "#374151",
  marginTop: 8,
};

const btnPrimary: React.CSSProperties = {
  background: "#1a73e8",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const btnGray: React.CSSProperties = {
  background: "#f3f4f6",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const btnDelete: React.CSSProperties = {
  background: "#d93025",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};
