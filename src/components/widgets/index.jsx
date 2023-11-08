import React, { useState, useEffect } from "react";
import "./widgets.css";
import APIKit from "../../spotify";
import WidgetCard from "./widgetCard";

export default function Widgets({ artistID }) {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    if (artistID) {
      APIKit.get(`/artists/${artistID}/related-artists`)
        .then((res) => {
          const a = res.data?.artists.slice(0, 3);
          setSimilar(a);
        })
        .catch((err) => console.error(err));

      APIKit.get(`/browse/featured-playlists`)
        .then((res) => {
          const a = res.data?.playlists.items.slice(0, 3);
          setFeatured(a);
        })
        .catch((err) => console.error(err));

      APIKit.get(`/browse/new-releases`)
        .then((res) => {
          const a = res.data?.albums.items.slice(0, 3);
          setNewRelease(a);
        })
        .catch((err) => console.error(err));
    }
  }, [artistID]);

  return (
    <div className="widgets-body flex">
      <WidgetCard key="1" title="Similar Artists" similar={similar} />
      <WidgetCard key="2" title="Made For You" featured={featured} />
      <WidgetCard key="3" title="New Releases" newRelease={newRelease} />
    </div>
  );
}
