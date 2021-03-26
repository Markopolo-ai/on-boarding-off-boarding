import React from "react";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import MainContent from "./MainContent";
import { BrowserRouter as Router, Link } from "react-router-dom";

const SideNav = () => (
  <Sidebar.Pushable as={Segment} style={{ height: "100vh", width: "10vh"  }}>
    <Router>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
        style={{ paddingTop: "5%", width: "10px" }}
      >
        <Menu.Item as="a" style={{marginBottom: "80px"}}>
          <Icon name="home" />
          <Link to="/"> </Link>
        </Menu.Item>
        <Link to="/get_access"> 
        <Menu.Item as="a">
          <Icon name="plus square outline" />
          
        </Menu.Item>
        </Link>
        <Link to="/revoke_access">
        <Menu.Item as="a">
          <Icon name="trash" />
           
        </Menu.Item>
        </Link>
      </Sidebar>
    </Router>
    <MainContent />
  </Sidebar.Pushable>
);

export default SideNav;
