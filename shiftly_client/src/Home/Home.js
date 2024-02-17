import "./Home.css";
import HomeTopBar from "./HomeTopBar/HomeTopBar";
import SchedulingTile from "./SchedulingTile/SchedulingTile";
import React from 'react';


function Home() {
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
          <div class="input-icons">
            <i class="bi bi-search icon"></i>
            <input
              id="History_input"
              class="input-field"
              placeholder="Search Table"
            />
          </div>

          <div id="HistoryListContainer"></div>
          <SchedulingTile />
          <SchedulingTile />
          <SchedulingTile />
          <SchedulingTile />
          <SchedulingTile />
          <SchedulingTile />
          <SchedulingTile />
          <SchedulingTile />
          <SchedulingTile />
          <SchedulingTile />
        </div>
      </div>
      <div id="easterEgg">easter egg</div>
    </>
  );
}

export default Home;
