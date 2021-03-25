import { Segment, Sidebar } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";

import GetAccess from "./GetAccess";
import CancelAccess from "./CancelAccess";
import Home from "./Home";
import NotFound from "./NotFound";
import Navbar from "./Navbar"
// import Navbar from "./Navbar";

const MainContent = () => {
  return (
    
    <Sidebar.Pusher>
      <Navbar/>
      <Segment basic>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/get_access">
            <GetAccess />
          </Route>
          <Route path="/revoke_access">
            <CancelAccess />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Segment>
    </Sidebar.Pusher>
  );
};

export default MainContent;
