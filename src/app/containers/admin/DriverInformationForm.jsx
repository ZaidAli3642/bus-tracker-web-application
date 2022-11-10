import { useEffect, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { addData, updateData } from "../../firebase/firebaseCalls/addDoc";
import { database } from "./../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import * as Yup from "yup";

import Input from "../../components/Input";
import Form from "../../components/Form";
import SubmitButton from "../../components/SubmitButton";
import Select from "../../components/select";
import SelectImageInput from "../../components/SelectImageInput";
import useAuth from "./../../context/auth/useAuth";

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
  drivingLicense: Yup.string().nullable().required().label("Driving License"),
  medicalReport: Yup.string().nullable().required().label("Medical Report"),
  driverDutyTime: Yup.string().required().label("Duty Start"),
  driverDutyEnd: Yup.string().required().label("Duty End"),
  driverId: Yup.number("Driver Id should be a number")
    .required()
    .label("Driver"),
});

const DriverInformationForm = () => {
  const [busNoList, setBusNoList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const match = useMatch("/admin/driver_update/:id");

  const {
    driverId,
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
    licenseImage,
    medicalReport,
    nationalIdentityNumber,
  } = location.state || {};

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

  const handleDriverInformation = async (values) => {
    setIsProcessing(true);
    try {
      const data = {
        driverId: values.driverId,
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
        institute: user.institute,
        nationalIdentityNumber: values.nationalIdentityNumber,
        password: values.nationalIdentityNumber,
        loginUser: "drivers",
        isDriver: true,
      };

      const driverCollection = collection(database, "drivers");

      const q = query(
        driverCollection,
        where("driverId", "==", values.driverId),
        where("busNo", "==", values.busNo),
        where("institute", "==", user.institute)
      );

      const driverDoc = await getDocs(q);
      if (!driverDoc.empty) {
        if (!isUpdated) {
          setIsProcessing(false);
          return toast.error(
            `Driver is already assigned to ${values.busNo} Bus`
          );
        }
      }

      let result;
      if (isUpdated) {
        result = await updateData(
          data,
          "drivers",
          values.image,
          match.params.id,
          values.drivingLicense,
          values.medicalReport
        );
      } else {
        result = await addData(
          data,
          "drivers",
          values.image,
          values.medicalReport,
          values.drivingLicense
        );
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
              driverId: driverId || "",
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
              drivingLicense: licenseImage || null,
              medicalReport: medicalReport || null,
              nationalIdentityNumber: nationalIdentityNumber || "",
            }}
            onSubmit={handleDriverInformation}
            validationSchema={validationSchema}
          >
            <h4>Personal Information</h4>
            <div className="line"></div>

            <div className="image-container image-flex-start ">
              <img
                src={image ? image : require("../../assets/driver-avatar.png")}
                className="profile-image"
                alt="driver"
              />
              <SelectImageInput name="image" />
            </div>
            <div className="line"></div>
            <div className="items-details">
              <Input
                label="Driver Id"
                name="driverId"
                type="text"
                placeholder="Enter Driver Id"
              />
              <Input
                label="National Identity Number"
                name="nationalIdentityNumber"
                type="text"
                placeholder="Enter National ID Number"
              />
            </div>
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
            <div className="items-details">
              <div className="input-container">
                <label className="label">Driving License Image</label>
                <img
                  src={
                    licenseImage
                      ? licenseImage
                      : require("../../assets/no-image.jpg")
                  }
                  className="square-image"
                  alt="license"
                />
              </div>
              <SelectImageInput name="drivingLicense" />
            </div>
            <div className="line"></div>
            <div className="items-details">
              <div className="input-container">
                <label className="label">Medical Report Image</label>
                <img
                  src={
                    medicalReport
                      ? medicalReport
                      : require("../../assets/no-image.jpg")
                  }
                  className="square-image"
                  alt="license"
                />
              </div>
              <SelectImageInput name="medicalReport" />
            </div>

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
