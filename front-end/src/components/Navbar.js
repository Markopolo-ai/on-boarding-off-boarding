import { Menu, Segment } from "semantic-ui-react";
import { IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  return (
    <Segment inverted style={{ borderRadius: "0" }}>
      <Menu inverted secondary>
        <Menu.Item position="right">
          <IoMdLogOut style={{ fontSize: "30px", cursor: "pointer" }} />
        </Menu.Item>
      </Menu>
    </Segment>
  );
};

export default Navbar;
