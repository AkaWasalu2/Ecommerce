import React from "react";
import { Navigate } from "react-router-dom";


// check for token
export default function AuthAdmin({children}){
    const token = true; //from cookies
    if(token){
        alert("Token present .. setting admin environment");
        return children
    }else{
        return alert("No token admin side");
    }
}