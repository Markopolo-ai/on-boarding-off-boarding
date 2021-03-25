import { Container, Header, Segment } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Container style={{ marginTop: "20em" }}>
      <Segment placeholder>
        <Header icon size="huge">
          Nothing Found!
        </Header>
      </Segment>
    </Container>
  );
};

export default NotFound;
