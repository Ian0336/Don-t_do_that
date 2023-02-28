import React from "react";
import {
  Message,
  Segment,
  Menu,
  Grid,
  Button,
  Card,
  Modal,
} from "semantic-ui-react";
import { MyheaderReady } from "../Myheader";

const Rank = () => {
  return (
    <Modal open={true}>
      <Modal.Content>
        <Card.Group centered>
          <Card>
            <Card.Content textAlign="center">
              <Card.Header>1</Card.Header>
              <Card.Header>Matthew Harris</Card.Header>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content textAlign="center">
              <Card.Header>2</Card.Header>
              <Card.Header content="Jake Smith" />
            </Card.Content>
          </Card>

          <Card>
            <Card.Content textAlign="center">
              <Card.Header>3</Card.Header>
              <Card.Header content="Elliot Baker" />
            </Card.Content>
          </Card>

          <Card>
            <Card.Content textAlign="center" header="Ian Baker" />
          </Card>
          <Card>
            <Card.Content textAlign="center" header="Ian Baker" />
          </Card>
        </Card.Group>
      </Modal.Content>
      <Modal.Actions>
        <Button positive>Ok</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Rank;
