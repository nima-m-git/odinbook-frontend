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
  const [token, setToken] = useState(null);
  // const [errors, setErrors] = useState(null);
  // const [messages, setMessages] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.baseURL = process.env.REACT_APP_BE_URL;
  }, [token]);

  return (
    <div className="app">
      {!token ? (
        <Login {...{ setToken }} />
      ) : (
        <Switch>
          <HeaderNav {...{ setToken }} />
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
      )}
    </div>
  );
};

export { App };
