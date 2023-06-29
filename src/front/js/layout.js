import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";
import { createContext, useState } from "react";
import SignUp from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx"
import Private from "./pages/Private.jsx"
export const UserContext = createContext();
import Profile from "./pages/Profile.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/>;

    const [user, setUser] = useState({
        email: "",
        password: "",
      });
    
      const handleChangeContext = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
      };
    
      const contextValue = {
        usuario: user,
        funcionContexto: handleChangeContext,
      };

    return (
        <div>
          <UserContext.Provider value={contextValue}>
            <BrowserRouter basename={basename}>
                    <Routes>
                        <Route element={<SignUp />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Private />} path="/private" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
            </BrowserRouter>
          </UserContext.Provider>
        </div>
    );
};

export default injectContext(Layout);
