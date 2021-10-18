import React from "react";
import { Route, Switch, useLocation, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./dashboard/Dashboard";
import { Header } from "./common";
import PageNotFound from "./PageNotFound";
import { SocialInteractionList } from "./social-interaction";
import VisitedPlaceList from "./visited-place/VisitedPlaceList";
import TrackerNotificationContainer from "./dashboard/TrackerNotificationContainer";

function App() {
  return (
    <>
      <Header>
        <TrackerNotificationContainer />
      </Header>
      <div className="page-container">
        {useLocation().pathname !== "/" && (
          <div className="dashboard-link">
            <Link to="/">Back to Dashboard</Link>
          </div>
        )}
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/social-interactions" component={SocialInteractionList} />
          <Route path="/visited-places" component={VisitedPlaceList} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
}

export default App;
