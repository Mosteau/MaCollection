import { NavLink } from "react-router-dom";

function Createaccount() {
  return (
    <div className="total-page-account">
      <div className="title">
        <h1>Créer ton compte</h1>
      </div>
      <div className="form-create-account">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Ton adresse mail</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              placeholder="mail"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">
              Un mot de passe solide
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="mot de passe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">
              Confirmer ton mot de passe
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="mot de passe"
            />
          </div>
          <NavLink to="/Home">
            <button type="submit" className="button-create-account">
              Créer un compte
            </button>
          </NavLink>
        </form>
      </div>
    </div>
  );
}

export default Createaccount;
