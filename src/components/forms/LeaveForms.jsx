import { useState } from "react"
import "../../css/Forms/leaveForms.css"
import AccidentLeaveForm from "./AccidentLeaveForm"
import NormalLeaveForm from "./NormalLeaveForm"

const LeaveForms = () => {
    const [form,setForm] = useState("NormalLeave");

    const handleChange = (e) => {
        setForm(e.target.value);
    }

  return (
    <>
      <div className="leaveApplicationSelection">
        <label htmlFor="LeaveType">Select the Leave Type</label>
        <select name="leaveType" id="LeaveType" value={form} onChange={handleChange}>
          <option value="NormalLeave">Normal Leave</option>
          <option value="AccidentLeave">Accident Leave</option>
          <option value="VacationLeave">Vacation Leave</option>
          <option value="OverseasLeave">Overseas Leave</option>
          <option value="MedicalLeave">Medical Leave</option>
          <option value="SpecialLeave Granted to an Employee">Special Leave Granted to an Employee</option>
          <option value="MaternityLeave">Maternity Leave</option>
          <option value="SabbaticalLeave">Sabbatical Leave</option>
          <option value="PaternalLeave">Paternal Leave</option>
        </select>
      </div>

      {form === "NormalLeave" && <NormalLeaveForm/>}
      {form === "AccidentLeave" && <AccidentLeaveForm/>}
    </>
  )
}

export default LeaveForms;