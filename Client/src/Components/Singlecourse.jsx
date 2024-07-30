import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../Styles/Page3.css";
import { useState } from "react";


const Singlecourse = ({course, selectedSemester,division}) => {

  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("select");
  const [courseData, setCourseData] = useState({
    courseName: course.courseName,
    courseId: course.courseId,
    credits: course.credits
  });

  const handleClick = () => {
    console.log(division);
    setSelectedCourse(course.courseId);
    setCourseData({
      courseName: course.courseName,
      courseId: course.courseId,
      credits: course.credits,
    });

    console.log("Navigating to markssheet with ;",{
      selectedCourse,
      ...courseData,
    });
    navigate('/marksheet',{
      state: {
        selectedCourse,
        ...courseData,
        selectedSemester,
        division,
      },
    });
  };



  return (
    <div  className="subject-1" onClick={handleClick}>
                   <div className="alpha-img">
                       <img src="https://4.bp.blogspot.com/-sL27hk1Aq30/VxsWEnra7PI/AAAAAAAAE_s/Bp0iEq8srb4m8xQpgbYH1Zh_ylfIicBfACLcB/s1600/3dAletter.png" alt="xyz"  className="a-alpha"/>
                   </div>
                   <div className="card-text">
                   <span>course-name :{course.courseName} </span>
                   <span>course-code : {course.courseId}</span>
                   <span>credits :{course.credits}</span>
                   </div>     
    </div>
  )
}


Singlecourse.propTypes = {
  course: PropTypes.shape({
    courseName: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    credits: PropTypes.number.isRequired,
  }).isRequired,
  selectedSemester: PropTypes.string,
  division: PropTypes.string,
};

export default Singlecourse