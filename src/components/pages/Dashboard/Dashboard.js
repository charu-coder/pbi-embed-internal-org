import React, { useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { reportsDataDummy } from "../../../datasets/reports";


const Dashboard = (props) => {
  const { name, subMenus, iconClassName, onClick, to, exact } = props;
  const [expand, setExpand] = useState(false);
//   reportsDataDummy

  return (
    <h1>Dashboard</h1>
  );
};

export default Dashboard;
