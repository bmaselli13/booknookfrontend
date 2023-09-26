import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

const BookDetailPage = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);

  const user = { id: 1 };
  const token = "";

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookData = await axios.get(
          `https://localhost:5001/books/${bookId}`
        );
        setBook(bookData.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleFavorite = async () => {
    try {
      const isFavorite = favorites.some((fav) => fav.bookId === book.id);

      if (isFavorite) {
        await axios.delete(`YOUR_BACKEND_URL/favorites/${book.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(favorites.filter((fav) => fav.bookId !== book.id));
      } else {
        await axios.post(
          `YOUR_BACKEND_URL/favorites`,
          {
            bookId: book.id,
            userId: user.id,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFavorites([...favorites, { bookId: book.id }]);
      }
    } catch (error) {
      console.error("Error handling favorite:", error);
    }
  };

  const handleReview = async (reviewText) => {
    try {
      const response = await axios.post(
        `YOUR_BACKEND_URL/reviews`,
        {
          bookId: book.id,
          userId: user.id,
          text: reviewText,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReviews([...reviews, response.data]);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <div>
      <h1>{book?.title}</h1>
      <button onClick={handleFavorite}>Toggle Favorite</button>
      <div>
        <h2>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id}>{review.text}</div>
        ))}
        <input
          type="text"
          placeholder="Write your review here..."
          onSubmit={(e) => {
            e.preventDefault();
            handleReview(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default BookDetailPage;
