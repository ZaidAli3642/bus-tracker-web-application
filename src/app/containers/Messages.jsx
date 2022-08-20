import * as Yup from "yup";

import useAuth from "../context/auth/useAuth";
import { Navigate } from "react-router-dom";
import Form from "../components/Form";
import SubmitButton from "./../components/SubmitButton";
import Input from "./../components/Input";
import Message from "../components/Message";

const validationSchema = Yup.object().shape({
  message: Yup.string().required().label("Message Box"),
});

const Messages = () => {
  const { user } = useAuth();

  return (
    <div className="chat-system">
      <h1>Messages</h1>
      <div className="row mt-3 chat-container">
        <div className="col-8 message-container">
          <header className="message-header">
            <img
              src={require("../assets/zaid-saleem-image.jpg")}
              alt=""
              className="profile-image profile-rounded-image"
            />
            <div className="user-details">
              <h5>name</h5>
              <h6>designation</h6>
            </div>
          </header>
          <div className="line"></div>
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <div className="send-message-container">
            <Form
              initialValues={{ message: "" }}
              onSubmit={(values) => console.log(values)}
              validationSchema={validationSchema}
            >
              <Input
                inputClasses={"messages-input"}
                placeholder="Send Message"
                name="message"
                type="text"
              />
              <SubmitButton className="btn btn-primary btn-md" title="Send" />
            </Form>
          </div>
        </div>
        <div className="col-3 people-container">Peoples</div>
      </div>
    </div>
  );
};

export default Messages;
