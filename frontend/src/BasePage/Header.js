import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import Nav from "./Nav";

const MainHeader = styled.header`
  padding: 0 1rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: right;
  position: relative;
  .logo {
    height: 7rem;
  }
`;
function Header(){
    return(<MainHeader>
        <NavLink to="/">
            <img src="./images/blueforest.png" alt="my logo img" className="logo"/>
        </NavLink><br/><br/><br/>
        <Nav/>
        
    </MainHeader>);
}

export default Header;