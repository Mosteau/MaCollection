import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from "react-modal";

function Createaccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const naviguate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        {
          firstname: firstName,
          lastname: lastName,
          email,
          password,
        }
      );
      if (res.status === 201) {
        setUser(res.data.user);
        setIsModalOpen(true);
      } else {
        console.error("Erreur lors de la création du compte");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="total-page-account">
      <div className="back-to-connexion">
        <NavLink to="/">
          <button type="button">
            <img src="../../images/back.png" alt="back" />
          </button>
        </NavLink>
      </div>
      <div className="title">
        <h1>Créer ton compte</h1>
      </div>
      <div className="form-create-account">
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="firstname">Nom</label>
            <input
              type="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
              id="firstname"
              placeholder="nom"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lasname">Prénom</label>
            <input
              type="lasname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              id="lasname"
              placeholder="prénom"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Ton adresse mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="mail"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Un mot de passe solide</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              id="password"
              placeholder="mot de passe"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer ton mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-control"
              id="confirmPassword"
              placeholder="mot de passe"
              required
            />
          </div>
          <button type="submit" className="button-create-account">
            Créer un compte
          </button>
        </form>
      </div>
      <div className="modal">
        <Modal
          className="modal-create-account"
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Compte créé"
        >
          <h2>Compte créé</h2>
          <p>
            Votre compte a été créé avec succès. Vous pouvez maintenant vous
            connecter.
          </p>
          <button
            className="button-create-account"
            type="button"
            onClick={() => {
              setIsModalOpen(false);
              naviguate("/");
            }}
          >
            Se connecter
          </button>
        </Modal>
      </div>
    </div>
  );
}

export default Createaccount;
