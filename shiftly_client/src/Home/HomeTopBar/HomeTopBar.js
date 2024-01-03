import "./HomeTopBar.css";

function HomeTopBar(props) {

  function concat(a, b) {
    return a+b;
  };

  return (
    <>
      <div id="HomeTopBar">
        <button id="HomeButton" className={concat("HomeTopBarButton", props.page=="home"?" BottomBorder":"")}>
          Home
        </button>
        <button id="GenerateButton" className={concat("HomeTopBarButton", props.page=="generate"?" BottomBorder":"")}>
          Generate
        </button>
        <button id="UserDetailsBtn">U</button>
      </div>
    </>
  );
}

export default HomeTopBar;
