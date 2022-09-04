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
        onBlur={() => setFieldTouched(name)}
        onChange={(e) => setFieldValue(name, e.target.files)}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
};

export default SelectImageInput;
