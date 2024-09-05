import React from 'react';
import './UploadScreen.css';
import ResizableWindow from "./ResizableWindow";
import UploadFile from "./UploadFile";
import { useNavigate } from 'react-router-dom';

const UploadScreen = ({ step, currentStep, setCurrentStep, fileUploaded, setFileUploaded, filesList, SetFilesList, rowsList, SetRowsList}) => {

  const navigate = useNavigate();

  // Example usage:
  



  const addParsedDataToDatabase = async (jwtToken, workersData, requirementsData, shiftsData) => {
    try {
      const response = await fetch('http://localhost:5000/add_by_parsed_rows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`, // Ensure the token is attached
        },
        body: JSON.stringify({
          workersData,    // Parsed rows from workers.xlsx
          requirementsData, // Parsed rows from requirements.xlsx
          shiftsData,     // Parsed rows from shifts.xlsx
        }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Assignment Calculated Succesfully:', result);
      } else {
        console.error('Failed to add data:', await response.text());
      }
    } catch (error) {
      console.error('Error occurred while adding parsed data:', error);
    }
  };


  const handleNext = async () => {

    if (currentStep === 3) {
      if(fileUploaded[0] === true && fileUploaded[1] === true) {
        // Assuming you have a valid JWT token stored in `jwtToken`
        const jwtToken = localStorage.getItem('jwtToken');
        // addTableForUser(jwtToken, tableData);
        
        console.log("filesList uploaded succesfully:");
        for (let index = 0; index < filesList.length; index++) {
          const file = filesList[index];
          console.log("name: ", file.name);
          console.log("parsed rows: ", rowsList[index]);  
        }

        const newAssignment = await addParsedDataToDatabase(jwtToken, rowsList[0], rowsList[1], rowsList[2]);
        console.log("newAssignment: ", newAssignment);

        // const tableData = {
        //   name: "week 1",
        //   date: "01/01/2024",
        //   starred: false,
        //   professions: ["Doctor", "Teacher", "Nurse"],
        //   shifts: [
        //       {
        //           profession: "Doctor",
        //           day: "Sunday",
        //           start_hour: "11:00",
        //           end_hour: "13:00",
        //           cost: 50,
        //           idList: [],
        //           color: false
        //       },
        //       {
        //           profession: "Teacher",
        //           day: "Monday",
        //           start_hour: "08:00",
        //           end_hour: "10:00",
        //           cost: 50,
        //           idList: [],
        //           color: false
        //       },
        //       {
        //         profession: "Teacher",
        //         day: "Sunday",
        //         start_hour: "12:00",
        //         end_hour: "14:00",
        //         cost: 50,
        //         idList: [],
        //         color: false
        //     }
        //   ],
        //   workers: [
        //     {
        //         "name": "_1",
        //         "professions": ["Doctor", "Teacher"],
        //         "days": ["Wednesday", "Sunday", "Friday"],
        //         "shifts": [],
        //         "relevant_shifts_id": [],
        //         "hours_per_week": 11
        //     },
        //     {
        //         "name": "_2",
        //         "professions": ["Doctor", "Teacher"],
        //         "days": ["Saturday", "Monday", "Tuesday", "Friday"],
        //         "shifts": [],
        //         "relevant_shifts_id": [],
        //         "hours_per_week": 12
        //     },
        //     {
        //         "name": "_3",
        //         "professions": ["Doctor", "Teacher"],
        //         "days": ["Sunday", "Friday", "Tuesday", "Monday"],
        //         "shifts": [],
        //         "relevant_shifts_id": [],
        //         "hours_per_week": 20
        //     },
        //     {
        //         "name": "_4",
        //         "professions": ["Doctor", "Teacher"],
        //         "days": ["Saturday", "Tuesday", "Thursday", "Monday"],
        //         "shifts": [],
        //         "relevant_shifts_id": [],
        //         "hours_per_week": 11
        //     },
        //     {
        //         "name": "_5",
        //         "professions": ["Doctor", "Teacher"],
        //         "days": ["Monday", "Thursday", "Wednesday", "Tuesday"],
        //         "shifts": [],
        //         "relevant_shifts_id": [],
        //         "hours_per_week": 11
        //     },
        //     {
        //         "name": "_6",
        //         "professions": ["Doctor", "Teacher"],
        //         "days": ["Saturday", "Tuesday", "Thursday"],
        //         "shifts": [],
        //         "relevant_shifts_id": [],
        //         "hours_per_week": 16
        //     }
        //   ],
        //   assignment: newAssignment
        // };

        // addTableForUser(jwtToken, tableData);


        navigate(`/home`);
      } else {
        alert("Please upload first the previous files.");
      }


    } else {
      setCurrentStep(currentStep + 1);
    }
  };


  const position = () => {
    if (step === currentStep) {
      return 'main';
    } else if (step < currentStep) {
      return 'left';
    } else {
      return 'right';
    }
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h1>Employees Details</h1>
            <p id="FirstWindowDetails">
              The details of the employees include the ID numbers of the
              employees, as well as the number of hours they are supposed to work
              per week (according to the contract), and their skills (up to 3
              skills per employee).
            </p>
          </>
        );

      case 2:
        return (
          <>
            <h1>Requirements</h1>
            <p id="FirstWindowDetails">
              The file should contain the required number of employees in each skill and at <br/>
              each hour of a given week.
            </p>
          </>
        );

        case 3:
        return (
          <>
            <h1>Shifts</h1>
            <p id="FirstWindowDetails">
              A file containing the optional shift basket for each day during the week as well 
              <br/> as the cost of each shift.
            </p>
          </>
        );

      default:
        return null;
    }
  };



  // Function to add a table for a user
  async function addTableForUser(token, tableData) {
    try {
        // Send the table data to the server
        const response = await fetch('http://localhost:5000/add_table', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT token in the request headers
            },
            body: JSON.stringify(tableData) // Convert tableData to JSON string
        });

        const result = await response.json();
        console.log("1");

        if (response.ok) {
            console.log("Table and shifts added successfully:", result);
            console.log("2");

            // Update the user's tablesArr with the new table ID
            // await updateUserTablesArray(token, tableData.name);
        } else {
            console.error("Failed to add table:", result.msg);
            console.log("3");
        }
    } catch (error) {
        console.error("Error while adding table:", error);
        console.log("4");
    }
  }

  // Function to update the user's tablesArr
  async function updateUserTablesArray(token, tableName) {
    try {
        // Fetch the user data
        const userResponse = await fetch('http://localhost:5000/protected', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const userData = await userResponse.json();
        console.log("5");


        if (userResponse.ok) {
            const username = userData.current_user;
            console.log("6");


            // Fetch the user's current data from the server
            const userDetailsResponse = await fetch(`http://localhost:5000/get_user_data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ username })
            });

            const userDetails = await userDetailsResponse.json();
            console.log("7");


            if (userDetailsResponse.ok) {
                const updatedTablesArr = [...userDetails.tablesArr, tableName];
                console.log("8");


                // Update the user's tablesArr
                const updateResponse = await fetch(`http://localhost:5000/update_user_tables`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ username, tablesArr: updatedTablesArr })
                });

                const updateResult = await updateResponse.json();

                if (updateResponse.ok) {
                    console.log("User's tablesArr updated successfully:", updateResult);
                } else {
                    console.error("Failed to update user's tablesArr:", updateResult.msg);
                }
            } else {
                console.error("Failed to fetch user details:", userDetails.msg);
            }
        } else {
            console.error("Failed to fetch user data:", userData.msg);
        }
    } catch (error) {
        console.error("Error while updating user's tablesArr:", error);
    }
}







  return (
    <>
      <div className={`upload-screen ${position()}`}>
        <div className="CenterDiv">
          {renderContent()}
          <UploadFile
            id={"UploadFile_" + currentStep}
            handleNext = {handleNext}
            fileUploaded = {fileUploaded}
            setFileUploaded = {setFileUploaded}
            currentStep = {currentStep}
            filesList = {filesList}
            SetFilesList = {SetFilesList}
            rowsList = {rowsList}
            SetRowsList = {SetRowsList}
          />
          <div id="GenerateProgress">
            <div
              className={` ${step === 1 ? "elipse elipse-on" : "elipse"}`}
              onClick={() => setCurrentStep(1)}
            ></div>
            <div
              className={` ${step === 2 ? "elipse elipse-on" : "elipse"}`}
              onClick={() => setCurrentStep(2)}
            ></div>
            <div
              className={` ${step === 3 ? "elipse elipse-on" : "elipse"}`}
              onClick={() => setCurrentStep(3)}
            ></div>
          </div>
          <ResizableWindow step={step} />
        </div>
      </div>
    </>
  );
};

export default UploadScreen;
