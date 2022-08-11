import Input from "../components/Input";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import SubmitButton from "./../components/SubmitButton";
import Form from "./../components/Form";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).max(12).required().label("Password"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    navigate("/");
  };

  return (
    <div className="login-register-container">
      <img src={require("../assets/BTS.png")} alt="logo" className="logo" />
      <h1 className="sign-in-text">Sign in</h1>

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Input
          label="EMAIL"
          type="email"
          placeholder="ENTER EMAIL"
          classes="input"
          name="email"
        />

        <Input
          label="PASSWORD"
          type="password"
          placeholder="ENTER PASSWORD"
          classes="input"
          name="password"
        />

        <SubmitButton title="Sign in" />

        <p className="forgot-password label">forgot your password?</p>
        <h5 className="new-account-text">Don't have an Admin Account?</h5>

        <button className="btn btn-md btn-primary button">
          Create New Account
        </button>
      </Form>
    </div>
  );
};

export default Login;
