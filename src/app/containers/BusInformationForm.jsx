import { useState } from "react";
import * as Yup from "yup";

import Form from "../components/Form";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import SelectImageInput from "../components/SelectImageInput";
import MultipleInputs from "../components/MultipleInputs";
import Select from "../components/select";
import { addData } from "../firebase/firebaseCalls/addDoc";
import { toast } from "react-toastify";

const mantainanceStates = [
  { id: 1, state: "Excellent", values: "excellent" },
  { id: 2, state: "Good", values: "good" },
  { id: 3, state: "Poor", values: "poor" },
];

const validationSchema = Yup.object().shape({
  busNo: Yup.number().required().label("Bus No"),
  licenseNo: Yup.number().required().label("License No"),

  image: Yup.string().required().nullable().label("License Image"),
  maintainance: Yup.string().required().label("Maintainance"),
});

const BusInformationForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddBusInformation = async (values) => {
    setIsProcessing(true);
    try {
      const data = {
        busNo: values.busNo,
        licenseNo: values.licenseNo,
        imageName: values.image[0].name,
        busRoutes: values.routesList,
        maintainance: values.maintainance,
      };

      const result = await addData(data, "bus/", values.image);

      if (result === undefined) {
        setIsProcessing(false);
        return toast.error("Image should be in png, jpg or jpeg format");
      }

      toast.success("Data Saved Successfully.");
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      toast.error("Error occured while saving data.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="admin">
        <h1>Update Driver Information</h1>
        <div className="items">
          <Form
            initialValues={{
              busNo: "",
              licenseNo: "",
              image: null,
              routesList: [{ latitude: "", longitude: "" }],
              maintainance: "",
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
                  src={require("../assets/zaid-saleem-image.jpg")}
                  className="square-image"
                  alt="license"
                />
              </div>
              <SelectImageInput name="licenseImage" />
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
