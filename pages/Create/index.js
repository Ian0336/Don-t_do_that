import React, { useEffect, useState } from "react";
import {
  Form,
  Segment,
  Header,
  Grid,
  Button,
  Image,
  Message,
  Modal,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { firebaseApp, db } from "../../firebase/firebase.js";
import { addDoc, onSnapshot, collection } from "firebase/firestore";

async function createRoom(name) {
  let docRef = await addDoc(collection(db, "Rooms"), {
    check_num: 0,
    fail_num: 1,
    owner: `${name}`,
    people_num: 1,
    state: "ready",
    init_flag: true,
    people: {
      [name]: {
        ans_right_num: 0,
        now_question: "",
        own_question: [],
        pass_question: [],
        ready: false,
      },
    },
  });
  console.log(docRef.id);
  return docRef.id;
}
const Play = (props) => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", backgroundColor: "#BEBEBE" }}
      verticalAlign="top"
    >
      <Grid.Column style={{ width: "98vw" }}>
        <Header as="h2" color="teal" textAlign="center">
          <Message
            style={{
              borderRadius: "10px",
            }}
          >
            不要......
          </Message>
        </Header>
        <Form size="large">
          <Segment
            stacked
            style={{ backgroundColor: "#5B5B5B", borderRadius: "10px" }}
          >
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="你的暱稱"
              onChange={(e) => props.setName(`${e.target.value}`)}
            />
            <Button
              basic
              inverted
              color="olive"
              onClick={() => {
                if (props.name === "") {
                  setPopup(true);
                  return;
                } else {
                  createRoom(props.name).then(function (result) {
                    console.log(result);
                    navigate(`/${result}`);
                  });
                }
              }}
            >
              創建房間
            </Button>
          </Segment>
        </Form>
        <Message>
          Have Problems? <a href="https://www.facebook.com/jhang.yuyi">here</a>
        </Message>
      </Grid.Column>
      <Modal onClose={() => setPopup(false)} open={popup}>
        <Modal.Content image>
          <Modal.Description>
            <p>請輸入暱稱</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setPopup(false)} positive>
            Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
};

export default Play;
