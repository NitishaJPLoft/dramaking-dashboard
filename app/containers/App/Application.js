import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import {
  Parent,
  DashboardPage,
  BlankPage,
  Error,
  NotFound,
  UserList,
  VideoList,
  UserProfile,
  UserSearch,
  UserVideoList,
  MusicList,
  UserDocsList,
  AddMusic,
  AddCrown,
  PaymentHistory,
  CrownList
} from '../pageListAsync';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(ThemeContext);
  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        <Route exact path="/app" component={BlankPage} />
        <Route path="/app/dashboard" exact component={DashboardPage} />
        <Route path="/app/videos" exact component={VideoList} />
        <Route path="/app/search" exact component={UserSearch} />
        <Route path="/app/search/:user" exact component={UserSearch} />
        <Route path="/app/users" exact component={UserList} />
        <Route path="/app/crowns" exact component={CrownList} />
        <Route path="/app/music" exact component={MusicList} />
        <Route path="/app/music/create" exact component={AddMusic} />
        <Route path="/app/crown/create" exact component={AddCrown} />
        <Route path="/app/payment-history" exact component={PaymentHistory} />

        <Route
          path="/app/users/profile"
          exact
          component={UserProfile}
        />

        <Route
          path="/app/user/:id/videos"
          exact
          component={UserVideoList}
        />

        <Route
          path="/app/user/:id/docs"
          exact
          component={UserDocsList}
        />

        <Route path="/app/settings" exact component={UserProfile} />
        <Route path="/app/page-list" component={Parent} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Application;
