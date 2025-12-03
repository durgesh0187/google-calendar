"use client";
import React from "react";

type FormState = {
  title: string;
  start: string;
  end: string;
};

export default function EventModal({
  open,
  form,
  setForm,
  onAdd,
  onClose,
}: {
  open: boolean;
  form: FormState;
  setForm: (f: FormState) => void;
  onAdd: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div style={backdrop}>
      <div style={modalBox}>
        <h2 style={{ marginBottom: 12 }}>Add event</h2>

        <label style={{ fontSize: 13 }}>Title</label>
        <input
          style={input}
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Event title"
        />

        <label style={{ fontSize: 13 }}>Start date</label>
        <input
          type="date"
          style={input}
          value={form.start}
          onChange={(e) => setForm({ ...form, start: e.target.value })}
        />

        <label style={{ fontSize: 13 }}>End date</label>
        <input
          type="date"
          style={input}
          value={form.end}
          onChange={(e) => setForm({ ...form, end: e.target.value })}
        />

        <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "flex-end" }}>
          <button style={grayBtn} onClick={onClose}>Cancel</button>
          <button style={blueBtn} onClick={onAdd}>Add</button>
        </div>
      </div>
    </div>
  );
}

/* styles (inline JS objects) */
const backdrop: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2000,
};

const modalBox: React.CSSProperties = {
  width: 380,
  background: "white",
  padding: 18,
  borderRadius: 10,
  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "8px 10px",
  marginTop: 6,
  marginBottom: 10,
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
};

const blueBtn: React.CSSProperties = {
  background: "#1a73e8",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
};

const grayBtn: React.CSSProperties = {
  background: "#eef2f6",
  color: "#111827",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
};
