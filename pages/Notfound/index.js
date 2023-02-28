import React, { useEffect, useState } from "react";
import {
  Form,
  Segment,
  Header,
  Icon,
  Button,
  Image,
  Message,
  Modal,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { firebaseApp, db } from "../../firebase/firebase.js";
import { addDoc, onSnapshot, collection } from "firebase/firestore";

const Notfound = (props) => {
  const navigate = useNavigate();

  return (
    <Modal
      closeIcon
      open={true}
      trigger={<Button>Show Modal</Button>}
      onClose={() => navigate("/")}
    >
      <Header icon="archive" content="找不到房間" />
      <Modal.Content>
        <p>已刪除，或在遊戲中</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={() => navigate("/")}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default Notfound;
