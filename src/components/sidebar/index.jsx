import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { FaGripfire, FaPlay } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import SidebarButton from "./sidebarButton";
import APIKit from "../../spotify";
import "./sidebar.css";

const Sidebar = () => {
  const [image, setImage] = useState(
    '"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"'
  );

  useEffect(() => {
    APIKit.get("me").then((response) => {
      setImage(response.data.images[0].url);
    });
  }, []);

  return (
    <div className="sidebar-container">
      <img src={image} className="profile-img" alt="profile" />
      <div>
        {/* <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} /> */}
        <SidebarButton title="Player" to="#" activePath="/player" icon={<FaPlay />} />
        {/* <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite />} /> */}
        <SidebarButton title="Library" to="/" activePath="/" icon={<IoLibrary />} />
      </div>
      <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt />} />
    </div>
  );
};

export default Sidebar;
