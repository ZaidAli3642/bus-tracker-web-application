import { useState, useEffect } from "react";
import * as Yup from "yup";
import { database } from "./../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  where,
  query,
  onSnapshot,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import Form from "../components/Form";
import SubmitButton from "./../components/SubmitButton";
import Input from "./../components/Input";
import Message from "../components/Message";
import PersonDetails from "../components/PersonDetails";
import useAuth from "./../context/auth/useAuth";

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

  const getAllAdmins = async () => {
    const adminCollection = collection(database, "admin");
    const q = query(adminCollection, where("institute", "==", user.institute));

    const adminSnapshot = await getDocs(q);
    const admins = adminSnapshot.docs
      .map((admins) => ({
        id: admins.id,
        ...admins.data(),
      }))
      .filter((admins) => admins.id !== user.id);

    return admins;
  };

  const getAllPeople = async () => {
    const admins = await getAllAdmins();
    setPersons([...admins]);
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
      console.log(conversation);

      const messagesCollections = collection(database, "messages");
      await addDoc(messagesCollections, data);
    } catch (error) {
      console.log(error);
    }

    resetForm();
  };

  const handlePersonClick = async (person) => {
    setHeader({
      id: person.id,
      name: person.firstname + " " + person.lastname,
      image: person.image,
      designation: person.designation,
    });
  };

  const createConversation = async () => {
    const data = {
      conversation: [user.id, header.id],
    };

    const conversationCollection = collection(database, "conversation");

    const q = query(
      conversationCollection,
      where("conversation", "array-contains", user.id)
    );

    const conversationSnapshot = await getDocs(q);
    const conversations = conversationSnapshot.docs.map((snapshot) => ({
      conversationId: snapshot.id,
      ...snapshot.data(),
    }));

    const convo = conversations.filter((convo) => {
      if (
        convo.conversation.includes(header.id) &&
        convo.conversation.includes(user.id)
      )
        return convo;
    });

    if (convo.length === 0) {
      const result = await addDoc(conversationCollection, data);

      setConversation({
        conversationId: result.id,
        ...data,
      });
      return;
    }

    setConversation(convo[0]);
  };

  const getPersonChat = async () => {
    if (!header.id) return;

    const chatCollections = collection(database, "messages");
    const q = query(
      chatCollections,
      where("conversationId", "==", conversation.conversationId)
    );

    // const chat = await getDocs(q);

    // const messages = chat.docs.map((messages) => ({
    //   id: messages.id,
    //   ...messages.data(),
    // }));
    onSnapshot(q, (chatSnapshot) => {
      const chats = chatSnapshot.docs.map((chat) => ({
        id: chat.id,
        ...chat.data(),
      }));
      setMessages(chats);
    });

    // return () => unsubscribe();
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
        <div className="col-8 message-container">
          <header className="message-header">
            <img
              src={
                header.image
                  ? header.image
                  : require("../assets/profile-avatar.jpg")
              }
              alt="profile"
              className="profile-image profile-rounded-image"
            />
            <div className="user-details">
              <h5 className="name">{header.name}</h5>
              <h6>{header.designation}</h6>
            </div>
          </header>
          <div className="line"></div>
          <div className="messages">
            {!header.id ? (
              <div className="flex-align-center messages">
                <h1>Select A Chat</h1>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <Message
                    message={message.message}
                    own={user.id === message.senderId}
                    id={message.id}
                  />
                ))}
                {/* <Message />
                <Message own={true} />
                <Message own={true} />
                <Message />
                <Message own={true} />
                <Message />
                <Message own={true} />
                <Message /> */}
              </>
            )}
          </div>
          <div className="send-message-container">
            <Form
              initialValues={{ message: "" }}
              onSubmit={sendMessage}
              validationSchema={validationSchema}>
              <Input
                inputClasses={"messages-input"}
                placeholder="Send Message"
                name="message"
                type="text"
              />
              <SubmitButton
                className="btn btn-primary btn-md"
                disabled={!header.id ? true : false}
                title="Send"
              />
            </Form>
          </div>
        </div>
        <div className="col-3 people-container">
          {persons.map((person) => (
            <PersonDetails
              image={person.image}
              name={`${person.firstname} ${person.lastname}`}
              designation={person.designation}
              handleClick={() => handlePersonClick(person)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
