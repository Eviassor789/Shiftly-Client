import "./Home.css";
import HomeTopBar from "./HomeTopBar/HomeTopBar";
import SchedulingTile from "./SchedulingTile/SchedulingTile.jsx";
import React, { useEffect, useState } from "react";
import tables_map from "../Data/TableArchive.js";
import users from "../Data/Users.js";
import { useNavigate } from "react-router-dom";

function Home(props) {
  const [filterValue, setFilterValue] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showStarredOnly, setShowStarredOnly] = useState(false);
  const [tiles, setTiles] = useState([]);
  const navigate = useNavigate();

  const loggedUser = props.loggedUser;

  useEffect(() => {
    if (!users.get(loggedUser)) {
      navigate(`/`);
      return;
    }

    const userTablesArr = users.get(loggedUser).tablesArr;
    console.log("loggedUser:", users.get(loggedUser).tablesArr);
    userTablesArr.forEach(element => {
    });
    const userTiles = new Map();
    userTablesArr.forEach((tableId) => {
      if (tables_map.get(tableId)) {
        userTiles.set(tableId, tables_map.get(tableId));
      }
    });
    setTiles(Array.from(userTiles.values()));
  }, [loggedUser, navigate]);

  const handleToggleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleShowStarred = () => {
    setShowStarredOnly(!showStarredOnly);
  };

  const toggleStarred = (idToToggle) => {
    setTiles((prevTiles) =>
      prevTiles.map((tile) =>
        tile.ID === idToToggle ? { ...tile, starred: !tile.starred } : tile
      )
    );
    tables_map.get(idToToggle).starred = !tables_map.get(idToToggle).starred;
  };

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  const removeTile = (idToRemove) => {
    setTiles((prevTiles) => prevTiles.filter((tile) => tile.ID !== idToRemove));
    tables_map.delete(idToRemove);
  };

  const navigateToDetailPage = (tileId) => {
    navigate(`/detail/${tileId}`);
  };

  const sortedTilesArray = tiles.filter((tile) => !showStarredOnly || tile.starred)
    .sort((a, b) => {
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const filteredTiles = sortedTilesArray.filter((tile) =>
    tile.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  console.log("Filtered Tiles:", filteredTiles);

  return (
    <>
      <HomeTopBar page="home" loggedUser={props.loggedUser} />
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
              {sortOrder === "asc"
                ? "Order by Oldest First"
                : "Order by Newest First"}
            </button>
            <button onClick={handleShowStarred}>
              {showStarredOnly ? "Show All Tiles" : "Show Starred Tiles Only"}
            </button>
          </div>
          {filteredTiles.length > 0 ? (
            filteredTiles.map((tile) => (
              <SchedulingTile
                key={tile.ID}
                name={tile.name}
                date={tile.date}
                starred={tile.starred}
                currentTableID={props.currentTableID}
                setCurrentTableID={props.setCurrentTableID}
                onRemove={() => removeTile(tile.ID)}
                onToggleStar={() => toggleStarred(tile.ID)}
                onNavigate={() => navigateToDetailPage(tile.ID)}
              />
            ))
          ) : (
            <p>No tables found</p>
          )}
        </div>
      </div>
      <div id="easterEgg">easter egg</div>
    </>
  );
}

export default Home;
