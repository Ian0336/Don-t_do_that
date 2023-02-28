import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Dropdown,
  Grid,
  Button,
  Card,
  Popup,
  Message,
  Icon,
} from "semantic-ui-react";
import { MyheaderReady } from "../Myheader";
import { firebaseApp, db } from "../../firebase/firebase.js";
import { updateDoc, doc, collection } from "firebase/firestore";

const Ready = (props) => {
  const [fail_list, setFail_list] = useState([]);
  const [input_name, setInput_name] = useState("");
  const [data, setData] = useState(props.data);
  const [popup, setPopup] = useState(false);

  async function changeState() {
    /* let  keys = Object.keys( data.people );
    for (let i = 0 ; i < data.people_num; i+=1){
      await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
        people: {
          ...data.people,
          [keys[i]]: {
            ...data.people[keys[i]],
            ready: false,
          },
        },
      });
      console.log(keys[i]);
    } */

    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      state: "type",
      check_num: 0,
      init_flag: true,
    });
  }

  async function changeFailNum(newNum) {
    console.log(newNum);
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      fail_num: newNum,
    });
  }
  async function getReady(readyOrNot) {
    console.log(readyOrNot);
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people: {
        ...data.people,
        [props.name]: {
          ...data.people[props.name],
          ready: readyOrNot ? false : true,
          now_question: "",
          own_question: [],
          pass_question: [],
        },
      },
    });
    let num = 0;
    Object.keys(data.people).forEach((person) => {
      if (data.people[person].ready) num += 1;
    });
    if (readyOrNot) num -= 1;
    else num += 1;
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      check_num: num,
      init_flag: false,
    });
  }
  async function addPerson() {
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people: {
        ...data.people,
        [input_name]: {
          ans_right_num: 0,
          now_question: "",
          own_question: [],
          pass_question: [],
          ready: false,
        },
      },
    });
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people_num: data.people_num + 1,
    });
  }

  async function deletPerson(name) {
    console.log(name);
    let tmp_people = { ...data.people };
    delete tmp_people[`${name}`];
    console.log(tmp_people);

    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people: {
        ...tmp_people,
      },
    });
    await updateDoc(doc(db, "Rooms", `${props.RoomId}`), {
      people_num: data.people_num - 1,
    });
  }
  async function init() {
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

  useEffect(() => {
    setData(props.data);
    let tmp = [];
    for (let i = 1; i <= data.people_num; i++) {
      tmp.push({ key: `${i}`, text: `${i}`, value: i });
    }
    setFail_list(tmp);
    if (props.data.init_flag) {
      init();
    }
    return () => {};
  }, [data, props.data]);
  useEffect(() => {
    if (props.name === "") {
      setPopup(true);
    } else {
      setPopup(false);
    }
  }, [props.name]);
  console.log();
  return (
    <div style={{ height: "100vh", backgroundColor: "#BEBEBE" }}>
      <MyheaderReady
        owner={data.owner}
        data={props.data}
        RoomId={props.RoomId}
        name={props.name}
      ></MyheaderReady>
      <Grid textAlign="center">
        <Grid.Column width={5}>
          {console.log(data.fail_num)}
          <Dropdown
            header="淘汰人數"
            placeholder="淘汰人數"
            fluid
            selection
            defaultValue={`${data.fail_num}`}
            disabled={props.name !== data.owner}
            options={fail_list}
            onChange={(e, d) => {
              console.log(d.value);
              changeFailNum(d.value);
            }}
          />
          <Message
            header="本局淘汰人數"
            content={`${data.fail_num}人`}
            size="mini"
          />
        </Grid.Column>
      </Grid>

      <Card.Group centered>
        {Object.keys(data.people).map((person) => (
          <Popup
            content="Hello"
            on="click"
            trigger={
              <Card id={person}>
                <Card.Content
                  textAlign="center"
                  style={{
                    backgroundColor: data.people[person].ready ? "#CEFFCE" : "",
                  }}
                >
                  <Card.Header>{person}</Card.Header>
                </Card.Content>
              </Card>
            }
          >
            {person !== data.owner && person !== props.name ? (
              <>
                <Popup.Header>踢掉</Popup.Header>
                <Popup.Content>
                  <Button
                    icon
                    color="red"
                    onClick={() => {
                      deletPerson(person);
                    }}
                  >
                    <Icon name="close" />
                  </Button>
                </Popup.Content>
              </>
            ) : (
              <></>
            )}
          </Popup>
        ))}
      </Card.Group>
      <Grid textAlign="center">
        <Grid.Column width={6}>
          {Object.keys(data.people).map((person) =>
            props.name === person ? (
              props.name === data.owner &&
              data.check_num === data.people_num ? (
                <Button color="grey" size="big" onClick={() => changeState()}>
                  開始
                </Button>
              ) : (
                <Button
                  color="grey"
                  size="big"
                  onClick={() => {
                    getReady(data.people[person].ready);
                  }}
                >
                  {data.people[person].ready ? "取消" : "準備"}
                </Button>
              )
            ) : (
              <></>
            )
          )}
        </Grid.Column>
      </Grid>
      <Modal open={popup}>
        <Modal.Content image>
          <Modal.Description>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="你的暱稱"
              onChange={(e) => setInput_name(`${e.target.value}`)}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Popup
            trigger={
              <Button
                onClick={() => {
                  let flag = true;
                  if (input_name !== "") {
                    Object.keys(data.people).forEach((person) => {
                      if (person === input_name) flag = false;
                    });
                    console.log(flag);
                    if (flag === true) {
                      setPopup(false);
                      props.setName(input_name);
                      addPerson();
                    }
                  }
                }}
                positive
              >
                Ok
              </Button>
            }
            content={"暱稱重複或未填"}
            on="click"
            position="top right"
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Ready;
