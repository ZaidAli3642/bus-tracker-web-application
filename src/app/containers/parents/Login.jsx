import { useState } from "react";
import * as Yup from "yup";
import { database } from "../../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

import Input from "../../components/Input";
import Form from "../../components/Form";
import SubmitButton from "../../components/SubmitButton";
import { useContext } from "react";
import AuthContext from "../../context/authContext";
import { toast } from "react-toastify";
import InputWithMask from "../../components/InputWithMask";

const validationSchema = Yup.object().shape({
  nationalIdentityNumber: Yup.string()
    .min(15)
    .max(15)
    .required()
    .label("National Identity Number"),
  password: Yup.string().required().label("Password"),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { parent, setParent } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (values) => {
    setLoading(true);

    console.log("Values : ", values);
    console.log(typeof values.nationalIdentityNumber);

    try {
      const parentCollection = collection(database, "parent");
      const q1 = query(
        parentCollection,
        where("nationalIdentityNumber", "==", values.nationalIdentityNumber),
        where("password", "==", values.password)
      );

      const parentSnapshot = await getDocs(q1);

      if (parentSnapshot.empty) {
        setLoading(false);
        return toast.error("Your NID doesn't match with password.");
      }
      const parent = parentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(parent);

      setParent(parent[0]);
      localStorage.setItem("parentAuth", JSON.stringify(parent));
      toast.success("Successfull");
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  if (parent) return <Navigate to="/" />;

  return (
    <div className="login-page">
      <div className="login-container p-0">
        <div className="row h-100 m-0">
          <div className="col-md-4 left-container p-0">
            <img
              src={require("../../assets/3.webp")}
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
                  nationalIdentityNumber: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={login}
              >
                <InputWithMask
                  name="nationalIdentityNumber"
                  inputClasses="input"
                  label="National Id Number"
                  type="text"
                  mask={"99999-9999999-9"}
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
