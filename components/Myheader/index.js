import React from "react";
import {
  Form,
  Label,
  Menu,
  Icon,
  Button,
  Popup,
  Message,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { firebaseApp, db } from "../../firebase/firebase.js";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";

const MyheaderReady = (props) => {
  const navigate = useNavigate();

  async function deletRoom() {
    await deleteDoc(doc(db, "Rooms", `${props.RoomId}`));
  }
  async function deletPerson() {
    console.log(props.name);
    let tmp_people = { ...props.data.people };
    delete tmp_people[`${props.name}`];
    console.log(tmp_people);

    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people: {
        ...tmp_people,
      },
    });
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people_num: props.data.people_num - 1,
    });
  }

  return (
    <Menu color="grey" inverted widths={3}>
      <Menu.Item>
        <Message
          style={{
            borderRadius: "10px",
          }}
          size="mini"
        >
          不要
        </Message>
      </Menu.Item>

      <Menu.Item>
        <Popup
          content="已複製!"
          on="click"
          trigger={
            <Button
              as="div"
              labelPosition="left"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
            >
              <Label>{props.owner}的房間</Label>
              <Button
                icon
                /* onClick={navigator.clipboard.writeText("event.target.e")} */
              >
                <Icon name="fork" />
              </Button>
            </Button>
          }
        />
      </Menu.Item>
      <Menu.Item position="right">
        <Button
          color="red"
          size="mini"
          onClick={() => {
            deletPerson();
            navigate("/");
            if (props.name === props.owner) deletRoom();
          }}
        >
          <span style={{ fontSize: "10" }}>退出</span>
        </Button>
      </Menu.Item>
    </Menu>
  );
};

const Myheader = (props) => {
  const navigate = useNavigate();
  async function deletRoom() {
    await deleteDoc(doc(db, "Rooms", `${props.RoomId}`));
  }
  async function deletPerson() {
    console.log(props.name);
    let tmp_people = { ...props.data.people };
    delete tmp_people[`${props.name}`];
    console.log(tmp_people);

    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people: {
        ...tmp_people,
      },
    });
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people_num: props.data.people_num - 1,
    });
  }
  return (
    <Menu color="grey" inverted widths={4}>
      <Menu.Item>
        <Message
          style={{
            borderRadius: "10px",
          }}
          size="mini"
        >
          不要
        </Message>
      </Menu.Item>
      <Menu.Item
        content={`${props.data.state === "type" ? "準備" : "淘汰"}:${
          props.data.check_num
        }/${
          props.data.state === "type"
            ? props.data.people_num
            : props.data.fail_num
        }`}
      ></Menu.Item>
      <Menu.Item content={`${props.owner}的房間`} position="right"></Menu.Item>
      <Menu.Item position="right">
        <Button
          color="red"
          size="mini"
          onClick={() => {
            deletPerson();
            navigate("/");
            if (props.name === props.owner) deletRoom();
          }}
        >
          <span style={{ fontSize: "10" }}>退出</span>
        </Button>
      </Menu.Item>
    </Menu>
  );
};

export { Myheader, MyheaderReady };
