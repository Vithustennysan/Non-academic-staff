import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import "../../css/Profile_page/deanCharts.css"

// Register the required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DeanCharts = ({allForms}) => {
    const {user} = useContext(UserContext);
    const [departmentLeaveCount, setDepartmentLeaveCount] = useState([]);
    const [modifiedData, setmodifiedData] = useState({});
    const [filter, setfilter] = useState({
        department: '',
        year: new Date().getFullYear().toString(),
        month: '',
    })
    const [formTypeAndCount, setFormTypeAndCount] = useState({
        "Normal Leave Form":0,
        "Accident Leave Form":0,
        "Medical Leave Form":0,
        "Paternal Leave Form":0,
        "Maternity Leave Form":0,
        "No-Pay":0,
      });
    const monthsName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const findDepartmentDetails = () => {
        const data = modifiedData.get(filter.department);
        let forms = {
            "Normal Leave Form":0,
            "Accident Leave Form":0,
            "Medical Leave Form":0,
            "Paternal Leave Form":0,
            "Maternity Leave Form":0, 
            "No-Pay":0,
          };
        if (data) {
            data.filter(item => {
                const year = filter.year? item.year === filter.year : true;
                const month = filter.month? item.month === filter.month : true;
                return year & month;
        }).map(item => {forms[item.formType] = item.count;});
        }
        setFormTypeAndCount(forms);
    }

    const overAlldepartmentDetails = (arrayMap, year, month) => {
        let departmentObject = []
        departments.forEach((department) => {
            const departmentDetails = arrayMap.get(department);
            if (departmentDetails) {
                let count = 0;
                departmentDetails.map((acc) => {
                    if (acc.year == year && acc.month === month) {
                        count += acc.count;
                    }
                    else if( acc.year == year && month === ""){
                        count += acc.count
                    }
                })
                departmentObject.push(count);
            }else{
                departmentObject.push(0)
            }
        })
        console.log(departmentObject)
        setDepartmentLeaveCount(departmentObject);
    }

    useEffect(() => {
        const fetchFormsByCatogaries = () => {
            let formCategories = new Map();
    
            allForms.forEach((form) => {
                const department = form.user.department;
                const formType = form.formType;
                const month = monthsName[form.leaveAt.substring(5, 7)-1];
                const year = form.leaveAt.substring(0, 4);
    
                // Check if the department already exists in the map
                if (formCategories.has(department)) {
                    const infos = formCategories.get(department);
    
                    // Find if an entry for this formType, month, and year already exists
                    const existingInfo = infos.find(
                        (info) =>
                            info.formType === formType &&
                            info.month === month &&
                            info.year === year
                    );
    
                    if (existingInfo) {
                        // Increment the count if found
                        existingInfo.count += 1;
                    } else {
                        // Push a new entry if not found
                        infos.push({ department, formType, month, year, count: 1 });
                    }
                } else {
                    // Add a new department with the first entry
                    formCategories.set(department, [
                        { department, formType, month, year, count: 1 },
                    ]);
                }
            });
    
            return formCategories;
        };
    
        const formCategories = fetchFormsByCatogaries();
        setmodifiedData(formCategories);
        overAlldepartmentDetails(formCategories, filter.year, filter.month);
    }, []);


    
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
    
      const departments = faculties.find((faculty) => faculty.faculty === user.faculty)?.department.split(", ") || [];

      const handleFilters = ()=>{
          if(filter.year.length !== 4){
              alert("Please enter a valid year")
          }
        overAlldepartmentDetails(modifiedData, filter.year, filter.month);
        findDepartmentDetails();
      }

      const handleChange = (e)=>{
        setfilter({...filter, [e.target.name]: e.target.value})
      }


      const generateRandomColor = () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.8)`;    
      
      const colors = useMemo(()=>{
        return departments.map(()=> generateRandomColor())
      },[]); 
      // Chart data
      const dataOfDepartment = {
        labels: departments,
        datasets: [
          {
            label: "",
            data: departmentLeaveCount,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };
    
      // Chart options
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        //   title: {
        //     display: true,
        //     text: 'Monthly Sales Data',
        //   },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

    //   everyForm depend on the department
      const getChartData = () => {
        return{
          labels: Object.keys(formTypeAndCount),
          datasets: [
            {
            data: Object.values(formTypeAndCount),
              backgroundColor: ['#800080', '#a52a2a', '#ffff00', '#008000', '#0000ff', '#e90000'],
              borderColor: ['#800080', '#a52a2a', '#ffff00', '#008000', '#0000ff', '#e90000'],
              borderWidth: 3,
            },
          ],
        }};
    
    
      const option = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top', // Position of the legend
          },
          tooltip: {
            enabled: true, // Show tooltips on hover
          },
        },
      };
    
      return (<>
        <div className='DeanChart-container'>
            <div className="total">
                <div>
                    <input type="number" name='year' value={filter.year} onChange={(e)=>handleChange(e)} placeholder='year'/>
                    <select name="month" onChange={(e)=>handleChange(e)}>
                        <option value=''>month</option>
                        {monthsName.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                            ))}
                    </select>
                    <button className='bttn ashbtn' onClick={handleFilters}>search</button>
                </div>
                <Bar data={dataOfDepartment} options={options} />
            </div>
            <div className='departmentFormsChart'>
                <h4>Forms by Departments</h4>
                <select name="department" onChange={(e)=>{
                    handleChange(e)
                    }}>
                    <option value="">select</option>
                    {departments.map((department, index) => (
                        <option key={index} value={department}>{department}</option>
                        ))}
                </select>
                <button className='bttn ashbtn' onClick={handleFilters}>search</button>
 

                {
                    Object.values(formTypeAndCount).reduce((s,c)=>s+c) > 0 ?
                    <>
                    <Pie data={getChartData()} options={option}/>
                    </>:
                    <p>No data available</p>
                }

            </div>
        </div>
      </>)
}

export default DeanCharts