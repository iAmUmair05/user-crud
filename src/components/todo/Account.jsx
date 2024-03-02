import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mainview from "./Mainview";

const Account = () => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };


  useEffect(() => {
    
    const userEmail = localStorage.getItem("userEmail");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    setUser({ firstName: firstName, lastName: lastName, email: userEmail });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Mainview>
      <div className="flex flex-col justify-center items-center h-screen">
        <img src="https://source.unsplash.com/70x70/? user, pic" alt="user" className="rounded-full"
        />

        <div className="flex space-x-2">
          <p className="text-white text-2xl">{user.firstName}</p>
          <p className="text-white text-2xl">{user.lastName}</p>
        </div>
        <p className="text-gray-400">{user.email}</p>

        
        <button className="px-4 py-2 rounded-md cursor-pointer bg-gray-600 mt-2 text-white" onClick={handleLogout}>
                  Logout
                </button>
      </div>
    </Mainview>
  );
};

export default Account;
