import { useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { addData, updateData } from "../firebase/firebaseCalls/addDoc";
import { database } from "./../firebase/firebaseConfig";
import { toast } from "react-toastify";
import * as Yup from "yup";

import Input from "../components/Input";
import Form from "../components/Form";
import SubmitButton from "../components/SubmitButton";
import Select from "../components/select";
import SelectImageInput from "../components/SelectImageInput";
import useAuth from "./../context/auth/useAuth";

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
  busNo: Yup.number().required().label("Bus No"),
  image: Yup.string().nullable().required().label("Image"),
  driverDutyTime: Yup.string().required().label("Duty Start"),
  driverDutyEnd: Yup.string().required().label("Duty End"),
});

const DriverInformationForm = () => {
  const [busNoList, setBusNoList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const match = useMatch("/admin/driver_update/:id");

  const {
    firstname,
    lastname,
    age,
    salary,
    contact,
    country,
    city,
    address,
    postalcode,
    busNo,
    driverDutyTime,
    driverDutyEnd,
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

  const handleDriverInformation = async (values) => {
    setIsProcessing(true);
    try {
      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        age: values.age,
        salary: values.salary,
        country: values.country,
        city: values.city,
        address: values.address,
        postalcode: values.postalcode,
        contact: values.contact,
        busNo: values.busNo,
        imageName: values.image[0].name || image,
        driverDutyTime: values.driverDutyTime,
        driverDutyEnd: values.driverDutyEnd,
        admin_id: user.admin_id,
      };

      let result;
      if (isUpdated) {
        result = await updateData(
          data,
          "drivers",
          values.image,
          match.params.id
        );
      } else {
        result = await addData(data, "drivers", values.image);
      }

      if (result === undefined) {
        setIsProcessing(false);
        return toast.error("Image should be in png, jpg or jpeg format");
      }

      setIsProcessing(false);
      toast.success("Data Saved Successfully.");
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      toast.error("Error Occured while saving data.");
    }
  };

  useEffect(() => {
    getBusDetails();
  }, []);

  return (
    <>
      <div className="admin">
        <h1>{isUpdated ? "Update" : "Add"} Driver Information</h1>
        <div className="items">
          <Form
            initialValues={{
              firstname: firstname || "",
              lastname: lastname || "",
              age: age || "",
              salary: salary || "",
              country: country || "",
              city: city || "",
              address: address || "",
              postalcode: postalcode || "",
              contact: contact || "",
              busNo: busNo || "",
              image: image || null,
              driverDutyTime: driverDutyTime || "",
              driverDutyEnd: driverDutyEnd || "",
            }}
            onSubmit={handleDriverInformation}
            validationSchema={validationSchema}
          >
            <h4>Personal Information</h4>
            <div className="line"></div>

            <div className="image-container image-flex-start ">
              <img
                src={image ? image : require("../assets/driver-avatar.png")}
                className="profile-image"
                alt="driver"
              />
              <SelectImageInput name="image" />
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

            <div className="line"></div>
            <div className="items-details">
              <Select options={busNoList} label="Bus No" name="busNo" />
              <Input type="time" label="Duty Time" name="driverDutyTime" />
            </div>
            <div className="items-details">
              <Input type="time" label="Duty End" name="driverDutyEnd" />
            </div>

            <SubmitButton title="SAVE DRIVER" isLoading={isProcessing} />
          </Form>
        </div>
      </div>
    </>
  );
};

export default DriverInformationForm;