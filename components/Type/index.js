import React, { useEffect, useState } from "react";
import {
  Form,
  Confirm,
  Input,
  Grid,
  Button,
  Card,
  Modal,
} from "semantic-ui-react";
import { Myheader } from "../Myheader";
import { firebaseApp, db } from "../../firebase/firebase.js";
import { updateDoc, doc, collection } from "firebase/firestore";

const Type = (props) => {
  const [noEmpty, setNoEmpty] = useState(false);
  const [othersQuestion, setOthersQuestion] = useState({});

  async function resetReady() {
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people: {
        ...props.data.people,
        [props.name]: {
          ...props.data.people[props.name],
          ready: false,
        },
      },
    });
  }
  async function changeState() {
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      state: "play",
      check_num: 0,
    });
    console.log("ffdfd");
  }
  async function getReady(readyOrNot) {
    console.log(readyOrNot);
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people: {
        ...props.data.people,
        [props.name]: {
          ...props.data.people[props.name],
          ready: readyOrNot ? false : true,
          others_question: { ...othersQuestion },
        },
      },
    });
    let num = 0;
    Object.keys(props.data.people).forEach((person) => {
      if (props.data.people[person].ready) num += 1;
    });
    if (readyOrNot) num -= 1;
    else num += 1;
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      check_num: num,
    });
  }

  useEffect(() => {
    if (Object.keys(othersQuestion).length === 0) resetReady();
    return () => {};
  }, [props.data]);
  console.log(othersQuestion);
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
                  <Card.Description>
                    <Input
                      label={{ icon: "asterisk" }}
                      labelPosition="left corner"
                      placeholder="輸入題目"
                      disabled={
                        props.data.people[props.name].ready ? true : false
                      }
                      onChange={(e) =>
                        setOthersQuestion({
                          ...othersQuestion,
                          [`${person}`]: `${e.target.value}`,
                        })
                      }
                      defaultValue={
                        typeof othersQuestion[person] == "undefined"
                          ? ""
                          : `${othersQuestion[person]}`
                      }
                    />
                  </Card.Description>
                </Card.Content>
              </Card>
            ) : (
              <></>
            )
          )}
      </Card.Group>
      <Grid textAlign="center">
        <Grid.Column width={6}>
          {props.name === props.data.owner &&
          props.data.check_num === props.data.people_num ? (
            <Button color="grey" size="big" onClick={() => changeState()}>
              開始
            </Button>
          ) : (
            <Button
              color="grey"
              size="big"
              onClick={() => {
                let flag = true;
                Object.values(othersQuestion).forEach((ques) => {
                  if (ques === "") flag = false;
                });
                console.log(Object.keys(othersQuestion).length);
                if (
                  Object.keys(othersQuestion).length !==
                  props.data.people_num - 1
                )
                  flag = false;
                if (flag) getReady(props.data.people[props.name].ready);
                else setNoEmpty(true);
              }}
            >
              {props.data.people[props.name].ready ? "取消" : "準備"}
            </Button>
          )}
        </Grid.Column>
      </Grid>
      <Confirm
        open={noEmpty}
        content="句子不能是空白"
        onCancel={() => setNoEmpty(false)}
        onConfirm={() => setNoEmpty(false)}
      />
    </div>
  );
};

export default Type;
