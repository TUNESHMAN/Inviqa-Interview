import { Routes, Route } from "react-router-dom";
import HeaderBreadCrumb from "./HeaderBreadCrumb";
import Dashboard from "./Dashboard/Dashboard";

function Content() {
  return (
    <div>
      <HeaderBreadCrumb />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default Content;
