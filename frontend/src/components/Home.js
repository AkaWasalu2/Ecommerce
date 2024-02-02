import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import About from "./About";
import FeatureProduct from "./Home/Featuredproducts";
import Herosection from "./Home/Herosection";
import Services from "./Home/Services";
import Trusted from "./Home/Trusted";
// import useCookie from 'react-use-cookie';

const Wrapper = styled.section`
    background-color: ${({theme}) => theme.colors.bg};
`;

function Home (){
    const data={
        name:"My website."
    }
    
    const navigate = useNavigate();
    // const [cookies,removeCookies] = useCookie();
    const [user,setUser] = useState();

    useEffect(()=>{
        console.log("Into useEffect of Home.js -> ")
        // console.log("cookies.token -> ",cookies.token)
    })

    return(<Wrapper className="test">
        <Herosection myData={data}/>
        <FeatureProduct/>
        <Services/>
        <Trusted/>
    </Wrapper>);
}

export default Home;