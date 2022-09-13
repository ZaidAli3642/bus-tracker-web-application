import { useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { database } from "./../../firebase/firebaseConfig";
import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import useAuth from "./../../context/auth/useAuth";
import MessagesBox from "../../components/MessagesBox";
import {
  createChatConversation,
  getAdmins,
  getParents,
  send,
} from "../../firebase/firebaseCalls/chat";
import ChatPeople from "../../components/ChatPeople";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().label("Message Box"),
});

const Messages = () => {
  const { user } = useAuth();
  const [persons, setPersons] = useState([]);
  const [header, setHeader] = useState({
    id: "",
    name: "",
    image: "",
    designation: "",
  });
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dummy = useRef();

  const getAllAdmins = async () => {
    try {
      const admins = await getAdmins(user);

      return admins;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllParents = async () => {
    try {
      const parents = await getParents(user);

      return parents;
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPeople = async () => {
    const admins = await getAllAdmins();
    const parents = await getAllParents();
    setPersons([...admins, ...parents]);
  };

  const sendMessage = async (values, { resetForm }) => {
    try {
      const data = {
        message: values.message,
        senderId: user.id,
        reveiverId: header.id,
        conversationId: conversation.conversationId,
        createdAt: serverTimestamp(),
      };
      resetForm();
      await send(data);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePersonClick = (person) => {
    setHeader({
      id: person.id,
      name: person.fullName
        ? person.fullName
        : person.firstname + " " + person.lastname,
      image: person.image,
      designation: person.designation,
    });
  };

  const createConversation = async () => {
    try {
      const data = {
        conversation: [user.id, header.id],
      };
      const conversation = await createChatConversation(data, user, header);
      setTimeout(() => {
        dummy.current.scrollIntoView({ behavior: "smooth" });
      }, 1000);
      setConversation(conversation);
    } catch (error) {
      console.log(error);
    }
  };

  const getPersonChat = () => {
    if (!header.id) return null;

    setIsLoading(true);
    const chatCollections = collection(database, "messages");
    const q = query(
      chatCollections,
      where("conversationId", "==", conversation.conversationId),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (chatSnapshot) => {
      const chats = chatSnapshot.docs.map((chat) => ({
        id: chat.id,
        ...chat.data(),
      }));
      setMessages(chats);
    });

    setIsLoading(false);
  };

  useEffect(() => {
    if (header.id) createConversation();
  }, [header]);

  useEffect(() => {
    getAllPeople();

    getPersonChat();
  }, [messages, conversation]);

  return (
    <div className="chat-system">
      <h1>Messages</h1>
      <div className="row mt-3 chat-container">
        <MessagesBox
          dummy={dummy}
          header={header}
          messages={messages}
          sendMessage={sendMessage}
          validationSchema={validationSchema}
          user={user}
          isLoading={isLoading}
        />

        <ChatPeople persons={persons} handlePersonClick={handlePersonClick} />
      </div>
    </div>
  );
};

export default Messages;
