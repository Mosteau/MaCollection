import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { UserContext } from "../context/UserContext";

function Home() {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openModals, setOpenModals] = useState({});
  const [game, setGame] = useState({
    name: "",
    genre: "",
    platform: "",
    date: "",
    id: "",
  });
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [fullUser, setFullUser] = useState(null);
  const [newGame, setNewGame] = useState({
    userId: user?.id || "",
    name: "",
    genre: "",
    platform: "",
    date: "",
  });

  // Déconnexion
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

  useEffect(() => {
    listGames();
  }, [user]);

  // Suppression d'un jeu vidéo
  const handleDeleteGames = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/games/${id}`);
      listGames();
    } catch (error) {
      console.error("erreur lors de la suppression du jeu vidéo", error);
    }
  };

  // Ajout d'un jeu vidéo
  const addGame = async (event) => {
    event.preventDefault();
    try {
      const gameWithUser = { ...newGame, userId: user.id };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/games`,
        gameWithUser
      );
      setNewGame({
        name: "",
        genre: "",
        platform: "",
        date: "",
      });
      const addedGame = { ...gameWithUser, id: response.data.id };
      setGames([...games, addedGame]);
    } catch (error) {
      console.error("erreur lors de l'ajout du jeu vidéo", error);
    }
  };

  // modale de modification

  const handleOpenModal = (g) => {
    setOpenModals((prevOpenModals) => ({
      ...prevOpenModals,
      [g.id]: true,
    }));
  };

  const handleCloseModal = () => {
    setOpenModals({});
  };

  const handleGameChange = (event) => {
    setGame({ ...game, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event, gameId) => {
    event.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/games/${gameId}`,
        game
      );
      handleCloseModal();
      listGames();
    } catch (error) {
      console.error(error);
    }
  };

  // Gestion des inputs
  const handleInputChange = (e) => {
    setNewGame({ ...newGame, [e.target.name]: e.target.value });
  };

  // filtre de recherche
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGames = games.filter((ga) =>
    ga.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="total-home">
      <div className="title-home">
        <div className="logout-div">
          <button
            type="button"
            className="image-logout"
            onClick={handleLogout}
            onKeyDown={handleLogout}
          >
            <img
              src="/images/logout.png"
              alt="Se déconnecter"
              className="image-logout"
            />
          </button>
        </div>
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
              placeholder="..."
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
              placeholder="..."
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
              placeholder="..."
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
        <div className="filter-research">
          <div>
            <input
              className="input-search-games"
              type="text"
              placeholder="Rechercher un jeu"
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="container-games-personnal">
        {filteredGames.map((g) => (
          <div key={game.id} className="list-games">
            <div className="card-games">
              <div className="card-body">
                <div className="update">
                  <button
                    type="button"
                    className="image-update"
                    onClick={() => handleOpenModal(g)}
                  >
                    <img
                      src="/images/update.png"
                      alt="update"
                      className="image-update"
                    />
                  </button>

                  <Modal
                    className="modal-update"
                    isOpen={openModals[g.id]}
                    onRequestClose={handleCloseModal}
                  >
                    <form
                      onSubmit={(e) => {
                        handleSubmit(e, g.id);
                      }}
                    >
                      <input
                        name="name"
                        defaultValue={g.name}
                        onChange={handleGameChange}
                        required
                      />
                      <input
                        name="genre"
                        defaultValue={g.genre}
                        onChange={handleGameChange}
                        required
                      />
                      <input
                        name="platform"
                        defaultValue={g.platform}
                        onChange={handleGameChange}
                        required
                      />

                      <button type="submit">Mettre à jour</button>
                    </form>
                  </Modal>
                </div>
                <h5 className="card-title">{g.name}</h5>
                <p className="card-text">{g.platform}</p>
                <p className="card-text">{g.genre}</p>
                <p className="card-text">
                  {new Date(g.date).toLocaleDateString()}
                </p>
                <img className="image-games" alt="" width="200px" />
                <button
                  onClick={() => handleDeleteGames(g.id)}
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
