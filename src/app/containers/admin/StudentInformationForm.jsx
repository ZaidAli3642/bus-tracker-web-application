import { useState, useEffect } from "react";
import * as Yup from "yup";
import { collection, getDocs, where, query } from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";
import { useLocation, useMatch } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/Input";
import Form from "../../components/Form";
import SubmitButton from "../../components/SubmitButton";
import Select from "./../../components/select";
import useAuth from "../../context/auth/useAuth";
import SelectImageInput from "../../components/SelectImageInput";
import { addData, updateData } from "../../firebase/firebaseCalls/addDoc";
import Loader from "../../components/Loader";

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().label("First Name"),
  lastname: Yup.string().required().label("Last Name"),
  parent: Yup.string().required().label("Father/Guardian"),
  parentcontact: Yup.number("Parent Contact must be numbers.")
    .required()
    .label("Parent Contact"),
  country: Yup.string().required().label("Country"),
  city: Yup.string().required().label("City"),
  address: Yup.string().required().label("Address"),
  postalcode: Yup.string()
    .min(5, "Postal Code must be 5 digits")
    .max(5, "Postal Code must be 5 digits")
    .required()
    .label("Postal Code"),
  contact: Yup.number("Contact must be numbers").required().label("Contact"),
  busNo: Yup.string().required().label("Bus No"),
  class: Yup.string().required().label("Class"),
  image: Yup.string().nullable().required().label("Student Image"),
  nationalIdentityNumber: Yup.number(
    "National Identity Number should be number."
  )
    .required()
    .label("National Identity Number"),
});

const StudentInformationForm = () => {
  const [busNoList, setBusNoList] = useState([]);
  const [parentDetail, setParentDetail] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const match = useMatch("/admin/student_update/:id");

  const {
    firstname,
    rollNo,
    lastname,
    parent,
    parentcontact,
    country,
    city,
    address,
    postalcode,
    contact,
    busNo,
    imageName,
    image,
    class: majorOrClass,
    isUpdated,
  } = location.state || {};

  const getParentDetails = async () => {
    if (!rollNo) return;
    setLoading(true);
    const parentCollection = collection(database, "parent");

    const q = query(parentCollection, where("studentId", "==", rollNo));

    const parentSnapshot = await getDocs(q);

    const parentDetails = parentSnapshot.docs.map((parent) => ({
      id: parent.id,
      ...parent.data(),
    }));
    setParentDetail(parentDetails[0]);
    setLoading(false);
  };

  const getBusDetails = async () => {
    const busCollection = collection(database, "bus");

    const q = query(busCollection, where("institute", "==", user.institute));

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
        institute: user.institute,
        parentcontact: values.parentcontact,
        country: values.country,
        city: values.city,
        address: values.address,
        postalcode: values.postalcode,
        contact: values.contact,
        busNo: values.busNo,
        rollNo: values.rollNo,
        imageName: values.image[0].name || imageName,
        class: values.class,
      };
      const parentData = {
        nationalIdentityNumber: values.nationalIdentityNumber,
        password: values.nationalIdentityNumber,
        studentId: values.rollNo,
        busNo: values.busNo,
        institute: user.institute,
        fullName: values.parent,
        parentcontact: values.parentcontact,
      };

      const studentCollection = collection(database, "students");

      const q = query(studentCollection, where("rollNo", "==", values.rollNo));

      const studentDoc = await getDocs(q);

      if (!studentDoc.empty) {
        if (!isUpdated) {
          setIsProcessing(false);
          return toast.error("Registeration No is already exist");
        }
      }

      let result;
      if (isUpdated === true) {
        await updateData(parentData, "parent", ...[,], parentDetail.id);
        result = await updateData(
          data,
          "students",
          values.image,
          match.params.id
        );
      } else {
        await addData(parentData, "parent");
        result = await addData(data, "students", values.image);
      }

      setIsProcessing(false);
      if (result === undefined) {
        return toast.warning("Image should be in png, jpg or jpeg format");
      }

      toast.success("Data Saved Successfully");
      // resetForm();
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      toast.error("Error Occured while saving data.");
    }
  };

  useEffect(() => {
    getBusDetails();
    getParentDetails();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="admin">
        <h1>{isUpdated ? "Update" : "Add"} Student Information</h1>
        <div className="items">
          <Form
            initialValues={{
              firstname: firstname || "",
              lastname: lastname || "",
              parent: parent || "",
              parentcontact: parentcontact || "",
              country: country || "",
              city: city || "",
              address: address || "",
              postalcode: postalcode || "",
              contact: contact || "",
              busNo: busNo || "",
              image: image || null,
              class: majorOrClass || "",
              rollNo: rollNo || "",
              nationalIdentityNumber:
                parentDetail?.nationalIdentityNumber || "",
              password: "",
            }}
            onSubmit={handleStudentInformation}
            validationSchema={validationSchema}
          >
            <h4>Personal Information</h4>
            <div className="line"></div>

            <div className="image-container image-flex-start">
              <img
                src={image ? image : require("../../assets/student-avatar.jpg")}
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
                name="parent"
                placeholder="Enter Father/Guardian Name"
                type="text"
              />
              <Input
                label="Registeration No"
                name="rollNo"
                min="0"
                type="number"
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
                name="parentcontact"
                type="text"
                placeholder="Enter Father/Guardian Contact"
              />
            </div>
            <div className="items-details">
              <Input
                label="National Identity Number"
                name="nationalIdentityNumber"
                type="number"
                min="0"
                placeholder="Enter National Id"
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
                name="postalcode"
                type="text"
                placeholder="Enter Postal Code"
              />
            </div>
            <div className="items-details">
              <Select label="Bus No" name="busNo" options={busNoList} />

              <Input label="Major or Class" name="class" type="text" />
            </div>

            <SubmitButton title="SAVE STUDENT" isLoading={isProcessing} />
          </Form>
        </div>
      </div>
    </>
  );
};

export default StudentInformationForm;
