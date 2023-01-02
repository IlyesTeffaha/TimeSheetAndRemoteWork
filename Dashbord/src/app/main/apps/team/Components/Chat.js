import React, { useState, useEffect } from "react";
import "../Chat.css";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "backendtimeline.herokuapp.com/";

export default function Chat() {
  //before login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  //after login states
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  //initialize socket
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  //
  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  //function to connect  when clickin the button
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  //
  const sendMessage = () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };
    socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };
  return (
    <div className="Chat">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.author == userName ? "You" : "Other"}
                >
                  <div className="messageIndividual">
                    {val.author}: {val.message}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
