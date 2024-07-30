import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';  
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import "../Styles/Page3.css";
import Singlecourse from './Singlecourse';

const Page3 = () => {
    const { state } = useLocation();  
    const { selectedSemester, data } = state || {};
    const [courseDetails, setCourseDetails] = useState([]);

    useEffect ( () =>{
      const fetchCourseDetails = async () => {
        const response = await axios.post('http://localhost:3003/get/courses', {semester:selectedSemester[0]});
        console.log(selectedSemester, data.division);
        console.log(response.data.courses);
        setCourseDetails(response.data.courses);
        
      }
      fetchCourseDetails();
    },[] )

  return (
    <div className="body">
        <div className='class-details'>
          <span>Semester: {selectedSemester}</span>
          <span>Mentor: {data.mentor ?? 'N/A'}</span>
          <span>CR: {data.cr ?? 'N/A'}</span>
          <span>Division: {data.division ?? 'N/A'}</span>
        </div>
        <div className="sub-mid">
            <div className="sub-topsite">
            {console.log(selectedSemester)}
                <span>{selectedSemester}</span>
            </div>
            <div className="subject-container">
                {courseDetails?.map((course) => {
                  return <Singlecourse key={course._id} course={course} selectedSemester={selectedSemester} division={data.division}/>;
                })}
            </div>        
        </div>
    </div>
  );
}

Page3.propTypes = {
  selectedSemester: PropTypes.string,
  strength: PropTypes.number,
  topper: PropTypes.string,
  average: PropTypes.number,
};

export default Page3;


