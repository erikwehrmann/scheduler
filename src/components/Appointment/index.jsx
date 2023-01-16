import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";
import "./styles.scss"

export default function Appointment (props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    setTimeout(() => {
      props.bookInterview(props.id, interview);
      transition(SHOW);
    }, 1000)
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onEdit() {
    transition(EDIT);
  }

  function onConfirm() {
    const interview = props.interview; 
    transition(DELETING)
    setTimeout(() => {
      props.cancelInterview(props.id, interview);
      transition(EMPTY);
    }, 1000)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show 
            student={props.interview.student} 
            interviewer={props.interview.interviewer} 
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {mode === CREATE && <Form onCancel={() => back()} interviewers={props.interviewers} onSave={save} />}
        {mode === EDIT && <Form onCancel={() => back()} interviewers={props.interviewers} onSave={save} student={props.interview.student} interviewer={props.interview.interviewer.id}  />}
        {mode === SAVING && <Status message="SAVING" />}
        {mode === DELETING && <Status message="DELETING" />}
        {mode === CONFIRM && <Confirm message="Are you sure you would like to delete?" onCancel={() => back()} onConfirm={() => onConfirm()} />}
    </article>
  );
}