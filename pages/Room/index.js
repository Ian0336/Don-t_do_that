import Ready from "../../components/Ready";
import Type from "../../components/Type";
import { useNavigate } from "react-router-dom";
import Play from "../../components/Play";
import Rank from "../../components/Rank";
import Notfound from "../Notfound";
import React, { useEffect, useState, useMemo } from "react";
import { db } from "../../firebase/firebase.js";
import {
  getFirestore,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Room = (props) => {
  const [name, setName] = useState(props.name);
  const [checkOnLine, setcheckOnLine] = useState(false);
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState({
    check_num: 1,
    fail_num: 1,
    owner: `${name}`,
    people_num: 1,
    state: "ready",
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

  async function deletRoom() {
    const db = getFirestore();
    await deleteDoc(doc(db, "Rooms", `${props.idx}`));
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "Rooms", `${props.idx}`), (doc) => {
      setRoomData(doc.data());
    });

    return () => {};
  }, [props.idx]);
  useEffect(() => {
    let flag = true;
    let flag2 = true;
    Object.keys(roomData.people).forEach((person) => {
      if (person === name && name !== "") flag = false;
      if (person === roomData.owner) flag2 = false;
    });

    if (!flag) setcheckOnLine(true);
    if (flag && checkOnLine) {
      navigate("/");
    }
    console.log(flag2);
    if (flag2) {
      console.log("dsds");
      deletRoom();
      navigate("/");
    }
    return () => {};
  }, [roomData]);
  return (
    <>
      {roomData.state === "ready" ? (
        <Ready
          name={name}
          data={roomData}
          setName={setName}
          RoomId={props.idx}
        ></Ready>
      ) : roomData.state === "type" && name !== "" ? (
        <Type
          name={name}
          data={roomData}
          setName={setName}
          RoomId={props.idx}
        ></Type>
      ) : roomData.state === "play" && name !== "" ? (
        <Play
          name={name}
          data={roomData}
          setName={setName}
          RoomId={props.idx}
        ></Play>
      ) : (
        <Notfound></Notfound>
      )}
    </>
  );
};

export default Room;
