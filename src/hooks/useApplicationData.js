import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
    })
  }, [])

  const updateSpots = function(state, appointments, id) {
    if (state.appointments[id].interview && appointments[id].interview) {
      return [
        ...state.days
      ];
    }
  const updatedDays = state.days.map(day => {
      if (appointments[id].interview !== null) {
        return {
          ...day,
          spots: day.spots - 1
        };
      }
      if (appointments[id].interview === null) {
        return {
          ...day,
          spots: day.spots + 1
        };
      }
      return {
        ...day
      };
    });
    return updatedDays
  };

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        console.log(res.status)
        const appointment = {
          ...state.appointments[id],
          interview: {...interview}
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = updateSpots(state, appointments, id);
        setState({
          ...state, appointments, days
        });
      })
  }

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`, {data: { interview }})
      .then(res => {
        console.log(res.status)
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        const days = updateSpots(state, appointments, id);
        setState({
          ...state, appointments, days
        });
      })
  }

  return {state, setDay, bookInterview, cancelInterview};

}