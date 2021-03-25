import { BrowserRouter as Router, Link } from "react-router-dom";
import MainContent from "./components/MainContent";

import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

function App() {
  return (
    <>
      <Router>
        <Sidebar.Pushable as={Segment} style={{ height: "100vh" }}>
          <Sidebar
            as={Menu}
            animation="overlay"
            icon="labeled"
            inverted
            vertical
            visible
            width="thin"
            style={{ paddingTop: "15%" }}
          >
            <Link to="/">
              <Menu.Item as="a" style={{marginBottom: "50px"}}>
                <Icon name="home" />
                Home
              </Menu.Item>
            </Link>
            <Link to="/get_access">
              <Menu.Item as="a" style={{marginBottom: "50px"}}>
                <Icon name="plus square outline" />
                Get Access
              </Menu.Item>
            </Link>
            <Link to="/revoke_access" style={{marginBottom: "30px"}}>
              <Menu.Item as="a">
                <Icon name="trash" />
                Revoke Access
              </Menu.Item>
            </Link>
          </Sidebar>

          <MainContent />
        </Sidebar.Pushable>
      </Router>
    </>
  );
}

export default App;
