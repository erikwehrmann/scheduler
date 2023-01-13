export function getAppointmentsForDay (state, day) {
  const result = [];
  const dayWanted = state.days.filter(dayWanted => dayWanted.name === day);
  if (dayWanted[0]) {
    const appointmentIds = dayWanted[0].appointments;
    appointmentIds.forEach(id => {
      result.push(state.appointments[id]);
    }) 
  }
  return result;
}

export function getInterview(state, interview) {
  if (interview) {
    const interviewerId = interview.interviewer;
    const interviewer = state.interviewers[interviewerId];
    return {...interview, interviewer};
  } else {
    return interview;
  }
}

export function getInterviewersForDay (state, day) {
  const result = [];
  const dayWanted = state.days.filter(dayWanted => dayWanted.name === day);
  if (dayWanted[0]) {
    const interviewerIds = dayWanted[0].interviewers;
    interviewerIds.forEach(id => {
      result.push(state.interviewers[id]);
    }) 
  }
  return result;
}