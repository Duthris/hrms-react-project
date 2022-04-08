import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

import "./css/NotFound.css";

const PageNotFound = () => {
  return (
    <Router>
      <Switch>
        <div id="notfound">
          <div class="notfound">
            <div class="notfound-404">
              <div></div>
              <h1>404</h1>
            </div>
            <h2>Page not found</h2>
            <p>We're sorry, The page you are looking for could not be found.</p>
            <p></p>
            <a href="/">Back to Home</a>
          </div>
        </div>
      </Switch>
    </Router>
  );
};

export default PageNotFound;
