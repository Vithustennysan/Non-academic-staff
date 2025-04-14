import { useContext, useEffect, useState } from "react";
import "../../css/Notifications/appliedLeaveForms.css";
import FormPreview from "../forms/FormPreview";
import { UserContext } from "../../Contexts/UserContext";
import FormReqTap from "./FormReqTap";
import Swal from "sweetalert2";

const AppliedLeaveForms = ({ appliedLeaveForms }) => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState(null);
  const [filter, setFilter] = useState("Pending");
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState();
  const [filterForms, setFilterForms] = useState([]);

  useEffect(()=>{
    setFilterForms(appliedLeaveForms.filter((form)=> form.status === "Pending"));
  },[appliedLeaveForms])

  // Handle form selection for preview
  const handleSingleForm = (id, formType) => {
    const selectedForm = appliedLeaveForms.find(
      (form) => form.id === id && form.formType === formType
    );
    setForm(selectedForm);
  };

  // Handle filter change
  const handleFilterChange = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    setForm(null); // Reset the form preview when changing the filter
    let filteredForms = appliedLeaveForms;

    if(filterYear !== '' && filterYear?.length !== 4){
      Swal.fire({
                  title: "Please select a valid year",
                  icon: "error",
                  confirmButtonText: "Ok",
                })
      return;
    }

    if(filterYear){
      filteredForms = filteredForms.filter((form)=> form.leaveAt.substring(0,4) === filterYear);
    }
    if(filterMonth){
      filteredForms = filteredForms.filter((form)=> monthNames[form.leaveAt.substring(5,7)-1] === filterMonth);
    }
    if(filter !== "All"){
      filteredForms = filteredForms.filter((form)=> form.status === filter);
    }
    setFilterForms(filteredForms);
  };

  return (
    <div className="appliedLeaveForms">
      <h1>Applied Leave Forms</h1>
      {appliedLeaveForms.length === 0 ? (
        <p className="empty">Forms not found...</p>
      ) : (
        <>
          <div className="leaveFilterTaps">
            <div className="taps">
              <select value={filter} onChange={e=>setFilter(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="All">All</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>

              <input type="number" value={filterYear} onChange={e=>setFilterYear(e.target.value)} placeholder="Year"/>
              <select name="month" value={filterMonth} onChange={(e)=>setFilterMonth(e.target.value)}>
                  <option value="">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
            </div>
            <button className="bttn ashbtn" onClick={handleFilterChange}>Filter</button>
          </div>

          <div className="ownLeaveForms">
            <h3 className="formFilterType">{filter} Forms</h3>
            {filterForms.length < 1? <p className="empty">No forms match the selected filter!</p> :
              form ? (
                <FormPreview application={form} approver={user} setForm={setForm}/>
              ) : (
                <ul>
                {filterForms?.map((form, id) => (
                    <li key={id} style={{ listStyle: "none" }}>
                      <FormReqTap form={form} handleSingleForm={()=>handleSingleForm(form.id, form.formType)}/>
                      </li>
                    ))}
                    </ul>
                  )
              }
          </div>
        </>
      )}
    </div>
  );
};

export default AppliedLeaveForms;
