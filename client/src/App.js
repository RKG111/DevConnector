import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Alert from "./components/layout/Alert";
import CreateProfile from "./components/profile-forms/CreateProfile";
import PrivateRoute from "./components/routing/PrivateRoute";
//redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route
                exact
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                  
                }
              ><Route exact path="/dashboard" element={<Dashboard />} /></Route>
            
            <Route
                exact
                path="/create-profile"
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                  
                }
              ><Route exact path="/create-profile" element={<CreateProfile />} /></Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
