"use client";

import { useEffect } from "react";

export default function Calendar() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js";
    script.onload = () => {
      // @ts-ignore
      const calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {
        initialView: "dayGridMonth",
        height: "90vh",
        selectable: true,
        editable: true,
        themeSystem: "standard", // smoother look

        headerToolbar: {
          left: "title",
          center: "",
          right: "today prev,next",
        },

        views: {
          dayGridMonth: {
            titleFormat: { year: "numeric", month: "long" },
          },
        },

        dayMaxEventRows: true,
      });

      calendar.render();
    };

    document.body.appendChild(script);
  }, []);

  return (
  <div
    id="calendar"
    style={{
      width: "100%",
      maxWidth: "1100px",
      margin: "0 auto",
      background: "white",
      minHeight: "80vh"
    }}
  ></div>
);


}
