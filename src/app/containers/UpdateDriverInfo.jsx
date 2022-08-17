import * as Yup from "yup";

import Input from "../components/Input";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().label("Last Name"),
  age: Yup.number().min(20).max(40).required().label("Age"),
  salary: Yup.number().min(20000).max(40000).required().label("Salary"),
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

const UpdateDriverInfo = () => {
  return (
    <>
      <div className="admin">
        <h1>Update Driver Information</h1>
        <div className="items">
          <Form
            initialValues={{
              firstname: "",
              lastname: "",
              age: "",
              salary: "",
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

            <div className="image-container image-flex-start ">
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
                type="text"
                name="firstname"
                placeholder="Enter First Name"
              />
              <Input
                label="Last Name"
                type="text"
                name="lastname"
                placeholder="Enter Last Name"
              />
            </div>
            <div className="items-details">
              <Input
                label="Age"
                type="text"
                name="age"
                placeholder="Enter Age"
              />
              <Input
                label="Salary"
                type="text"
                name="salary"
                placeholder="Enter Salary"
              />
            </div>
            <div className="items-details">
              <Input
                label="Contact No"
                type="text"
                name="contact"
                placeholder="Enter Contact"
              />
            </div>
            <div className="line"></div>
            <h4>Physical Address</h4>
            <div className="items-details">
              <Input
                label="Country"
                type="text"
                name="country"
                placeholder="Enter Country"
              />
              <Input
                label="City Name"
                type="text"
                name="city"
                placeholder="Enter City"
              />
            </div>
            <div className="items-details">
              <Input
                label="Address"
                type="text"
                name="address"
                placeholder="Enter Address"
              />
              <Input
                label="Postal Code"
                type="text"
                name="postalcode"
                placeholder="Enter postal code"
              />
            </div>

            <SubmitButton title="SAVE DRIVER" />
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdateDriverInfo;
