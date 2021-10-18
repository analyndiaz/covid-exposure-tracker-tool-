import React from "react";
import "./Dashboard.css";
import TrackerButtonsContainer from "./TrackerButtonsContainer";
import TrackerGraphsContainer from "./TrackerGraphsContainer";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <TrackerButtonsContainer />
      <TrackerGraphsContainer />
    </div>
  );
};

export default Dashboard;
