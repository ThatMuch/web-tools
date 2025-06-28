import "./style.scss";

import Button from "../../UI/Button/Button";

const Form = ({
  pseudo,
  setPseudo,
  pass,
  setPass,
  onSubmit,
  loading,

  error,
}) => {
  return (
    <div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="Pseudo"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
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

      {error && <p className="error-message">{error}</p>}
      <Button
        onClick={onSubmit}
        disabled={loading}
        label={loading ? "Connexion..." : "Connexion"}
        className="btn-dev"
        type="button"
      >
        {loading ? "Connexion..." : "Connexion"}
      </Button>
    </div>
  );
};

export default Form;
