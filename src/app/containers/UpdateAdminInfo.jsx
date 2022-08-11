import * as Yup from "yup";

import Input from "../components/Input";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";

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
              />
              <button className="btn btn-primary btn-md">Change Image</button>
            </div>
            <div className="line"></div>
            <div className="items-details">
              <Input
                label="First Name"
                value="First Name"
                name="firstname"
                type="text"
              />
              <Input
                label="Last Name"
                value="Last Name"
                name="lastname"
                type="text"
              />
            </div>
            <div className="items-details">
              <Input
                label="Designation"
                value="Software Engineer"
                name="designation"
                type="text"
              />
              <Input
                label={"College/University"}
                value="GCUF"
                name="institute"
                type="text"
              />
            </div>
            <div className="line"></div>
            <h4>Physical Address</h4>
            <div className="items-details">
              <Input
                label="Country"
                value="Country Name"
                name="country"
                type="text"
              />
              <Input
                label="City Name"
                value="City Name"
                name="city"
                type="text"
              />
            </div>
            <div className="items-details">
              <Input
                label="Address"
                value="Address"
                name="address"
                type="text"
              />
              <Input
                label="Postal Code"
                value="Postal Code"
                name="postalcode"
                type="text"
              />
            </div>
            <div className="items-details">
              <Input
                label="Contact"
                value="Contact"
                name="contact"
                type="text"
              />
            </div>

            <SubmitButton title="Update Admin" />
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateAdminInfo;
