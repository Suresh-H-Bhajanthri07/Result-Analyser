// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import "../Styles/Login.css"

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const validateLogin = (e) => {
//     e.preventDefault();

//     const validEmail = 'admin@example.com';
//     const validPassword = 'admin123';

//     if (email === validEmail && password === validPassword) {
//      console.warn("login sucessfull")
//       navigate('/page2');
//     } else {
//       alert('Invalid email or password. Please try again.');
//     }
//   };
//   return (
//     <div>
//         <div className="head">
//            <h1>WELCOME TO KLE TECHNOLOGICAL UNIVERSITY</h1>
//         </div>
//         <div className="body-1">
//             <div className="side-a">
//                 <img src="https://img.freepik.com/free-photo/data-management-perfomance-graph-concept_53876-167113.jpg?size=626&ext=jpg&ga=GA1.1.1671615639.1699209373&semt=sph" alt="xyz" className="animated-image" />
//                 <img src="https://img.freepik.com/free-photo/documents-paperwork-business-strategy-concept_53876-125434.jpg?size=626&ext=jpg&ga=GA1.1.1671615639.1699209373&semt=sph" alt="xyz" className="animated-image" />
//             </div>
//             <div className="side-b">
//                 <h2> ADMINS ONLY</h2>
//                 <br />
//                 <div className="f-type">
//                 <form action="" id="signupform" className="form" onSubmit={(e) => validateLogin(e)}>
//                 <label htmlFor="email">Enter mail : </label>
//               <input
//                 type="email"
//                 id="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <label htmlFor="password">Enter password : </label>
//               <input
//                 type="password"
//                 id="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//                     <button type="submit" >Login</button>
//                     <p>forget password?</p>
//                 </form>
//                 </div>        
//             </div>
//         </div>
//         <div className="bottom">
//             <p> Terms Of Service | Privacy Policy </p>
//         </div>
//     </div>
//   )
// }
// export default Login;







import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [newAdminMode, setNewAdminMode] = useState(false);



  const validateLogin = (e) => {
    e.preventDefault();

    const validEmail = 'admin@example.com';
    const validPassword = 'admin123';

    if (email === validEmail && password === validPassword) {
     console.warn("login sucessfull")
      navigate('/page2');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };


  const handleResetPassword = () => {
    setResetPasswordMode(true);
    setNewAdminMode(false);
  };

  const handleRememberPassword = () => {
    setResetPasswordMode(false);
    setNewAdminMode(false);
  };

  const handleNewAdmin = () => {
    setNewAdminMode(true);
    setResetPasswordMode(false);
  };

  const handleFirstTime = () => {
    setNewAdminMode(false);
    setResetPasswordMode(false);
  };






  return (
    <div>
        <div className="head">
           <h1>WELCOME TO KLE TECHNOLOGICAL UNIVERSITY</h1>
        </div>
        <div className="body-1">
            <div className="side-a">
                <img src="https://img.freepik.com/free-photo/data-management-perfomance-graph-concept_53876-167113.jpg?size=626&ext=jpg&ga=GA1.1.1671615639.1699209373&semt=sph" alt="xyz" className="animated-image" />
                <img src="https://img.freepik.com/free-photo/documents-paperwork-business-strategy-concept_53876-125434.jpg?size=626&ext=jpg&ga=GA1.1.1671615639.1699209373&semt=sph" alt="xyz" className="animated-image" />
            </div>
            <div className="side-b">
            {newAdminMode ? (
            // Render new admin registration form
            <form>
              {/* Add your new admin registration form elements here */}
              <button type="button" onClick={handleFirstTime}>
                Already exists? Login here
              </button>
            </form>
          ) : (
            <>
              <h2>{resetPasswordMode ? 'RESET PASSWORD' : 'ADMINS ONLY'}</h2>
              <br />
              <div className="f-type">
                {resetPasswordMode ? (
                  // Render reset password form
                  <form>
                    {/* Add your reset password form elements here */}
                    <button type="button" onClick={handleRememberPassword}>
                      Remember Password
                    </button>
                  </form>
                ) : (
                  // Render login form
                  <form action="" id="signupform" className="form" onSubmit={(e) => validateLogin(e)}>
                    <label htmlFor="email">Enter mail : </label>
                    <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Enter password : </label>
                    <input type="password" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                    <p onClick={handleResetPassword}>Forget Password?</p>
                    <p onClick={handleNewAdmin}>First time? Register here</p>
                  </form>
                )}
              </div>
            </>
          )}        
            </div>
        </div>
        <div className="bottom">
            <p> Terms Of Service | Privacy Policy </p>
        </div>
    </div>
  )
}
export default Login;