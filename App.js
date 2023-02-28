import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import Room from "./pages/Room";
import Create from "./pages/Create";
import Notfound from "./pages/Notfound";
import { firebaseApp } from "./firebase/firebase.js";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [name, setName] = useState("");
  const db = getFirestore(firebaseApp);
  const [room_list, setRoom_list] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Rooms"), (querySnapshot) => {
      let tmp_list = [];
      querySnapshot.forEach((doc) => {
        tmp_list.push(
          <Route
            key={`${doc.id}`}
            path={`/${doc.id}`}
            element={<Room idx={doc.id} name={name} />}
          />
        );
      });

      setRoom_list(tmp_list);
    });
    return () => {};
  }, [name, db]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Create setName={setName} name={name} />} />
        {room_list}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
