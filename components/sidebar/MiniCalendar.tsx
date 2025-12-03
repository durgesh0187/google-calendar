"use client";

import { useEffect, useState } from "react";

export default function MiniCalendar({ calendarInstance }: any) {
  const [current, setCurrent] = useState(new Date());
  const todayStr = new Date().toDateString();

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  useEffect(() => {
    function handler(e: any) {
      setCurrent(new Date(e.detail.currentDate));
    }

    window.addEventListener("calendar-month-change", handler);
    return () => window.removeEventListener("calendar-month-change", handler);
  }, []);

  const prevMonth = () => {
    const d = new Date(current);
    d.setMonth(d.getMonth() - 1);
    setCurrent(d);
    calendarInstance?.gotoDate(d);
  };

  const nextMonth = () => {
    const d = new Date(current);
    d.setMonth(d.getMonth() + 1);
    setCurrent(d);
    calendarInstance?.gotoDate(d);
  };

  const jumpToDate = (day: number) => {
    const d = new Date(current.getFullYear(), current.getMonth(), day);
    calendarInstance?.gotoDate(d);
  };

  const getMatrix = () => {
    const year = current.getFullYear();
    const month = current.getMonth();
    const firstDay = new Date(year, month, 1);
    const total = new Date(year, month + 1, 0).getDate();
    const offset = firstDay.getDay();

    const cells: any[] = [];
    for (let i = 0; i < offset; i++) cells.push("");
    for (let d = 1; d <= total; d++) cells.push(d);
    return cells;
  };

  const cells = getMatrix();

  return (
    <div style={box}>
      <div style={header}>
        <button style={arrow} onClick={prevMonth}>◀</button>
        <div style={{ fontWeight: 600 }}>
          {monthNames[current.getMonth()]} {current.getFullYear()}
        </div>
        <button style={arrow} onClick={nextMonth}>▶</button>
      </div>

      <div style={grid}>
        {["S","M","T","W","T","F","S"].map((d) => (
          <div key={d} style={dayHeader}>{d}</div>
        ))}

        {cells.map((day, i) => {
          if (!day) return <div key={i}></div>;

          const dt = new Date(current.getFullYear(), current.getMonth(), day);
          const isToday = dt.toDateString() === todayStr;

          return (
            <div
              key={i}
              onClick={() => jumpToDate(day)}
              style={{
                ...dayCell,
                background: isToday ? "#1a73e8" : "",
                color: isToday ? "white" : "#333",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const box = {
  padding: "10px",
  background: "white",
  borderRadius: "10px",
  border: "1px solid #e5e7eb",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const arrow = {
  padding: "4px 8px",
  background: "#f1f3f4",
  border: "1px solid #dadce0",
  borderRadius: "4px",
  cursor: "pointer",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(7, 1fr)",
  gap: "5px",
};

const dayHeader = {
  fontSize: "12px",
  fontWeight: 600,
  textAlign: "center",
};

const dayCell = {
  textAlign: "center",
  padding: "4px 0",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
};
