import { useEffect, useContext } from "react";
import * as Yup from "yup";
import { useMatch, Navigate } from "react-router-dom";
import { database } from "../firebase/firebaseConfig";
import { collection, where, query, getDocs } from "firebase/firestore";

import Input from "../components/Input";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import useAuth from "./../context/auth/useAuth";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().label("Last Name"),
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

const UpdateAdminInfo = () => {
  const { user } = useAuth();

  const match = useMatch({ path: "/admin/admin_update/:id" });

  if (user === null) {
    return null;
  }

  if (match.params.id !== user.admin_id) {
    return <Navigate to="/not-found" />;
  }

  return (
    <>
      <div className="admin">
        <h1>UPDATE YOUR INFORMATION</h1>
        <div className="items">
          <Form
            initialValues={{
              firstname: "",
              lastname: "",
              designation: "",
              institute: "",
              country: "",
              city: "",
              address: "",
              postalcode: "",
              contact: "",
            }}
            onSubmit={(values) => console.log(values)}
            validationSchema={validationSchema}
          >
            <h4>Personal Information</h4>
            <div className="line"></div>

            <div className="image-container image-flex-start">
              <img
                src={require("../assets/zaid-saleem-image.jpg")}
                className="profile-image"
                alt="profile"
              />
              <button className="btn btn-primary btn-md">Change Image</button>
            </div>
            <div className="line"></div>
            <div className="items-details">
              <Input label="First Name" name="firstname" type="text" />
              <Input label="Last Name" name="lastname" type="text" />
            </div>
            <div className="items-details">
              <Input label="Designation" name="designation" type="text" />
              <Input
                label={"College/University"}
                name="institute"
                type="text"
              />
            </div>
            <div className="line"></div>
            <h4>Physical Address</h4>
            <div className="items-details">
              <Input label="Country" name="country" type="text" />
              <Input label="City Name" name="city" type="text" />
            </div>
            <div className="items-details">
              <Input label="Address" name="address" type="text" />
              <Input label="Postal Code" name="postalcode" type="text" />
            </div>
            <div className="items-details">
              <Input label="Contact" name="contact" type="text" />
            </div>

            <SubmitButton title="Update Admin" />
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateAdminInfo;
