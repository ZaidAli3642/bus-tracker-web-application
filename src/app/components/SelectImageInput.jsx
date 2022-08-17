import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const SelectImageInput = ({ name }) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext();
  return (
    <div className="input-container">
      <input
        type="file"
        style={{ marginLeft: "10px", marginRight: "10px", height: "40px" }}
        onBlur={() => setFieldTouched("image")}
        onChange={(e) => setFieldValue("image", e.target.files)}
      />
      <ErrorMessage error={errors["image"]} visible={touched["image"]} />
    </div>
  );
};

export default SelectImageInput;
