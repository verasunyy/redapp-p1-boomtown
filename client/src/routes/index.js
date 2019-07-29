import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import ItemsContainer from "../pages/Items";
import HomeContainer from "../pages/Home";
import ShareContainer from "../pages/Share";
import ProfileContainer from "../pages/Profile";
import { ViewerContext } from "../context/ViewerProvider";
import FullScreenLoader from '../components/FullScreenLoader';
import PRoute from "../components/PrivateRoute";
import MenuBar from "../components/MenuBar";
export default () => (
  <ViewerContext.Consumer>
    {({ viewer, loading }) => {
      if (loading) return <FullScreenLoader />;
      if (!viewer) {
        return (
          <Switch>
            <Route exact path="/welcome" component={HomeContainer} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        );
      }
      return (
        <Fragment>
          <MenuBar />
          <Switch>
            <PRoute exact path="/items" component={ItemsContainer} />
            <PRoute exact path="/share" component={ShareContainer} />
            <PRoute exact path="/profile" component={ProfileContainer} />
            <PRoute exact path="/profile/:userId" component={ProfileContainer} />
            <Redirect from="*" to="/items" />
          </Switch>
        </Fragment>
      );

    }}
  </ViewerContext.Consumer>
)
