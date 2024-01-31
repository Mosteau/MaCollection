import axios from "axios";
import React, { useState, useEffect } from "react";

function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const Listgames = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/games`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setGames(response.data);
      } catch (error) {
        console.error("erreur lors de la récupération des jeux vidéos", error);
      }
    };

    Listgames();
  }, []);

  const handleDeleteGames = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/games/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setGames(games.filter((game) => game.id !== id));
    } catch (error) {
      console.error("erreur lors de la suppression du jeu vidéo", error);
    }
  };

  const [newGame, setNewGame] = useState({
    name: "",
    genre: "",
    platform: "",
    date: "",
  });

  const addGame = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games`,
        newGame,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setGames([...games, response.data]);
      setNewGame({
        name: "",
        genre: "",
        platform: "",
        date: "",
      });
    } catch (error) {
      console.error("erreur lors de l'ajout du jeu vidéo", error);
    }
  };

  const handleNameChange = (e) => {
    setNewGame({ ...newGame, name: e.target.value });
  };

  const handleGenreChange = (e) => {
    setNewGame({ ...newGame, genre: e.target.value });
  };

  const handlePlatformChange = (e) => {
    setNewGame({ ...newGame, platform: e.target.value });
  };

  const handleDateChange = (e) => {
    setNewGame({ ...newGame, date: e.target.value });
  };

  return (
    <div className="total-home">
      <div className="title-home">
        {/* {*mettre ici le prénom de la personne connectée*} */}
        <h1>Collection de Thibaut</h1>
      </div>
      <div className="form-input-create-games">
        <form className="form-create-games" onSubmit={addGame}>
          <div className="form-group">
            <label htmlFor="nomdujeu">Nom du jeu</label>
            <input
              type="text"
              className="form-control"
              value={newGame.name}
              onChange={handleNameChange}
              id="nomdujeu"
              placeholder="nom du jeu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="plateforme">Plateforme</label>
            <input
              type="text"
              className="form-control"
              value={newGame.platform}
              onChange={handlePlatformChange}
              id="plateforme"
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
              onChange={handleGenreChange}
              id="genre"
              placeholder="genre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="datedesortie">Date de sortie</label>
            <input
              type="date"
              className="form-control"
              value={newGame.date}
              onChange={handleDateChange}
              id="datedesortie"
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
                <p className="card-text">{game.release_date}</p>
                <img
                  src={game.image}
                  className="image-games"
                  alt=""
                  width="200px"
                />
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
