import {
  collection,
  query,
  orderBy,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import classes from "./ChatLayout.module.css";
import Message from "../Message/Message";
import Send from "../Send/Send";
import { useEffect, useRef } from "react";

// const message = [
//   {
//     id: "1",
//     user: "a",
//     text: "Hi",
//     timestamp: 1675664748253,
//   },
//   {
//     id: "2",
//     user: "b",
//     text: "Hi",
//     timestamp: 1675664776213,
//   },
//   {
//     id: "3",
//     user: "c",
//     text: "Hi",
//     timestamp: 1675664784663,
//   },
//   {
//     id: "4",
//     user: "d",
//     text: "Hi",
//     timestamp: 1675664796676,
//   },
//   {
//     id: "5",
//     user: "b",
//     text: "The only difference among those list items is their contents, their data. You will often need to show several instances of the same component using different data when building interfaces: from lists of comments to galleries of profile images. In these situations, you can store that data in JavaScript objects and arrays and use methods like map() and filter() to render lists of components from them.",
//     timestamp: 1675664805812,
//   },
//   {
//     id: "6",
//     user: "a",
//     text: "Hi",
//     timestamp: 1675664950470,
//   },
// ];

const ChatLayout = ({ firestore, auth }) => {
  const lastMessage = useRef();
  const messageRef = collection(firestore, "messages");
  const q = query(messageRef, orderBy("createdAt"));
  const [messages] = useCollectionData(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const sendMessage = async (text) => {
    await addDoc(messageRef, {
      email: auth.currentUser.email,
      text,
      createdAt: Timestamp.now(),
    });
  };

  useEffect(() => {
    lastMessage.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={classes["chat-body"]}>
      <div className={classes.chat}>
        <div className={classes.scroll}>
          {messages &&
            messages.map((m) => (
              <Message
                key={`${m.email}__${m.createdAt.toString()}`}
                user={m.email}
                loggedIn={auth.currentUser.email}
              >
                {m.text}
              </Message>
            ))}
          <div ref={lastMessage}></div>
        </div>
      </div>
      <div className={classes.send}>
        <Send sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatLayout;
