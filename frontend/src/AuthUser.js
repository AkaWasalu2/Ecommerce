import React from "react";
import { Navigate } from "react-router-dom";


// check for token
//      token - true -> set cart items
//      token - false-> check and set cart empty []
export default function AuthUser(){
    const token = true; //from cookies
    if(token){
        return alert("Token present .. setting the cart !");
    }else{
        return alert("Not setting cart or user specific data - showing basic pages");
    }
}