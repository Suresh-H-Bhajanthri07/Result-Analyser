import { useLocation, useNavigate } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import "../Styles/Marksheet.css"
import Singlestudent from './singlestudent';

const Marksheet = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

    const { selectedCourse, ...courseData} = state || {}; 
    const { selectedSemester,division } = state || {};

    const [studentDetails, setStudentDetails] = useState([]);

    useEffect ( () => {
        const fetchStudentDeatail = async () => {
            console.log(state);
            const response = await axios.post('http://localhost:3003/get',{semester:selectedSemester[0],division:division});
            console.log(selectedSemester, division);
            console.log(response.data.students);


                console.log(courseData);
            const studentsWithCorrectMarks = response.data.students.map(student => ({
                ...student,
                marks: {
                    isa1: student.marks.isa1 || 0,
                    isa2: student.marks.isa2 || 0,
                    esa: student.marks.esa || 0,
                },
            }));

            setStudentDetails(studentsWithCorrectMarks);

            // setStudentDetails(response.data.students);
        }
        fetchStudentDeatail();
    },[]);

    const handleViewChartClick = () => {
        navigate('/viewchart', {
            state: {
                 ...courseData,
                 
                studentDetails
            },
        });
    };

  return (
    <>
    <div className="m-header">
        <span>Course-Name :{courseData.courseName}</span>
        <span>Course-ID :{courseData.courseId}</span>
        <span>Credits :{courseData.credits}</span>
        <span>Division :{courseData.division}</span>
    </div>
    <div className="exam-type">
        <span>Student-Details</span>        
        <span>ISA1</span>        
        <span>ISA2</span>        
        <span>ESA</span>        
        <span>Grade</span>        
    </div>
    <div className="stu-container">
    {studentDetails?.map((students) => {
        return <Singlestudent key={students._id} students={students} courseid={courseData.courseId} semester={selectedSemester[0]}/>
    })}
    </div>
    <div className="btn">
       <button onClick={() => handleViewChartClick()}>View Chart</button>
    </div>

    </>
  )
}

export default Marksheet