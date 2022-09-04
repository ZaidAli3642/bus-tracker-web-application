import { useState } from "react";
import * as Yup from "yup";
import { auth, database } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import Form from "../../components/Form";
import SubmitButton from "../../components/SubmitButton";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).max(12).required().label("Password"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { setParent } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (values) => {
    setLoading(true);

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const parentCollection = collection(database, "parent");
      const q = query(
        parentCollection,
        where("parent_id", "==", userCredentials.user.uid)
      );

      const parentSnap = await getDocs(q);
      if (!parentSnap.empty)
        parentSnap.forEach((doc) => setParent({ id: doc.id, ...doc.data() }));
      else {
        setLoading(false);
        return toast.error(
          "Something went wrong. Please make sure you have the right email and password for login."
        );
      }

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/wrong-password")
        return toast.error("Password is not correct.");
      if (error.code === "auth/user-not-found")
        return toast.error("Email is not correct.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container p-0">
        <div className="row h-100 m-0">
          <div className="col-md-4 left-container p-0">
            <img
              src={require("../../assets/student-4.jpg")}
              className="left-container-img"
              alt=""
            />
          </div>
          <div className="col-md-8 d-flex align-items-center justify-content-center flex-column right-container">
            <span className="login-heading" data-aos="fade-right">
              Log in
            </span>
            <p className="login-tagline text-center mb-5" data-aos="fade-left">
              You are one step away from tracking <br /> your child institute
              bus
            </p>
            <div className="form" data-aos="fade-right">
              <Form
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={login}>
                <Input
                  name="email"
                  inputClasses="input"
                  label="Email"
                  type="text"
                />
                <Input
                  name="password"
                  inputClasses="input"
                  label="Password"
                  type="password"
                />

                <SubmitButton
                  title="Log in"
                  isLoading={loading}
                  isParentButton={true}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
