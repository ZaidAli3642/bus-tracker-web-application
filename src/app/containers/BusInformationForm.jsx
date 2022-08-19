import { useState } from "react";
import * as Yup from "yup";
import { useLocation, useMatch } from "react-router-dom";
import { toast } from "react-toastify";

import Form from "../components/Form";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import SelectImageInput from "../components/SelectImageInput";
import MultipleInputs from "../components/MultipleInputs";
import Select from "../components/select";
import { addData, updateData } from "../firebase/firebaseCalls/addDoc";
import useAuth from "../context/auth/useAuth";

const mantainanceStates = [
  { id: 1, label: "Excellent", values: "excellent" },
  { id: 2, label: "Good", values: "good" },
  { id: 3, label: "Poor", values: "poor" },
];

const validationSchema = Yup.object().shape({
  busNo: Yup.number().required().label("Bus No"),
  licenseNo: Yup.number().required().label("License No"),

  image: Yup.string().required().nullable().label("License Image"),
  maintainance: Yup.string().required().label("Maintainance"),
});

const BusInformationForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const match = useMatch("/admin/bus_update/:id");
  const { user } = useAuth();

  const handleAddBusInformation = async (values, { resetForm }) => {
    setIsProcessing(true);
    try {
      const data = {
        busNo: values.busNo,
        licenseNo: values.licenseNo,
        imageName: values.image[0].name || location?.state?.imageName,
        busRoutes: values.routesList,
        maintainance: values.maintainance,
        isBusAlloted: location?.state?.isBusAlloted ? true : false,
        admin_id: user.admin_id,
      };

      let result;
      if (location?.state?.isUpdated === true) {
        result = await updateData(data, "bus", values.image, match.params.id);
      } else {
        result = await addData(data, "bus/", values.image);
      }

      if (result === undefined) {
        setIsProcessing(false);
        return toast.error("Image should be in png, jpg or jpeg format");
      }

      setIsProcessing(false);
      toast.success("Data Saved Successfully.");
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Error occured while saving data.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="admin">
        <h1>
          {location?.state?.isUpdated ? "Update" : "Add"} Driver Information
        </h1>
        <div className="items">
          <Form
            initialValues={{
              busNo: location?.state?.busNo || "",
              licenseNo: location?.state?.licenseNo || "",
              image: location?.state?.image || null,
              routesList: location?.state?.routes || [
                { latitude: "", longitude: "" },
              ],
              maintainance: location?.state?.maintainance || "",
            }}
            onSubmit={handleAddBusInformation}
            validationSchema={validationSchema}
          >
            <h4>Personal Information</h4>

            <div className="line"></div>
            <div className="items-details">
              <Input label="Bus No" type="text" name="busNo" />
              <Input label="License No" type="text" name="licenseNo" />
            </div>
            <div className="line"></div>
            <div className="items-details">
              <div className="input-container">
                <label className="label">License Picture</label>
                <img
                  src={
                    location?.state?.image
                      ? location?.state?.image
                      : require("../assets/no-image.jpg")
                  }
                  className="square-image"
                  alt="license"
                />
              </div>
              <SelectImageInput name="image" />
            </div>
            <div className="line"></div>
            <h3>Routes</h3>
            <div className="items-container">
              <MultipleInputs />
            </div>
            <div className="line"></div>
            <Select
              options={mantainanceStates}
              label="Bus Maintainance"
              name="maintainance"
            />
            <SubmitButton title="SAVE DRIVER" isLoading={isProcessing} />
          </Form>
        </div>
      </div>
    </>
  );
};

export default BusInformationForm;
