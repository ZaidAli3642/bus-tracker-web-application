import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../firebase/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

import Input from "../../components/Input";
import SubmitButton from "./../../components/SubmitButton";
import Form from "./../../components/Form";
import useAuth from "./../../context/auth/useAuth";
import Datalist from "../../components/Datalist";

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
  const [isLoading, setIsLoading] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const navigate = useNavigate();
  const { user, authUser } = useAuth();

  const docRef = collection(database, "admin");
  const instituteRef = collection(database, "institute");

  const getInstitutes = async () => {
    const instituteSnapshot = await getDocs(instituteRef);
    let institutes = instituteSnapshot.docs.map((institute) => ({
      id: institute.get("institute"),
      value: institute.get("institute"),
    }));

    institutes = institutes.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id)
    );

    setInstitutes([...institutes]);
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      await addDoc(docRef, {
        admin_id: userCredentials.user.uid,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        designation: values.designation,
        institute: values.institute,
        country: values.country,
        city: values.city,
        address: values.address,
        postalcode: values.postalcode,
        contact: values.contact,
      });

      const result = await addDoc(instituteRef, {
        institute: values.institute,
      });

      if (result) navigate("/admin/home");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInstitutes();
  }, []);

  if (authUser === undefined || Object.keys(user).length !== 0) return null;
  if (authUser && Object.keys(user).length === 0) {
    return <Navigate to="/not-found" />;
  }

  return (
    <div className="login-register-container">
      <img src={require("../../assets/BTS.png")} alt="logo" className="logo" />
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
        validationSchema={validationSchema}>
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

        <Datalist
          label="INSTITUTE"
          name="institute"
          listId="institute"
          options={institutes}
        />

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

        <SubmitButton title="Sign up" isLoading={isLoading} />

        <h5 className="new-account-text">Already have an Admin Account?</h5>

        <button
          className="btn btn-md btn-primary button"
          onClick={() => navigate("/admin/login")}>
          Sign in
        </button>
      </Form>
    </div>
  );
};

export default Register;
