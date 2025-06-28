import "./style.scss";

import Button from "../../UI/Button/Button";

const Form = ({ email, setEmail, pass, setPass, onSubmit, loading, error }) => {
  return (
    <div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Pseudo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="password"
          placeholder="Mot de passe"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}
      <Button
        onClick={onSubmit}
        disabled={loading}
        className="btn-dev"
        type="button"
      >
        {loading ? "Connexion..." : "Connexion"}
      </Button>
    </div>
  );
};

export default Form;
