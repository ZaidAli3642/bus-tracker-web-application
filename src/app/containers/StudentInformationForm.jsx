import { useState, useEffect } from "react";
import * as Yup from "yup";
import { collection, getDocs, where, query } from "firebase/firestore";
import { database } from "../firebase/firebaseConfig";
import { useLocation, useMatch } from "react-router-dom";

import Input from "../components/Input";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import Select from "./../components/select";
import useAuth from "../context/auth/useAuth";
import SelectImageInput from "../components/SelectImageInput";
import { addData, updateData } from "../firebase/firebaseCalls/addDoc";
import { toast } from "react-toastify";

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
  busNo: Yup.string().required().label("Bus No"),
  image: Yup.string().nullable().required().label("Student Image"),
});

const StudentInformationForm = () => {
  const [busNoList, setBusNoList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const match = useMatch("/admin/student_update/:id");

  const {
    firstname,
    lastname,
    parent,
    institute,
    parentcontact,
    country,
    city,
    address,
    postalcode,
    contact,
    busNo,
    imageName,
    image,
    isUpdated,
  } = location.state || {};

  const getBusDetails = async () => {
    const busCollection = collection(database, "bus");

    const q = query(busCollection, where("admin_id", "==", user.admin_id));

    const busSnapshot = await getDocs(q);

    const busDetails = busSnapshot.docs.map((bus) => ({
      id: bus.id,
      label: bus.get("busNo"),
      value: bus.get("busNo"),
    }));
    setBusNoList(busDetails);
  };

  const handleStudentInformation = async (values, { resetForm }) => {
    setIsProcessing(true);

    try {
      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        parent: values.parent,
        institute: values.institute,
        parentcontact: values.parentcontact,
        country: values.country,
        city: values.city,
        address: values.address,
        postalcode: values.postalcode,
        contact: values.contact,
        busNo: values.busNo,
        imageName: values.image[0].name || imageName,
        admin_id: user.admin_id,
      };

      let result;
      if (isUpdated === true) {
        result = await updateData(
          data,
          "students",
          values.image,
          match.params.id
        );
      } else {
        result = await addData(data, "students", values.image);
      }

      setIsProcessing(false);
      if (result === undefined) {
        return toast.warning("Image should be in png, jpg or jpeg format");
      }

      toast.success("Data Saved Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Error Occured while saving data.");
    }
  };

  useEffect(() => {
    getBusDetails();
  }, []);

  return (
    <>
      <div className="admin">
        <h1>Update Student Information</h1>
        <div className="items">
          <Form
            initialValues={{
              firstname: firstname || "",
              lastname: lastname || "",
              parent: parent || "",
              institute: institute || "",
              parentcontact: parentcontact || "",
              country: country || "",
              city: city || "",
              address: address || "",
              postalcode: postalcode || "",
              contact: contact || "",
              busNo: busNo || "",
              image: image || null,
            }}
            onSubmit={handleStudentInformation}
            validationSchema={validationSchema}
          >
            <h4>Personal Information</h4>
            <div className="line"></div>

            <div className="image-container image-flex-start">
              <img
                src={image ? image : require("../assets/student-avatar.jpg")}
                className="profile-image"
                alt="profile"
              />
              <SelectImageInput name="image" />
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
            <div className="items-details">
              <Select label="Bus No" name="busNo" options={busNoList} />
            </div>

            <SubmitButton title="SAVE STUDENT" isLoading={isProcessing} />
          </Form>
        </div>
      </div>
    </>
  );
};

export default StudentInformationForm;
