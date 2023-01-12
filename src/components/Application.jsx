import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const [days, setDays] = useState([]);
  const [appointments, setAppointments] =useState([]);

  useEffect(() => {
    axios.get("/api/days")
      .then(res => {
        setDays(res.data);
      })
  }, [])

  useEffect(() => {
    axios.get("/api/appointments")
      .then(res => {
        setAppointments(res.data);
      })
  }, [])

  const renderedAppointments = Object.values(appointments).map((appointment) => {
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment}
      />
    );
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList 
            days={days}
            value={day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {renderedAppointments}
      </section>
    </main>
  );
}
