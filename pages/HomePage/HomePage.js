import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  const [user, token] = useAuth();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, [token]);

  const fetchCars = async () => {
    try {
      let response = await axios.get("https://localhost:5001/api/cars/myCars", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCars(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container">
      {console.log(user)}
      <h1>Home Page for {user.userName}!</h1>
      {cars &&
        cars.map((car) => (
          <p key={car.id}>
            {car.year} {car.model} {car.make}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
