import "./Home.css";
import HomeTopBar from "./HomeTopBar/HomeTopBar";

function Home() {
  return (
    <>
      <HomeTopBar />

      <div id="welcomeBox" className="HomeBoxes">
        <p id="welcomeMessage">
          Hi, User! Welcome back to <span>Shiftly</span>.
        </p>
        <p>
          Tip: In the Settings you can change your preferences which can lead to
          different results on your tables
        </p>
      </div>

      <div id="HistoryContainer" className="HomeBoxes">
        <div class="input-icons">
          <i class="bi bi-search icon"></i>
          <input
            id="History_input"
            class="input-field"
            type="password"
            placeholder="Search Table"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
