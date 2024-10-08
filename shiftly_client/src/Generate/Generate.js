import "./Generate.css"
import HomeTopBar from "../Home/HomeTopBar/HomeTopBar";
import React, { useState, useEffect} from 'react';
import UploadScreen from "./UploadScreen";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../LoadingPage";


function Generate(props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [filesList, SetFilesList] = useState([]);
  const [parsedRows, SetParsedRows] = useState([]);
  const [rowsList, SetRowsList] = useState([[], [], []]);
  const [userCurrent, setUserCurrent] = useState("");

  const [fileUploaded, setFileUploaded] = useState([false, false, false]);
  const [loggedUser, setLoggedUser] = useState("");
  const [screenLoading, setScreenLoading] = useState(false); // Loading state
  const [barLoaded, setBarLoaded] = useState(false); // New state to track when data is fetched



  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/protected", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Token verification failed");
        }

        const data = await response.json();
        setLoggedUser(data.current_user);
        setBarLoaded(true);

        const userCurrnetResponse = await fetch('http://localhost:5000/get_current_user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!userCurrnetResponse.ok) {
          throw new Error('Failed to fetch user color');
        }
  
        const userCurrentJson = await userCurrnetResponse.json();
        setUserCurrent(userCurrentJson.user_data);

      } catch (error) {
        console.error("Error:", error);
        navigate("/");
      }
    };

    if (token) {
      verifyToken();
    } else {
      navigate("/");
    }
  }, [token, navigate]);





  return (
    <>
      {!userCurrent ? (
        <>
          <LoadingPage msg="Loading Generator screen"/>
        </>
      ) : (
        <>
          <div className="content-container">
            {[...Array(3)].map((_, index) => (
              <UploadScreen
                key={index}
                step={index + 1}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                fileUploaded={fileUploaded}
                setFileUploaded={setFileUploaded}
                filesList={filesList}
                SetFilesList={SetFilesList}
                parsedRows={parsedRows}
                SetParsedRows={SetParsedRows}
                rowsList={rowsList}
                SetRowsList={SetRowsList}
                screenLoading={screenLoading}
                setScreenLoading={setScreenLoading}
              />
            ))}
          </div>
          <HomeTopBar page="generate" loggedUser={loggedUser} userCurrent={userCurrent} setBarLoaded={setBarLoaded} />
          {/* 
          <button onClick={handleNext} type="button" disabled={currentStep === 3} className="btn btn-primary">
            next page
          </button>
          <button onClick={handleBack} type="button" disabled={currentStep === 1} className="btn btn-primary">
            Back page
          </button>
          */}
        </>
      )}
    </>
  );
}


export default Generate;