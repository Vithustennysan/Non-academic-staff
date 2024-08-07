import { useState } from "react";
import "../css/dashboard.css";
import LoadingAnimation from "./LoadingAnimation";


const Dashboard = () => {
  const [isloading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, 600);

  return (
    <>
    {isloading? <LoadingAnimation/> :
    <div className="dashboard-container">

          <h1>DASHBOARD</h1>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2>Employee Income Information</h2>
          <p>Details about the employees</p>
        </div>
        <div className="dashboard-card">
          <h2>Tasks</h2>
          <p>List of tasks assigned to staff</p>
        </div>
        <div className="dashboard-card">
          <h2>Announcements</h2>
          <p>Latest announcements and updates</p>
        </div>
        <div className="dashboard-card">
          <h2>Calendar</h2>
          <p>Upcoming events and important dates</p>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default Dashboard;
