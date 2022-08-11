import * as Yup from "yup";

import Input from "../components/Input";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().label("Last Name"),
  parent: Yup.string().required().label("Father/Guardian"),
  institute: Yup.string().required().label("Institute"),
  parentcontact: Yup.string().required().label("Parent Contact"),
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

const UpdateStudentInfo = () => {
  return (
    <>
      <div className="admin">
        <h1>UPDATE STUDENT INFORMATION</h1>
        <div className="items">
          <Form
            initialValues={{
              firstname: "",
              lastname: "",
              parent: "",
              institute: "",
              parentcontact: "",
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
              />
              <button className="btn btn-primary btn-md">Change Image</button>
            </div>
            <div className="line"></div>
            <div className="items-details">
              <Input
                label="First Name"
                name="firstname"
                placeholder="Enter First Name"
                type="text"
              />
              <Input
                label="Last Name"
                name="lastname"
                placeholder="Enter Last Name"
                type="text"
              />
            </div>
            <div className="items-details">
              <Input
                label="Father/Guardian Name"
                value="Father/Guardian Name"
                name="parent"
                placeholder="Enter Father/Guardian Name"
                type="text"
              />
              <Input
                label="College/University"
                value="GCUF"
                name="institute"
                type="text"
                placeholder="Enter University/College/School"
              />
            </div>
            <div className="items-details">
              <Input
                label="Contact No"
                name="contact"
                type="text"
                placeholder="Enter Contact"
              />
              <Input
                label="Father/Guardian No"
                value="Father/Guardian No"
                name="parentcontact"
                type="text"
                placeholder="Enter Father/Guardian Contact"
              />
            </div>
            <div className="line"></div>
            <h4>Physical Address</h4>
            <div className="items-details">
              <Input
                label="Country"
                name="country"
                type="text"
                placeholder="Enter Country"
              />
              <Input
                label="City Name"
                name="city"
                type="text"
                placeholder="Enter City"
              />
            </div>
            <div className="items-details">
              <Input
                label="Address"
                name="address"
                type="text"
                placeholder="Enter Address"
              />
              <Input
                label="Postal Code"
                value="Postal Code"
                name="postalcode"
                type="text"
                placeholder="Enter Postal Code"
              />
            </div>

            <SubmitButton title="Update Student" />
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateStudentInfo;
