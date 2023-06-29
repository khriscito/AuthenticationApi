import React, { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { UserContext } from "../layout.js";


const Private = () => {

const navigate= useNavigate()
const { store } = useContext(Context);


  const logout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };
console.log(store.token)

  return (
<div>
      {store.token ? (
        <>
        <p>Solo puedes ingresar si has iniciado sesión previamente</p>
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => history.push("/login")}
          >
            Regresar a registro
          </button>
        </>
      ) : (
        <div>
          <p>Ingresaste exitosamente al Dashboard</p>
          <button className="btn btn-danger" type="button" onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};




export default Private;
