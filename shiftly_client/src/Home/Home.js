import "./Home.css";
import HomeTopBar from "./HomeTopBar/HomeTopBar";
import SchedulingTile from "./SchedulingTile/SchedulingTile.jsx";
import React, { useState } from "react";

function Home() {
  // State variable to hold the input value
  const [filterValue, setFilterValue] = useState("");

  const [tiles, setTiles] = useState([
    { name: "week 13", date: "01/01/2024", starred: true },
    { name: "week 14", date: "08/01/2024", starred: false },
    { name: "week 15", date: "15/01/2024", starred: false },
    { name: "week 16", date: "21/01/2024", starred: false },
    { name: "week 19", date: "28/01/2024", starred: false },
    { name: "week 19b", date: "28/01/2024", starred: true },
    { name: "week 19c", date: "29/01/2024", starred: false },
    { name: "week 30", date: "20/03/2024", starred: false },
    { name: "a", date: "27/03/2024", starred: true },
    { name: "aaaaaaabb", date: "29/03/2024", starred: false },
  ]);

  // State variables for sorting and filtering
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"
  const [showStarredOnly, setShowStarredOnly] = useState(false);

  // Function to handle ascending or descending sort
  const handleToggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to handle showing only starred tiles
  const handleShowStarred = () => {
    setShowStarredOnly(!showStarredOnly);
  };

  // Function to toggle the starred status of a tile
  const toggleStarred = (nameToToggle) => {
    setTiles(
      tiles.map((tile) =>
        tile.name === nameToToggle ? { ...tile, starred: !tile.starred } : tile
      )
    );
  };

  // Event handler to update the filter value
  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  // Function to remove a tile by name
  const removeTile = (nameToRemove) => {
    setTiles(tiles.filter((tile) => tile.name !== nameToRemove));
  };

  // Filter and sort tiles based on current settings
  const sortedTiles = tiles
  .filter((tile) => !showStarredOnly || tile.starred)
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === "desc") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });

  // Filtered  tiles based on input value
  const filteredTiles = sortedTiles.filter((tile) =>
    tile.name.toLowerCase().includes(filterValue.toLowerCase())
  );

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
            to different results on your tables
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
          {/* Buttons for sorting and filtering */}
          <div className="sort-buttons">
            <button onClick={handleToggleSort}> {sortOrder === "asc" ? "Ascending Sort" : "Descending Sort"}</button>
            <button onClick={handleShowStarred}>
              {showStarredOnly ? "Show All Tiles" : "Show Starred Tiles Only"}
            </button>
          </div>

          {/* Render filtered tiles */}
          {filteredTiles.map((tile, index) => (
            <SchedulingTile
              key={index}
              name={tile.name}
              date={tile.date}
              starred={tile.starred}
              onRemove={removeTile}
              onToggleStar={toggleStarred}
            />
          ))}
        </div>
      </div>
      <div id="easterEgg">easter egg</div>
    </>
  );
}

export default Home;
