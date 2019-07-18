import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ItemsContainer from "../pages/Items";
import HomeContainer from "../pages/Home";
import ShareContainer from "../pages/Share";
import ProfileContainer from "../pages/Profile";

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Switch>
      {/**
       * @TODO: Define routes here for: /items, /profile, /profile/:userid, and /share
       *
       * Provide a wildcard redirect to /items for any undefined route using <Redirect />.
       *
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
      <Route exact path="/items" component={ItemsContainer} />
      <Route exact path="/welcome" component={HomeContainer} />
      <Route exact path="/share" component={ShareContainer} />
      <Route exact path="/profile" component={ProfileContainer} />
      <Route exact path="/profile/:userid" component={ProfileContainer} />
      <Redirect from="" to="/items" />
    </Switch>
  </Fragment>
);
