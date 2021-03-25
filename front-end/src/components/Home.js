import { Link } from "react-router-dom";
import { Container, Header, Button } from "semantic-ui-react";

const Home = () => {
  return (
    <Container style={{ marginTop: "10em" }} textAlign='center' fluid>
  
          <Header color='blue' icon  style={{ fontSize: '50px', marginBottom: "30px" }}>
            Hi! Add & Revoke access to old users
          </Header>
          <Container>
          <Link to='/get_access'> 
          <Button size="small" type="submit" color='green' style={{ marginTop: "25px",maxWidth: "500px",width:"500px", fontSize: '20px' }} icon='location arrow'>
              Add Member To Organization
            </Button>
          </Link>
          </Container>
          <Container>
          <Link to='/revoke_access'> 
            <Button size="small" type="submit" color='red' style={{ marginTop: "25px",maxWidth: "500px",width:"500px", fontSize: '20px' }} icon='location arrow'>
                Revoke Access
              </Button></Link>

          </Container>
      </Container>
  );
};

export default Home;
