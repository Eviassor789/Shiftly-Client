import "./Generate.css"
import UploadFile from "./UploadFile";
import HomeTopBar from "../Home/HomeTopBar/HomeTopBar";
import ResizableWindow from "./ResizableWindow";

function Generate() {
  return (
    <>
      <HomeTopBar page="generate" />
      <div className="CenterDiv">
        <h1>Employees Details</h1>
        <p id="FirstWindowDetails">
          The details of the employees include the ID numbers of the employees,
          as well as the number of hours they are supposed to work per week
          (according to the contract), and their skills (up to 3 skills per
          employee).
        </p>
        <UploadFile />

        <div id="GenerateProgress">
          <div className="elipse elipse-on"></div>
          <div className="elipse"></div>
          <div className="elipse"></div>
        </div>
        <ResizableWindow />
      </div>
    </>
  );
}

export default Generate;