import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/Page2.css";

const Page2 = () => {


    const navigate = useNavigate();
    const [selectedSemester, setSelectedSemester] = useState("select");

    const handleSemesterChange = (e) => {
      setSelectedSemester(e.target.value);
    };

    const handleCardClick = (updatedData) => {
      console.log("Navigating to Page3 with:", {
        selectedSemester,
        ...updatedData
      });
       
      navigate('/page3', {
        state: {
          selectedSemester,
          data: updatedData,
        },
      });
    };

    

  const renderCards = () => {
    if (selectedSemester === "3rd sem") {
      return (
        <>
          <div className="card-1" onClick={() => handleCardClick({ strength: 30, mentor: 'Prof. manjula', cr: 'Darshan', division: 'A' })}>
                   <div className="alpha-img">
                       <img src="https://4.bp.blogspot.com/-sL27hk1Aq30/VxsWEnra7PI/AAAAAAAAE_s/Bp0iEq8srb4m8xQpgbYH1Zh_ylfIicBfACLcB/s1600/3dAletter.png" alt="xyz"  className="a-alpha"/>
                   </div>
                   <div className="card-text">
                   <span>Strength :30 </span>
                   <span>Mentor : Prof. manjula</span>
                   <span>CR :Darshan</span>
                   <span>Division :A</span>
                   </div>     
                </div>
                <div className="card-2" onClick={() => handleCardClick({ strength: 20, mentor: 'Prof. sushil', cr: 'rohit', division: 'B' })}>
                   <div className="alpha-img">
                       <img src="https://3.bp.blogspot.com/--qjkLEY-CLo/VxsWIsHb2BI/AAAAAAAAE_w/86yz5MkdSQkUk_pTxDryFwQ3GGrKfAHzwCLcB/s1600/3dBletter.png" alt="xyz"  className="a-alpha"/>
                   </div>
                   <div className="card-text">
                   <span>Strength :20 </span>
                   <span>Mentor :sushil</span>
                   <span>CR :rohit</span>
                   <span>Division :B</span>
                   </div>      
                </div>
                <div className="card-3" onClick={() => handleCardClick({ strength: 20, mentor: 'Prof. sagar', cr: 'sagar', division: 'C' })}>
                   <div className="alpha-img">
                       <img src="https://4.bp.blogspot.com/-elNbDyMXaRc/VxsWEYpS4uI/AAAAAAAAE_o/mNtCp07G-voaDBSyR5wkdf5hNoXtGwq8wCLcB/s1600/3dCletter.png" alt="xyz"  className="a-alpha"/>
                   </div>
                   <div className="card-text">
                   <span>Strength :20 </span>
                   <span>Mentor : sagar</span>
                   <span>CR :sagar</span>
                   <span>Division :C</span>
                   </div>     
                </div>
        </>
      );
    } else if (selectedSemester === "5th sem") {
      return (
        <>
          <div className="card-1" onClick={() => handleCardClick({ strength: 30, mentor: 'Prof. manjula', cr: 'Darshan', division: 'A' })}>
                   <div className="alpha-img">
                       <img src="https://cdn.pixabay.com/photo/2020/09/18/17/39/letter-a-5582503_640.png" alt="xyz"  className="a-alpha"/>
                   </div>
                   <div className="card-text">
                   <span>Strength :30 </span>
                   <span>Mentor : Prof. manjula</span>
                   <span>CR :Darshan</span>
                   <span>Division :A</span>
                   </div>     
                </div>
                <div className="card-2" onClick={() => handleCardClick({ strength: 30, mentor:'Prof. sushil', cr: 'rohit', division: 'B' })}>
                   <div className="alpha-img">
                       <img src="https://cdn.pixabay.com/photo/2020/09/13/19/10/letter-b-5569125_1280.png" alt="xyz"  className="a-alpha"/>
                   </div>
                   <div className="card-text">
                   <span>Strength :20 </span>
                   <span>Mentor :sushil</span>
                   <span>CR :rohit</span>
                   <span>Division :B</span>
                   </div>      
                </div>
                <div className="card-3" onClick={() => handleCardClick({ strength: 20, mentor: 'Prof. sagar', cr: 'sagar', division: 'C' })}>
                   <div className="alpha-img">
                       <img src="https://cdn.pixabay.com/photo/2020/09/13/19/09/letter-c-5569119_640.png" alt="xyz"  className="a-alpha"/>
                   </div>
                   <div className="card-text">
                   <span>Strength :20 </span>
                   <span>Mentor : sagar</span>
                   <span>CR :sagar</span>
                   <span>Division :C</span>
                   </div>     
                </div>
        </>
      );
    } else {
      return <p>Select a semester to see the cards.</p>;
    }
  };



  return (
    <div className="body">
        <div className="top-section">
            <p>Result analysis</p>
        </div>
        <div className="mid-section">
            <div className="topsite">
                <p>SEMESTER</p>
                <select name="semester" id="semester" onChange = {(e) => handleSemesterChange(e)} value={selectedSemester}>
                  <option value="select">Select Semester</option>
                  <option value="3rd sem">3rd Semester</option>
                  <option value="5th sem">5th Semester</option>
                </select>  
            </div>
            <div className="card-container">
                {renderCards()}
            </div>
            
        </div>
    </div>
  )
}

export default Page2;