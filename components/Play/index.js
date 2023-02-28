import React, { useEffect, useState } from "react";
import {
  Sticky,
  Modal,
  Menu,
  Icon,
  Button,
  Card,
  Message,
} from "semantic-ui-react";
import { Myheader } from "../Myheader";
import { firebaseApp, db } from "../../firebase/firebase.js";
import { updateDoc, doc, collection } from "firebase/firestore";

const Play = (props) => {
  /* const [data, setData] = useState(props.data); */
  const [updataNum, setUpdataNum] = useState(0);

  async function init() {
    let questions = [];
    let now = "";
    Object.keys(props.data.people).forEach((person) => {
      if (person !== props.name) {
        questions.push(props.data.people[person].others_question[props.name]);
      }
    });
    now = questions.pop();
    console.log(questions);
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people: {
        ...props.data.people,
        [props.name]: {
          ...props.data.people[props.name],
          ready: false,
          ans_right_num: 0,
          now_question: `${now}`,
          own_question: questions,
          pass_question: [],
        },
      },
    });
  }
  async function update(cor) {
    let pass = props.data.people[props.name].pass_question;
    pass.push(props.data.people[props.name].now_question);
    let questions = props.data.people[props.name].own_question;
    let now = "";
    let flag = false;
    if (Object.keys(props.data.people[props.name].own_question).length > 0)
      now = questions.pop();
    else flag = true;
    console.log(flag);
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      check_num: flag ? props.data.check_num + 1 : props.data.check_num,
      people: {
        ...props.data.people,
        [props.name]: {
          ...props.data.people[props.name],
          now_question: `${now}`,
          ready: flag,
          own_question: questions,
          pass_question: pass,
          ans_right_num: cor
            ? props.data.people[props.name].ans_right_num + 1
            : props.data.people[props.name].ans_right_num,
        },
      },
    });
  }
  async function changeState() {
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      state: "ready",
      check_num: 0,
      init_flag: true,
    });
    console.log("ffdfd");
  }
  async function changeInit() {
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      init_flag: false,
    });
    console.log("ffdfd");
  }

  useEffect(() => {
    if (props.data.init_flag) {
      init();
      let flag = true;
      Object.keys(props.data.people).forEach((person) => {
        console.log(props.data.people[person].now_question);
        if (props.data.people[person].now_question === "") flag = false;
      });
      if (flag) changeInit();
    }
    if (props.data.check_num >= props.data.fail_num) changeState();

    return () => {};
  }, [props.data]);
  return (
    <div style={{ height: "100vh", backgroundColor: "#BEBEBE" }}>
      <Myheader
        owner={props.data.owner}
        data={props.data}
        RoomId={props.RoomId}
        name={props.name}
      ></Myheader>
      <Card.Group centered>
        {Object.keys(props.data.people)
          .sort()
          .map((person) =>
            person !== props.name ? (
              <Card id={person}>
                <Card.Content textAlign="center">
                  <Card.Header>{person}</Card.Header>
                  <Card.Meta>{`${
                    Object.keys(props.data.people[person].pass_question).length
                  }/${
                    props.data.people[person].now_question === ""
                      ? 0 +
                        Object.keys(props.data.people[person].pass_question)
                          .length +
                        Object.keys(props.data.people[person].own_question)
                          .length
                      : 1 +
                        Object.keys(props.data.people[person].pass_question)
                          .length +
                        Object.keys(props.data.people[person].own_question)
                          .length
                  }`}</Card.Meta>
                  <Card.Meta>{`答對: ${props.data.people[person].ans_right_num}`}</Card.Meta>
                  <Card.Description>
                    <Message>{`${props.data.people[person].now_question}`}</Message>
                  </Card.Description>
                </Card.Content>
              </Card>
            ) : (
              <></>
            )
          )}
      </Card.Group>

      {/* 墊位子 */}
      <Menu color="grey" inverted style={{ visibility: "hidden" }}>
        <Menu.Item>
          <Button primary>Sign up</Button>
        </Menu.Item>
        <Menu.Item
          content={`${
            Object.keys(props.data.people[props.name].pass_question).length
          }/${
            Object.keys(props.data.people[props.name].pass_question).length +
              Object.keys(props.data.people[props.name].own_question).length +
              props.data.people[props.name].now_question ===
            ""
              ? 0
              : 1
          }`}
        ></Menu.Item>
        <Menu.Item
          content={`答對: ${props.data.people[props.name].ans_right_num}`}
          position="right"
        ></Menu.Item>
        <Menu.Item position="right">
          <Button>Log-in</Button>
        </Menu.Item>
      </Menu>
      {/* 墊位子 */}

      <Menu
        fixed="bottom"
        color="grey"
        inverted
        style={{ opacity: props.data.people[props.name].ready ? "0.6" : "1" }}
      >
        <Menu.Item>
          <Button
            size="mini"
            color="green"
            disabled={props.data.people[props.name].ready ? true : false}
            onClick={() => {
              setUpdataNum(1);
            }}
          >
            <Icon name="circle outline" iconPosition="right" size="mini" />
          </Button>
        </Menu.Item>
        <Menu.Item
          content={`${
            Object.keys(props.data.people[props.name].pass_question).length
          }/${
            props.data.people[props.name].now_question === ""
              ? 0 +
                Object.keys(props.data.people[props.name].pass_question)
                  .length +
                Object.keys(props.data.people[props.name].own_question).length
              : 1 +
                Object.keys(props.data.people[props.name].pass_question)
                  .length +
                Object.keys(props.data.people[props.name].own_question).length
          }`}
        ></Menu.Item>
        <Menu.Item
          content={`答對: ${props.data.people[props.name].ans_right_num}`}
          position="right"
        ></Menu.Item>
        <Menu.Item position="right">
          <Button
            size="mini"
            color="red"
            disabled={props.data.people[props.name].ready ? true : false}
            onClick={() => {
              setUpdataNum(2);
            }}
          >
            <Icon name="close" iconPosition="right" size="mini" />
          </Button>
        </Menu.Item>
      </Menu>
      <Modal
        closeIcon
        open={updataNum > 0}
        onClose={() => {
          if (updataNum === 1) {
            update(true);
          }
          if (updataNum === 2) {
            update(false);
          }
          setUpdataNum(0);
        }}
      >
        <Modal.Content>
          <Modal.Description>
            {`${props.data.people[props.name].now_question}`}
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Play;
