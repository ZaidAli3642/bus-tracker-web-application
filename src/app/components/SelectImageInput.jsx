import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const SelectImageInput = ({ name, accept }) => {
  const { setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext();
  return (
    <div className="input-container">
      <input
        type="file"
        accept={accept}
        style={{ marginLeft: "10px", marginRight: "10px", height: "40px" }}
        onChange={(e) => setFieldValue(name, e.target.files)}
        // onChange={(e) => console.log("Files : ", e.target.files)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
};

export default SelectImageInput;
