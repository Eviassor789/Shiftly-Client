import "./Home.css";
import HomeTopBar from "./HomeTopBar/HomeTopBar";
import SchedulingTile from "./SchedulingTile/SchedulingTile.jsx";
import React, { useEffect, useState } from "react";
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
        setLoggedUser(data.current_user);
  
        // Fetch user-specific tables
        const tablesResponse = await fetch('http://localhost:5000/user_tables', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!tablesResponse.ok) {
          throw new Error('Failed to fetch tables');
        }
  
        const tablesData = await tablesResponse.json();
        console.log('User tables data:', tablesData);
        setTiles(tablesData);
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
        tile.id === idToToggle ? { ...tile, starred: !tile.starred } : tile
      )
    );
  };

  const handleInputChange = (event) => {
    setFilterValue(event.target.value);
  };

  const removeTile = (idToRemove) => {
    setTiles((prevTiles) => prevTiles.filter((tile) => tile.id !== idToRemove));
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
            Hi, {loggedUser}! Welcome back to <span>Shiftly</span>.
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
                key={tile.id}
                ID={tile.id}
                name={tile.name}
                date={tile.date}
                starred={tile.starred}
                currentTableID={props.currentTableID}
                setCurrentTableID={props.setCurrentTableID}
                onRemove={() => removeTile(tile.id)}
                onToggleStar={() => toggleStarred(tile.id)}
                onNavigate={() => navigateToDetailPage(tile.id)}
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
