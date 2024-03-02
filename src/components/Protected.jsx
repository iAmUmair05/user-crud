import { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";


const Protected = ( props) => {
  const {Component} = props;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    let token = localStorage.getItem("userToken"); 

    if (!token) {

      navigate("/login")

    }
    else {

      navigate("/notes")
    }

  
  }, []);

  return Component;
};

export default Protected;
