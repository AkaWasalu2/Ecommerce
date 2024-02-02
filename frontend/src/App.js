import React,{useState} from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import 'react-toastify/dist/ReactToastify.css';

import Header from "./BasePage/Header";
import Footer from "./BasePage/Footer";
import Login from "./components/AuthPages/Login";
import Register from "./components/AuthPages/Register";
import Error from "./components/Error";
import { GlobalStyle } from "../src/Styles/GlobalStyle";

import { user_routes } from "./Routes/UserRoutes";
import { admin_routes } from "./Routes/AdminRoutes";
import AuthUser from "./AuthUser";
import AuthAdmin from "./AuthAdmin";

function App() {

  const theme ={
    colors:{
      heading:"rgb(24,24,29)",
      text:"rgba(29,29,29,8)",
      white:"#fff",
      black:"#212529",
      helper:"#8490ff",

      bg:"#F6F8FA",
      footer_bg:"#0a1435",
      btn:"rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr:"#ffffff",
      gradient:"linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27,31,35,0.15) 0px 0px 0px 1px;",
      shadowSupport:"rgbs(0,0,0,0.16) 0px 1px 4px",
    },
    media:{
      mobile:"768px",
      tab:"998px",
    }
  }
  const role = "user"; // extracted from from cookies
  // wait till extraction and in that function flow itself set user_role true is role="user"

  const [user_role,setUser_role] = useState(false);
  // if(role == "user"){set}
// by default set role in cookies to be "user" to access basic pages
// but since there will be no token then no basic data would be there..
// [idea]Also after logging in set user name,email in session/cookies to access the data from DB accordingly
// [idea] all pages will have 2 sides with and with token and by default the role will be user


  return (<>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <GlobalStyle/>
        <Header/>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            {user_role && user_routes.map((u)=>{
              return(<>
                <Route
                path={u.path}
                element={<AuthUser>{u.element}</AuthUser>}
                />
              </>)
            })}

            {!user_role && admin_routes.map((a)=>{
              return(<>
                <Route
                path={a.path}
                element={<AuthAdmin>{a.element}</AuthAdmin>}
                />
              </>)
            })}

            <Route path="*" element={<Error/>}/>

            {/* <Route path="/" element={<Home/>}/> */}
            {/* <Route path="/products" element={<Products/>}/> */}
          </Routes>
        <Footer/>
      </BrowserRouter>
    </ThemeProvider>
    </>);
}

export default App;
