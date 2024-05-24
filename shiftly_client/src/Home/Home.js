import "./Home.css";
import HomeTopBar from "./HomeTopBar/HomeTopBar";
import SchedulingTile from "./SchedulingTile/SchedulingTile.jsx";
import React, { useState } from "react";
import tables_map from "../Data/TableArchive.js";

function Home() {
  const [filterValue, setFilterValue] = useState("");
  const [tiles, setTiles] = useState(tables_map);
  const [sortOrder, setSortOrder] = useState("asc");
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  const handleToggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleShowStarred = () => {
    setShowStarredOnly(!showStarredOnly);
  };

  const toggleStarred = (idToToggle) => {
    setTiles((prevTiles) => ({
      ...prevTiles,
      [idToToggle]: {
        ...prevTiles[idToToggle],
        starred: !prevTiles[idToToggle].starred,
      },
    }));
  };

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  const removeTile = (idToRemove) => {
    setTiles((prevTiles) => {
      const newTiles = { ...prevTiles };
      delete newTiles[idToRemove];
      return newTiles;
    });
  };

  const sortedTilesArray = Object.values(tiles)
    .filter((tile) => !showStarredOnly || tile.starred)
    .sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const filteredTiles = sortedTilesArray.filter((tile) =>
    tile.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  const navigateToDetailPage = (tileId) => {
    // Implement the navigation logic here, e.g., using React Router
    console.log("Navigating to detail page for tile ID:", tileId);
  };

  return (
    <>
      <HomeTopBar page="home" />
      <div className="CenterDiv">
        <div id="welcomeBox" className="HomeBoxes">
          <p id="welcomeMessage">
            Hi, User! Welcome back to <span>Shiftly</span>.
          </p>
          <p>
            Tip: In the Settings you can change your preferences which can lead
            to different results on your tables.
          </p>
        </div>
        <div id="HomeMainBox" className="HomeBoxes">
          <div className="input-icons">
            <i className="bi bi-search icon"></i>
            <input
              id="History_input"
              className="input-field"
              placeholder="Search Table"
              value={filterValue}
              onChange={handleInputChange}
            />
          </div>
          <div id="HistoryListContainer"></div>
          <div className="sort-buttons">
            <button onClick={handleToggleSort}>
              {sortOrder === "asc" ? "Order by Oldest First" : "Order by Newest First"}
            </button>
            <button onClick={handleShowStarred}>
              {showStarredOnly ? "Show All Tiles" : "Show Starred Tiles Only"}
            </button>
          </div>
          {filteredTiles.map((tile) => (
            <SchedulingTile
              key={tile.ID}
              name={tile.name}
              date={tile.date}
              starred={tile.starred}
              onRemove={() => removeTile(tile.ID)}
              onToggleStar={() => toggleStarred(tile.ID)}
              onNavigate={() => navigateToDetailPage(tile.ID)}
            />
          ))}
        </div>
      </div>
      <div id="easterEgg">easter egg</div>
    </>
  );
}

export default Home;
