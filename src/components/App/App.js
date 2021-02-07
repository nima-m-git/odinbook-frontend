import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import {
  PostIndex,
  Login,
  HeaderNav,
  UserIndex,
  UserPage,
  PostPage,
} from "../index";
import "./App.scss";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [token, setToken] = useState(null);
  // const [errors, setErrors] = useState(null);
  // const [messages, setMessages] = useState(null);

  const setHeaders = (token) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setLoggedIn(true);
  };

  useEffect(() => {
    // axios.defaults.baseURL = process.env.REACT_APP_BE_URL;
    axios.defaults.baseURL = process.env.REACT_APP_BE_URL;
  }, []);

  return (
    <div className="app">
      {!loggedIn ? (
        <Login {...{ setHeaders }} />
      ) : (
        <div>
          <HeaderNav logout={() => setLoggedIn(false)} />
          <div className="container">
            <Switch>
              <Route path={["/", "/posts"]} exact>
                <PostIndex />
              </Route>
              <Route path="/posts/:postId">
                <PostPage />
              </Route>
              <Route path="/users" exact>
                <UserIndex />
              </Route>
              <Route path="/users/:userId">
                <UserPage />
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </div>
  );
};

export { App };
