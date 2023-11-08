import { useLocation } from "react-router-dom";
import APIKit from "../../spotify";
import { useEffect, useState } from "react";
import SongCard from "../../components/songCard";
import "./player.css";
import AudioPlayer from "../../components/audioPlayer";
import Widgets from "../../components/widgets";
import Queue from "../../components/queue";

const Player = () => {
  const location = useLocation();

  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      APIKit.get("playlists/" + location.state?.id + "/tracks").then((response) => {
        setTracks(response.data.items);
        setCurrentTrack(response.data?.items[0]);
      });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track);
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPlayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
};

export default Player;
