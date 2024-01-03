import "./HomeTopBar.css";

function HomeTopBar(props) {



  return (
    <>
      <div id="HomeTopBar">
        <button
          id="HomeButton"
          className={
            props.page == "home"
              ? "HomeTopBarButton BottomBorder"
              : "HomeTopBarButton"
          }
        >
          Home
        </button>
        <button
          id="GenerateButton"
          className={
            props.page == "generate"
              ? "HomeTopBarButton BottomBorder"
              : "HomeTopBarButton"
          }
        >
          Generate
        </button>
        <button id="UserDetailsBtn">U</button>
      </div>
    </>
  );
}

export default HomeTopBar;
