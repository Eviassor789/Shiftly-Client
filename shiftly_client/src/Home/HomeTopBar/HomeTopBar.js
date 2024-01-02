import "./HomeTopBar.css";

function HomeTopBar() {

  return (
    <>
      <div id="HomeTopBar">
        <button id="HomeButton" className="HomeTopBarButton">
          Home
        </button>
        <button id="GenerateButton"className="HomeTopBarButton">
          Generate
        </button>
        <button id="UserDetailsBtn">U</button>
      </div>
    </>
  );
}

export default HomeTopBar;
