import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Login({ onAuthenticationSuccess }) {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3005/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, contraseña }),
      });

      if (response.ok) {
        // Autenticación exitosa, redirige al Dashboard
        onAuthenticationSuccess();
        navigate("/Login/Dashboard");
      } else {
        // Autenticación fallida, muestra un mensaje de error
        console.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <>
      <div>
        <h1>BIENVENIDOS AL AUTENTICADOR</h1>
      </div>
      <div className="containeringresar">
        <form>
          <div>
            <label>Usuario:</label>
            <input
              type="text"
              placeholder="Usuario"
              value={usuario}
              onChange={(event) => setUsuario(event.target.value)}
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(event) => setContraseña(event.target.value)}
            />
          </div>
          <div className="buttoningresar">
            <button
              className="buttoningresar1"
              type="button"
              onClick={handleLogin}
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

Login.propTypes = {
  onAuthenticationSuccess: PropTypes.func.isRequired,
};

export default Login;
