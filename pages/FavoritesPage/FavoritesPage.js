import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `https://localhost:5001/favorites/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [user, token]);

  return (
    <div className="container">
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>{favorite.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
