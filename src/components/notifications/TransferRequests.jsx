import { useNavigate } from "react-router-dom";
import "../../css/Notifications/transferRequests.css"
import { useContext, useEffect, useMemo, useState } from "react";
import { LoginContext } from "../../Contexts/LoginContext";
import { UserContext } from "../../Contexts/UserContext";
import FormReqTap from "./FormReqTap";
import FormPreview from "../forms/FormPreview";
import { Axios } from "../AxiosReqestBuilder";
import { useForm } from "react-hook-form";

const TransferRequests = ({allTransferFormRequests, setAllTransferFormRequests}) => {
  const navigate = useNavigate();
  const { isLogin } = useContext(LoginContext);
  const [Forms, setForms] = useState([]);
  const [Form, setForm] = useState({});
  const [requestForm, setRequestForm] = useState({});
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);
  const [isAllNotificationsOpen, setIsAllNotificationsOpen] = useState(true);
  const [all, setAll] = useState(false);
  const [filter, setFilter] = useState("Pending");

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate, isLogin]);

  const onSubmit = async (data) => {
    setShowForm(false);
    const { faculty, department } = data;

    try {
      const response = await Axios.post(`/admin/req/transferForm`, {faculty,department});
      setForms(response.data);
      setIsAllNotificationsOpen(false);
      setAll(false);
    } catch (error) {
      console.log(">>> " + error);
    }
  };

  const filteredForms = useMemo(()=> {
    if(filter === "Pending" ){
      return allTransferFormRequests.filter((form) => form.status === "Pending");
    }else if (filter === "Accepted"){
      return allTransferFormRequests.filter((form) => form.status === "Accepted");
    }else if(filter === "Rejected"){
      return allTransferFormRequests.filter((form) => form.status === "Rejected");
    }else{
      return allTransferFormRequests;
    }
  },[allTransferFormRequests, filter])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedFaculty, setSelectedFaculty] = useState(user.faculty);

  const faculties = [
    {
      faculty: "Faculty of Engineering",
      department:
        "Chemical and Process Engineering, Computer Engineering, Civil Engineering, Electrical and Electronic Engineering, Engineering Mathematics, Manufacturing and Industrial Engineering, Mechanical Engineering, Dean's Office",
    },
    {
      faculty: "Faculty of Science",
      department:
        "Botany, Chemistry, Environmental and Industrial Sciences, Geology, Statistics and Computer Science, Mathematics, Molecular Biology and Biotechnology, Physics, Zoology, Dean's Office",
    },
    {
      faculty: "Faculty of Arts",
      department:
        "Arabic and Islamic Civilization, Archaeology, Classical Languages, Economics and Statistics, Education, English, English Language Teaching, Fine Arts, Geography, History, Information Technology, Law, Philosophy, Psychology, Political Science, Pali and Buddhist Studies, Sinhala, Sociology, Tamil, Dean's Office",
    },
    {
      faculty: "Faculty of Medicine",
      department:
        "Anatomy, Anaesthesiology and Critical Care, Biochemistry, Community Medicine, Family Medicine, Forensic Medicine, Medical Education, Medicine, Microbiology, Obstetrics and Gynaecology, Paediatrics, Parasitology, Pathology, Pharmacology, Physiology, Psychiatry, Radiology, Surgery, Dean's Office",
    },
    {
      faculty: "Faculty of Veterinary Medicine and Animal Science",
      department:
        "Basic Veterinary Sciences, Veterinary Clinical Sciences, Farm Animal Production and Health, Veterinary Pathobiology, Veterinary Public Health and Pharmacology, Dean's Office",
    },
    {
      faculty: "Faculty of Agriculture",
      department:
        "Agricultural Biology, Agricultural Economics and Business Management, Agricultural Engineering, Agricultural Extension, Animal Science, Crop Science, Food Science and Technology, Soil Science, Dean's Office",
    },
    {
      faculty: "Faculty of Allied Health Sciences",
      department:
        "Medical Laboratory Sciences, Nursing, Pharmacy, Physiotherapy, Radiography and Radiotherapy, Basic Sciences, Dean's Office",
    },
    {
      faculty: "Faculty of Dental Sciences",
      department:
        "Basic Sciences, Community Dental Health, Comprehensive Oral Health Care, Oral Medicine and Periodontology, Oral Pathology, Prosthetic Dentistry, Restorative Dentistry, Oral and Maxillofacial Surgery, Dean's Office",
    },
    {
      faculty: "Faculty of Management",
      department:
        "Business Finance, Human Resource Management, Management Studies, Marketing Management, Operations Management",
    },
    { faculty: "Registrar's Office", department: "Administrative Section" },
    { faculty: "Administration Office", department: "Administrative Section" },
    { faculty: "IT Services", department: "Technical Section" },
    { faculty: "Library Services", department: "Library Section" },
    { faculty: "Facilities Management", department: "Maintenance Section" },
    { faculty: "Security Services", department: "Security Section" },
    { faculty: "Finance Department", department: "Finance Section" },
    { faculty: "Human Resources Department", department: "HR Section" },
    {
      faculty: "Student Affairs Office",
      department: "Student Affairs Section",
    },
  ];

  const departments =
    faculties
      .find((faculty) => faculty.faculty === selectedFaculty)
      ?.department.split(", ") || [];

  const handleSingleForm = (id) => {
    setForm(Forms.find((form) => form.id === id));
    setShowForm(true);
  };

  const handleSingleLeaveRequestForm = (id, formType) => {
    setRequestForm(
      allTransferFormRequests.find(
        (form) => form.id === id && form.formType === formType
      )
    );
    setAll(true);
    setIsAllNotificationsOpen(false);
  };

  const handleShowingAllNotifications = (e) => {
    setIsAllNotificationsOpen(true);
    setShowForm(false);
    setFilter(e.target.value);
  };

  return (
    <>
      <div className="RequestedForms">
        <h1>Requested Transfer Forms</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="selection-area">
            {(user.job_type === "Chief Medical Officer" || user.job_type === "Non Academic Establishment Division" || user.job_type === "Registrar") && (
              <div>
                <label htmlFor="faculty">Faculty</label>
                <select
                  name="faculty"
                  id="faculty"
                  {...register("faculty")}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  <option value="">select one....</option>
                  {faculties.map((faculty, index) => (
                    <option key={index} value={faculty.faculty}>
                      {faculty.faculty}
                    </option>
                  ))}
                </select>
                {errors.faculty && (
                  <span className="error">{errors.faculty.message}</span>
                )}
              </div>
            )}

            {(user.job_type !== "Head of the Department") && (
      
              <div>
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  {...register("department")}
                  >
                  <option value="">select one....</option>
                  {departments.map((department, index) => (
                    <option key={index} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
              )}
              </div>

            {(user.job_type !== "Head of the Department") && (
            <div className="search-btn">
              <input
                type="submit"
                className="bttn redbtn"
                value="Get the Filtered Forms"
              />
            </div>
            )}


          <div className="allLeaveRequest-btn">
            <select onClick={e=> handleShowingAllNotifications(e)}>
                <option value="Pending">Pending</option>
                <option value="All">All</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
          </div>
        </form>

        {/* Filtered Leave notifications */}
        {!showForm && !isAllNotificationsOpen && !all && (<>
          <h4 className="filteredFormHeading">{Forms[0]?.formType}</h4>
          <ul>
            {Forms.map((form, index) => (
              <li
              key={index}
              style={{ listStyle: "none" }}
              onClick={() => handleSingleForm(form.id)}
              >
                <FormReqTap form={form} />
              </li>
            ))}
          </ul>
          </>
        )}
        {showForm && !isAllNotificationsOpen && (
          <FormPreview application={Form} approver={user} setForm={setForm} />
        )}

        {/* All leave Notifications */}
        {isAllNotificationsOpen && (
          <div className="allNotifications">
            {filteredForms.length > 0 ? (
              <h2>{filter} Requests</h2>
            ) : (
              <p>No LeaveForms Found.......</p>
            )}

            {filteredForms.map((request, index) => (
              <div
                key={index}
                onClick={() =>
                  handleSingleLeaveRequestForm(request.id, request.formType)
                }
              >
                <FormReqTap form={request} />
              </div>
            ))}
          </div>
        )}
        {!isAllNotificationsOpen && all && (
          <FormPreview
            application={requestForm}
            approver={user}
            setForm={setRequestForm}
          />
        )}
      </div>
    </>
  );
}

export default TransferRequests