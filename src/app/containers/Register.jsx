import Input from "../components/Input";
import * as Yup from "yup";

import SubmitButton from "./../components/SubmitButton";
import Form from "./../components/Form";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().label("Last Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).max(12).required().label("Password"),
  designation: Yup.string().required().label("Designation"),
  institute: Yup.string().required().label("Institute"),
  country: Yup.string().required().label("Country"),
  city: Yup.string().required().label("City"),
  address: Yup.string().required().label("Address"),
  postalcode: Yup.string()
    .min(5, "Postal Code must be 5 digits")
    .max(5, "Postal Code must be 5 digits")
    .required()
    .label("Postal Code"),
  contact: Yup.string().required().label("Contact"),
});

const Register = () => {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className="login-register-container">
      <img src={require("../assets/BTS.png")} alt="logo" className="logo" />
      <h1 className="sign-in-text">Sign up</h1>
      <Form
        initialValues={{
          firstname: "",
          lastname: "",
          email: "",
          password: "",
          designation: "",
          institute: "",
          country: "",
          city: "",
          address: "",
          postalcode: "",
          contact: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Input
          label="FIRST NAME"
          type="text"
          classes="input"
          name="firstname"
        />

        <Input label="LAST NAME" type="text" classes="input" name="lastname" />

        <Input label="EMAIL" type="email" classes="input" name="email" />

        <Input
          label="PASSWORD"
          type="password"
          classes="input"
          name="password"
        />

        <Input
          label="DESIGNATION"
          type="text"
          classes="input"
          name="designation"
        />

        <Input label="INSTITUTE" type="text" classes="input" name="institute" />
        <Input label="COUNTRY" type="text" classes="input" name="country" />
        <Input label="CITY" type="text" classes="input" name="city" />
        <Input label="ADDRESS" type="text" classes="input" name="address" />
        <Input
          label="postalcode"
          type="text"
          classes="input"
          name="postalcode"
        />
        <Input label="CONTACT" type="text" classes="input" name="contact" />

        <SubmitButton title="Sign up" />

        <h5 className="new-account-text">Already have an Admin Account?</h5>

        <button className="btn btn-md btn-primary button">Sign in</button>
      </Form>
    </div>
  );
};

export default Register;
