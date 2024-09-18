import { useState } from "react";
import "../../css/dashboard.css";
import LoadingAnimation from "../LoadingAnimation";
import LeaveDetails from "./LeaveDetails";
import LeaveGraph from "./LeaveGraph";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  setTimeout(() => {
    setIsLoading(false);
  }, 600);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>

      {isLoading ? <LoadingAnimation /> :
        <div className="dashboard-container">
          <h1>DASHBOARD</h1>
          <LeaveDetails />


        </div>
      }
      <LeaveGraph />
    </>
  );
};

export default Dashboard;
