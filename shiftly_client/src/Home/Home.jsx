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
  const [filteredTiles, setFilteredTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true); // New state for user data loading
  const [loggedUser, setLoggedUser] = useState("");

  const navigate = useNavigate();

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:5000/protected', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Token verification failed');
        }
  
        const data = await response.json();
        console.log('Token verification successful:', data);
        // loggedUser = data.current_user;
        setLoggedUser(data.current_user);
        console.log("loggedUser123: ", data.current_user);
        
  
        if (users.get(data.current_user)) {
          const userTablesArr = users.get(data.current_user).tablesArr;
          console.log('User tablesArr:', userTablesArr);
          const userTiles = new Map();
          userTablesArr.forEach((tableId) => {
            if (tables_map.get(tableId)) {
              userTiles.set(tableId, tables_map.get(tableId));
            }
          });
          // console.log('userTiles: ', userTiles);
          setTiles(Array.from(userTiles.values()));  // Update tiles state
        } else {
          console.log('User data not found in local state');
          navigate('/');
        }
      } catch (error) {
        console.error('Error:', error);
        navigate('/');
      } finally {
        setLoading(false);  // Ensure loading is set to false in both success and failure cases
      }
    };
  
    if (token) {
      verifyToken();
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  useEffect(() => {
    const sortedTilesArray = tiles
      .filter((tile) => !showStarredOnly || tile.starred)
      .sort((a, b) => {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });

    const filteredTilesArray = sortedTilesArray.filter((tile) =>
      tile.name.toLowerCase().includes(filterValue.toLowerCase())
    );

    setFilteredTiles(filteredTilesArray);
    setLoading(false); // Indicate that loading is complete
  }, [tiles, filterValue, sortOrder, showStarredOnly, userLoading]);

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

  if (loading) {
    return <p>Loading...</p>;  // Show a loading message while data is being fetched
  }
  
  return (
    <>
      <HomeTopBar page="home" loggedUser={loggedUser} />
      <div className="CenterDiv">
        {/* Render content after data is fetched */}
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
          {/* Other components */}
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
                ID={tile.ID}
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
