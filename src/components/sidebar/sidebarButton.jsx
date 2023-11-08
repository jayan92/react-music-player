import { IconContext } from "react-icons";
import { Link, useLocation } from "react-router-dom";
import "./sidebarButton.css";

export default function SidebarButton({ to, title, icon, activePath }) {
  const location = useLocation();

  const isActive = location.pathname === activePath;

  const btnClass = isActive ? "btn-body active" : "btn-body";
  return (
    <Link to={to}>
      <div className={btnClass}>
        <IconContext.Provider value={{ size: "24px", className: "btn-icon" }}>
          {icon}
          <p className="btn-title">{title}</p>
        </IconContext.Provider>
      </div>
    </Link>
  );
}
