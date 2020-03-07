import React from 'react';
import "materialize-css";
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";
import {useAuth} from "./hooks/auth.hook";
import {NavBar} from "./components/Navbar";
import {Loader} from "./components/Loader";

function App() {
  const {login, logout, token, userId, ready} = useAuth();
  const isLogin = !!token;
  const routes = useRoutes(isLogin);

  if(!ready){
    return (
      <Loader></Loader>
    );
  }

  return (
      <AuthContext.Provider value={{
        login, logout, token, userId, isLogin
      }}>
        <Router>
          {isLogin && <NavBar />}
          <div className="container">
            {routes}
          </div>
        </Router>
      </AuthContext.Provider>
  );
}

export default App;
