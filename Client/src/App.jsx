import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Page2 from "./Components/Page2";
import Page3 from "./Components/Page3";
import Marksheet from "./Components/Marksheet";
import Viewchart from "./Components/Viewchart";
import Viewstudent from "./Components/Viewstudent.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/page3" element={<Page3 />} />
      <Route path="/marksheet" element={<Marksheet />} />
      <Route path="/viewchart" element={<Viewchart />} />
      <Route path="/student-details" element={<Viewstudent />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
