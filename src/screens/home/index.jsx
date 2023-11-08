import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import Library from "../library";
import Feed from "../feed";
import Player from "../player";
import Favorites from "../favorites";
import Trending from "../trending";
import "./home.css";

const Home = () => {
  return (
    <BrowserRouter>
      <div className="main-body">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/player" element={<Player />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Home;
