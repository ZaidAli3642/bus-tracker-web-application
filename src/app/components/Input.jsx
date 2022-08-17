import ErrorMessage from "./ErrorMessage";
import { useFormikContext } from "formik";

const Input = ({ label, placeholder, classes, type, name }) => {
  const { errors, handleChange, setFieldTouched, touched, values } =
    useFormikContext();

  return (
    <div className={`input-container ${classes}`}>
      <label htmlFor="" className="label">
        {label}
      </label>
      <input
        type={type}
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={handleChange(name)}
        placeholder={placeholder}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </div>
  );
};

export default Input;
