import "./Home.css";
import HomeTopBar from "./HomeTopBar/HomeTopBar";
import SchedulingTile from "./SchedulingTile/SchedulingTile";
import React, { useState } from "react";

function Home() {
  // State variable to hold the input value
  const [filterValue, setFilterValue] = useState("");

  const [SchedulingTiles, setSchedulingTiles] = useState([
    { name: "week 13", date: "01/01/2024" },
    { name: "week 14", date: "08/01/2024" },
    { name: "week 15", date: "15/01/2024" },
    { name: "week 16", date: "21/01/2024" },
    { name: "week 19", date: "28/01/2024" },
    { name: "week 19b", date: "28/01/2024" },
    { name: "week 19c", date: "29/01/2024" },
    { name: "week 30", date: "20/03/2024" },
    { name: "a", date: "27/03/2024" },
    { name: "aaaaaaabb", date: "29/03/2024" },
  ]);

  // Event handler to update the filter value
  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  // Function to remove a tile by name
  const removeTile = (nameToRemove) => {
    setSchedulingTiles(SchedulingTiles.filter(tile => tile.name !== nameToRemove));
  };

  // Filtered scheduling tiles based on input value
  const filteredTiles = SchedulingTiles.filter((tile) =>
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

          {/* Render filtered tiles */}
          {filteredTiles.map((tile, index) => (
            <SchedulingTile
              key={index}
              name={tile.name}
              date={tile.date}
              onRemove={removeTile}
            />
          ))}
        </div>
      </div>
      <div id="easterEgg">easter egg</div>
    </>
  );
}

export default Home;
