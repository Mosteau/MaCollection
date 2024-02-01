import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Home() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [fullUser, setFullUser] = useState(null);
  const [newGame, setNewGame] = useState({
    userId: user.id,
    name: "",
    genre: "",
    platform: "",
    date: "",
  });

  const handleLogout = () => {
    setUser(null);
    navigate("/");
    localStorage.removeItem("userId");
  };

  // Récupération des informations de l'utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`
        );
        setFullUser(response.data.find((u) => u.id === user.id));
      } catch (error) {
        console.error(
          "erreur lors de la récupération des informations de l'utilisateur",
          error
        );
      }
    };

    if (user && user.id) {
      fetchUser();
    }
  }, [user]);

  // Récupération des jeux vidéos
  useEffect(() => {
    const listGames = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/gamesByusers/${user.id}`
        );
        setGames(response.data);
      } catch (error) {
        console.error("erreur lors de la récupération des jeux vidéos", error);
      }
    };

    listGames();
  }, [user]);

  // Suppression d'un jeu vidéo
  const handleDeleteGames = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/games/${id}`);
      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error("erreur lors de la suppression du jeu vidéo", error);
    }
  };

  // Ajout d'un jeu vidéo
  const addGame = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games`,
        newGame
      );
      setNewGame({
        name: "",
        genre: "",
        platform: "",
        date: "",
      });
      const addedGame = { ...newGame, id: response.data.id };
      setGames([...games, addedGame]);
    } catch (error) {
      console.error("erreur lors de l'ajout du jeu vidéo", error);
    }
  };

  // Gestion des inputs
  const handleInputChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  return (
    <div className="total-home">
      <div className="title-home">
        <button type="button" className="button-logout" onClick={handleLogout}>
          Se déconnecter !
        </button>
        <h1>
          Collection de {fullUser?.firstname} {fullUser?.lastname}
        </h1>
      </div>
      <div className="form-input-create-games">
        <form className="form-create-games" onSubmit={addGame}>
          <div className="form-group">
            <label htmlFor="name">Nom du jeu</label>
            <input
              type="text"
              className="form-control"
              value={newGame.name}
              onChange={handleInputChange}
              id="name"
              name="name"
              placeholder="nom du jeu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="platform">Plateforme</label>
            <input
              type="text"
              className="form-control"
              value={newGame.platform}
              onChange={handleInputChange}
              id="platform"
              name="platform"
              placeholder="plateforme"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              className="form-control"
              value={newGame.genre}
              onChange={handleInputChange}
              id="genre"
              name="genre"
              placeholder="genre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date de sortie</label>
            <input
              type="date"
              className="form-control"
              value={newGame.date}
              onChange={handleInputChange}
              id="date"
              name="date"
              placeholder="date de sortie"
              required
            />
          </div>
          <button className="button-create-games" type="submit">
            Ajouter le jeu
          </button>
        </form>
      </div>
      <div className="container-games-personnal">
        {games.map((game) => (
          <div key={game.id} className="list-games">
            <div className="card-games">
              <div className="card-body">
                <h5 className="card-title">{game.name}</h5>
                <p className="card-text">{game.platform}</p>
                <p className="card-text">{game.genre}</p>
                <p className="card-text">
                  {new Date(game.date).toLocaleDateString()}
                </p>
                <img className="image-games" alt="" width="200px" />
                <button
                  onClick={() => handleDeleteGames(game.id)}
                  className="button-delete-games"
                  type="submit"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
